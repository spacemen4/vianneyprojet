import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody,
} from '@chakra-ui/react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { createClient } from '@supabase/supabase-js';
import { MdPlace } from "react-icons/md";
import { renderToString } from "react-dom/server";
// Initialize Supabase client
const supabaseUrl = 'https://hvjzemvfstwwhhahecwu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2anplbXZmc3R3d2hoYWhlY3d1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MTQ4Mjc3MCwiZXhwIjoyMDA3MDU4NzcwfQ.6jThCX2eaUjl2qt4WE3ykPbrh6skE8drYcmk-UCNDSw';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const EquipiersTable = () => {
  const [equipiers, setEquipiers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEquipier, setSelectedEquipier] = useState(null);

  const onRowClick = (equipier) => {
    setSelectedEquipier(equipier);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (selectedEquipier && isModalOpen) {
      const mapId = `map-${selectedEquipier.id}`;

      requestAnimationFrame(() => {
        const mapContainer = document.getElementById(mapId);
        if (mapContainer && !mapContainer._leaflet) {
          const map = L.map(mapId).setView([selectedEquipier.latitude, selectedEquipier.longitude], 13);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

          equipiers.forEach(team => {
            // Use a different color for the selected team
            const icon = team.id === selectedEquipier.id ? createCustomIcon('blue') : createCustomIcon();
            L.marker([team.latitude, team.longitude], { icon }).addTo(map);
          });
        }
      });

      return () => {
        // Cleanup code
      };
    }
  }, [selectedEquipier, isModalOpen, equipiers]);




  useEffect(() => {
    const fetchEquipiers = async () => {
      const { data, error } = await supabase
        .from('vianney_users_on_the_ground')
        .select('*');
      if (error) {
        console.log('Error fetching data:', error);
      } else {
        setEquipiers(data);
      }
    };

    fetchEquipiers();
  }, []);

  const getLeaderName = (teamMembers) => {
    const leader = teamMembers.find(member => member.isLeader);
    return leader ? `${leader.firstname} ${leader.familyname}` : 'No Leader';
  };





  const createCustomIcon = (color = 'red') => {
    const iconHtml = renderToString(<MdPlace style={{ fontSize: '24px', color }} />);
    return L.divIcon({
      html: iconHtml,
      className: 'custom-leaflet-icon',
      iconSize: L.point(30, 30),
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    });
  };
  const renderTeamDetails = () => {
    if (!selectedEquipier) return null;

    const {
      name_of_the_team,
      status,
      last_active,
      type_d_equipe,
      numero_d_equipier,
      specialite,
      role_de_l_equipier,
      numero_de_telephone,
      mail,
      type_de_vehicule,
      immatriculation,
      photo_profile_url,
      latitude,
      longitude,
      team_members,
    } = selectedEquipier;

    const teamMembersList = team_members?.map(member => (
      <li key={member.id}>
        {member.firstname} {member.familyname} - {member.isLeader ? 'Responsable' : 'Membre'}
      </li>
    ));

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', backgroundColor: 'linear-gradient(135deg, #6e8efb, #a777e3)', padding: '20px', borderRadius: '10px', color: 'black' }}>
        {photo_profile_url && (
          <img src={photo_profile_url} alt="l'équipe" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} />
        )}
        <div>
          <p><strong>Nom de l'équipe :</strong> {name_of_the_team}</p>
          <p><strong>Statut :</strong> {status ? 'Actif' : 'Inactif'}</p>
          <p><strong>Dernière activité :</strong> {new Date(last_active).toLocaleDateString('fr-FR')}</p>
          <p><strong>Type d'équipe :</strong> {type_d_equipe}</p>
          <p><strong>Numéro de membre :</strong> {numero_d_equipier}</p>
          <p><strong>Spécialité :</strong> {specialite}</p>
          <p><strong>Rôle :</strong> {role_de_l_equipier}</p>
          <p><strong>Numéro de téléphone :</strong> {numero_de_telephone}</p>
          <p><strong>Email :</strong> {mail}</p>
          <p><strong>Type de véhicule :</strong> {type_de_vehicule}</p>
          <p><strong>Numéro d'immatriculation :</strong> {immatriculation}</p>
          <p><strong>Localisation :</strong> Latitude: {latitude}, Longitude: {longitude}</p>
          <p><strong>Membres de l'équipe :</strong></p>
          <ul>{teamMembersList}</ul>
        </div>
      </div>
    );
  };

  return (
    <>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Photo</Th>
              <Th>Nom de l'équipe</Th>
              <Th>Nom du Leader</Th>
              <Th>Mission</Th> {/* Assuming you have a 'mission' field */}
            </Tr>
          </Thead>
          <Tbody>
            {equipiers.map((equipier, index) => (
              <Tr key={index} onClick={() => onRowClick(equipier)} cursor="pointer">
                <Td><img src={equipier.photo_profile_url} alt="Profile" style={{ width: '50px', height: '50px' }} /></Td>
                <Td>{equipier.name_of_the_team}</Td>
                <Td>{getLeaderName(equipier.team_members)}</Td>
                <Td>{equipier.mission}</Td> {/* Example field */}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Details sur l'équipe</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {renderTeamDetails()}
            <div id={`map-${selectedEquipier?.id}`} style={{ height: '500px', width: '100%' }}></div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EquipiersTable;

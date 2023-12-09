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

    // Extracting team details
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

    // Formatting the team members list
    const teamMembersList = team_members?.map(member => (
      <li key={member.id}>
        {member.firstname} {member.familyname} - {member.isLeader ? 'Leader' : 'Member'}
      </li>
    ));




  return (
    <>
      {photo_profile_url && (
        <img src={photo_profile_url} alt="Team Photo" style={{ width: '100%', height: 'auto', marginBottom: '20px' }} />
      )}
      <p><strong>Team Name:</strong> {name_of_the_team}</p>
        <p><strong>Status:</strong> {status ? 'Active' : 'Inactive'}</p>
        <p><strong>Last Active:</strong> {last_active}</p>
        <p><strong>Team Type:</strong> {type_d_equipe}</p>
        <p><strong>Team Member Number:</strong> {numero_d_equipier}</p>
        <p><strong>Specialty:</strong> {specialite}</p>
        <p><strong>Role:</strong> {role_de_l_equipier}</p>
        <p><strong>Phone Number:</strong> {numero_de_telephone}</p>
        <p><strong>Email:</strong> {mail}</p>
        <p><strong>Vehicle Type:</strong> {type_de_vehicule}</p>
        <p><strong>Registration Number:</strong> {immatriculation}</p>
        <p><strong>Location:</strong> Latitude: {latitude}, Longitude: {longitude}</p>
        <p><strong>Team Members:</strong></p>
        <ul>{teamMembersList}</ul>
      </>
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
          <ModalHeader>Team Details</ModalHeader>
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

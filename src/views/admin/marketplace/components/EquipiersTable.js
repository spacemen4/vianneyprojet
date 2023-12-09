import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useToast,
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
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEquipier, setSelectedEquipier] = useState(null);

  const onRowClick = (equipier) => {
    setSelectedEquipier(equipier);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (selectedEquipier && isModalOpen) {
      const mapId = `map-${selectedEquipier.id}`;

      // Wait for the next browser repaint to ensure the modal and its contents have been rendered
      requestAnimationFrame(() => {
        const mapContainer = document.getElementById(mapId);
        if (mapContainer && !mapContainer._leaflet) {
          // Initialize the map
          const map = L.map(mapId).setView([selectedEquipier.latitude, selectedEquipier.longitude], 13);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);
          L.marker([selectedEquipier.latitude, selectedEquipier.longitude]).addTo(map);

          // Store reference to map for cleanup
          mapContainer._leaflet = map;
        }
      });

      return () => {
        // Cleanup the map when the modal is closed or a different equipier is selected
        const mapElement = L.DomUtil.get(mapId);
        if (mapElement && mapElement._leaflet) {
          mapElement._leaflet.remove();
          mapElement._leaflet = undefined;
        }
      };
    }
  }, [selectedEquipier, isModalOpen]);


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
  const createCustomIcon = (color) => {
    const iconHtml = renderToString(<MdPlace style={{ fontSize: '24px', color }} />);
    return L.divIcon({
      html: iconHtml,
      className: 'custom-leaflet-icon',
      iconSize: L.point(30, 30),
      iconAnchor: [15, 30],
      popupAnchor: [0, -50]
    });
  };


  const showDetails = (equipier) => {
    const leaderName = getLeaderName(equipier.team_members);
    const mapId = `map-${equipier.id}`;

    toast({
      title: 'Team Details',
      description: (
        <>
          <p>Team: {equipier.name_of_the_team}</p>
          <p>Leader: {leaderName}</p>
          {/* ... other details ... */}
          <div id={mapId} style={{ height: '500px', width: '100%' }}></div>
        </>
      ),
      status: 'info',
      duration: null, // Keeps the toast open until closed manually
      isClosable: true,
      position: "top",
      // In the onCloseComplete property of the toast
      onCloseComplete: () => {
        const mapElement = L.DomUtil.get(mapId);
        if (mapElement && mapElement._leaflet_map) {
          mapElement._leaflet_map.remove();
        }
      }
    });

    setTimeout(() => {
      const mapContainer = document.getElementById(mapId);
      if (mapContainer && !mapContainer._leaflet_map) {
        const map = L.map(mapId).setView([equipier.latitude, equipier.longitude], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        // Add markers for all teams
        equipiers.forEach(team => {
          const icon = team.id === equipier.id ? createCustomIcon('blue') : createCustomIcon('red');
          L.marker([team.latitude, team.longitude], { icon }).addTo(map);
        });
      }
    }, 500);
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
            <div id={`map-${selectedEquipier?.id}`} style={{ height: '500px', width: '100%' }}></div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EquipiersTable;

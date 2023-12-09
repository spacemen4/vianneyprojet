import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useToast
} from '@chakra-ui/react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://hvjzemvfstwwhhahecwu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2anplbXZmc3R3d2hoYWhlY3d1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MTQ4Mjc3MCwiZXhwIjoyMDA3MDU4NzcwfQ.6jThCX2eaUjl2qt4WE3ykPbrh6skE8drYcmk-UCNDSw';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const EquipiersTable = () => {
  const [equipiers, setEquipiers] = useState([]);
  const toast = useToast();

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

  const showDetails = (equipier) => {
    const leaderName = getLeaderName(equipier.team_members);
  
    const mapId = `map-${equipier.id}`; // Unique ID for each map
  
    toast({
      title: 'Team Details',
      description: (
        <>
          <p>Team: {equipier.name_of_the_team}</p>
          <p>Leader: {leaderName}</p>
          {/* ... other details ... */}
          <div id={mapId} style={{ height: '150px', width: '100%' }}></div>
        </>
      ),
      status: 'info',
      duration: null, // Keeps the toast open until closed manually
      isClosable: true,
      position: "top",
      onCloseComplete: () => L.map(mapId).remove(), // Clean up the map when toast is closed
      onRender: () => {
        // Initialize the map after the toast is rendered
        const map = L.map(mapId).setView([equipier.latitude, equipier.longitude], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        L.marker([equipier.latitude, equipier.longitude]).addTo(map);
      }
    });
  };
  
  return (
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
            <Tr key={index} onClick={() => showDetails(equipier)} cursor="pointer">
              <Td><img src={equipier.photo_profile_url} alt="Profile" style={{ width: '50px', height: '50px' }}/></Td>
              <Td>{equipier.name_of_the_team}</Td>
              <Td>{getLeaderName(equipier.team_members)}</Td>
              <Td>{equipier.mission}</Td> {/* Example field */}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default EquipiersTable;

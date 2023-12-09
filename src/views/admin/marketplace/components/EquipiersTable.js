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
    toast({
      title: 'Team Details',
      description: `Team: ${equipier.name_of_the_team}
                    Leader: ${leaderName}
                    Latitude: ${equipier.latitude}
                    Longitude: ${equipier.longitude}
                    Status: ${equipier.status ? 'Active' : 'Inactive'}
                    Last Active: ${equipier.last_active}
                    ...`, // Include other details as needed
      status: 'info',
      duration: 9000,
      isClosable: true,
      position: "top"
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

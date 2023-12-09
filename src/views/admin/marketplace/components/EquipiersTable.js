import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer
} from '@chakra-ui/react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://hvjzemvfstwwhhahecwu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2anplbXZmc3R3d2hoYWhlY3d1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MTQ4Mjc3MCwiZXhwIjoyMDA3MDU4NzcwfQ.6jThCX2eaUjl2qt4WE3ykPbrh6skE8drYcmk-UCNDSw';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const EquipiersTable = () => {
  const [equipiers, setEquipiers] = useState([]);

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

  return (
    <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Name of the Team</Th>
            <Th>Latitude</Th>
            <Th>Longitude</Th>
            <Th>Photo</Th>
            <Th>Status</Th>
            <Th>Last Active</Th>
            <Th>Type d'équipe</Th>
            <Th>Numéro d'équipier</Th>
            <Th>Spécialité</Th>
            <Th>Rôle de l'équipier</Th>
            <Th>Numéro de téléphone</Th>
            <Th>Mail</Th>
            <Th>Type de véhicule</Th>
            <Th>Immatriculation</Th>
          </Tr>
        </Thead>
        <Tbody>
          {equipiers.map((equipier, index) => (
            <Tr key={index}>
              <Td>{equipier.name_of_the_team}</Td>
              <Td>{equipier.latitude}</Td>
              <Td>{equipier.longitude}</Td>
              <Td><img src={equipier.photo_profile_url} alt="Profile"/></Td>
              <Td>{equipier.status ? 'Active' : 'Inactive'}</Td>
              <Td>{equipier.last_active}</Td>
              <Td>{equipier.type_d_equipe}</Td>
              <Td>{equipier.numero_d_equipier}</Td>
              <Td>{equipier.specialite}</Td>
              <Td>{equipier.role_de_l_equipier}</Td>
              <Td>{equipier.numero_de_telephone}</Td>
              <Td>{equipier.mail}</Td>
              <Td>{equipier.type_de_vehicule}</Td>
              <Td>{equipier.immatriculation}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default EquipiersTable;

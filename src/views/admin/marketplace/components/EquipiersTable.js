import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer
} from '@chakra-ui/react';

const EquipiersTable = ({ equipiers }) => {
  return (
    <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Family Name</Th>
            <Th>First Name</Th>
            <Th>Birthdate</Th>
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
              <Td>{equipier.family_name}</Td>
              <Td>{equipier.first_name}</Td>
              <Td>{equipier.birthdate}</Td>
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

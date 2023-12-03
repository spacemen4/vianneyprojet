import React, { useState } from 'react';
import {
  Box, Button, FormControl, FormLabel, Input, Select
} from '@chakra-ui/react';

const AddActionForm = ({ teams }) => {
  const [action, setAction] = useState({
    teamId: '',
    actionName: '',
    startingDate: '',
    endingDate: '',
    comment: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Code to submit data to Supabase goes here
  };

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Team</FormLabel>
          <Select placeholder="Select team" onChange={(e) => setAction({ ...action, teamId: e.target.value })}>
            {teams.map(team => (
              <option key={team.id} value={team.id}>{team.name_of_the_team}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl isRequired mt={4}>
          <FormLabel>Action Name</FormLabel>
          <Input placeholder="Action Name" onChange={(e) => setAction({ ...action, actionName: e.target.value })} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Starting Date</FormLabel>
          <Input type="date" onChange={(e) => setAction({ ...action, startingDate: e.target.value })} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Ending Date</FormLabel>
          <Input type="date" onChange={(e) => setAction({ ...action, endingDate: e.target.value })} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Comment</FormLabel>
          <Input placeholder="Comment" onChange={(e) => setAction({ ...action, comment: e.target.value })} />
        </FormControl>
        <Button mt={4} colorScheme="blue" type="submit">Add Action</Button>
      </form>
    </Box>
  );
};

export default AddActionForm;

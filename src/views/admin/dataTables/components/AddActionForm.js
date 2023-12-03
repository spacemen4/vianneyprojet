import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hvjzemvfstwwhhahecwu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2anplbXZmc3R3d2hoYWhlY3d1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MTQ4Mjc3MCwiZXhwIjoyMDA3MDU4NzcwfQ.6jThCX2eaUjl2qt4WE3ykPbrh6skE8drYcmk-UCNDSw';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const AddActionForm = ({ teams = [] }) => {
  const [action, setAction] = useState({
    teamId: '',
    actionName: '',
    startingDate: '',
    endingDate: '',
    comment: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('vianney_actions')
      .insert([
        {
          team_to_which_its_attached: action.teamId,
          action_name: action.actionName,
          starting_date: action.startingDate,
          ending_date: action.endingDate,
          action_comment: action.comment
        }
      ]);

    if (error) {
      console.error('Error inserting data: ', error);
    } else {
      console.log('Action added: ', data);
      // Optionally reset the form or perform other actions upon successful submission
    }
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

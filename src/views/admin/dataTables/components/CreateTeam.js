import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Alert, AlertIcon,
} from '@chakra-ui/react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hvjzemvfstwwhhahecwu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2anplbXZmc3R3d2hoYWhlY3d1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MTQ4Mjc3MCwiZXhwIjoyMDA3MDU4NzcwfQ.6jThCX2eaUjl2qt4WE3ykPbrh6skE8drYcmk-UCNDSw';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function CreateTeam() {
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState('');
  const [teamCharacteristics, setTeamCharacteristics] = useState('');
  const [alertStatus, setAlertStatus] = useState(''); // 'success' or 'error'
  const [alertMessage, setAlertMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase
        .from('vianney_teams')
        .upsert([
          {
            id: uuidv4(),
            name_of_the_team: teamName,
            persons_working_in_team: teamMembers.split(',').map((member) => member.trim()),
            characteristics_of_the_team: teamCharacteristics.split(',').map((char) => char.trim()),
          },
        ]);

      if (error) {
        setAlertStatus('error');
        setAlertMessage('Error creating team. Please try again.');
      } else {
        setAlertStatus('success');
        setAlertMessage('Team created successfully.');

        // Clear form fields or navigate to a different page
        setTeamName('');
        setTeamMembers('');
        setTeamCharacteristics('');
      }
    } catch (error) {
      console.error('Error connecting to Supabase:', error);
      setAlertStatus('error');
      setAlertMessage('Error connecting to Supabase. Please try again.');
    }
  };



  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="teamName">
            <FormLabel>Team Name</FormLabel>
            <Input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
            />
          </FormControl>
          <FormControl id="teamMembers">
            <FormLabel>Team Members</FormLabel>
            <Input
              type="text"
              value={teamMembers}
              onChange={(e) => setTeamMembers(e.target.value)}
              required
            />
          </FormControl>
          <FormControl id="teamCharacteristics">
            <FormLabel>Team Characteristics</FormLabel>
            <Textarea
              value={teamCharacteristics}
              onChange={(e) => setTeamCharacteristics(e.target.value)}
              rows={4}
            />
          </FormControl>
          <Button type="submit" colorScheme="teal">
            Create Team
          </Button>
          {alertStatus && (
            <Alert status={alertStatus}>
              <AlertIcon />
              {alertMessage}
            </Alert>
          )}
        </VStack>
      </form>
    </Box>
  );
}

export default CreateTeam;

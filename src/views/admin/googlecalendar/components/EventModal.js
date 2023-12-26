import React, { useContext, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import GlobalContext from '../context/GlobalContext';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { MdDelete, MdCheck } from 'react-icons/md';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pvpsmyizvorwwccuwbuq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2cHNteWl6dm9yd3djY3V3YnVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMjgzMDg2MCwiZXhwIjoyMDE4NDA2ODYwfQ.9YDEN41__xBFJU91XY9e3r119A03yQ2oq5azmrx1aqY';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function EventModal() {
  const {
    setShowEventModal,
    daySelected,
    dispatchCalEvent,
    selectedEvent,
  } = useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '');
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ''
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent ? selectedEvent.label : 'indigo'
  );
  const labelsColors = {
    indigo: 'indigo.500',
    gray: 'gray.500',
    green: 'green.500',
    blue: 'blue.500',
    red: 'red.500',
    purple: 'purple.500',
  };

  const [team, setTeam] = useState(''); // New state for Équipe
  const [actionName, setActionName] = useState(''); // New state for Nom de l'action
  const [startDate, setStartDate] = useState(''); // New state for Date de début
  const [endDate, setEndDate] = useState(''); // New state for Date de fin
  const [comment, setComment] = useState(''); // New state for Commentaire

  dayjs.locale('fr');

  async function handleSubmit(e) {
    e.preventDefault();
    const event = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };

    // Push data to Supabase
    const { error } = selectedEvent
      ? await supabase.from('your-table-name').update(event).match({ id: selectedEvent.id })
      : await supabase.from('your-table-name').insert([event]);

    if (error) {
      console.error('Error:', error);
    } else {
      // Fetch data from Supabase (assuming your table is 'vianney_actions')
      const { data: actionsData, error: fetchError } = await supabase.from('vianney_actions').select('*');
      if (fetchError) {
        console.error('Error fetching data from Supabase:', fetchError);
      } else {
        // Dispatch fetched data to update the context state
        dispatchCalEvent({ type: 'update', payload: actionsData });
      }

      setShowEventModal(false);
    }
  }

  return (
    <Modal isOpen={true} onClose={() => setShowEventModal(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{selectedEvent ? 'Edit Event' : 'Create Event'}
          {selectedEvent && (
            <Icon
              as={MdDelete}
              ml={2}
              cursor="pointer"
              onClick={() => {
                dispatchCalEvent({ type: 'delete', payload: selectedEvent });
                setShowEventModal(false);
              }}
            />
          )}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="event-team" isRequired mt={4}>
            <FormLabel>Équipe*</FormLabel>
            <Input
              placeholder="Enter Team"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
            />
          </FormControl>

          <FormControl id="event-action-name" isRequired mt={4}>
            <FormLabel>Nom de l'action*</FormLabel>
            <Input
              placeholder="Enter Action Name"
              value={actionName}
              onChange={(e) => setActionName(e.target.value)}
            />
          </FormControl>

          <FormControl id="event-start-date" isRequired mt={4}>
            <FormLabel>Date de début*</FormLabel>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </FormControl>

          <FormControl id="event-end-date" isRequired mt={4}>
            <FormLabel>Date de fin*</FormLabel>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </FormControl>

          <FormControl id="event-comment" mt={4}>
            <FormLabel>Commentaire</FormLabel>
            <Input
              placeholder="Add Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <HStack>
              {Object.keys(labelsColors).map((label) => (
                <Box
                  key={label}
                  bg={labelsColors[label]}
                  w={6}
                  h={6}
                  borderRadius="full"
                  cursor="pointer"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  onClick={() => setSelectedLabel(label)}
                >
                  {selectedLabel === label && (
                    <Icon as={MdCheck} color="white" />
                  )}
                </Box>
              ))}
            </HStack>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="ghost" onClick={() => setShowEventModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

import React, { useContext, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import GlobalContext from '../context/GlobalContext';
import { createClient } from '@supabase/supabase-js';
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

// Initialize Supabase client (replace with your actual configuration)
const supabaseUrl = 'your-supabase-url';
const supabaseAnonKey = 'your-anonymous-key';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const EventModal = () => {
  const { setShowEventModal, daySelected, selectedEvent } = useContext(GlobalContext);

  // State for form fields
  const [formFields, setFormFields] = useState({
    title: '',
    description: '',
    label: 'indigo',
    // Additional fields
    team: '',
    actionName: '',
    startDate: '',
    endDate: '',
    comment: ''
  });

  useEffect(() => {
    // Pre-fill form if editing an existing event
    if (selectedEvent) {
      setFormFields({ ...formFields, ...selectedEvent });
    }
  }, [selectedEvent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const event = {
      ...formFields,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };

    const { error } = selectedEvent
      ? await supabase.from('your-table-name').update(event).match({ id: selectedEvent.id })
      : await supabase.from('your-table-name').insert([event]);

    if (error) {
      console.error('Error:', error);
    } else {
      setShowEventModal(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  // ... Rest of your component code, including modal structure

  return (
    <Modal isOpen={true} onClose={() => setShowEventModal(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{selectedEvent ? 'Edit Event' : 'Create Event'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Form controls for each field */}
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input name="title" value={formFields.title} onChange={handleChange} />
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
          <Button colorScheme="blue" onClick={handleSubmit}>Save</Button>
          <Button variant="ghost" onClick={() => setShowEventModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EventModal;

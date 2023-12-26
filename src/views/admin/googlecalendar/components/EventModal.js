import React, { useContext, useState } from 'react';
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
import {
  MdDelete,
  MdSchedule,
  MdSegment,
  MdBookmarkBorder,
  MdCheck,
} from 'react-icons/md';

const labelsColors = {
  indigo: 'indigo.500',
  gray: 'gray.500',
  green: 'green.500',
  blue: 'blue.500',
  red: 'red.500',
  purple: 'purple.500',
};

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

  dayjs.locale('fr');

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: 'update', payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: 'push', payload: calendarEvent });
    }
    setShowEventModal(false);
  }

  return (
    <Modal isOpen={true} onClose={() => setShowEventModal(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {selectedEvent ? 'Edit Event' : 'Create Event'}
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
          <FormControl id="event-title" isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Add Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl id="event-date" mt={4}>
            <FormLabel>Date</FormLabel>
            <Box>{daySelected.format('DD/MM/YYYY')}</Box>
          </FormControl>
          <FormControl id="event-description" mt={4}>
            <FormLabel>Description</FormLabel>
            <Input
              placeholder="Add Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
          <FormControl id="event-label" mt={4}>
            <FormLabel>Label</FormLabel>
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

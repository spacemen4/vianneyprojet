import React, { useState, useEffect } from 'react';
import {
  Box, ChakraProvider, useToast, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button, Input, Stack
} from '@chakra-ui/react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/fr'; // Import French locale
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://hvjzemvfstwwhhahecwu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2anplbXZmc3R3d2hoYWhlY3d1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MTQ4Mjc3MCwiZXhwIjoyMDA3MDU4NzcwfQ.6jThCX2eaUjl2qt4WE3ykPbrh6skE8drYcmk-UCNDSw';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Set moment to French locale
moment.locale('fr');
const localizer = momentLocalizer(moment);

function TeamSchedule() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const onClose = () => setIsAlertOpen(false);
  const cancelRef = React.useRef();
  const toast = useToast();
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [updatedEventName, setUpdatedEventName] = useState('');
  const [updatedEventStart, setUpdatedEventStart] = useState('');
  const [updatedEventEnd, setUpdatedEventEnd] = useState('');

  const toggleUpdateMode = (mode) => {
    setIsUpdateMode(mode);
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setIsAlertOpen(true);
    setUpdatedEventName(event.title);
    setUpdatedEventStart(moment(event.start).format('YYYY-MM-DDTHH:mm'));
    setUpdatedEventEnd(moment(event.end).format('YYYY-MM-DDTHH:mm'));
    // Don't set isUpdateMode here; let the user choose
  };

  const deleteEvent = async () => {
    console.log('Selected event on delete:', selectedEvent); // Log the event when attempting to delete

    if (!selectedEvent || typeof selectedEvent.id === 'undefined') {
      toast({
        title: "Error",
        description: "No event selected or event ID is missing.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const { error } = await supabase
      .from('vianney_actions')
      .delete()
      .match({ id: selectedEvent.id });

    if (error) {
      toast({
        title: "Error deleting event",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      setEvents(events.filter(event => event.id !== selectedEvent.id));
      toast({
        title: "Event deleted",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
    onClose();
  };

  const updateEvent = async () => {
    // Validation can be added here for updated event details
    const { error } = await supabase
      .from('vianney_actions')
      .update({
        action_name: updatedEventName,
        starting_date: updatedEventStart,
        ending_date: updatedEventEnd,
        last_updated: new Date() // update the last updated time
      })
      .match({ id: selectedEvent.id });

    if (error) {
      toast({
        title: "Error updating event",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      // Update the event in the events state
      setEvents(events.map(event =>
        event.id === selectedEvent.id ? { ...event, title: updatedEventName, start: new Date(updatedEventStart), end: new Date(updatedEventEnd) } : event
      ));
      toast({
        title: "Event updated",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
    onClose();
  };

  const handleAction = () => {
    if (isUpdateMode) {
      updateEvent();
    } else {
      deleteEvent();
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('team_action_view_rendering')
        .select('*');

      if (error) {
        console.error('Error fetching events:', error);
      } else {
        const formattedEvents = data.map(action => ({
          id: action.action_id, // Use 'action_id' instead of 'id'
          title: `${action.action_name} - ${action.name_of_the_team}`,
          start: new Date(action.starting_date),
          end: new Date(action.ending_date),
          user: action.name_of_the_team,
          color: action.color
        }));
        setEvents(formattedEvents);
      }
    };

    fetchEvents();
  }, []);



  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: event.color || 'lightgrey', // Use team color or default
      },
    };
  };

  const messages = {
    allDay: 'Toute la journée',
    previous: 'Précédent',
    next: 'Suivant',
    today: 'Aujourd\'hui',
    month: 'Mois',
    week: 'Semaine',
    day: 'Jour',
    agenda: 'Agenda',
    date: 'Date',
    time: 'Heure',
    event: 'Événement',
    noEventsInRange: 'Il n\'y a pas d\'événements dans cette période',
    // ... Add other translations as needed
  };

  const formats = {
    dayFormat: 'DD/MM', // Format for day view
    weekdayFormat: 'dddd', // Format for week view
    monthHeaderFormat: 'MMMM YYYY', // Format for month header
    dayHeaderFormat: 'dddd, MMMM DD', // Format for day header
    agendaDateFormat: 'dddd, MMMM DD', // Format for agenda view date
    agendaTimeFormat: 'HH:mm', // Format for agenda view time
    // ... (add more formats as needed)
  };

  return (
    <ChakraProvider>
      <Box p={4}>
      <Calendar
          localizer={localizer}
          events={events}
          formats={formats} // Add custom formats
          defaultView={Views.DAY} // Set default view to day
          views={['day', 'week', 'month', 'agenda']} // Include other views for switching
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventStyleGetter}
          messages={messages} // Use French messages
          style={{ height: 500 }}
          onSelectEvent={handleEventSelect}
        />
      </Box>
        <AlertDialog
          isOpen={isAlertOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Event Options
              </AlertDialogHeader>
              <AlertDialogBody>
                {selectedEvent ? (
                  <Stack spacing={3}>
                    <Input 
                      value={updatedEventName} 
                      onChange={(e) => setUpdatedEventName(e.target.value)} 
                      placeholder="Event Name" 
                    />
                    <Input 
                      type="datetime-local" 
                      value={updatedEventStart} 
                      onChange={(e) => setUpdatedEventStart(e.target.value)} 
                    />
                    <Input 
                      type="datetime-local" 
                      value={updatedEventEnd} 
                      onChange={(e) => setUpdatedEventEnd(e.target.value)} 
                    />
                  </Stack>
                ) : (
                  'Select an event to modify or delete.'
                )}
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="blue" onClick={updateEvent} ml={3}>
                  Update
                </Button>
                <Button colorScheme="red" onClick={deleteEvent} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

    </ChakraProvider>
  );
}

export default TeamSchedule;

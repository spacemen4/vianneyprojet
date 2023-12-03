import React, { useState, useEffect } from 'react';
import { Box, ChakraProvider, useToast, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button } from '@chakra-ui/react';
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

  // ... useEffect to fetch events

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setIsAlertOpen(true);
  };
  
  // Later in your delete function
  const deleteEvent = async () => {
    if (!selectedEvent || !selectedEvent.id) {
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

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('team_action_view_rendering')
        .select('*');

      if (error) {
        console.error('Erreur lors de la récupération des événements:', error);
      } else {
        const formattedEvents = data.map(action => ({
          id: action.id, // Ensure this line is included
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

      {/* Alert Dialog for Confirmation */}
      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Event
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this event? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
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

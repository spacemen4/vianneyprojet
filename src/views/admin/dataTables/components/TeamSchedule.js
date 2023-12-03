import React, { useState, useEffect } from 'react';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
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

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('team_action_view_rendering')
        .select('*');

      if (error) {
        console.error('Erreur lors de la récupération des événements:', error);
      } else {
        const formattedEvents = data.map(action => ({
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

  return (
    <ChakraProvider>
      <Box p={4}>
        <Calendar
          localizer={localizer}
          events={events}
          defaultView={Views.DAY} // Set default view to day
          views={['day', 'week', 'month', 'agenda']} // Include other views for switching
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventStyleGetter}
          messages={messages} // Use French messages
          style={{ height: 500 }}
        />
      </Box>
    </ChakraProvider>
  );
}

export default TeamSchedule;

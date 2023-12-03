import React, { useState, useEffect } from 'react';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { createClient } from '@supabase/supabase-js';
// Initialize Supabase client
const supabaseUrl = 'https://hvjzemvfstwwhhahecwu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2anplbXZmc3R3d2hoYWhlY3d1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MTQ4Mjc3MCwiZXhwIjoyMDA3MDU4NzcwfQ.6jThCX2eaUjl2qt4WE3ykPbrh6skE8drYcmk-UCNDSw';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const localizer = momentLocalizer(moment);

function TeamSchedule() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('vianney_actions')
        .select('*');

      if (error) {
        console.error('Error fetching events:', error);
      } else {
        // Transform data to match calendar event format
        const formattedEvents = data.map(action => ({
          title: action.action_name,
          start: new Date(action.starting_date),
          end: new Date(action.ending_date),
          user: 'John' // Replace with actual user data if available
        }));
        setEvents(formattedEvents);
      }
    };

    fetchEvents();
  }, []);

  const eventStyleGetter = (event) => {
    const userColors = {
      'John': 'blue',
      'Alice': 'green',
      // Add more users and their associated colors here
    };

    return {
      style: {
        backgroundColor: userColors[event.user] || 'lightgrey', // Default color if user not found
      },
    };
  };

  return (
    <ChakraProvider>
      <Box p={4}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventStyleGetter}
          style={{ height: 500 }}
        />
      </Box>
    </ChakraProvider>
  );
}

export default TeamSchedule;

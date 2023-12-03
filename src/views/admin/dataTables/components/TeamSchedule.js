import React from 'react';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

// Example event data
const events = [
  {
    title: 'Team Meeting - John',
    start: new Date(2023, 11, 5, 10, 0),
    end: new Date(2023, 11, 5, 11, 0),
    user: 'John',
  },
  {
    title: 'Work Shift 1 - John',
    start: new Date(2023, 11, 5, 8, 0),
    end: new Date(2023, 11, 5, 16, 0),
    user: 'John',
  },
  {
    title: 'Work Shift 2 - Alice',
    start: new Date(2023, 11, 5, 8, 0),
    end: new Date(2023, 11, 5, 16, 0),
    user: 'Alice',
  },
];
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

const localizer = momentLocalizer(moment);

function TeamSchedule() {
  // No need to group events by user, pass them directly
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

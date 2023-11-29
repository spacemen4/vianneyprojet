import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Box } from '@chakra-ui/react';

const MyCalendar = () => {
  const events = [
    // Sample events data
    { title: 'Team A Meeting', start: '2023-11-29T10:00:00', end: '2023-11-29T12:00:00', groupId: 'teamA' },
    { title: 'Team B Workshop', start: '2023-11-29T13:00:00', end: '2023-11-29T15:00:00', groupId: 'teamB' },
    // Add more events here
  ];

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="timeGridDay"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={events}
        eventClick={(info) => {
          // Handle event click, show details
          alert(`Event: ${info.event.title}`);
        }}
      />
    </Box>
  );
};

export default MyCalendar;

// Chakra imports
import {
  Box,
  Button,
  SimpleGrid,
  Icon,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import React, { useState, useEffect } from 'react';
import AddEventForm from "./components/AddEventForm";
import { FcPlus, FcLeft } from "react-icons/fc";
import DocumentationsComponent from "./DocumentionsComponent/DocumentationsComponent";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pvpsmyizvorwwccuwbuq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2cHNteWl6dm9yd3djY3V3YnVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMjgzMDg2MCwiZXhwIjoyMDE4NDA2ODYwfQ.9YDEN41__xBFJU91XY9e3r119A03yQ2oq5azmrx1aqY';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function UserReports() {
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      let { data: vianney_event, error } = await supabase
        .from('vianney_event')
        .select('*');

      if (error) console.log('error', error);
      else setEvents(vianney_event);
    }

    fetchEvents();
  }, []);

  const toggleAddEventForm = () => setShowAddEventForm(!showAddEventForm);
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Heading me='auto'
        color={textColor}
        fontSize='2xl'
        fontWeight='700'
        lineHeight='100%'
        mb="20px">
        Evènements
      </Heading>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap='20px'
        mb='20px'>
        {events.map((event, index) => (
          <MiniStatistics key={index} event_name={event.event_name} date={event.date} />
        ))}
        <Button
          mt="30px"
          onClick={toggleAddEventForm}
          leftIcon={<Icon as={showAddEventForm ? FcLeft : FcPlus} />}
          colorScheme='blue'
          variant='solid'
          size='md'
          boxShadow='sm'
          _hover={{ boxShadow: 'md' }}
          _active={{ boxShadow: 'lg' }}>
          {showAddEventForm ? "Masquer" : "Ajouter un évènement"}
        </Button>
      </SimpleGrid>
      {showAddEventForm && <AddEventForm />}
      <DocumentationsComponent />
      <Heading me='auto'
        color={textColor}
        fontSize='2xl'
        fontWeight='700'
        lineHeight='100%'
        mb="20px">
        Le calendrier des évènements
      </Heading>
      <MiniCalendar />
    </Box>
  );
}

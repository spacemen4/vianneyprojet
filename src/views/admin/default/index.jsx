// Chakra imports
import {
  Box,
  Button,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import React, { useState, useEffect } from 'react';
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import { createClient } from '@supabase/supabase-js'
import AddEventForm from "./components/AddEventForm";
import { FcPlus, FcLeft } from "react-icons/fc";
import DocumentationsComponent from "./DocumentionsComponent/DocumentationsComponent";

const supabaseUrl = 'https://hvjzemvfstwwhhahecwu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2anplbXZmc3R3d2hoYWhlY3d1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MTQ4Mjc3MCwiZXhwIjoyMDA3MDU4NzcwfQ.6jThCX2eaUjl2qt4WE3ykPbrh6skE8drYcmk-UCNDSw';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function UserReports() {
  const [showAddEventForm, setShowAddEventForm] = useState(false);

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
      <DocumentationsComponent/>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <TotalSpent />
        <WeeklyRevenue />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <DailyTraffic />
          <PieCard />
        </SimpleGrid>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <Tasks />
          <MiniCalendar h='100%' minW='100%' selectRange={false} />
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}

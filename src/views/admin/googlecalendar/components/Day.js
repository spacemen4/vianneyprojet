import React, { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import GlobalContext from "../context/GlobalContext";
import { createClient } from '@supabase/supabase-js';
import { Box, Text, Flex } from "@chakra-ui/react";

const supabaseUrl = 'https://pvpsmyizvorwwccuwbuq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2cHNteWl6dm9yd3djY3V3YnVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMjgzMDg2MCwiZXhwIjoyMDE4NDA2ODYwfQ.9YDEN41__xBFJU91XY9e3r119A03yQ2oq5azmrx1aqY';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const { setDaySelected, setShowEventModal, setSelectedEvent } = useContext(GlobalContext);

  useEffect(() => {
    const fetchActions = async () => {
      const { data, error } = await supabase
        .from('team_action_view_rendering')
        .select('*');

      if (error) {
        console.error('Error fetching actions:', error);
      } else {
        const events = data.filter(
          action => dayjs(action.starting_date).format("DD-MM-YY") === day.format("DD-MM-YY")
        );
        setDayEvents(events);
      }
    };

    fetchActions();
  }, [day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? { bg: "blue.600", color: "white", borderRadius: "full", w: "7" }
      : {};
  }

  return (
    <Box border="1px" borderColor="gray.200" flexDir="column" display="flex">
      <Flex flexDir="column" alignItems="center">
        {rowIdx === 0 && (
          <Text fontSize="sm" mt={1}>
            {day.format("ddd").toUpperCase()}
          </Text>
        )}
        <Text
          fontSize="sm"
          p={1}
          my={1}
          textAlign="center"
          {...getCurrentDayClass()}
        >
          {day.format("DD")}
        </Text>
      </Flex>
      <Flex
        flexDir="column"
        flex={1}
        cursor="pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((evt, idx) => (
          <Box
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedEvent(evt);
            }}
            bg={evt.color || 'gray.200'}
            p={1}
            color="gray.600"
            fontSize="sm"
            borderRadius="md"
            mb={1}
            width="100%"
            isTruncated
          >
            {evt.action_name}
          </Box>
        ))}
      </Flex>
    </Box>
  );
}

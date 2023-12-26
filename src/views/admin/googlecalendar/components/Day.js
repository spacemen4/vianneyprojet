import React, { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import GlobalContext from "../context/GlobalContext";
import { createClient } from '@supabase/supabase-js';
import { Box, Text, Flex, Tooltip } from "@chakra-ui/react";

dayjs.extend(isBetween);

const supabaseUrl = 'https://pvpsmyizvorwwccuwbuq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2cHNteWl6dm9yd3djY3V3YnVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMjgzMDg2MCwiZXhwIjoyMDE4NDA2ODYwfQ.9YDEN41__xBFJU91XY9e3r119A03yQ2oq5azmrx1aqY';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const { setDaySelected, setShowEventModal, setSelectedEvent } = useContext(GlobalContext);
  const formatDate = (date) => {
    return dayjs(date).format('DD/MM/YYYY');
  }
  useEffect(() => {
    const fetchActions = async () => {
      const { data, error } = await supabase
        .from('team_action_view_rendering')
        .select('*');

      if (error) {
        console.error('Error fetching actions:', error);
      } else {
        const events = data.filter(action =>
          dayjs(day).isBetween(dayjs(action.starting_date).subtract(1, 'day'), dayjs(action.ending_date), null, '[]')
        );
        setDayEvents(events);
      }
    };

    fetchActions();
  }, [day]);
  const formatTooltipLabel = (evt) => {
    return [
      `Nom de l'action: ${evt.action_name}`,
      `Date de début: ${formatDate(evt.starting_date)}`,
      `Date de fin: ${formatDate(evt.ending_date)}`,
      `Commentaire: ${evt.action_comment || 'N/A'}`,
      `Dernière mise à jour: ${formatDate(evt.last_updated)}`,
      `ID de l'équipe: ${evt.team_id}`,
      `Nom de l'équipe: ${evt.name_of_the_team}`,
      `Nom: ${evt.nom || 'N/A'}`, // Displaying the 'nom' field
      `Prénom: ${evt.prenom || 'N/A'}` // Displaying the 'prenom' field
    ].join('\n');
  };

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
          <Tooltip
            key={idx}
            label={formatTooltipLabel(evt)}
            fontSize="sm"
            placement="right"
            hasArrow
          >
            <Box
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
          </Tooltip>
        ))}
      </Flex>
    </Box>
  );
}
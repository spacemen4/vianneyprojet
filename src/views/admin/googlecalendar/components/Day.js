import React, { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import GlobalContext from "../context/GlobalContext";
import { Box, Text, Flex, Tooltip, VStack } from "@chakra-ui/react";

dayjs.extend(isBetween);

import supabase from './../../../../supabaseClient';

export default function Day({ day, rowIdx, setShowModifyForm, setSelectedAction }) {
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

  const formatTooltipContent = (event) => {
    return (
      <VStack align="left" spacing={1}>
        <Text>Intervenant: {event.nom || 'N/A'} {event.prenom || 'N/A'}</Text>
        <Text>Disponible pour: {event.action_name}</Text>
        <Text>Du: {formatDate(event.starting_date)} au {formatDate(event.ending_date)}</Text>
        <Text>Commentaire: {event.action_comment || 'N/A'}</Text>
        <Text>Dernière mise à jour: {formatDate(event.last_updated)}</Text>
      </VStack>
    );
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
        {dayEvents.map((event, idx) => (
          <Tooltip
          key={idx}
            label={formatTooltipContent(event)}
            fontSize="sm"
            placement="right"
            hasArrow
          >
            <Box
              onClick={(e) => {
                e.stopPropagation();
                setDaySelected(day);
                setSelectedEvent(event.id);
                setSelectedAction(event); // Pass action data to ModifyActionButton
              }}
              bg={event.color || 'gray.200'}
              p={1}
              color="gray.600"
              fontSize="sm"
              borderRadius="md"
              mb={1}
              width="100%"
              isTruncated
            >
              {event.action_name}
            </Box>
          </Tooltip>
        ))}
      </Flex>
    </Box>
  );
}

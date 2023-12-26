import React, { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import GlobalContext from "../context/GlobalContext";
import { Box, Text, Flex } from "@chakra-ui/react";

export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const { setDaySelected, setShowEventModal, filteredEvents, setSelectedEvent } = useContext(GlobalContext);

  useEffect(() => {
    const events = filteredEvents.filter(
      evt => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

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
            onClick={() => setSelectedEvent(evt)}
            bg={`${evt.label}.200`}
            p={1}
            mr={3}
            color="gray.600"
            fontSize="sm"
            borderRadius="md"
            mb={1}
            isTruncated
          >
            {evt.title}
          </Box>
        ))}
      </Flex>
    </Box>
  );
}

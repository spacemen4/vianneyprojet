import React, { useEffect, useState } from 'react';
import { ChakraProvider, Alert, AlertIcon, Text, Badge, Flex, VStack, Icon, Grid } from "@chakra-ui/react";
import { FaCalendar, FaComment } from 'react-icons/fa';
import { createClient } from '@supabase/supabase-js';
import { FcCalendar, FcVoicePresentation } from "react-icons/fc";

const supabaseUrl = 'https://pvpsmyizvorwwccuwbuq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2cHNteWl6dm9yd3djY3V3YnVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMjgzMDg2MCwiZXhwIjoyMDE4NDA2ODYwfQ.9YDEN41__xBFJU91XY9e3r119A03yQ2oq5azmrx1aqY';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function DisplayVianneyActions() {
  const [reservedActions, setReservedActions] = useState([]);
  const [nonReservedActions, setNonReservedActions] = useState([]);

  useEffect(() => {
    async function fetchActions() {
      const { data, error } = await supabase.from("vianney_actions").select();

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }

      // Filter actions based on reserved_action
      const reservedActions = data.filter(action => action.reserved_action === "true");
      const nonReservedActions = data.filter(action => action.reserved_action !== "true");

      // Format the date to French locale
      const formatActions = actions => actions.map(action => ({
        ...action,
        starting_date: new Date(action.starting_date).toLocaleDateString('fr-FR'),
        ending_date: new Date(action.ending_date).toLocaleDateString('fr-FR'),
      }));

      setReservedActions(formatActions(reservedActions));
      setNonReservedActions(formatActions(nonReservedActions));
    }

    fetchActions();
  }, []);

  return (
    <ChakraProvider>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <ColumnActions actions={reservedActions} title="Reserved Actions" />
        <ColumnActions actions={nonReservedActions} title="Non-Reserved Actions" />
      </Grid>
    </ChakraProvider>
  );
}

function ColumnActions({ actions, title }) {
  return (
    <div>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        {title}
      </Text>
      {actions.map((action) => (
        <Alert
          key={action.id}
          status="info"
          borderRadius="md"
          mb={2}
          bgColor="gray.100" // Background color
          color="gray.900" // Text color
        >
          <AlertIcon />
          <VStack align="start">
            <Flex alignItems="center">
              <Badge colorScheme="teal" fontSize="0.8em" mr={2}>
                {action.action_name}
              </Badge>
            </Flex>
            <Flex alignItems="center">
                <Icon as={FcCalendar} boxSize={6} mr={2} />
                <Text margin="2">
                  Date de début:
                </Text>
                <Text fontWeight="bold">{action.starting_date}</Text>
              </Flex>
              <Flex alignItems="center">
                <Icon as={FcCalendar} boxSize={6} mr={2} />
                <Text margin="2">
                  Date de fin:
                </Text>
                <Text fontWeight="bold">{action.ending_date}</Text>
              </Flex>
              <Flex alignItems="center">
                <Icon as={FcVoicePresentation} boxSize={6} mr={2} />
                <Text margin="2">
                  Commentaires:
                </Text>
                <Text fontWeight="bold">{action.action_comment}</Text>
              </Flex>
          </VStack>
        </Alert>
      ))}
    </div>
  );
}

export default DisplayVianneyActions;

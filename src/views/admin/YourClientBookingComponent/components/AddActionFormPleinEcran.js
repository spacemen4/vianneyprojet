import React, { useEffect, useState } from 'react';
import { ChakraProvider, Alert, AlertIcon, Text, Badge, Flex, VStack, Icon } from "@chakra-ui/react";
import { FaCalendar, FaComment } from 'react-icons/fa'; // Import the Font Awesome icons
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pvpsmyizvorwwccuwbuq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2cHNteWl6dm9yd3djY3V3YnVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMjgzMDg2MCwiZXhwIjoyMDE4NDA2ODYwfQ.9YDEN41__xBFJU91XY9e3r119A03yQ2oq5azmrx1aqY';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function DisplayVianneyActions() {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    async function fetchActions() {
      const { data, error } = await supabase.from("vianney_actions").select();

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }

      setActions(data);
    }

    fetchActions();
  }, []);

  return (
    <ChakraProvider>
      <div>
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
                <Icon as={FaCalendar} boxSize={6} mr={2} />
                <Text margin="2">
                  Starting Date:
                </Text>
                <Text fontWeight="bold">{action.starting_date}</Text>
              </Flex>
              <Flex alignItems="center">
                <Icon as={FaCalendar} boxSize={6} mr={2} />
                <Text margin="2">
                  Ending Date:
                </Text>
                <Text fontWeight="bold">{action.ending_date}</Text>
              </Flex>
              <Flex alignItems="center">
                <Icon as={FaComment} boxSize={6} mr={2} />
                <Text margin="2">
                  Action Comment:
                </Text>
                <Text fontWeight="bold">{action.action_comment}</Text>
              </Flex>              
            </VStack>
          </Alert>
        ))}
      </div>
    </ChakraProvider>
  );
}

export default DisplayVianneyActions;

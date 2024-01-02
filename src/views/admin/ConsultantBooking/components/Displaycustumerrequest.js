import { ChakraProvider, Alert, AlertIcon, Text, Box, Badge, Flex, VStack } from "@chakra-ui/react";
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const supabaseUrl = 'https://pvpsmyizvorwwccuwbuq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2cHNteWl6dm9yd3djY3V3YnVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMjgzMDg2MCwiZXhwIjoyMDE4NDA2ODYwfQ.9YDEN41__xBFJU91XY9e3r119A03yQ2oq5azmrx1aqY';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function DisplayCustomerRequests() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function fetchContacts() {
      const { data, error } = await supabase.from("customer_contacts").select();

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }

      setContacts(data);
    }

    fetchContacts();
  }, []); // Empty dependency array ensures this effect runs once on mount

  return (
    <ChakraProvider>
      <div>
        {contacts.map((contact) => (
          <Alert
            key={contact.id}
            status="info"
            borderRadius="md"
            mb={2} // Add margin at the bottom to separate each item
          >
            <AlertIcon />
            <VStack align="start">
            <Badge colorScheme="teal" fontSize="0.8em">Société: {contact.company_name}</Badge>
              <Flex alignItems="center">
                <Text marginRight="2">Contact:</Text>
                <Text fontWeight="bold">{contact.contact_name}</Text>
              </Flex>
              <Flex alignItems="center">
                <Text marginRight="2">Email:</Text>
                <Text fontWeight="bold">{contact.email}</Text>
              </Flex>
              <Text><strong>Téléphone:</strong> {contact.phone}</Text>
              <Text><strong>Type de Service:</strong> {contact.service_type}</Text>
              <Text><strong>Besoins:</strong> {contact.needs}</Text>
            </VStack>
          </Alert>
        ))}
      </div>
    </ChakraProvider>
  );
}

export default DisplayCustomerRequests;

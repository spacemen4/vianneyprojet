import { ChakraProvider, Alert, AlertIcon, Text, Badge, Flex, VStack } from "@chakra-ui/react";
import { FaUser, FaEnvelope, FaPhone, FaToolbox } from 'react-icons/fa'; // Import the Font Awesome icons
import { useEffect, useState } from 'react';
import supabase from './../../../../supabaseClient';

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
              <FaUser />
                <Text margin="2">
                   Contact:
                </Text>
                <Text fontWeight="bold">{contact.contact_name}</Text>
              </Flex>
              <Flex alignItems="center">
              <FaEnvelope />
                <Text margin="2">
                   Email:
                </Text>
                <Text fontWeight="bold">{contact.email}</Text>
              </Flex>
              <Flex alignItems="center">
              <FaPhone />
                <Text margin="2">
                  Téléphone:
                </Text>
                <Text
                  fontWeight="bold"
                  color="blue.500" // Change the color to your desired style
                  textDecoration="underline" // Add an underline
                >
                  {contact.phone}
                </Text>
              </Flex>
              <Flex alignItems="center">
              <FaToolbox />
                <Text margin="2">
                   Type de Service:
                </Text>
                <Text
                  fontWeight="bold"
                  color="green.500" // Change the color to your desired style
                  fontStyle="italic" // Add italic style
                >
                  {contact.service_type}
                </Text>
              </Flex>
              <Flex alignItems="center">
              <FaToolbox />
                <Text margin="2">
                  Besoins:
                </Text>
                <Text
                  fontWeight="bold"
                  color="purple.500" // Change the color to your desired style
                  textTransform="uppercase" // Convert text to uppercase
                >
                  {contact.needs}
                </Text>
              </Flex>
            </VStack>
          </Alert>
        ))}
      </div>
    </ChakraProvider>
  );
}

export default DisplayCustomerRequests;

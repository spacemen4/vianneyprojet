import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Text,
  Heading,
  Container,
  Button,
  Box,
  Flex,
  VStack,
  Icon
} from "@chakra-ui/react";
import { ArrowBackIcon, StarIcon } from "@chakra-ui/icons"; // Example icon

const gradientTextStyle = {
  bgGradient: "linear(to-r, blue.400, blue.600)",
  bgClip: "text"
};

const FocusRestructuring = ({ onBack }) => (
  <Container maxW="container.xl" p={6}>
    <Button leftIcon={<ArrowBackIcon />} colorScheme="blue" variant="solid" onClick={onBack} mb={6}>
      Back
    </Button>

    <Box bg="gray.100" p={5} borderRadius="md" shadow="md">
      <Heading as="h2" size="xl" sx={gradientTextStyle} mb={4}>Focus Restructuring</Heading>
      <Text fontSize="lg" mb={5}>
        Nous accompagnons nos clients dans la gestion de leurs situations complexes...
      </Text>

      <Heading as="h3" size="lg" sx={gradientTextStyle} mb={4}>Nos réponses à vos problématiques</Heading>
      <Text mb={6}>Vous êtes …</Text>

      <Accordion allowMultiple>
        {['Item 1', 'Item 2', 'Item 3'].map((item, index) => (
          <AccordionItem key={index} mb={4}>
            <AccordionButton bg="blue.100" borderRadius="md">
              <Flex alignItems="center">
                <Icon as={StarIcon} color="blue.500" w={6} h="100%" mr={4} />
                <VStack alignItems="start" spacing={0}>
                  <Heading as="h4" size="md" sx={gradientTextStyle}>{item}</Heading>
                </VStack>
              </Flex>
            </AccordionButton>
            <AccordionPanel pb={4} bg="gray.200" borderRadius="md">
              <Text>Ceci est le contenu de {item}.</Text>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>

      <Heading as="h3" size="lg" sx={gradientTextStyle} mt={6} mb={4}>À chaque problème nous avons la solution</Heading>
      <Text>Prévention des tensions de trésorerie</Text>
    </Box>
  </Container>
);

export default FocusRestructuring;

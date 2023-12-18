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
  Icon
} from "@chakra-ui/react";
import {
  ArrowBackIcon,
  StarIcon,
  CheckCircleIcon,
  TimeIcon,
  WarningIcon,
  QuestionIcon,
  InfoIcon,
  PlusSquareIcon
} from "@chakra-ui/icons";

const gradientTextStyle = {
  bgGradient: "linear(to-r, blue.400, blue.600)",
  bgClip: "text"
};

const accordionData = [
  {
    title: "Une entreprise en tension de cash",
    description: "Description for tension de cash.",
    icon: CheckCircleIcon
  },
  {
    title: "Une entreprise en procédure amiable",
    description: "Description for procédure amiable.",
    icon: TimeIcon
  },
  // ... Add other items here
  {
    title: "Une entreprise mature ou en croissance ayant des difficultés à se financer",
    description: "Description for entreprise mature.",
    icon: PlusSquareIcon
  }
];

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
        {accordionData.map((item, index) => (
          <AccordionItem key={index} mb={4}>
            <AccordionButton bg="blue.100" borderRadius="md">
              <Flex alignItems="center">
                <Icon as={item.icon} color="blue.500" w={6} h="100%" mr={4} />
                <Heading as="h4" size="md" sx={gradientTextStyle}>{item.title}</Heading>
              </Flex>
            </AccordionButton>
            <AccordionPanel pb={4} bg="gray.200" borderRadius="md">
              <Text>{item.description}</Text>
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

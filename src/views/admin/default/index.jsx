import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Divider,
  VStack,
  useColorModeValue
} from "@chakra-ui/react";

const ServiceSection = ({ title, children }) => {
  const bgGradient = useColorModeValue(
    "linear(to-r, blue.200, cyan.200)", // Light mode gradient
    "linear(to-r, blue.600, cyan.600)"  // Dark mode gradient
  );

  return (
    <Box p={5} shadow="md" borderWidth="1px" bgGradient={bgGradient}>
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{children}</Text>
    </Box>
  );
};

const CompanyPresentation = () => {
  const containerBgGradient = useColorModeValue(
    "linear(to-l, blue.300, blue.500)", // Light mode gradient
    "linear(to-l, blue.700, blue.900)"  // Dark mode gradient
  );

  return (
    <Box pt={{ base: "140px", md: "80px", xl: "80px" }} bgGradient={containerBgGradient}>
      <Container maxW="container.xl" py={10} borderRadius="lg" bg="whiteAlpha.800" boxShadow="lg">
        <Heading as="h1" size="2xl" textAlign="center" my={5} color="gray.700">
          Advance Capital
        </Heading>
        <Text fontSize="lg" mb={5} color="gray.600">
          Conseil financier & opérationnel depuis 2007. Accompagnant les entreprises dans leur développement.
        </Text>

        <Divider my={5} />

        <VStack spacing={4} align="stretch">
          <ServiceSection title="Due Diligences financières">
        Conseil à l’acquisition ou à la cession. Une approche détaillée pour assurer une transaction sans heurt.
      </ServiceSection>

      <ServiceSection title="Transformation">
        Reporting, amélioration de la performance opérationnelle et financière, accompagnement en phase de deal.
        <Button size="sm" mt={2}>En savoir +</Button>
      </ServiceSection>

      <ServiceSection title="Restructuring">
        Accompagnement financier et opérationnel de l’entreprise en situation de sous-performance ou de difficultés avérées.
        <Button size="sm" mt={2}>En savoir +</Button>
      </ServiceSection>

      <ServiceSection title="Évaluation">
        Evaluations financières de fonds propres ou d’actifs incorporels (PPA), conseil en instruments juridiques de Management Packages.
      </ServiceSection>
        </VStack>
      </Container>
    </Box>
  );
};

export default CompanyPresentation;

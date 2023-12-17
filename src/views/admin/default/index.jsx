import React, { useState } from "react";
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

const ServiceSection = ({ title, children, onLearnMore }) => {
  const bgGradient = useColorModeValue(
    "linear(to-r, blue.200, cyan.200)", 
    "linear(to-r, blue.600, cyan.600)"  
  );

  return (
    <Box p={5} shadow="md" borderWidth="1px" bgGradient={bgGradient}>
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{children}</Text>
      {onLearnMore && <Button size="sm" mt={2} onClick={onLearnMore}>En savoir +</Button>}
    </Box>
  );
};

const DetailedContent = ({ title, content }) => (
  <Box p={5} shadow="md" borderWidth="1px">
    <Heading fontSize="xl">{title}</Heading>
    <Text mt={4}>{content}</Text>
  </Box>
);

const transformationContent = `Nous accompagnons nos clients dans leurs contextes de transformation avec pour objectif d’optimiser de façon pérenne les résultats opérationnels et financiers. Notre équipe intervient en soutien analytique à la décision et en structuration de projets dans des contextes de croissance ou de tension. [...]`;

const restructuringContent = `Nous accompagnons nos clients dans la gestion de leurs situations complexes de sous-performance ou de difficultés avérées dans le cadre de procédures amiables ou collectives. [...]`;

const CompanyPresentation = () => {
  const [showDetail, setShowDetail] = useState(null);

  const handleLearnMoreTransformation = () => {
    setShowDetail("transformation");
  };

  const handleLearnMoreRestructuring = () => {
    setShowDetail("restructuring");
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Container maxW="container.xl" py={10} borderRadius="lg" bg="whiteAlpha.800" boxShadow="lg">
        <Heading as="h1" size="2xl" textAlign="center" my={5} color="gray.700">
          Advance Capital
        </Heading>
        <Text fontSize="lg" mb={5} color="gray.600">
          Conseil financier & opérationnel depuis 2007. Accompagnant les entreprises dans leur développement.
        </Text>

        <Divider my={5} />

        <VStack spacing={4} align="stretch">
          {showDetail === "transformation" && (
            <DetailedContent 
              title="Focus Transformation"
              content={transformationContent} 
            />
          )}

          {showDetail === "restructuring" && (
            <DetailedContent 
              title="Focus Restructuring"
              content={restructuringContent} 
            />
          )}

          {!showDetail && (
            <>
              <ServiceSection title="Due Diligences financières">
                Conseil à l’acquisition ou à la cession. Une approche détaillée pour assurer une transaction sans heurt.
              </ServiceSection>

              <ServiceSection 
                title="Transformation"
                onLearnMore={handleLearnMoreTransformation}>
                Reporting, amélioration de la performance opérationnelle et financière, accompagnement en phase de deal.
              </ServiceSection>

              <ServiceSection 
                title="Restructuring"
                onLearnMore={handleLearnMoreRestructuring}>
                Accompagnement financier et opérationnel de l’entreprise en situation de sous-performance ou de difficultés avérées.
              </ServiceSection>

              <ServiceSection title="Évaluation">
                Evaluations financières de fonds propres ou d’actifs incorporels (PPA), conseil en instruments juridiques de Management Packages.
              </ServiceSection>
            </>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default CompanyPresentation;

import React from "react";
import {  Text, Heading, Container, Button, VStack } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

const FocusRestructuring = ({ onBack }) => (
  <Container maxW="container.xl">
    <Button leftIcon={<ArrowBackIcon />} colorScheme="blue" onClick={onBack} mb={4}>
      Back
    </Button>

    <Heading as="h2" size="xl" mb={5}>Focus Restructuring</Heading>
    <Text mb={4}>
      Nous accompagnons nos clients dans la gestion de leurs situations complexes de sous-performance ou de difficultés avérées dans le cadre de procédures amiables (mandat ad hoc ou conciliation) ou collectives (redressement judiciaire, sauvegarde ou liquidation judiciaire).
    </Text>

    <Heading as="h3" size="lg" mb={3}>Nos réponses à vos problématiques</Heading>
    <Text mb={4}>Vous êtes …</Text>

    <VStack align="start" spacing={3} mb={5}>
      <Heading as="h4" size="md">Une entreprise en tension de cash</Heading>
      <Text mb={3}>Vous souhaitez être accompagnés pour traiter vos difficultés.</Text>

      <Heading as="h4" size="md">Une entreprise en procédure amiable</Heading>
      <Text mb={3}>Vous souhaitez une assistance externe pour favoriser les négociations avec vos partenaires bancaires, vos fournisseurs et les créanciers publics.</Text>

      <Heading as="h4" size="md">Une entreprise en procédure collective</Heading>
      <Text mb={3}>Vous souhaitez être accompagnés pour le bon déroulement de la période d’observation et l’anticipation du plan de redressement (sauvegarde ou redressement judiciaire).</Text>

      <Heading as="h4" size="md">Un candidat à l’acquisition d’une société en difficulté</Heading>
      <Text mb={3}>Vous sollicitez un expert pour réaliser la due diligence d’acquisition, ou vous avez besoin d’un accompagnement pour définir votre stratégie de reprise et votre business plan.</Text>

      <Heading as="h4" size="md">Un mandataire ad hoc, conciliateur, administrateur judiciaire, mandataire judiciaire, avocat</Heading>
      <Text mb={3}>Vous souhaitez l’appui d’un spécialiste financier pour apporter un éclairage indépendant sur la situation financière de la société, ses perspectives et les options de restructuration envisageables.</Text>

      <Heading as="h4" size="md">Un actionnaire d’une société en difficulté</Heading>
      <Text mb={3}>Vous souhaitez construire une stratégie de retournement ou une stratégie de sortie.</Text>

      <Heading as="h4" size="md">Un créancier</Heading>
      <Text mb={3}>Vous souhaitez un diagnostic stratégique, opérationnel et financier réalisé par un tiers indépendant.</Text>

      <Heading as="h4" size="md">Une entreprise mature ou en croissance ayant des difficultés à se financer</Heading>
      <Text mb={3}>Vous avez besoin de financer votre activité et/ou vos investissements mais vous vous heurtez au refus des financiers traditionnels et souhaitez donc recourir à des financements alternatifs : fiducie, gage sur stocks, reverse factoring, etc.</Text>
    </VStack>

    <Heading as="h3" size="lg" mb={3}>À chaque problème nous avons la solution</Heading>

    {/* Additional content sections */}
    <Text>Prévention des tensions de trésorerie</Text>
    {/* Add more content sections as needed */}
  </Container>
);

export default FocusRestructuring;
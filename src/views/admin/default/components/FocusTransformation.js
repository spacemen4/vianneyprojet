// FocusTransformation.js
import React from "react";
import { Box, Text, Heading, Container, Button } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

const FocusTransformation = ({ onBack }) => (
  <Container maxW="container.xl">
    <Button leftIcon={<ArrowBackIcon />} colorScheme="blue" onClick={onBack} mb={4}>
      Back
    </Button>
    <Heading as="h2" size="xl">Focus Transformation</Heading>
    {/* Add content for the Focus Transformation page here */}
  </Container>
);

export default FocusTransformation;
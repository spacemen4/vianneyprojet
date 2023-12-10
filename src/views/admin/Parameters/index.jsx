// src/views/admin/Parameters/index.jsx
import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import ParametersDocuments from './components/ParametersDocuments';
import ParametersEvents from './components/ParametersEvents';

const Parameters = () => {
  return (
    <Box p={5}>
      <Heading mb={5}>Admin Parameters</Heading>
      <ParametersDocuments />
      <ParametersEvents />
    </Box>
  );
};

export default Parameters;

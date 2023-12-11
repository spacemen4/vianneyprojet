// src/views/admin/Parameters/index.jsx
import React, { useState } from 'react';
import { Box, Heading, Button } from '@chakra-ui/react';
import ParametersDocuments from './components/ParametersDocuments';
import ParametersEventAndCharacteristics from './components/ParametersEventAndCharacteristics';

const Parameters = () => {
  const [showEventAndCharacteristics, setShowEventAndCharacteristics] = useState(false);

  const handleButtonClick = () => {
    setShowEventAndCharacteristics(true);
  };

  return (
    <Box p={5}>
      <Heading mb={5}>Admin Parameters</Heading>
      {
        showEventAndCharacteristics ?
        <ParametersEventAndCharacteristics /> :
        <ParametersDocuments onEventAndCharacteristicsClick={handleButtonClick} />
      }
    </Box>
  );
};

export default Parameters;

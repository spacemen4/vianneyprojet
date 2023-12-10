import React from 'react';
import { Box, Text, Button, useColorModeValue } from '@chakra-ui/react';
import { FcAdvertising } from "react-icons/fc";

const ParametersDocuments = () => {
  const brandColor = useColorModeValue("brand.500", "white");
  const buttonBg = useColorModeValue("white", "gray.800");
  const buttonTextColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Box border='1px' borderColor='gray.200' p={5} mb={5}>
      <Text fontSize='xl' mb={4}>Documents Settings</Text>
      
      <Button
        leftIcon={<FcAdvertising size='32px' color={brandColor} />}
        bg={buttonBg}
        color={buttonTextColor}
        h='100px'
      >
        Add Document
      </Button>
      
      {/* Add more content here */}
    </Box>
  );
};

export default ParametersDocuments;

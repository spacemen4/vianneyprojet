// src/views/admin/Parameters/components/ParametersDocuments.js
import React from 'react';
import { Box, Text, Button, useColorModeValue } from '@chakra-ui/react';
import { FcAdvertising } from "react-icons/fc";
import IconBox from "components/icons/IconBox"; // Ensure the path is correct

const ParametersDocuments = () => {
  // Using useColorModeValue to match the color scheme
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const buttonTextColor = useColorModeValue("secondaryGray.900", "white");
  const buttonBg = useColorModeValue("white", "gray.800"); // Explicitly setting button background color

  return (
    <Box border='1px' borderColor='gray.200' p={5} mb={5}>
      <Text fontSize='xl' mb={4}>Documents Settings</Text>
      
      <Button
        leftIcon={
          <IconBox
            w='56px' // Width of icon box
            h='56px' // Height of icon box
            bg={boxBg}
            borderRadius='50%'
          >
            <FcAdvertising size='32px' color={brandColor} z-index={100} />
          </IconBox>
        }
        bg={buttonBg} // Set the button background color
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

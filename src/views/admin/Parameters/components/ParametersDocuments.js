import React from 'react';
import { Box, Text, Button, useColorModeValue } from '@chakra-ui/react';
import { FcAdvertising, FcGlobe, FcBusinessman, FcDepartment, FcCalendar } from "react-icons/fc";

const ParametersDocuments = () => {
  const brandColor = useColorModeValue("brand.500", "white");
  const buttonBg = useColorModeValue("white", "gray.800");
  const buttonTextColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Box border='1px' borderColor='gray.200' p={5} mb={5}>
      <Text fontSize='xl' mb={4}>Evènements</Text>
      
      <Button
        leftIcon={<FcAdvertising size='32px' color={brandColor} />}
        bg={buttonBg}
        color={buttonTextColor}
        h='100px'
        mb={4}
      >
        Evènement et caractéristiques
      </Button>
      
      <Button
        leftIcon={<FcGlobe size='32px' color={brandColor} />}
        bg={buttonBg}
        color={buttonTextColor}
        h='100px'
        mb={4}
      >
        Géolocalisation
      </Button>

      <Button
        leftIcon={<FcBusinessman size='32px' color={brandColor} />}
        bg={buttonBg}
        color={buttonTextColor}
        h='100px'
        mb={4}
      >
        Personnels
      </Button>

      <Button
        leftIcon={<FcDepartment size='32px' color={brandColor} />}
        bg={buttonBg}
        color={buttonTextColor}
        h='100px'
        mb={4}
      >
        Salle de crise
      </Button>

      <Button
        leftIcon={<FcCalendar size='32px' color={brandColor} />}
        bg={buttonBg}
        color={buttonTextColor}
        h='100px'
        mb={4}
      >
        Emploi du temps
      </Button>

      {/* Add more content here */}
    </Box>
  );
};

export default ParametersDocuments;

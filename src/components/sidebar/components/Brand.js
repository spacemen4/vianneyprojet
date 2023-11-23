import React from "react";

// Chakra imports
import { Flex, useColorModeValue, Image } from "@chakra-ui/react";

// Custom components
import { HSeparator } from "components/separator/Separator";

// Importing the image
import logoSecu from 'components/icons/logosecu.png'; // Adjust the path if necessary

export function SidebarBrand() {
  // Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      <Image 
        src={logoSecu}
        h='26px' 
        w='175px' 
        my='32px'
        alt='Logo' // Provide an alt description for accessibility
      />
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;

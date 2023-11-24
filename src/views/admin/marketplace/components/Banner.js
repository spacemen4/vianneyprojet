import React from "react";

// Chakra imports
import { Flex, Text } from "@chakra-ui/react";

export default function Banner() {
  // Chakra Color Mode
  return (
    <Flex
      direction="column"
      bgGradient="linear(to-r, blue.200, blue.500, blue.800)" // Gradient from light blue to dark blue
      py={{ base: "5px", md: "10px" }}
      px={{ base: "30px", md: "64px" }}
      borderRadius="30px">
      <Text
        fontSize={{ base: "24px", md: "34px" }}
        color="white"
        mb="5px"
        maxW={{
          base: "100%",
          md: "64%",
          lg: "46%",
          xl: "70%",
          "2xl": "50%",
          "3xl": "42%",
        }}
        fontWeight="700"
        lineHeight={{ base: "32px", md: "42px" }}>
        Carte de l'évênement
      </Text>
      <Text
        fontSize="md"
        color="#E3DAFF"
        maxW={{
          base: "100%",
          md: "64%",
          lg: "40%",
          xl: "56%",
          "2xl": "46%",
          "3xl": "34%",
        }}
        fontWeight="500"
        mb="10px"
        lineHeight="28px">
        Zoomez pour voir les détails
      </Text>
    </Flex>
  );
}

import { FcAdvertising } from "react-icons/fc";
// Chakra imports
import {
  Flex,
  Stat,
  StatNumber,
  useColorModeValue,
  // import other required components
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
// Custom icons
import React from "react";

export default function Default(props) {
  const {  event_name } = props;
  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Card py='15px'>
      <Flex
        my='auto'
        h='100%'
        align={{ base: "center", xl: "start" }}
        justify={{ base: "center", xl: "center" }}>
        {/* Replace existing icon with FcAdvertising icon */}
        <FcAdvertising size="3em" />

        <Stat my='auto' ms="10px" >

          <StatNumber
            color={textColor}
            fontSize={{
              base: "xl",
            }}>
            {event_name}
          </StatNumber>
          
        </Stat>
      </Flex>
    </Card>
  );
}

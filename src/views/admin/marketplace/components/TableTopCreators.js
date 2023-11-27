import {
  Button,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import EquipiersTable from "./EquipiersTable";

function TopCreatorTable(props) {

  const textColor = useColorModeValue("navy.700", "white");

  return (
    <>
      <Flex
        direction='column'
        w='100%'
        overflowX={{ sm: "scroll", lg: "hidden" }}>
        <Flex
          align={{ sm: "flex-start", lg: "center" }}
          justify='space-between'
          w='100%'
          px='22px'
          pb='20px'
          mb='10px'
          boxShadow='0px 40px 58px -20px rgba(112, 144, 176, 0.26)'>
          <Text color={textColor} fontSize='xl' fontWeight='600'>
            Les équipiers en interventions
          </Text>
          <Button variant='action'>Les voir tous</Button>
        </Flex>
        <EquipiersTable/>
      </Flex>
    </>
  );
}

export default TopCreatorTable;

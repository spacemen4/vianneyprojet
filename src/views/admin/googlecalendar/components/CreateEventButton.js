import React, { useContext } from "react";
import { FcPlus } from "react-icons/fc";
import GlobalContext from "../context/GlobalContext";
import { Button, Icon, Text } from "@chakra-ui/react";

export default function CreateEventButton() {
  const { setShowEventModal } = useContext(GlobalContext);

  return (
    <Button
      onClick={() => setShowEventModal(true)}
      p={2}
      borderRadius="full"
      display="flex"
      alignItems="center"
      boxShadow="md"
      _hover={{ boxShadow: "2xl" }}
    >
      <Icon as={FcPlus} w={7} h={7} />
      <Text pl={3} pr={7}>Créer</Text>
    </Button>
  );
}

// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import MyCalendar from "views/admin/dataTables/components/MyCalendar";
import React from "react";
import VianneyAlertChat from "./components/VianneyAlertChat";
import CreateTeam from "./components/CreateTeam";
import TeamSchedule from "./components/TeamSchedule";
import MyScheduler from "./components/MyScheduler";

export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: "20px", xl: "20px" }}>
        <MyCalendar />
        <VianneyAlertChat />
        
      </SimpleGrid>
      <CreateTeam/>
      <TeamSchedule/>
      <MyScheduler/>
    </Box>
  );
}

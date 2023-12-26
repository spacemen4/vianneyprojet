import React from "react";
import SmallCalendar from "./SmallCalendar";
import Labels from "./Labels";
import { Box } from "@chakra-ui/react";
export default function Sidebar() {
  return (
    <Box>

      <SmallCalendar />
      <Labels />
    </Box>
  );
}

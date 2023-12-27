import React, { useState, useContext, useEffect } from "react";
import { getMonth } from "./util";
import { ChakraProvider, Flex, Box } from "@chakra-ui/react";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import CreateEventButton from "./components/CreateEventButton";
import ModifyEventForm from "./components/ModifyEventForm";
import ModifyActionButton from "./components/ModifyActionButton";

function App() {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal, selectedEvent } = useContext(GlobalContext); // Add selectedEvent state
  const [showModifyForm, setShowModifyForm] = useState(false); // Add state to control modification form display
  dayjs.locale('fr');


  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <ChakraProvider>
      {showEventModal && !showModifyForm && <EventModal />}
      {showModifyForm && <ModifyEventForm eventUUID={selectedEvent} setShowModifyForm={setShowModifyForm} />}
      <Flex direction="column" height="100vh">
        <CalendarHeader />
        
        <Flex
          className="main-container"
          flex={1}
          direction={["column", "row"]}
        >
          <Box
            className="sidebar"
            width={["full", "350px"]}
          >
            <CreateEventButton />        
            <ModifyActionButton/>
            <Box display={["none", "block"]}>
              <Sidebar />
            </Box>
          </Box>
          <Month month={currenMonth} setShowModifyForm={setShowModifyForm} />
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
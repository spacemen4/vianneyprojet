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
import ModifyActionButton from "./components/ModifyActionButton";
import ModifyActionButtonBis from "./components/ModifyActionButtonBis";

function App() {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext); // Add selectedEvent state
  const [showModifyForm, setShowModifyForm] = useState(false); 
  const [selectedActionData, setSelectedActionData] = useState(null);
  dayjs.locale('fr');
  const modifyActionButtonStyle = {
    display: 'none', // This style will hide the button
  };
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <ChakraProvider>
      {showEventModal && !showModifyForm && <EventModal />}
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
            <Flex alignItems="center">
              <CreateEventButton />
              <div style={modifyActionButtonStyle}>
                <ModifyActionButton initialActionData={selectedActionData} />
              </div>
              <ModifyActionButtonBis/>
            </Flex>
            <Box display={["none", "block"]}>
              <Sidebar />
            </Box>
          </Box>
          <Month
            month={currenMonth}
            setShowModifyForm={setShowModifyForm}
            setSelectedAction={setSelectedActionData} // Pass the callback down
          />
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
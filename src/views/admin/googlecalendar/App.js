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

function App() {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);
  dayjs.locale('fr');

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <ChakraProvider>
      {showEventModal && <EventModal />}
      <Flex direction="column" height="100vh">
        <CalendarHeader />
        <Flex
          className="main-container"
          flex={1}
          direction={["column", "row"]}
        >
          <Box
            className="sidebar"
            display={["none", "block"]}
            width={["full", "350px"]}
          >
            <Sidebar />
          </Box>
          <Month month={currenMonth} />
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
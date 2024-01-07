import React, { useState, useContext, useEffect } from "react";
import SmallCalendar from "./components/SmallCalendar";
import { getMonth } from "./util";
import { ChakraProvider, VStack, Tooltip, Grid, Button, Icon, Text, Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalCloseButton, ModalBody, Input, FormErrorMessage, FormHelperText,
  Box, useToast, Badge, Heading, Flex, Checkbox, FormControl, } from "@chakra-ui/react";
import CalendarHeader from "./components/CalendarHeader";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";
import dayjs from 'dayjs';
import isBetween from "dayjs/plugin/isBetween";
import 'dayjs/locale/fr';
import CreateEventButton from "./components/CreateEventButton";
import { createClient } from '@supabase/supabase-js';
import ModifyActionBis from "./components/ModifyActionBis";
import { FaEdit } from 'react-icons/fa';

dayjs.locale('fr');
dayjs.extend(isBetween);
const supabaseUrl = 'https://pvpsmyizvorwwccuwbuq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2cHNteWl6dm9yd3djY3V3YnVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMjgzMDg2MCwiZXhwIjoyMDE4NDA2ODYwfQ.9YDEN41__xBFJU91XY9e3r119A03yQ2oq5azmrx1aqY';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const formatDate = (date) => {
  return dayjs(date).format('DD/MM/YYYY');
}

const formatTooltipContent = (event) => {
  return (
    <VStack align="left" spacing={1}>
      <Text>Intervenant: {event.nom || 'N/A'} {event.prenom || 'N/A'}</Text>
      <Text>Disponible pour: {event.action_name}</Text>
      <Text>Du: {formatDate(event.starting_date)} au {formatDate(event.ending_date)}</Text>
      <Text>Commentaire: {event.action_comment || 'N/A'}</Text>
      <Text>Dernière mise à jour: {formatDate(event.last_updated)}</Text>
    </VStack>
  );
};

const ModifyAction = ({ initialActionData }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [teamData, setTeamData] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [action, setAction] = useState({
      actionId: '',
      actionName: '',
      startingDate: '',
      endingDate: '',
      actionComment: '',
      teamName: '',
  });
  const toast = useToast();
  const supabaseUrl = 'https://pvpsmyizvorwwccuwbuq.supabase.co';
  const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2cHNteWl6dm9yd3djY3V3YnVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMjgzMDg2MCwiZXhwIjoyMDE4NDA2ODYwfQ.9YDEN41__xBFJU91XY9e3r119A03yQ2oq5azmrx1aqY';
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  useEffect(() => {
      console.log("Initial Action Data:", initialActionData); // Log to check the structure
      if (initialActionData) {
          setAction({
              actionId: initialActionData.action_id,
              actionName: initialActionData.action_name,
              startingDate: initialActionData.starting_date,
              endingDate: initialActionData.ending_date,
              actionComment: initialActionData.action_comment,
              reservedAction: initialActionData.reserved_action,
              nameOfTheClientThatReservedIt: initialActionData.name_of_the_client_that_reserved_it,
              teamName: '',
          });
          setModalOpen(true);
      }
  }, [initialActionData]);

  useEffect(() => {
      // Fetch team data from the view
      const fetchTeamData = async () => {
          try {
              const { data, error } = await supabase
                  .from('team_member_view')
                  .select('team_nom, team_prenom')
                  .eq('action_id', action.actionId); // Filter by action ID

              if (error) {
                  console.error('Error fetching team data:', error);
              } else if (data && data.length > 0) {
                  // Store the team data in state
                  setTeamData(data[0]);
              }
          } catch (error) {
              console.error('An error occurred while fetching team data:', error);
          }
      };

      // Call the fetchTeamData function
      fetchTeamData();
  }, [action.actionId, supabase]);

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setAction({ ...action, [name]: value });
  };
  const handleReservedActionChange = (e) => {
      const { checked } = e.target;
      setAction({ ...action, reservedAction: checked });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      // Check if the required fields are empty
      if (!action.reservedAction || action.nameOfTheClientThatReservedIt.trim() === '') {
          setFormErrors({
              reservedAction: !action.reservedAction,
              nameOfTheClientThatReservedIt: action.nameOfTheClientThatReservedIt.trim() === '',
          });
          return; // Don't submit the form if there are validation errors
      }

      // Clear any previous form errors
      setFormErrors({});

      console.log('Updating action with ID:', action.actionId);

      const updatedAction = {
          id: action.actionId,
          action_name: action.actionName,
          starting_date: action.startingDate,
          ending_date: action.endingDate,
          action_comment: action.actionComment,
          reserved_action: action.reservedAction,
          name_of_the_client_that_reserved_it: action.nameOfTheClientThatReservedIt,
      };

      try {
          const { error } = await supabase
              .from('vianney_actions')
              .update(updatedAction)
              .eq('id', action.actionId); // Ensure actionId is correctly set

          if (error) {
              toast({
                  title: "Erreur",
                  description: "Une erreur s'est produite lors de la mise à jour de l'action.",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
              });
          } else {
              toast({
                  title: "Succès",
                  description: "L'action a été mise à jour avec succès.",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
              });
          }
      } catch (error) {
          console.error('An error occurred while updating action:', error);
      }
  };

  return (
      <div>
          <Button
              onClick={() => setModalOpen(true)}
              p={1}
              borderRadius="full"
              display="flex"
              alignItems="center"
              boxShadow="md"
              _hover={{ boxShadow: "2xl" }}
          >
              <Icon as={FaEdit} w={7} h={7} />
              <Text pl={3} pr={7}>Modifier</Text>
          </Button>

          {isModalOpen && (
              <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                  <ModalOverlay />
                  <ModalContent>
                      <ModalHeader>Modifier l'action</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                          {/* Form elements here */}
                          <Box>
                              {teamData && (
                                  <Flex alignItems="center" mb="2">
                                      <Badge
                                          bgColor="lightblue"
                                          color="black"
                                          p="2"
                                          borderRadius={5}
                                      >
                                          Consultant : {teamData.team_nom} {teamData.team_prenom}
                                      </Badge>
                                  </Flex>
                              )}
                              <form onSubmit={handleSubmit}>
                                  <FormControl isRequired>
                                      <Flex p="2" mb="2" alignItems="center">
                                          <Box flex="1">
                                              <Heading size="sm">Nom de l'action</Heading>
                                          </Box>
                                          <Box flex="2" ml="2">
                                              <Text>{action.actionName}</Text>
                                          </Box>
                                      </Flex>
                                      <Flex p="2" mb="2" alignItems="center">
                                          <Box flex="1">
                                              <Heading size="sm">Date de début</Heading>
                                          </Box>
                                          <Box flex="2" ml="2">
                                              <Text>
                                                  {new Date(action.startingDate).toLocaleDateString('fr-FR', {
                                                      year: 'numeric',
                                                      month: 'long',
                                                      day: 'numeric',
                                                      hour: 'numeric',
                                                      minute: 'numeric',
                                                      second: 'numeric',
                                                  })}
                                              </Text>
                                          </Box>
                                      </Flex>
                                      <Flex p="2" mb="2" alignItems="center">
                                          <Box flex="1">
                                              <Heading size="sm">Date de fin</Heading>
                                          </Box>
                                          <Box flex="2" ml="2">
                                              <Text>
                                                  {new Date(action.endingDate).toLocaleDateString('fr-FR', {
                                                      year: 'numeric',
                                                      month: 'long',
                                                      day: 'numeric',
                                                      hour: 'numeric',
                                                      minute: 'numeric',
                                                      second: 'numeric',
                                                  })}
                                              </Text>
                                          </Box>
                                      </Flex>
                                      <Flex p="2" mb="2" alignItems="center">
                                          <Box flex="1">
                                              <Heading size="sm">Commentaire</Heading>
                                          </Box>
                                          <Box flex="2" ml="2">
                                              <Text>{action.actionComment}</Text>
                                          </Box>
                                      </Flex>
                                  </FormControl>
                                  {/* Add input fields for reserved_action and name_of_the_client_that_reserved_it */}
                                  <FormControl isRequired>
                                      <Flex p="2" mb="2" alignItems="center">
                                          <Box flex="1">
                                              <Heading size="sm">Action réservée</Heading>
                                          </Box>
                                          <Checkbox
                                              name="reservedAction"
                                              checked={action.reservedAction}
                                              onChange={handleReservedActionChange}
                                          />
                                          {formErrors.reservedAction && (
                                              <Text color="red">Action réservée est requise</Text>
                                          )}
                                          <FormHelperText ml="2">Cochez si l'action est réservée.</FormHelperText>
                                      </Flex>
                                  </FormControl>
                                  <FormControl isRequired>
                                      <Flex p="2" mb="2" alignItems="center">
                                          <Box flex="1">
                                              <Heading size="sm">Nom du client qui l'a réservée</Heading>
                                          </Box>
                                          <Box flex="2" ml="2">
                                              <Input
                                                  type="text"
                                                  name="nameOfTheClientThatReservedIt"
                                                  value={action.nameOfTheClientThatReservedIt}
                                                  onChange={handleInputChange}
                                              />
                                              {formErrors.nameOfTheClientThatReservedIt && (
                                                  <Text color="red">Nom du client qui l'a réservée est requis</Text>
                                              )}
                                              <FormHelperText ml="2">Entrez le nom du client qui a réservé l'action.</FormHelperText>
                                          </Box>
                                      </Flex>
                                  </FormControl>
                                  <Button
                                      m="10px"
                                      colorScheme="blue"
                                      type="submit"
                                      isDisabled={!action.reservedAction || (action.nameOfTheClientThatReservedIt === undefined || action.nameOfTheClientThatReservedIt.trim() === '')}
                                  >
                                      Modifier l'action
                                  </Button>

                                  {Object.values(formErrors).some(Boolean) && (
                                      <FormErrorMessage color="red">Tous les champs requis doivent être remplis.</FormErrorMessage>
                                  )}
                              </form>
                          </Box>
                      </ModalBody>
                  </ModalContent>
              </Modal>
          )}
      </div>
  );
};

const App = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);
  const [showModifyForm] = useState(false);
  const [selectedActionData, setSelectedActionData] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const { setDaySelected, setShowEventModal, setSelectedEvent } = useContext(GlobalContext);
  const [ModifyActionModalOpen, setModifyActionModalOpen] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const handleCheckboxChange = (index) => {
    const updatedSelectedTeams = [...selectedTeams];
    updatedSelectedTeams[index] = !updatedSelectedTeams[index];
    setSelectedTeams(updatedSelectedTeams);
    console.log('Updated Selected Teams:', updatedSelectedTeams); // Debugging line
  };


  const modifyActionButtonStyle = {
    display: 'none', // This style will hide the button
  };
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);
  useEffect(() => {
    if (selectedAction) {
      setSelectedActionData(selectedAction);
      setModifyActionModalOpen(true);
    }
  }, [selectedAction, ModifyActionModalOpen]);

  useEffect(() => {
    // Fetch data from Supabase when the component mounts
    async function fetchTeamMembers() {
      const { data, error } = await supabase.from("vianney_teams").select("*");
  
      if (error) {
        console.error("Error fetching team members:", error.message);
        return;
      }
  
      // Store the team members in state
      setTeamMembers(data);
  
      // Initialize the selectedTeams array with true values for each team
      setSelectedTeams(Array(data.length).fill(true));
    }
  
    fetchTeamMembers();
  }, []);
  

  const DayComponent = ({ day, rowIdx, teamMembers }) => {
    const [dayEvents, setDayEvents] = useState([]);
    const isTeamSelected = (event) => {
      const teamIndex = teamMembers.findIndex(member => member.id === event.team_id);
      return teamIndex !== -1 && selectedTeams[teamIndex];
    };

    useEffect(() => {
      const fetchActions = async () => {
        try {
          const { data, error } = await supabase
            .from('team_action_view_rendering')
            .select('*');
          if (error) {
            console.error('Error fetching actions:', error);
          } else {
            const actionsForDay = data.filter(action =>
              dayjs(day).isBetween(
                dayjs(action.starting_date).subtract(1, 'day'),
                dayjs(action.ending_date),
                null,
                '[]'
              )
            );
            setDayEvents(actionsForDay); // Set actions for the specific day
          }
        } catch (error) {
          console.error('Error fetching actions:', error);
        }
      };

      fetchActions();
    }, [day]); // Dependency only on day

    function getCurrentDayClass() {
      return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
        ? { bg: "blue.600", color: "white", borderRadius: "full", w: "7" }
        : {};
    }

    return (
      <Box border="1px" borderColor="gray.200" flexDir="column" display="flex">
        <Flex flexDir="column" alignItems="center">
          {rowIdx === 0 && (
            <Text fontSize="sm" mt={1}>
              {day.format("ddd").toUpperCase()}
            </Text>
          )}
          <Text
            fontSize="sm"
            p={1}
            my={1}
            textAlign="center"
            {...getCurrentDayClass()}
          >
            {day.format("DD")}
          </Text>
        </Flex>
        <Flex
          flexDir="column"
          flex={1}
          cursor="pointer"
          onClick={() => {
            setDaySelected(day);
            setShowEventModal(true);
          }}
        >
          {dayEvents.map((event, idx) => (
            <Tooltip
              key={idx}
              label={formatTooltipContent(event)}
              fontSize="sm"
              placement="right"
              hasArrow
              color={isTeamSelected(event) ? "white" : "transparent"}
              bg={isTeamSelected(event) ? event.color || 'gray.200' : 'transparent'}
            >
              <Badge
                onClick={(e) => {
                  e.stopPropagation();
                  setDaySelected(day);
                  setSelectedEvent(event.id);
                  setSelectedAction(event);
                }}
                bg={isTeamSelected(event) ? event.color || 'gray.200' : 'transparent'} // Background color based on team selection
                p={1}
                color={isTeamSelected(event) ? "gray.600" : "transparent"} // Text color based on team selection
                fontSize="sm"
                borderRadius="md"
                mb={1}
                width="100%"
                textAlign="center" // Align text to the center
                isTruncated
              >
                {event.action_name}
              </Badge>
            </Tooltip>
          ))}
        </Flex>
      </Box>
    );
  };


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
              <Box mr="20px">
                <CreateEventButton />
              </Box>
              <div style={modifyActionButtonStyle}>
                <ModifyAction initialActionData={selectedActionData} />
                
              </div>
              <ModifyActionBis />
            </Flex>
            <Box display={["none", "block"]}>
              <SmallCalendar />
              <Text fontSize="xl" fontWeight="bold">Trier par consultant:</Text>
              <ul>
                {teamMembers.map((member, index) => (
                  <li key={index}>
                    <Flex alignItems="center">
                      <Checkbox
                        onChange={() => handleCheckboxChange(index)}
                        isChecked={selectedTeams[index]}
                      />
                      <Badge marginLeft="2" color={member.color || "blue"}>{`${member.nom} ${member.prenom}`}</Badge>
                    </Flex>
                  </li>
                ))}
              </ul>
            </Box>
          </Box>
          <Grid flex="1" templateColumns="repeat(7, 1fr)" templateRows="repeat(5, 1fr)" p={1}>
            {currentMonth.map((row, i) => (
              <React.Fragment key={i}>
                {row.map((day, idx) => (
                  <DayComponent
                    day={day}
                    rowIdx={i}
                    key={idx}
                    setSelectedAction={setSelectedAction}
                    selectedTeams={selectedTeams} // Add this line
                    teamMembers={teamMembers} // Add this line
                  />
                ))}
              </React.Fragment>
            ))}
          </Grid>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}

export default App;

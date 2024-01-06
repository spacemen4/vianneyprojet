import React, { useState, useEffect } from 'react';
import { FormControl, FormLabel, Input, Textarea, Button, Box, Select, Text } from '@chakra-ui/react';
import supabase from './../../../../supabaseClient'


const ModifyActionComponentBis = ({ actionData }) => {
  const [action, setAction] = useState({
    actionId: '', // Store the selected action ID
    actionName: '',
    startingDate: '',
    endingDate: '',
    actionComment: '',
    teamName: '', // Store the team name
  });

  const [existingActions, setExistingActions] = useState([]);

  useEffect(() => {
    if (actionData) {
      setAction({
        actionId: actionData.id, // Make sure the property names match with what you pass
        actionName: actionData.action_name,
        startingDate: actionData.starting_date,
        endingDate: actionData.ending_date,
        actionComment: actionData.action_comment,
        teamName: '', // Initialize team name as empty, fetch it later if needed
      });
    }

    // Fetch existing actions when the component mounts
    const fetchExistingActions = async () => {
      try {
        const { data, error } = await supabase.from('vianney_actions').select('id, action_name');
        if (error) {
          console.error('Error fetching existing actions:', error);
        } else {
          setExistingActions(data);
        }
      } catch (error) {
        console.error('An error occurred while fetching existing actions:', error);
      }
    };

    fetchExistingActions();
  }, [actionData]);

  const handleActionSelect = async (selectedActionId) => {
    try {
      const { data: actionData, error: actionError } = await supabase
        .from('vianney_actions')
        .select('*')
        .eq('id', selectedActionId)
        .single();

      if (actionError) {
        console.error('Error fetching action data:', actionError);
      } else {
        // Update the action state with the selected action data
        setAction({
          ...action,
          actionId: selectedActionId,
          actionName: actionData.action_name,
          startingDate: actionData.starting_date,
          endingDate: actionData.ending_date,
          actionComment: actionData.action_comment,
        });

        // Fetch the associated team name
        const { data: teamData, error: teamError } = await supabase
          .from('vianney_teams')
          .select('nom')
          .eq('id', actionData.team_to_which_its_attached)
          .single();

        if (teamError) {
          console.error('Error fetching team name:', teamError);
        } else {
          // Update the team name in the state
          setAction({
            ...action,
            teamName: teamData.nom,
          });
        }
      }
    } catch (error) {
      console.error('An error occurred while fetching action data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAction({
      ...action,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedAction = {
      action_name: action.actionName,
      starting_date: action.startingDate,
      ending_date: action.endingDate,
      action_comment: action.actionComment,
    };

    try {
      const { error } = await supabase
        .from('vianney_actions')
        .update(updatedAction)
        .eq('id', action.actionId);

      if (error) {
        console.error('Error updating action:', error);
      } else {
        console.log('Action updated successfully');
        // Handle success, e.g., close the modal or display a success message
      }
    } catch (error) {
      console.error('An error occurred while updating action:', error);
    }
  };

  return (
    <Box>
        <Select
        placeholder="Sélectionner une action"
        onChange={(e) => handleActionSelect(e.target.value)}
        value={action.actionId}
      >
        {existingActions.map((existingAction) => (
          <option key={existingAction.id} value={existingAction.id}>
            {existingAction.action_name}
          </option>
        ))}
      </Select>
      {action.teamName && <Text>Nom de l'équipe : {action.teamName}</Text>}
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Nom de l'action</FormLabel>
          <Input
            type="text"
            name="actionName"
            value={action.actionName}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Date de début</FormLabel>
          <Input
            type="datetime-local"
            name="startingDate"
            value={action.startingDate}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Date de fin</FormLabel>
          <Input
            type="datetime-local"
            name="endingDate"
            value={action.endingDate}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Commentaire</FormLabel>
          <Textarea
            name="actionComment"
            value={action.actionComment}
            onChange={handleInputChange}
          />
        </FormControl>
        <Button colorScheme="blue" type="submit">
          Modifier l'action
        </Button>
      </form>
    </Box>
  );
};

export default ModifyActionComponentBis;

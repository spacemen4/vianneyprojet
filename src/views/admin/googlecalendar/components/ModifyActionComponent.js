import React, { useState, useEffect } from 'react';
import { FormControl, FormLabel, Input, Textarea, Button, Box, Select } from '@chakra-ui/react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pvpsmyizvorwwccuwbuq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2cHNteWl6dm9yd3djY3V3YnVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMjgzMDg2MCwiZXhwIjoyMDE4NDA2ODYwfQ.9YDEN41__xBFJU91XY9e3r119A03yQ2oq5azmrx1aqY';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ModifyActionComponent = () => {
  const [action, setAction] = useState({
    actionId: '', // Store the selected action ID
    actionName: '',
    startingDate: '',
    endingDate: '',
    actionComment: '',
  });

  const [existingActions, setExistingActions] = useState([]);

  useEffect(() => {
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
  }, []);

  const handleActionSelect = async (selectedActionId) => {
    try {
      const { data, error } = await supabase
        .from('vianney_actions')
        .select('*')
        .eq('id', selectedActionId)
        .single();

      if (error) {
        console.error('Error fetching action data:', error);
      } else {
        // Update the action state with the selected action data
        setAction({
          ...action,
          actionId: selectedActionId,
          actionName: data.action_name,
          startingDate: data.starting_date,
          endingDate: data.ending_date,
          actionComment: data.action_comment,
        });
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

export default ModifyActionComponent;

import React, { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

const supabaseUrl = 'https://pvpsmyizvorwwccuwbuq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2cHNteWl6dm9yd3djY3V3YnVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMjgzMDg2MCwiZXhwIjoyMDE4NDA2ODYwfQ.9YDEN41__xBFJU91XY9e3r119A03yQ2oq5azmrx1aqY';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ModifyEventForm = ({ eventUUID, setShowModifyForm }) => {
  const [eventData, setEventData] = useState({
    actionName: "",
    startingDate: "",
    endingDate: "",
    actionComment: "",
  });

  useEffect(() => {
    // Fetch event data based on eventUUID
    const fetchEventData = async () => {
      const { data, error } = await supabase
        .from('vianney_actions')
        .select('*')
        .match({ id: eventUUID });

      if (error) {
        console.error('Error fetching event data:', error);
      } else if (data.length === 1) {
        // Update state with event data
        const event = data[0];
        setEventData({
          actionName: event.action_name || "",
          startingDate: event.starting_date || "",
          endingDate: event.ending_date || "",
          actionComment: event.action_comment || "",
        });
      }
    };

    fetchEventData();
  }, [eventUUID]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Update the event in the database with new data
    const { actionName, startingDate, endingDate, actionComment } = eventData;
    const result = await supabase
      .from('vianney_actions')
      .update({
        action_name: actionName,
        starting_date: startingDate,
        ending_date: endingDate,
        action_comment: actionComment,
      })
      .match({ id: eventUUID });

    if (result.error) {
      console.error('Error updating event:', result.error);
      // Handle error
    } else {
      // Event updated successfully
      setShowModifyForm(false); // Close the modification form
      // You can add additional handling here (e.g., displaying a success message)
    }
  };

  return (
    <Modal isOpen={true} onClose={() => setShowModifyForm(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modify Event</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleFormSubmit}>
          <ModalBody>
            <FormControl>
              <FormLabel>Action Name</FormLabel>
              <Input
                type="text"
                value={eventData.actionName}
                onChange={(e) =>
                  setEventData({ ...eventData, actionName: e.target.value })
                }
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Starting Date</FormLabel>
              <Input
                type="datetime-local"
                value={eventData.startingDate}
                onChange={(e) =>
                  setEventData({ ...eventData, startingDate: e.target.value })
                }
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Ending Date</FormLabel>
              <Input
                type="datetime-local"
                value={eventData.endingDate}
                onChange={(e) =>
                  setEventData({ ...eventData, endingDate: e.target.value })
                }
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Action Comment</FormLabel>
              <Textarea
                value={eventData.actionComment}
                onChange={(e) =>
                  setEventData({ ...eventData, actionComment: e.target.value })
                }
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Save Changes
            </Button>
            <Button variant="ghost" onClick={() => setShowModifyForm(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ModifyEventForm;

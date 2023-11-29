import React, { useState, useEffect } from 'react';
import { Box, Input, Button, VStack, Alert, AlertIcon, Text } from '@chakra-ui/react';
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = 'https://hvjzemvfstwwhhahecwu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2anplbXZmc3R3d2hoYWhlY3d1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MTQ4Mjc3MCwiZXhwIjoyMDA3MDU4NzcwfQ.6jThCX2eaUjl2qt4WE3ykPbrh6skE8drYcmk-UCNDSw';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function VianneyAlertChat() {
  const [alerts, setAlerts] = useState([]);
  const [newAlertText, setNewAlertText] = useState('');

  useEffect(() => {
    // Function to fetch alerts from Supabase
    const fetchAlerts = async () => {
      const { data, error } = await supabase
        .from('vianney_alert')
        .select('*')
        .order('timestamp', { ascending: false });

      if (error) console.log('Error fetching alerts:', error);
      else setAlerts(data);
    };

    fetchAlerts();
  }, []);

  const handleInputChange = (event) => {
    setNewAlertText(event.target.value);
  };

  const handleSubmit = async () => {
    if (newAlertText.trim() !== '') {
      const fakeUUID = '123e4567-e89b-12d3-a456-426614174000';

      const { data, error } = await supabase
        .from('vianney_alert')
        .insert([
          { alert_text: newAlertText, user_id: fakeUUID, solved_or_not: 'unsolved' }
        ]);

      if (error) {
        console.log('Error inserting alert:', error);
      } else if (data) {
        // Only update state if data is not null
        setAlerts([...alerts, ...data]);
      }

      setNewAlertText('');
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4}>
        {alerts.map((alert, index) => (
          <Alert key={index} status="info">
            <AlertIcon />
            <Box>
              <Text>{alert.alert_text}</Text> {/* Display the alert text */}
              {/* Optionally display other details like timestamp */}
              <Text fontSize="sm" color="gray.500">
                {new Date(alert.timestamp).toLocaleString()}
              </Text>
            </Box>
          </Alert>
        ))}
      </VStack>
      <Box mt={4}>
        <Input
          placeholder="Type your alert..."
          value={newAlertText}
          onChange={handleInputChange}
        />
        <Button mt={2} colorScheme="blue" onClick={handleSubmit}>
          Add Alert
        </Button>
      </Box>
    </Box>
  );
}

export default VianneyAlertChat;

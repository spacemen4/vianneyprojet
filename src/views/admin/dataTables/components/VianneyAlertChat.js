import React, { useState, useEffect } from 'react';
import { Box, Input, Button, VStack, Alert, AlertIcon, Text, Select } from '@chakra-ui/react';
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = 'https://hvjzemvfstwwhhahecwu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2anplbXZmc3R3d2hoYWhlY3d1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MTQ4Mjc3MCwiZXhwIjoyMDA3MDU4NzcwfQ.6jThCX2eaUjl2qt4WE3ykPbrh6skE8drYcmk-UCNDSw';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function VianneyAlertChat() {
  const [alertStatus, setAlertStatus] = useState('info'); // New state for alert status
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

  const handleStatusChange = (event) => {
    setAlertStatus(event.target.value);
  };

  const handleInputChange = (event) => { // Define this function
    setNewAlertText(event.target.value);
  };

  const handleSubmit = async () => {
    if (newAlertText.trim() !== '') {
      const fakeUUID = '123e4567-e89b-12d3-a456-426614174000';

      const { data, error } = await supabase
        .from('vianney_alert')
        .insert([
          { alert_text: newAlertText, user_id: fakeUUID, solved_or_not: alertStatus }
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
        {alerts.map((alert, index) => {
          const alertStatus = ['info', 'warning', 'success', 'error'].includes(alert.solved_or_not)
            ? alert.solved_or_not
            : 'info';

          return (
            <Alert key={index} status={alertStatus}>
              <AlertIcon />
              <Box>
                <Text>{alert.alert_text}</Text>
                <Text fontSize="sm" color="gray.500">
                  {new Date(alert.timestamp).toLocaleString()}
                </Text>
              </Box>
            </Alert>
          );
        })}

      </VStack>
      <Box mt={4}>
        <Select placeholder="Select status" value={alertStatus} onChange={handleStatusChange}>
          <option value="error">Error</option>
          <option value="success">Success</option>
          <option value="warning">Warning</option>
          <option value="info">Info</option>
        </Select>
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

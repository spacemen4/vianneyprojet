import React, { useState } from 'react';
import { Box, Input, Button, VStack, Alert, AlertIcon } from '@chakra-ui/react';

function VianneyAlertChat() {
  const [alerts, setAlerts] = useState([]);
  const [newAlertText, setNewAlertText] = useState('');

  const handleInputChange = (event) => {
    setNewAlertText(event.target.value);
  };

  const handleSubmit = () => {
    if (newAlertText.trim() !== '') {
      setAlerts([...alerts, newAlertText]);
      setNewAlertText('');
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4}>
        {alerts.map((alert, index) => (
          <Alert key={index} status="info">
            <AlertIcon />
            {alert}
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

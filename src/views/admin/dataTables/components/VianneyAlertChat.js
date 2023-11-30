import React, { useState, useEffect } from 'react';
import { Box, Input, Button, VStack, Alert, AlertIcon, Text, Select, Flex, useColorModeValue } from '@chakra-ui/react';
import { createClient } from '@supabase/supabase-js'
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";

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
        .order('timestamp', { ascending: true }); // Changed to true for chronological order

      if (error) console.log('Erreur lors de la récupération des alertes:', error);
      else setAlerts(data);
    };

    fetchAlerts();
  }, []);


  const handleStatusChange = (event) => {
    setAlertStatus(event.target.value);
  };

  const handleInputChange = (event) => {
    setNewAlertText(event.target.value);
  };

  const handleSubmit = async () => {
    if (newAlertText.trim() !== '') {
      const fakeUUID = '123e4567-e89b-12d3-a456-426614174000';

      const { error } = await supabase
        .from('vianney_alert')
        .insert([
          { alert_text: newAlertText, user_id: fakeUUID, solved_or_not: alertStatus }
        ]);

      if (!error) {
        const newAlert = {
          alert_text: newAlertText,
          user_id: fakeUUID,
          solved_or_not: alertStatus,
          timestamp: new Date().toISOString()
        };
        setAlerts([...alerts, newAlert]);
      }

      setNewAlertText('');
    }
  };
  const textColor = useColorModeValue("secondaryGray.900", "white");


  return (

    <Card
      direction='column'
      w='100%'
      px='0px'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Box p={4}>
          <Flex px='25px' justify='space-between' mb='20px' align='center'>
            <Text
              color={textColor}
              fontSize='22px'
              fontWeight='700'
              lineHeight='100%'>
              Table des alertes
            </Text>
            <Menu />
          </Flex>


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
            <Select placeholder="Sélectionnez le degrès d'urgence" value={alertStatus} onChange={handleStatusChange}>
              <option value="error">Urgence</option>
              <option value="success">Problème résolu</option>
              <option value="warning">Avertissement</option>
              <option value="info">Information</option>
            </Select>
            <Input
              placeholder="Tapez votre alerte..."
              value={newAlertText}
              onChange={handleInputChange}
              mt={2}
            />
            <Button mt={2} colorScheme="blue" onClick={handleSubmit}>
              Ajouter une alerte
            </Button>
          </Box>

        </Box>
    </Card>
  );
}

export default VianneyAlertChat;

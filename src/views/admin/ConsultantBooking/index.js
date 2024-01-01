import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  VStack,
  Heading,
  Select,
  Textarea,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pvpsmyizvorwwccuwbuq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2cHNteWl6dm9yd3djY3V3YnVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMjgzMDg2MCwiZXhwIjoyMDE4NDA2ODYwfQ.9YDEN41__xBFJU91XY9e3r119A03yQ2oq5azmrx1aqY';
const supabase = createClient(supabaseUrl, supabaseAnonKey);


function CustomerContactForm() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    serviceType: '', // New field for service type
    needs: '',      // New field for needs
  });
  const toast = useToast();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate a new UUID for the submission
    const newId = uuidv4();

    const { data, error } = await supabase
      .from('customer_contacts')
      .insert([
        {
          id: newId, // Include the UUID in the insert data
          company_name: formData.companyName,
          contact_name: formData.contactName,
          email: formData.email,
          phone: formData.phone,
          service_type: formData.serviceType,
          needs: formData.needs,
        },
      ]);

    if (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'envoi des données.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    if (data && data.length > 0) {


      toast({
        title: "Succès",
        description: "Les détails du contact ont été envoyés avec succès.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } else {
      console.log('No data returned from the database.');
    }
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <Heading as="h3" size="lg">Customer Contact Details</Heading>

        <FormControl id="company-name" isRequired>
          <FormLabel>Company Name</FormLabel>
          <Input
            name="companyName"
            type="text"
            value={formData.companyName}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl id="contact-name" isRequired>
          <FormLabel>Contact Name</FormLabel>
          <Input
            name="contactName"
            type="text"
            value={formData.contactName}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl id="email" isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl id="phone">
          <FormLabel>Phone Number</FormLabel>
          <Input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl id="service-type" isRequired>
          <FormLabel>Type of Service</FormLabel>
          <Select
            name="serviceType"
            placeholder="Select service"
            value={formData.serviceType}
            onChange={handleChange}>
            <option value="due-diligences">Due diligences</option>
            <option value="transformation">Transformation</option>
            <option value="restructuring">Restructuring</option>
            <option value="evaluation">Évaluation</option>
          </Select>
        </FormControl>

        <FormControl id="needs">
          <FormLabel>Quels sont vos besoins ?</FormLabel>
          <Textarea
            name="needs"
            value={formData.needs}
            onChange={handleChange}
            placeholder="Describe your needs"
          />
        </FormControl>

        <Button type="submit" colorScheme="blue">Submit</Button>
      </VStack>
    </Box>
  );
}

export default CustomerContactForm;
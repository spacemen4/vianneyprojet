import React, { useState } from 'react';
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { data, error } = await supabase
      .from('customer_contacts')
      .insert([
        {
          company_name: formData.companyName,
          contact_name: formData.contactName,
          email: formData.email,
          phone: formData.phone,
          service_type: formData.serviceType,
          needs: formData.needs,
        },
      ]);
  
    if (error) {
      console.error('Error inserting data:', error);
      return;
    }
  
    console.log('Data inserted:', data);
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
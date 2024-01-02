import { ChakraProvider, Alert, AlertIcon } from "@chakra-ui/react";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pvpsmyizvorwwccuwbuq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2cHNteWl6dm9yd3djY3V3YnVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMjgzMDg2MCwiZXhwIjoyMDE4NDA2ODYwfQ.9YDEN41__xBFJU91XY9e3r119A03yQ2oq5azmrx1aqY';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fetch data from the database
async function fetchContacts() {
  const { data, error } = await supabase.from("customer_contacts").select();

  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }

  return data;
}

function Displaycustumerrequest() {
  const contacts = fetchContacts(); // Fetch contacts from the database

  return (
    <ChakraProvider>
      {contacts.map((contact) => (
        <Alert key={contact.id} status="info">
          <AlertIcon />
          Company: {contact.company_name} | Contact: {contact.contact_name} | Email: {contact.email}
        </Alert>
      ))}
    </ChakraProvider>
  );
}

export default Displaycustumerrequest;

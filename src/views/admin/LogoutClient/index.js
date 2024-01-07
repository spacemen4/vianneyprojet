import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pvpsmyizvorwwccuwbuq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2cHNteWl6dm9yd3djY3V3YnVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMjgzMDg2MCwiZXhwIjoyMDE4NDA2ODYwfQ.9YDEN41__xBFJU91XY9e3r119A03yQ2oq5azmrx1aqY';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Logout = () => {
  const history = useHistory(); // Use useHistory

  useEffect(() => {
    const logout = async () => {
      await supabase.auth.signOut();
      history.push('/login'); // Redirect using history.push
    };

    logout();
  }, [history]);

  return <div>Logging out...</div>;
};

export default Logout;

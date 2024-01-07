import React from 'react';
import { Button } from '@chakra-ui/react';
import supabase from './../../../supabaseClient';

const LogoutButton = ({ onLogout }) => {
  console.log('onLogout prop:', onLogout); // Add this line for debugging

  const handleLogout = async () => {
      const { error } = await supabase.auth.signOut();
      if (!error && typeof onLogout === 'function') {
          onLogout(null); 
      } else if (error) {
          console.error('Logout Error:', error);
      }
  };

  return (
      <Button colorScheme="blue" onClick={handleLogout}>
          Sign Out
      </Button>
  );
};

export default LogoutButton;

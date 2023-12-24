import React, { useState, useEffect } from "react";
import {
  Icon,
  Flex,
  Text,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { FcAutomatic } from "react-icons/fc";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pvpsmyizvorwwccuwbuq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2cHNteWl6dm9yd3djY3V3YnVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMjgzMDg2MCwiZXhwIjoyMDE4NDA2ODYwfQ.9YDEN41__xBFJU91XY9e3r119A03yQ2oq5azmrx1aqY';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Banner(props) {
  const { onAllowScrollingToggle, ...rest } = props;

  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [teamNames, setTeamNames] = useState([]);

  useEffect(() => {
    // Fetch team names from the "vianney_teams" table
    const fetchTeamNames = async () => {
      const { data, error } = await supabase.from('vianney_teams').select('nom');
      if (error) {
        console.error('Error fetching team names:', error);
      } else {
        setTeamNames(data.map(team => team.nom));
      }
    };

    fetchTeamNames();
  }, []);

  return (
    <Menu isOpen={isOpen} onClose={onClose}>
      <MenuButton
        align="center"
        justifyContent="center"
        bg={bgButton}
        _hover={bgHover}
        _focus={bgFocus}
        _active={bgFocus}
        w="37px"
        h="37px"
        lineHeight="100%"
        onClick={onOpen}
        borderRadius="10px"
        {...rest}
      >
        <Icon as={MdOutlineMoreHoriz} color={iconColor} w="24px" h="24px" />
      </MenuButton>
      <MenuList
        minW="unset"
        maxW="150px !important"
        border="transparent"
        borderRadius="20px"
        p="15px"
      >
        {teamNames.map((teamName, index) => (
          <MenuItem
            key={index}
            
            transition="0.2s linear"
            p="0px"
            borderRadius="8px"
            _hover={{ bg: "transparent" }}
            _active={{ bg: "transparent" }}
            _focus={{ bg: "transparent" }}
          >
            <Flex align="center">
              <Icon as={FcAutomatic} h="16px" w="16px" me="8px" />
              <Text fontSize="sm" fontWeight="400">
                {teamName}
              </Text>
            </Flex>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

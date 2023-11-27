import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";
import Banner from "views/admin/marketplace/components/Banner";
import MapComponent from "views/admin/marketplace/components/MapComponent";
import TableTopCreators from "views/admin/marketplace/components/TableTopCreators";
import HistoryItem from "views/admin/marketplace/components/HistoryItem";
import NFT from "components/card/NFT";
import Card from "components/card/Card.js";

// Assets
import Nft1 from "assets/img/nfts/Nft1.png";
import Nft5 from "assets/img/nfts/Nft5.png";

import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";
import CameraForm from "./components/CameraForm";
import { createClient } from '@supabase/supabase-js';
import UserForm from './components/UserForm';

const supabaseUrl = 'https://hvjzemvfstwwhhahecwu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2anplbXZmc3R3d2hoYWhlY3d1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MTQ4Mjc3MCwiZXhwIjoyMDA3MDU4NzcwfQ.6jThCX2eaUjl2qt4WE3ykPbrh6skE8drYcmk-UCNDSw';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Marketplace() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [cameras, setCameras] = useState([]);

  useEffect(() => {
    const fetchCameras = async () => {
      const { data, error } = await supabase
        .from('vianney_cameras')
        .select('*');

      if (error) {
        console.log('Error fetching data:', error);
        setCameras([]); // Set cameras to an empty array in case of error
      } else {
        setCameras(data);
      }
    };

    fetchCameras();
  }, []);
  // New state for controlling the visibility of forms
  const [showForms, setShowForms] = useState(false);

  // Toggle function for the button
  const toggleForms = () => {
    setShowForms(!showForms);
  };

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      <Grid
        mb='20px'
        gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}>
        <Flex
          flexDirection='column'
          gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}>
          <Banner />
          <Box mt="10px" borderRadius="lg" overflow="hidden">
            <MapComponent />
          </Box>
          <Flex direction='column'>
            <Flex
              mt='45px'
              mb='20px'
              justifyContent='space-between'
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}>
              <Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
                Les vidéos en direct de l'évênement
              </Text>
            </Flex>

            <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px'>
              {cameras?.map(camera => (
                <NFT
                  key={camera.id}
                  image_url={camera.image_url}
                  name={camera.name}
                  location={camera.location}
                  last_active={camera.last_active}
                  latitude={camera.latitude}
                  longitude={camera.longitude}
                // include other properties from camera if your NFT component uses them
                />

              ))}
            </SimpleGrid>
          </Flex>
          <Button onClick={toggleForms} mt='4' mb='4'>
            {showForms ? 'Cacher le formulaire' : 'Montrer le formulaire'}
          </Button>
          {showForms && (
            <>
              <Box>
                <CameraForm />
              </Box>
              <Box>
                <UserForm />
              </Box>
            </>
          )}
        </Flex>
        <Flex
          flexDirection='column'
          gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}>
          <Box maxWidth={{ base: "100%", md: "50%" }}>
            <Card px='0px' mb='20px'>
              <TableTopCreators
                tableData={tableDataTopCreators}
                columnsData={tableColumnsTopCreators}
              />
            </Card>
          </Box>
          <Card p='0px'>
            <Flex
              align={{ sm: "flex-start", lg: "center" }}
              justify='space-between'
              w='100%'
              px='22px'
              py='18px'>
              <Text color={textColor} fontSize='xl' fontWeight='600'>
                Alertes remontées en régie
              </Text>
              <Button variant='action'>Voir tous les alertes</Button>
            </Flex>
            <HistoryItem
              nom='Colorful Heaven'
              author='By Mark Benjamin'
              date='30s ago'
              image={Nft5}
              price='0.91 ETH'
            />
            <HistoryItem
              nom='Abstract Colors'
              author='By Esthera Jackson'
              date='58s ago'
              image={Nft1}
              price='0.91 ETH'
            />
          </Card>
        </Flex>
      </Grid>
    </Box>
  );
}

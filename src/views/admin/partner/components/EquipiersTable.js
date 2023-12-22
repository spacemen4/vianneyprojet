import React, { useEffect, useState } from 'react';
import {
  Stack,
  Text,
  Badge,
  Button,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Box,
  Center,
  Heading,
  useColorModeValue,
  Flex,
  Avatar,
  Skeleton,
} from '@chakra-ui/react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MdPlace } from "react-icons/md";
import { renderToString } from "react-dom/server";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pvpsmyizvorwwccuwbuq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2cHNteWl6dm9yd3djY3V3YnVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMjgzMDg2MCwiZXhwIjoyMDE4NDA2ODYwfQ.9YDEN41__xBFJU91XY9e3r119A03yQ2oq5azmrx1aqY';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const EquipiersTable = ({ showAll }) => {
  const [equipiers, setEquipiers] = useState([]);
  const [selectedEquipier, setSelectedEquipier] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onRowClick = (equipier) => {
    setSelectedEquipier(equipier);
    setIsModalOpen(true);
  };
  const columns = window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;


  useEffect(() => {
    if (selectedEquipier && isModalOpen) {
      const mapId = `map-${selectedEquipier.id}`;

      requestAnimationFrame(() => {
        const mapContainer = document.getElementById(mapId);
        if (mapContainer && !mapContainer._leaflet) {
          const map = L.map(mapId).setView([selectedEquipier.latitude, selectedEquipier.longitude], 13);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

          equipiers.forEach(team => {
            // Use a different color for the selected team
            const icon = team.id === selectedEquipier.id ? createCustomIcon('blue') : createCustomIcon();
            L.marker([team.latitude, team.longitude], { icon }).addTo(map);
          });
        }
      });

      return () => {
        // Cleanup code
      };
    }
  }, [selectedEquipier, isModalOpen, equipiers]);

  // Style for hover state
  const hoverStyle = {
    bg: useColorModeValue('gray.100', 'gray.700'),
    cursor: 'pointer',
  };

  // Inside the EquipierCard component
  const EquipierCard = ({ equipier }) => (
    <Box
      _hover={hoverStyle}
      onClick={() => onRowClick(equipier)}
      style={{
        cursor: 'pointer',
        marginBottom: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.02)',
        },
        border: '1px solid #e2e8f0',
      }}
    >
      <Image
        src={equipier.photo_profile_url}
        alt="l'équipe"
        borderRadius="10px 10px 0 0"
        objectFit="cover" // Cover the entire box
      />
      <Box alignItems="center" justifyContent="center" p="1" textAlign="center">
        <Heading size="md">{equipier.nom || 'N/A'} {equipier.prenom || 'N/A'}</Heading>
        <Text fontSize="sm" color="gray.500" mt={1}>
          <Badge colorScheme={'blue'}>{equipier.statut_dans_la_boite || 'N/A'}</Badge>
        </Text>
      </Box>
    </Box>
  );

  useEffect(() => {
    const fetchEquipiers = async () => {
      const { data, error } = await supabase
        .from('vianney_teams')
        .select('*');
      if (error) {
        console.log('Error fetching data:', error);
      } else {
        setEquipiers(data);
      }
    };

    fetchEquipiers();
  }, []);

  const createCustomIcon = (color = 'red') => {
    const iconHtml = renderToString(<MdPlace style={{ fontSize: '24px', color }} />);
    return L.divIcon({
      html: iconHtml,
      className: 'custom-leaflet-icon',
      iconSize: L.point(30, 30),
      iconAnchor: [15, 30],
      popupAnchor: [0, -30],
    });
  };

  return (
    <Flex flexWrap="wrap">
      {equipiers.map((equipier, index) => (
        <Box key={index} width={`calc(${100 / columns}% - 16px)`} margin="8px">
          <EquipierCard equipier={equipier} />
        </Box>
      ))}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton size="lg" color="purple.600" />
          <ModalBody>
            {selectedEquipier && (
              <Stack spacing={4} p={8} align="start">

                <Image
                  src={selectedEquipier.photo_profile_url}
                  alt="l'équipe"
                  borderRadius="10px 10px 0 0"
                  objectFit="cover" // Cover the entire box
                />
                <Box alignItems="center" justifyContent="center" p="1" textAlign="center">
                  <Heading size="md">{`${selectedEquipier.nom || 'N/A'} ${selectedEquipier.prenom || 'N/A'}`}</Heading>
                  <Text fontSize="sm" color="gray.500" mt={1}>
                    <Badge colorScheme={'blue'}>{selectedEquipier.statut_dans_la_boite || 'N/A'}</Badge>
                  </Text>
                </Box>
                <Box
                  color='gray.500'
                  fontWeight='semibold'
                  letterSpacing='wide'
                  fontSize='xs'
                  textTransform='uppercase'
                  ml='2'
                >{selectedEquipier.resume_cv || 'N/A'}
                </Box>
                {selectedEquipier.v_card && (
                  <Center>
                    <a href={selectedEquipier.v_card} download="v-card.vcf">
                      <Button colorScheme="blue" size="sm">
                        Télécharger la carte de visite (v-card)
                      </Button>
                    </a>
                  </Center>
                )}
              </Stack>
            )}
            <Box id={`map-${selectedEquipier?.id}`} h='500px' w='100%' mt={4} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default EquipiersTable;

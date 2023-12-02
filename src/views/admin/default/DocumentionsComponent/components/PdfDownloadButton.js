import React, { useEffect, useState } from "react";
import { Box, Flex, Icon, Heading, Stat, StatNumber, StatLabel, useColorModeValue } from "@chakra-ui/react";
import { FcDownload, FcDocument, FcAdvertising } from "react-icons/fc";
import { createClient } from "@supabase/supabase-js";
import Card from "components/card/Card.js"; // Import Card
import IconBox from "components/icons/IconBox"; // Import IconBox

const supabaseUrl = "https://nhrsgicthwqsctwggxqz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ocnNnaWN0aHdxc2N0d2dneHF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkxNzMwODMsImV4cCI6MjAwNDc0OTA4M30.f1MhR4nYjFrCMjMnwjMUwlueADL8wZdPvu4MtrxPglk";

const supabase = createClient(supabaseUrl, supabaseKey);

const PdfDownloadButton = ({ handlePdfClick }) => {
  const [documents, setDocuments] = useState([]);
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const textColor = useColorModeValue("secondaryGray.900", "white");

  useEffect(() => {
    const fetchDocuments = async () => {
      const { data, error } = await supabase.from("pdf_documents").select();
      if (error) {
        console.error("Error fetching documents:", error);
      } else {
        setDocuments(data);
      }
    };

    fetchDocuments();
  }, []);

  // Function to format the date as desired
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        border="1px solid #ccc"
        borderRadius="md"
        p="4"
      >
        {documents.map((data) => (
          <Card key={data.id} py='15px' cursor="pointer" onClick={() => handlePdfClick(data)}>
            <Flex
              my='auto'
              h='100%'
              align={{ base: "center", xl: "start" }}
              justify={{ base: "center", xl: "center" }}>
              <IconBox
                w='56px'
                h='56px'
                bg={boxBg}
                icon={<Icon w='32px' h='32px' as={FcAdvertising} color={brandColor} />}
              />
              <Stat my='auto' ms="10px">
                <StatNumber color={textColor} fontSize={{ base: "xl" }}>
                  {data.title}
                </StatNumber>
                <StatLabel color={textColor} fontSize="md">
                  {formatDate(data.description)}
                </StatLabel>
              </Stat>
            </Flex>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default PdfDownloadButton;

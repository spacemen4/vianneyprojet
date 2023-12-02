import React, { useEffect, useState } from "react";
import { Box, Flex, Icon, Heading } from "@chakra-ui/react";
import { FcDownload, FcDocument } from "react-icons/fc";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nhrsgicthwqsctwggxqz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ocnNnaWN0aHdxc2N0d2dneHF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkxNzMwODMsImV4cCI6MjAwNDc0OTA4M30.f1MhR4nYjFrCMjMnwjMUwlueADL8wZdPvu4MtrxPglk";

  const supabase = createClient(supabaseUrl, supabaseKey);

  const PdfDownloadButton = ({ handlePdfClick }) => {
    const [documents, setDocuments] = useState([]);
  
    useEffect(() => {
      // Fetch documents from the "pdf_documents" table
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
  
    const handleDocumentClick = (data) => {
      handlePdfClick(data);
    };
  
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        border="1px solid #ccc"
        borderRadius="md"
        p="4"
      >
        {documents.map((data) => (
          <Flex
            key={data.id}
            as="button"
            mt="4"
            width="100%"
            textAlign="left"
            p="4"
            borderWidth="1px"
            borderRadius="md"
            borderColor="gray.300"
            _hover={{ bg: "blue.200", cursor: "pointer" }}
            _focus={{ outline: "none" }}
            justifyContent="space-between"
            alignItems="center"
            background="blue.100"
            cursor="pointer"
            onClick={() => handleDocumentClick(data)}
          >
            <Box>
              <Heading as="h3" size="lg" mb="1">
                {data.title}
              </Heading>
            </Box>
            <Box fontSize="md">{data.description}</Box>
            <Box>
              <Icon as={FcDocument} boxSize={10} mr={6} />
              <Icon as={FcDownload} boxSize={10} />
            </Box>
          </Flex>
        ))}
      </Box>
    );
  };
  
  export default PdfDownloadButton;
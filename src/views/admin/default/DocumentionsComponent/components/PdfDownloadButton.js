import React, { useEffect, useState } from "react";
import { Box, Flex, Icon, Heading } from "@chakra-ui/react";
import { FcDownload, FcDocument } from "react-icons/fc";
import { createClient } from "@supabase/supabase-js";
import MiniStatistics from "../../../../../components/card/MiniStatistics"; // Import MiniStatistics

const supabaseUrl = "https://nhrsgicthwqsctwggxqz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ocnNnaWN0aHdxc2N0d2dneHF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkxNzMwODMsImV4cCI6MjAwNDc0OTA4M30.f1MhR4nYjFrCMjMnwjMUwlueADL8wZdPvu4MtrxPglk";

const supabase = createClient(supabaseUrl, supabaseKey);

const PdfDownloadButton = ({ pdf_documents, handlePdfClick }) => { // Add pdf_documents as a prop
  const [documents, setDocuments] = useState([]);

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

  const handleDocumentClick = (data) => {
    handlePdfClick(data);
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
          <MiniStatistics
            key={data.id}
            event_name={data.title}
            date={data.description}
            cursor="pointer"
            onClick={() => handleDocumentClick(data)}
          />
          
        ))}
      </Box>
    </Box>
  );
};

export default PdfDownloadButton;

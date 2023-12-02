import React, { useState } from "react";
import { Box } from "@chakra-ui/react";

import PdfDownloadButton from "./components/PdfDownloadButton";
import PdfList from "./components/PdfList";

const DocumentationsComponent = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);

  const handlePdfClick = (pdf) => {
    setSelectedPdf(pdf);
  };

  return (
    <Box pt={{ base: "140px", md: "80px", xl: "80px" }}>
      {!selectedPdf ? (
        <PdfDownloadButton handlePdfClick={handlePdfClick} />
      ) : (
        <PdfList selectedPdf={selectedPdf} setSelectedPdf={setSelectedPdf} />
      )}
    </Box>
  );
};

export default DocumentationsComponent;
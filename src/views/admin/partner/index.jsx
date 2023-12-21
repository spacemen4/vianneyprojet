import React from 'react';
import {
  Box,
  Flex,
  Grid,
} from "@chakra-ui/react";
import TableTopCreators from "views/admin/partner/components/TableTopCreators";
import tableDataTopCreators from "views/admin/partner/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/partner/variables/tableColumnsTopCreators";

export default function Partner() {
  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      <Grid
        mb='20px'
        display={{ base: "block", xl: "grid" }}>
        <Flex
          flexDirection='column'>
          <Box>
            <TableTopCreators
              tableData={tableDataTopCreators}
              columnsData={tableColumnsTopCreators}
            />
          </Box>
        </Flex>
      </Grid>
    </Box>
  );
}

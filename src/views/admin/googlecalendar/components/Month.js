import React from "react";
import Day from "./Day";
import { Grid } from "@chakra-ui/react";

export default function Month({ month, setShowModifyForm }) {
  return (
    <Grid flex="1" templateColumns="repeat(7, 1fr)" templateRows="repeat(5, 1fr)" p={1}>
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} setShowModifyForm={setShowModifyForm} />
          ))}
        </React.Fragment>
      ))}
    </Grid>
  );
}

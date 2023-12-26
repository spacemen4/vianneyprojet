import React from "react";
import Day from "./Day";
import { Grid } from "@chakra-ui/react";

export default function Month({ month }) {
  return (
    <Grid flex="1" templateColumns="repeat(7, 1fr)" templateRows="repeat(5, 1fr)">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </Grid>
  );
}
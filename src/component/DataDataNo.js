import { Box, Typography } from "@material-ui/core";
import React from "react";

export default function NodatafoundImage() {
  return (
    <Box align="center" mt={2} width="100%">
      <img
        src="/images/nodata1.png"
        style={{ width: "100%", maxWidth: "100px" }}
      />
      <Box>
        <Typography>No data found</Typography>
        {/* <Typography>No data, please try again later</Typography> */}
      </Box>
    </Box>
  );
}

import { Box, Typography } from "@material-ui/core";
import React from "react";

export default function DataNotStart() {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "start",
        width: "100%",
        marginTop: "20px",
      }}
    >
      <Typography style={{ color: "#fff", fontSize: "16px" }}>
        No data found
      </Typography>
    </Box>
  );
}

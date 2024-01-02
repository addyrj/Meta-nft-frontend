import React, { useState } from "react";

import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Container,
  makeStyles,
} from "@material-ui/core";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

const useStyles = makeStyles((theme) => ({
  mainbox: {
    paddingTop: "60px",
    paddingBottom: "50px",
    "& h2": {
      color: "#fff",
    },
    "& label": {
      color: "#000",
      padding: "0",
      fontSize: "14px",
      lineHeight: "33px",

      transition:
        "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    },
    "& p": {
      // paddingTop: "15px",
      color: "#000",
      //   marginTop:"30px"
    },
  },
  maintext: {
    padding: "30px",
    marginTop: "10px",
    bordeRadius: "10px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    // border: "1px solid #52b6f1",
  },
}));

const Contact = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.mainbox}>
      <Container maxWidth="lg">
        <Box mb={5} textAlign="center">
          <Container maxWidth="sm">
            <Typography variant="h2">Support Tickets</Typography>
            <Box>
              <img
                src="images/commingsoon.gif"
                alt="commingsoon"
                style={{ width: "100%" }}
              />
            </Box>
          </Container>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;

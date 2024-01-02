import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  bannerBox: {
    padding: "40px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "50px 0",
    },
  },
  root: {
    backgroundColor: "#FFFFFF",
    borderRadius: "10px",
    padding: "25px",
    backdropFilter: "blur(44px)",
    boxShadow: "rgb(99 99 99 / 20%) 0px 2px 8px 0px",
    boxSizing: "border-box",

    "& h2": {
      color: "#fff",
      textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      [theme.breakpoints.down("xs")]: {
        fontSize: "20px",
      },
    },
  },

  multinft: {
    border: " 2px solid #b8babd",
    borderRadius: "10px",
    textAlign: "center",
    padding: " 40px 1px 40px 10px",
    "& h6": {
      fontSize: "12px",
      color: "#8f9496",
    },
    "& img": {
      maxHeight: "100%",
      maxWidth: "100%",
      width: "50px",
    },
  },
  heading: {
    fontWeight: "400",
    color: "#8f9496",
  },
}));

export default function ChooseNFT() {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.bannerBox}>
        <Container maxWidth="md">
          <Box className={classes.root} pb={2}>
            <Box className={classes.heading}>
              <Typography variant="h2">Choose Type</Typography>
              <Box pt={2} pb={3}>
                <Typography variant="h6">
                  Choose “Single” for one of a kind or “Multiple” if you want to
                  sell one collectible multiple times
                </Typography>
              </Box>
            </Box>
            <Grid container spacing={2}>
              <Grid item lg={6} sm={6} xs={12}>
                <Link
                  to="/create-qie721"
                  style={{
                    textDecoration: "none",
                    cursor: "pointer",
                    color: "#000",
                  }}
                >
                  <Box>
                    <Box className={classes.multinft}>
                      <img src="/images/single.png" alt="" />
                      <Typography variant="h5">Single</Typography>
                      <Typography variant="h6">
                        If you want to highlight the uniqueness and
                        individuality of your item
                      </Typography>
                    </Box>
                  </Box>
                </Link>
              </Grid>
              <Grid item lg={6} sm={6} xs={12}>
                <Link
                  to="/create-qie1155"
                  style={{
                    textDecoration: "none",
                    cursor: "pointer",
                    color: "#000",
                  }}
                >
                  <Box>
                    <Box className={classes.multinft}>
                      <img src="/images/multiple.png" alt="" />
                      <Typography variant="h5">Multiple</Typography>
                      <Typography variant="h6">
                        If you want to share your NFT with a large number of
                        community members
                      </Typography>
                    </Box>
                  </Box>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}

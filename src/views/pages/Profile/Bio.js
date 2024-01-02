import React, { useContext, useState } from "react";
import {
  Box,
  makeStyles,
  Button,
  Container,
  Typography,
  Link,
  Grid,
} from "@material-ui/core";
import { FaTwitter, FaFacebookF } from "react-icons/fa";
import { UserContext } from "src/context/User";
import PublicIcon from "@material-ui/icons/Public";
import FacebookIcon from "@material-ui/icons/Facebook";

const useStyles = makeStyles((theme) => ({
  root: { paddingBottom: "100px" },
  biobox: {
    padding: "30px 30px 30px 30px",
    backdropFilter: "blur(44px)",
    borderRadius: "10px",
    marginTop: "26px",
    filter: "drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.25))",
    background: "#F7722F",
    boxShadow: "rgb(99 99 99 / 20%) 0px 2px 8px 0px",
    "& h3": {
      fontWeight: "bold",
      color: "#fff",
    },
    "& p": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#fff",
      paddingTop: "15px",
      wordBreak: "break-word",
    },
  },
  conrnerBox: {
    height: "auto",
    background: "linear-gradient(261.87deg, #62D3F0 13.12%, #35A5F5 83.57%)",
    marginRight: "20px",
    borderRadius: "10px",
    padding: "10px",
    marginTop: "12px",
  },
  socialMediaIcon: {
    fontSize: "30px",
    color: "#FFFFFF",
  },
}));

export default function Bio() {
  const classes = useStyles();
  const user = useContext(UserContext);

  return (
    <>
      <Box className={classes.biobox}>
        <Typography variant="h3">Bio:</Typography>
        <Typography variant="body2">{user.userData?.bio}</Typography>
      </Box>
      <Box className={classes.biobox}>
        <Typography variant="h3">Links:</Typography>
        <Grid container spacing={1}>
          {user?.userData?.twitterUsername && (
            <Grid item sm={2} lg={6} md={6} xs={3}>
              <a href={user?.userData?.twitterUsername} target="_blank">
                <Button className={classes.conrnerBox}>
                  <FaTwitter className={classes.socialMediaIcon} />
                </Button>
              </a>
            </Grid>
          )}
          {user?.userData?.personalSite && (
            <Grid item sm={2} lg={6} md={6} xs={3}>
              <a href={user?.userData?.personalSite} target="_blank">
                <Button className={classes.conrnerBox}>
                  <PublicIcon className={classes.socialMediaIcon} />
                </Button>
              </a>
            </Grid>
          )}
          {user?.userData?.facebook && (
            <Grid item sm={2} lg={6} md={6} xs={3}>
              <a href={user?.userData?.facebook} target="_blank">
                <Button className={classes.conrnerBox}>
                  <FacebookIcon className={classes.socialMediaIcon} />
                </Button>
              </a>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
}

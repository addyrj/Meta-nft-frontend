import React, { useState, useEffect, useContext } from "react";

import {
  makeStyles,
  Box,
  Container,
  Grid,
  Button,
  List,
  ListItem,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import { useHistory, useLocation } from "react-router-dom";

import Tilt from "react-tilt";
import { UserContext } from "src/context/User";
const useStyles = makeStyles((theme) => ({
  tabBtn: {
    "& button": {
      borderRadius: "10px",
      fontWeight: "600",
      fontSize: "14px",
      marginRight: "4px",
      "&.active": {
        color: "#fff",
        boxShadow: "0px 4px 4px rgb(0 0 0 / 25%)",
        background:
          "linear-gradient(261.87deg, #62D3F0 13.12%, #35A5F5 83.57%)",
      },
    },
  },
  banner: {
    // padding: "80px 0",

    [theme.breakpoints.down("xs")]: {
      padding: "50px 0",
    },
    "& h3": {
      fontWeight: 700,
      fontSize: "30px",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",
      "& img": {
        marginRight: "20px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "20px",
      },
    },
  },
  minBox: {
    textAlign: "center",
    "& img": {
      width: "100%",
    },
    "& h6": {
      fontSize: "20px",
    },
  },
}));

export default function MintNftCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const { data, resalemint } = props;
  const location = useLocation();
  // const mintData = location?.state?.resalemint;

  return (
    <div>
      <Box className={classes.banner}>
        <Container
          maxWidth="lg"
          style={{ paddingLeft: "0px", paddingRight: "0px" }}
        >
          <Box
            onClick={() => {
              history.push({
                pathname: "/profile",
                search: resalemint,
              });
            }}
          >
            {/* <Tilt className="Tilt"> */}
            <Box data={data} className={classes.minBox}>
              <List>
                <ListItem
                  style={{ cursor: "pointer" }}
                  // onClick={() => {
                  //   history.push({
                  //     pathname: "/mint-details",
                  //     search: data.id,
                  //   });
                  // }}
                >
                  <img
                    src={data?.nfdData?.image ? data?.nfdData?.image : ""}
                    alt=""
                  />
                </ListItem>
              </List>

              <Typography variant="h6">
                {data?.nfdData?.name ? data?.nfdData?.name : "NA"}
              </Typography>
            </Box>
            {/* </Tilt> */}
          </Box>
        </Container>
      </Box>
    </div>
  );
}

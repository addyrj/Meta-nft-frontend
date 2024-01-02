import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import { collectionData } from "src/constants";
import CollectionCard from "src/component/CollectionCard";
import Apiconfig from "src/ApiConfig/ApiConfig";
import axios from "axios";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import DataNotFound from "src/component/DataNotFound";
import HotgameCard from "src/component/HotgameCard";
import PawsomeCard from "src/component/PawsomeCard";
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "50px",
    [theme.breakpoints.down("xs")]: {
      padding: "50px 0",
    },
    "& h3": {
      fontWeight: 700,
      fontSize: "30px",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      "& span": {
        color: "#F7722F",
      },
      "& img": {
        marginRight: "20px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "20px",
      },
    },
  },
}));

const gameData = {
  topCollection: 21,
  collectionImage:
    "https://res.cloudinary.com/http-hovr-site/image/upload/v1663325929/nqacpyipvu6la95zmzhl.png",
  bannerImage:
    "https://res.cloudinary.com/http-hovr-site/image/upload/v1658417994/eacxctmqpv0zd3q8mqij.png",
  isPromoted: false,
  placeNftCount: 16,
  collectionType: "DEFAULT",
  userType: "User",
  status: "ACTIVE",
  _id: "62d801e696a9b915333c0eea",
  contractAddress: "0x8E2Fe35fad9649AF45E1b4D6D9f0C0ecc1Cf7D8e",
  displayName: "HovR Hooligans",
  network: "9732",
  baseURI:
    "https://ipfs.io/ipfs/QmT9KN1aJGh1YorE2bs7g1Ea37HivFktfEH1BhujZ9fw2z",
  symbol: "H1",
  description:
    "10,000 of the largest cities in the world that will be used in a P2E Metaverse game soon...",
  createdAt: "2022-07-20T13:23:50.347Z",
  updatedAt: "2022-10-19T06:01:00.004Z",
  __v: 0,
  tillDate: "2022-10-16T10:58:50.007Z",
};
const gameData1 = {
  topCollection: 21,
  collectionImage: "images/circlepawsome.png",
  bannerImage: "images/pawsomeLogo2.png",
  isPromoted: false,
  placeNftCount: 16,
  collectionType: "DEFAULT",
  userType: "User",
  status: "ACTIVE",
  _id: "62d801e696a9b915333c0eea",
  contractAddress: "0x8E2Fe35fad9649AF45E1b4D6D9f0C0ecc1Cf7D8e",
  displayName: "Pawsome",
  comingtext: "(Coming Soon)",
  network: "9732",
  baseURI:
    "https://ipfs.io/ipfs/QmT9KN1aJGh1YorE2bs7g1Ea37HivFktfEH1BhujZ9fw2z",
  symbol: "H1",
  description:
    "10,000 of the largest cities in the world that will be used in a P2E Metaverse game soon...",
  createdAt: "2022-07-20T13:23:50.347Z",
  updatedAt: "2022-10-19T06:01:00.004Z",
  __v: 0,
  tillDate: "2022-10-16T10:58:50.007Z",
};
function Hotgame() {
  const classes = useStyles();
  const [hotCollection, setHotCollection] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Box className={classes.root}>
        <Container maxWidth="lg">
          <Box className="leftcontent" display="flex">
            <figure style={{ margin: "0" }}>
              <img
                src="images/Emoji.png"
                alt="Search Image"
                style={{ width: "74%" }}
              />
            </figure>
            <Typography variant="h3">
              {" "}
              Hot &nbsp;<span>Games</span>
            </Typography>
          </Box>

          {/* <Typography variant="h3">
            <img src="images/Flame.png" />
            Hot &nbsp;<span>Collection</span>
          </Typography> */}
          <Box mt={4}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <HotgameCard type="card" data={gameData} />
              </Grid>

              <Grid item xs={12} sm={6} md={4} lg={3}>
                <PawsomeCard type="card" data={gameData1} />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Hotgame;

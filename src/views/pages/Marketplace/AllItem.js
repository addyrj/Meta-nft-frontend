import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import DataNotFound from "src/component/DataNotFound";
import FilterListIcon from "@material-ui/icons/FilterList";
import { CategoryButtons, exploreData } from "src/constants";
// import MarketplaceCard from "src/component/MarketplaceCard";
import ExploreCard from "src/component/ExploreCard";
import PrivateExploreCard from "src/component/PrivateExploreCard";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .leftcontent": {
      display: "flex",
      alignItems: "center",
      "& h3": {
        marginLeft: "15px",
        fontSize: "30px",
        fontWeight: "bold",
        [theme.breakpoints.down("xs")]: {
          fontSize: "20px",
        },
      },
    },
  },
  filterBtn: {
    // color: "#fff",
    background: "#FFFFFF",
    border: "2px solid #EEEEEE",
    boxSizing: "border-box",
    // backdropFilter: "blur(42px)",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "10px",
    fontWeight: "bold",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "20px",
    margin: "5px",
    "& img": {
      marginRight: "5px",
    },
  },
  buttonBox: {
    margin: "5px 10px",
  },
}));

function Explore(props) {
  const classes = useStyles();
  const { nftList, callbackFun, isLoading, setLikeLoad } = props;

  return (
    <>
      <Box className={classes.root}>
        <Container maxWidth="lg">
          <Box>
            <Grid container spacing={2}>
              {nftList &&
                nftList.map((data, i) => {
                  return (
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <Box mt={2}>
                        <ExploreCard
                          type="card"
                          data={data}
                          key={i}
                          callbackFun={callbackFun}
                          setLikeLoad={(item) => setLikeLoad(item)}
                        />
                      </Box>
                    </Grid>
                  );
                })}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Explore;

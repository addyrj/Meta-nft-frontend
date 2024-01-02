import React, { useContext } from "react";
import { Typography, Box, makeStyles, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { UserContext } from "src/context/User";
// import ExploreCard from "src/component/ExploreCard";
import CollectionCard from "src/component/CollectionCard";
// import { exploreData } from "src/constants";
import { CategoryButtons, exploreData } from "src/constants";
import { collectionData } from "src/constants";
import MarketplaceCard from "src/component/MarketplaceCard";
import DataNotFound from "../../../component/DataNotFound";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px 0px ",
    "& .heading": {
      color: "#fff",
    },
  },
}));

export default function Itembox(props) {
  const { particularorderlist, callbackFun } = props;
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        {particularorderlist &&
          particularorderlist.map((data, i) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Box mt={2}>
                  <MarketplaceCard
                    type="card"
                    data={data}
                    key={i}
                    callbackFun={callbackFun}
                  />
                </Box>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
}

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
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "40px",
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

function Collection() {
  const classes = useStyles();
  const [hotCollection, setHotCollection] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const hotCollectionList = async () => {
    try {
      const res = await axios.get(Apiconfig.hotCollections);
      if (res.data.statusCode === 200) {
        setHotCollection(res.data.result.docs);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    hotCollectionList();
    setHotCollection();
  }, []);
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
              Hot &nbsp;<span>Collections</span>
            </Typography>
          </Box>

          {/* <Typography variant="h3">
            <img src="images/Flame.png" />
            Hot &nbsp;<span>Collection</span>
          </Typography> */}
          <Box mt={5}>
            <Grid container spacing={3}>
              {isLoading ? (
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <ButtonCircularProgress />
                </Box>
              ) : (
                <>
                  {hotCollection &&
                    hotCollection.slice(0, 4).map((data, index) => {
                      return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                          <CollectionCard type="card" data={data} key={index} />
                        </Grid>
                      );
                    })}
                </>
              )}
              {hotCollection && hotCollection.length === 0 && <DataNotFound />}
            </Grid>
            <Box align="right" mt={3}>
              {hotCollection && hotCollection?.slice(0, 4).length >= 4 && (
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  component={Link}
                  to="/hot-collection"
                  className={classes.buttonright}
                >
                  View More
                </Button>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Collection;

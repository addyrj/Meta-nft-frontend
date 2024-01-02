import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

import {
  makeStyles,
  Paper,
  Typography,
  Box,
  Button,
  IconButton,
  Grid,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import GradeIcon from "@material-ui/icons/Grade";
import ShareIcon from "@material-ui/icons/Share";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: "30px",
    position: "relative",
    margin: "0 5px",
    background:
      "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
    border: "1px solid #A8CEDF",
    backdropFilter: "blur(42px)",
    borderRadius: "10px",
    overflow: "hidden",
    "&:hover": {
      // boxShadow: " rgba(149, 157, 165, 0.2) 0px 8px 24px",
      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      filter: "drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.25))",
      background: "#fff",
    },
    "& a": {
      position: "absolute",
      bottom: "10px",
      right: "15px",
      color: "#35A5F5",
      fontSize: "14px",
    },
    "& p": {
      fontSize: "12px",
    },
    "& .basecontent": {
      padding: "15px",
    },
  },
  text: {
    whiteSpace: "pre",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "calc(100% - 5px)",
    color: "#000",
  },
  mainimg: {
    width: "100%",
    height: "190px ",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "5px 5px 0px 0px",
    backgroundColor: "#ccc !important",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

function ExploreCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const { data, type } = props;
  const updateDimensions = () => {
    var offsetWidth = document.getElementById(
      "imagecard" + data?._id
    ).offsetWidth;
    var newoofsetWidth = offsetWidth - 80;
    document.getElementById("imagecard" + data?._id).style.height =
      newoofsetWidth + "px";
  };
  useEffect(() => {
    updateDimensions();
  }, [data, data?._id]);
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  return (
    <>
      <Paper className={classes.root} elevation={0}>
        <Box
          id={`imagecard${data?._id}`}
          className={classes.mainimg}
          style={
            data?.image
              ? { background: "url(" + data?.image + ")" }
              : { background: "url(" + "images/market_detail.png" + ")" }
          }
          // onClick={() => {
          //   history.push("/author");
          // }}
        ></Box>
        <Box className="basecontent" pb={2}>
          <Grid container spacing={1}>
            <Grid item xs={7} sm={8} align="left">
              <Typography variant="h6" className={classes.text}>
                {data?.title}
              </Typography>
            </Grid>
            <Grid item xs={5} sm={4} align="right">
              <Typography variant="body1">
                {" "}
                {moment(data?.updatedAt).format("DD-MM-YYYY")}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} align="right">
              <Typography
                variant="body2"
                align="left"
                style={{
                  textOverflow: "ellipsis",
                  minHeight: " 20px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {data?.description}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <a href={data?.url} target="_blank" style={{ textDecoration: "none" }}>
          Read More
        </a>
      </Paper>
    </>
  );
}

export default ExploreCard;

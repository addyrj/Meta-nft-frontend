import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { sortAddress, calculateTimeLeft } from "src/utils";
const useStyles = makeStyles((theme) => ({
  root: { paddingBottom: "70px" },
  root2: { paddingTop: "30px" },
  headsection: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: "15px",
    "& h1": {
      color: "#3B0D60",
      fontWeight: "700",
      fontSize: "40px",
    },
  },
  boxsection: {
    border: "1px solid #A8CEDF",
    overflow: "hidden",
    position: "relative",
    background:
      "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
    borderRadius: "10px",
    // backdropFilter: "blur(42px)",
    // maxHeight: "300px",
    // minHeight: "300px",

    "& h6": {
      color: " #3B0D60",
      fontWeight: "bold",
      fontSize: "18px",
      paddingTop: "7px",
    },
    [theme.breakpoints.down("xs")]: {
      borderRadius: "20px",
    },
  },

  text3: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "10px",
    "& h5": {
      color: "#E4C3DE",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "130%",
    },
  },
  text4: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "10px",
    "& h4": {
      color: "#D200A5",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "130%",
    },
  },
  price: {
    paddingBottom: "11px",
    "& h6": {
      fontWeight: "bold",
      fontSize: "10px",
      lineHeight: "130%",
      color: "#E4C3DE",
    },
  },
  box4: {
    backgroundColor: "#FCF2FA",
    borderRadius: "16px",
  },
  dotimg: {
    background: "#D200A5",
    boxShadow: "0px 4px 7px rgba(210, 0, 165, 0.25)",
  },
  mainimg: {
    width: "100%",
    height: "165px",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    // borderRadius: "40px 40px 10px 10px",
    backgroundColor: "#ccc !important",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "20px 20px 10px 10px",
    },
  },
  imgsec: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "-35px",
  },
  // follower: {
  //   marginTop: "40px",
  //   backgroundColor: "rgb(53, 165, 245)",
  //   borderRadius: "10px",
  //   padding: "5px 10px",
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   flexDirection: "column",

  //   "& h4": {
  //     fontStyle: "normal",
  //     fontWeight: "bold",
  //     fontSize: "10px",
  //     lineHeight: "130%",
  //     color: "#000",
  //   },
  //   "& h5": {
  //     fontStyle: "normal",
  //     fontWeight: "600",
  //     fontSize: "12px",
  //     lineHeight: "130%",
  //     color: "#E4C3DE",
  //   },
  // },
  namesection: {
    "& h6": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "18px",
      lineHeight: "130%",
    },
    "& h5": {
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#C6BECC",
      paddingTop: "10px",
    },
  },
  bio: {
    padding: "15px 0",
    "& h6": {
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#7E6196",
      maxHeight: "80px",
      textOverflow: "ellipsis",
      overflow: "hidden",
    },
  },
  btnfollow2: {
    // background: "rgba(255, 255, 255, 0.3)",
    backdropFilter: "blur(24px)",
    borderRadius: "10px",
    marginRight: "10px",
    padding: "4px 8px",
    background: "linear-gradient(261.87deg, #62D3F0 13.12%, #35A5F5 83.57%)",
    background: "top",

    "& h2": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "12px",
      lineHeight: "130%",
      textAlign: "center",
      color: "#fff",
    },
    "& h5": {
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "12px",
      lineHeight: "130%",
      color: "#fff",
      textAlign: "center",
    },
  },
}));

export default function CreatorCard(props) {
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
    <Box className={classes.boxsection}>
      <Box
        id={`imagecard${data?._id}`}
        className={classes.mainimg}
        style={
          data?.coverPic
            ? { cursor: "pointer", background: "url(" + data?.coverPic + ")" }
            : {
                cursor: "pointer",
                background: "url(" + "images/market_detail.png" + ")",
              }
        }
        onClick={() => {
          history.push({
            pathname: "/author",
            search: data._id,
          });
        }}
      ></Box>
      <Box className={classes.imgsec}>
        <Box
          style={{ marginLeft: "10px", cursor: "pointer" }}
          onClick={() => {
            history.push({
              pathname: "/author",
              search: data._id,
            });
          }}
        >
          <img
            src={data?.profilePic ? data?.profilePic : "images/Profile.png"}
            alt=""
            style={{ width: "60px", height: "60px", borderRadius: "90px" }}
          />
        </Box>
        <Box className={classes.follower}>
          <Box className={classes.btnfollow2}>
            <Typography variant="h5">Followers</Typography>
            <Typography variant="h2"> {data?.followingCount}</Typography>
          </Box>
          {/* <Typography variant="h4">Followers</Typography>
          <Typography variant="h5">{data?.followingCount}</Typography> */}
        </Box>
      </Box>
      <Box px={1}>
        <Box className={classes.namesection}>
          <Typography variant="h6" style={{ color: "#52565c" }}>
            {data.name ? data.name : "N/A"}
          </Typography>
          <Typography variant="h5">
            {sortAddress(data?.walletAddress)
              ? sortAddress(data?.walletAddress)
              : "N/A"}
          </Typography>
        </Box>
        <Box className={classes.bio}>
          {/* <Typography variant="h6">{data.bio}</Typography> */}
        </Box>
      </Box>
    </Box>
  );
}

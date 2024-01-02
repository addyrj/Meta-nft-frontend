import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { sortAddress } from "src/utils";
import DataNotFound from "src/component/DataNotFound";

import moment from "moment";

import DataNotFound2 from "src/component/DatanotFound2";

const useStyles = makeStyles((theme) => ({
  root: { paddingBottom: "120px" },
  nftcard: {
    background: "#FFFFFF",
    backdropFilter: "blur(44px)",
    borderRadius: "40px",
    padding: "10px",
  },
  nftImg: {
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "10px",
      overflow: "hidden",
      background: "rgba(0 , 0, 0, 0.041)",
      "& img": {
        maxHeight: "100%",
        maxWidth: "100%",
        height: "auto",
        width: "auto",
        display: "block",
      },
    },
  },
  tabBtn: {
    margin: "20px 0px 10px 0px",
    backgroundColor: "#FCF2FA",
    borderRadius: "22px",
    padding: "14px",
    "& button": { borderRadius: "15px" },
  },
  bidsDetails: {
    background: "#FFFFFF",
    backdropFilter: "blur(44px)",
    border: "0.5px solid #D3D3D3",
    boxSizing: "border-box",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0px 0px 10px 0px",
    padding: "5px",
  },
  profileimg: {
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "10px",
      overflow: "hidden",
      margin: 0,
      marginRight: "20px",
      width: "60px",
    },
    "& img": {
      cursor: "pointer",
      maxHeight: "100%",
      maxWidth: "100%",
      height: "auto",
      width: "auto",
      display: "block",
    },
  },
  price1: {
    "& h2": {
      fontWeight: "bold",
      color: "#fff",
      [theme.breakpoints.down("sm")]: {
        fontSize: "20px",
      },
    },
    "& p": {
      fontStyle: "normal",
      color: "#fff",
      [theme.breakpoints.down("sm")]: {
        fontSize: "14px",
      },
      "& a": {
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "14px",
        lineHeight: "130%",
        color: "#4ea6f5",
        [theme.breakpoints.down("sm")]: {
          fontSize: "12px",
        },
      },
    },
  },
  ellips: {
    color: "#50c0f2",
    whiteSpace: "pre",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "250px",
    "@media(max-width:520px)": {
      width: "100px",
    },
  },
  time: {
    // paddingRight: "25px",
    [theme.breakpoints.down("sm")]: {
      paddingRight: "7px",
    },
    "& p": {
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "130%",
      // color: "#727486",
      [theme.breakpoints.down("sm")]: {
        fontSize: "10px",
      },
    },
  },
}));

export default function Bids({ bidList }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box>
      {bidList &&
        bidList.map((data, index) => {
          return (
            <Box className={classes.bidsDetails}>
              <Box style={{ alignItems: "center", display: "flex" }}>
                <Box className={classes.profileimg}>
                  <figure>
                    <img
                      src={
                        data.userId.profilePic
                          ? data.userId.profilePic
                          : "/images/Profile.png"
                      }
                      alt=""
                      onClick={() => {
                        history.push({
                          pathname: "/author",
                          search: data.userId._id,
                        });
                      }}
                    />
                  </figure>
                </Box>
                <Box className={classes.price1}>
                  <Typography variant="h4" style={{ fontSize: " 0.875rem" }}>
                    {data?.price} QIE
                  </Typography>
                  <Typography variant="body2">
                    by{" "}
                    <span className={classes.ellips}>
                      {data.userId.name
                        ? data.userId.name
                        : sortAddress(data.userId.walletAddress)}
                    </span>{" "}
                    for 1 edition
                  </Typography>
                </Box>
              </Box>
              <Box className={classes.time}>
                <Typography
                  variant="body2"
                  style={{ fontSize: "12px", fontStyle: "normal" }}
                >
                  {" "}
                  {moment(data.createdAt).format("ll")}
                </Typography>
                <Typography
                  variant="body2"
                  style={{ fontSize: "12px", fontStyle: "normal" }}
                >
                  {" "}
                  {moment(data.createdAt).format("hh:mm A")}
                </Typography>
              </Box>
            </Box>
          );
        })}
      {bidList && bidList.length === 0 && <DataNotFound />}
    </Box>
  );
}

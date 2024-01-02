import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  makeStyles,
  List,
  ListItem,
  Paper,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Apiconfig from "src/ApiConfig/ApiConfig";
import { sortAddress } from "src/utils";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import CopyToClipboard from "react-copy-to-clipboard";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px",
    background:
      "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
    border: "1px solid #A8CEDF",
    backdropFilter: "blur(42px)",
    borderRadius: "10px",
    "&:hover": {
      border: "none",
      background: "#FFFFFF",
      boxSizing: "border-box",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    },
    "& ul": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 0,
      "& li": {
        padding: 0,
      },
    },
    "& figure": {
      height: "50px",
      width: "50px",
      margin: 0,
      borderRadius: "50%",
      backgroundColor: "#8f8f8f",
      marginRight: "10px",
      position: "relative",
      "& svg": {
        position: "absolute",
        top: "-5px",
        right: 0,
        color: "#2599fa",
        fontSize: "12px",
      },
      "& img": {
        width: "100%",
        maxWidth: "100%",
        height: "100%",
        borderRadius: "50%",
      },
      "& .vectorImg": {
        position: "absolute",
        top: "-3px",
        right: "-5px",
      },
    },
    "& h6": {
      width: " 100%",
      maxWidth: "150px",
      overflow: " hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      color: "#000",
      fontSize: "16px ",
      [theme.breakpoints.down("md")]: {
        maxWidth: "100px",
      },
      [theme.breakpoints.down("sm")]: {
        maxWidth: "150px",
      },
    },
    "& p": {},
    "& label": {
      fontSize: "14px",
      color: "#8B939A",
    },
    "& span": {
      fontSize: "12px",
    },
    "& small": {
      color: " #fff",
      paddingRight: "10px",
      fontSize: "12px",
      fontWeight: "500",
      marginTop: "0",
    },
  },
  firstChild: {
    width: "100%",
  },
  // lasttChild: {
  //   width: "30%",
  //   display: "flex",
  //   justifyContent: "flex-end",
  // },
}));
export default function SellersCard(props) {
  const classes = useStyles();
  const { data, number } = props;

  const history = useHistory();

  return (
    <Box
      className={classes.root}
      pt={2}
      style={{
        cursor: "pointer",
      }}
      // onClick={() => {
      //   history.push("/author");
      // }}
    >
      <List>
        <ListItem className={classes.firstChild}>
          <figure
            onClick={() => {
              history.push({
                pathname: "/author",
                search: data?._id,
                state: {
                  data: data,
                },
              });
            }}
          >
            <img
              src={data?.profilePic ? data?.profilePic : "images/HovR.png"}
            />
            <Box className="vectorImg">
              {/* <img src="images/Check.png" alt="Vector Image" /> */}
            </Box>
          </figure>
          <Box>
            <Typography
              variant="h6"
              onClick={() => {
                history.push({
                  pathname: "/author",
                  search: data?._id,
                  state: {
                    data: data,
                  },
                });
              }}
            >
              {data?.name ? data?.name : "..."}
            </Typography>
            <Typography variant="body2">
              {" "}
              {data.price ? data.price : sortAddress(data.walletAddress)}&nbsp;
              <CopyToClipboard text={data.walletAddress}>
                <FileCopyIcon
                  style={{ cursor: "pointer", fontSize: "13px" }}
                  onClick={() => toast.info("Copied")}
                />
              </CopyToClipboard>
            </Typography>
          </Box>
        </ListItem>
      </List>
    </Box>
  );
}

import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { getContract, sortAddress, swichNetworkHandler } from "src/utils";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import CopyToClipboard from "react-copy-to-clipboard";
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
      borderRadius: "40px 40px 10px 10px",
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
    padding: "22px 0px 22px 22px",
    padding: "10px",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  profileimg: {
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "40px 40px 10px 10px",
      overflow: "hidden",
      width: "75px",
    },
    "& img": {
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
    "& h6": {
      fontStyle: "normal",
      fontSize: "14px",
      color: "#fff",
      [theme.breakpoints.down("sm")]: {
        fontSize: "12px",
      },
      "& span": {
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "14px",
        lineHeight: "130%",
        color: "#D200A5",
        [theme.breakpoints.down("sm")]: {
          fontSize: "13px",
        },
      },
    },
  },
  time: {
    paddingRight: "25px",
    "& h6": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#C6BECC",
    },
  },
}));
const details1 = [
  {
    name: "Owner",
    add: "0xC3d7...7A1b",
  },
];
export const Details = ({ orderDetails }) => {
  const classes = useStyles();
  return (
    <Box>
      {details1.map((data, index) => {
        return (
          <Box className={classes.bidsDetails}>
            <Box className={classes.price1}>
              <Typography
                variant="subtitle2"
                style={{
                  whiteSpace: "pre",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  width: "250px",
                }}
              >
                {orderDetails?.userId?.name
                  ? orderDetails?.userId?.name
                  : sortAddress(orderDetails?.userId?.walletAddress)}
              </Typography>
              <Typography variant="body2" style={{ color: "#50c0f2" }}>
                {sortAddress(orderDetails?.userId?.walletAddress)}{" "}
                <CopyToClipboard text={orderDetails?.userId?.walletAddress}>
                  <FaRegCopy
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => toast.info("Copied")}
                  />
                </CopyToClipboard>
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

import {
  Grid,
  Box,
  Typography,
  Button,
  makeStyles,
  FormControl,
  FormHelperText,
  TextField,
  IconButton,
} from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import { UserContext } from "src/context/User";
import Web3 from "web3";
import React, { useState, useContext } from "react";
import axios from "axios";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  button: {
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "0px",
    boxShadow: "none",
    // borderBottom: "0",
    borderRadius: "0",
    height: "40px",
    background: "transparent",
    color: "#7E6196 !important ",
    borderRadius: "10px",
    "& svg": {
      width: "34px",
      height: "35px",
      background: "#FCF2FA",
      borderRadius: "10px",
      padding: "5px 6px",
      color: "rgba(152, 126, 171, 0.5)",
    },
    "&:hover": {
      backgroundColor: "#E6E6E6",
      boxShadow: "none",
      borderRadius: "5px",
    },
  },
  customizedButton: {
    position: "absolute",
    top: "-42px",
    right: "-9px",
    color: "#fff",
  },
  createbox: {
    "& .MuiDialog-paperScrollPaper": {
      width: 450,
      maxWidth: 450,
      minWidth: 450,
      [theme.breakpoints.down("sm")]: {
        width: "95%",
        maxWidth: "95%",
        minWidth: "95%",
      },
    },
  },
  createCollection: {
    "& figure": {
      height: 100,
      width: 100,
      minWidth: 100,
      marginRight: 15,
      borderRadius: "50%",
      background: "#C4C4C4",
      marginLeft: "-2px",
    },
    "& button": {
      marginTop: 15,
    },
  },
  mainboxbtn: {
    position: "relative",
  },
  maincollection: {
    position: "absolute",
    zIndex: " 99",
    right: "-8px",
    top: "-12px",
    cursor: "poiter",
    "&:hover": {
      color: "#e5cf58",
    },
  },

  selectedbutton: {
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "0px",
    boxShadow: "none",
    borderBottom: "0",
    borderRadius: "0",
    height: "40px",
    borderRadius: "10px",
    backgroundColor: "#E6E6E6",
    boxShadow: "none",
  },
  bgcolor: {
    backgroundColor: "#e5cf58 !important",
  },
}));
export default function BrandsubCollection({
  data,
  setSelectedbrandCollection,
  selectedbrandCollection,
  isLoading,
  getBrandCollectionListHanlder,
  getBrandListHanlder,
  setDataselect,
  setUpdatevalidation,
}) {
  const { account, library, chainId } = useWeb3React();
  const classes = useStyles();
  const history = useHistory();
  const user = useContext(UserContext);
  const web3 = (window.web3 = new Web3(window.ethereum));
  const [open, setOpen] = React.useState(false);
  const [formValue, setFormValue] = useState({
    displayName: "",
    symbol: "",
    description: "",
    shortUrl: "",
    collectionIMG: "",
    bannerImage: "",
  });

  const dataHandler = async () => {
    setSelectedbrandCollection(data);
    setDataselect("checkdata");
    setUpdatevalidation(false);
  };

  return (
    <>
      <Box className={classes.mainboxbtn}>
        {/* {data?.displayName === "HOVR" ? (
            ""
          ) : (
            <Box className={classes.maincollection}>
              <IconButton
                disabled={isLoading}
                onClick={handleClickOpen}
                size="small"
                className={classes.bgcolor}
              >
                <BiEdit style={{ cursor: "pointer", color: "#fff" }} />
              </IconButton>
            </Box>
          )} */}
        <Button
          variant="contained"
          size="large"
          color={
            selectedbrandCollection._id == data._id ? "primary" : "secondary"
          }
          style={{ width: "100%", marginLeft: "4px", height: "44px" }}
          onClick={dataHandler}
          className={
            setSelectedbrandCollection ? classes.selectedbutton : classes.button
          }
          disabled={isLoading}
        >
          <img
            src={
              data.collectionImage ? data.collectionImage : "/images/logo1.png"
            }
            alt="NftTokenABI"
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          />{" "}
          &nbsp;&nbsp;
          {/* {data.displayName}&nbsp;&nbsp; */}
          <Typography
            variant="body2"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",

              width: "90px",
            }}
          >
            {data.displayName}
          </Typography>
          <Typography variant="body2">
            {data.symbol === "HOVR" ? "" : data.symbol}
          </Typography>
        </Button>
      </Box>
    </>
  );
}

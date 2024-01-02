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
import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdModeEdit } from "react-icons/md";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
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
export default function CollectionCard({
  data,
  setSelectedCollection,
  selectedCollection,
  isLoading,
  getCollectionListHanlder,
}) {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const openCollectionHandler = async () => {
    setIsSubmit(true);
    setIsLoading(true);
    try {
      const res = await axios({
        method: "PUT",
        url: Apiconfigs.editCollection,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          _id: data._id,
          displayName: category,
        },
      });
      if (res.data.statusCode === 200) {
        setIsLoading(false);

        setOpen(false);
        toast.success(res.data.responseMessage);
        getCollectionListHanlder();
      } else {
        setOpen(false);

        setIsLoading(false);

        toast.warn(res.data.responseMessage);
      }
    } catch (error) {
      // setOpen(false);
      setIsLoading(false);

      console.log(error);
    }
  };

  return (
    <>
      <Box className={classes.mainboxbtn}>
        {data?.displayName === "HOVR" ? (
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
        )}

        <Button
          variant="contained"
          size="large"
          color={selectedCollection._id == data._id ? "primary" : "secondary"}
          style={{ width: "100%", marginLeft: "4px", height: "44px" }}
          onClick={() =>
            setSelectedCollection ? setSelectedCollection(data) : false
          }
          className={
            setSelectedCollection ? classes.selectedbutton : classes.button
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {" Are you sure you want to update collection ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box>
              <label>Collection Name</label>
              <FormControl fullWidth className={classes.margin}>
                <TextField
                  id
                  inputProps={{ maxLength: 20 }}
                  placeholder="Enter collection name"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  error={isSubmit && category == ""}
                  helperText={
                    isSubmit && category == "" && "Please enter collection name"
                  }
                />
              </FormControl>
            </Box>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={openCollectionHandler} color="primary">
            Yes {IsLoading && <ButtonCircularProgress />}
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

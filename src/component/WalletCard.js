import React, { useEffect, useContext, useState } from "react";
import {
  Typography,
  Box,
  makeStyles,
  FormHelperText,
  IconButton,
  Button,
  Container,
  FormGroup,
  FormControlLabel,
  Link as RouterLink,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { ACTIVE_NETWORK, getNetworkDetails } from "src/constants";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import CopyToClipboard from "react-copy-to-clipboard";
import ButtonCircularProgress from "./ButtonCircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Checkbox from "@material-ui/core/Checkbox";
import { GiCancel } from "react-icons/gi";
import { UserContext } from "src/context/User";
import ErrorIcon from "@material-ui/icons/Error";
import { useWeb3React } from "@web3-react/core";

import { SUPPORTED_WALLETS } from "src/connectors";

const useStyles = makeStyles((theme) => ({
  walletBox: {
    // background: "#FFFFFF",
    border: "1px solid #E9E9E9",
    // boxShadow: " 0px 4px 8px rgba(0, 0, 0, 0.12)",
    borderRadius: "25px",
    // padding: "30px",
    textAlign: "center",
    cursor: "pointer",
    // marginBottom:"50px",
    border: "1px solid transparent",
    minHeight: "185px",
    // height:"100%",
    // "&:hover": {
    //   border: "1px solid #0D8CCD",
    // },
    "& img": {
      marginBottom: "15px",
      maxWidth: "100%",
    },
    "& h5": {
      fontWeight: "600",
      fontSize: "22px",
      lineHeight: "33px",
      color: "#fff",
      marginBottom: "10px",
    },
    "& lavel": {
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "24px",
      color: "#3D3D3D",
    },
    width: "56%",
  },
  paper: {
    overflowY: "unset",
  },
  customizedButton: {
    position: "absolute",
    top: "-42px",
    right: "-9px",
    color: "#fff",
  },
  dialogBox: {
    padding: "30px",
    width: "325px !important",
    "@media(max-width:500px)": {
      width: "300px !important",
    },
    "@media(max-width:400px)": {
      width: "270px !important",
    },
  },
}));

export default function UsersCard(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [checked, setChecked] = React.useState(false);
  const [checkedTerms, setCheckedTerms] = React.useState(false);
  const history = useHistory();
  const user = useContext(UserContext);
  const handleClose2 = () => {
    setOpen2(false);
  };

  const {
    type,
    data,
    onWalletConnectHandler,
    isLoading,
    selectedWallet,
    errorMsg,
    handleClickOpen2,
    open2,
    setOpen2,
    open3,
    setOpen3,
    handleClickOpen3,
  } = props;
  const classes = useStyles();

  const handleClose3 = () => {
    setOpen3(false);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleChangecheckedTerms = (event) => {
    setCheckedTerms(event.target.checked);
  };
  // useEffect(() => {
  //   if (errorMsg !== "" && handleClickOpen3) {
  //     handleClickOpen3();
  //   }
  // }, [errorMsg]);
  const walletBlocktoast = () => {
    toast.warn("You have been blocked");
    handleClose2();
    history.push("/");
  };

  return (
    <Box
      style={{ display: "flex", justifyContent: "center", paddingTop: "30px" }}
    >
      <Box
        className={classes.walletBox}
        onClick={handleClickOpen2}
        //  onClick={() => setTermCondition(true)}
      >
        {SUPPORTED_WALLETS.map((item, i) => {
          return (
            <Box
              key={i}
              className={classes.metamaskhead}
              setOpen2={setOpen2}
              open2={open2}
              handleClickOpen2={handleClickOpen2}
              onWalletConnectHandler={(data) => {
                onWalletConnectHandler(data);
                // setSelectedWallet(data.name);
              }}
              index={i}
              data={SUPPORTED_WALLETS[0]}
            >
              <Box style={{ display: "flex", justifyContent: "space-between" }}>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h5"> {item.data?.name}</Typography>
                </Box>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Box>
                  <img
                    src={item.data?.iconName}
                    alt=""
                    width="70%"
                    style={{ height: "116px", width: "116px" }}
                  />
                </Box>
              </Box>
            </Box>
          );
        })}
        {/* <img src={data.data.iconName} width="200" height="250" alt="" />
        {isLoading && selectedWallet && selectedWallet === data.name && (
          <ButtonCircularProgress />
        )}
        <Typography variant="h5" align="center">
          {data.name}
        </Typography>
        <Typography variant="body1" component="lavel" align="center">
          {data.data.description}{" "}
        </Typography> */}
      </Box>
      {/* 
      <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box className="modal_text">
          <Typography variant="h5" align="center">
            NftTokenABI Terms Of Service
          </Typography>
          <Typography variant="body2" style={{ marginLeft: "10px" }}>
            Please take a few minutes to read and understand NftTokenABI terms of
            services to continue all need to accept the terms of services by
            checking the box
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox name="age" onChange={handleChange} color="primary" />
              }
              label="I am atleast 13 year old"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="terms"
                  onChange={handleChangecheckedTerms}
                  color="primary"
                />
              }
              label="I accept the NftTokenABI Terms of Services"
            />
          </FormGroup>
        </Box>

        <DialogActions>
          <Button
            style={{
              backgroundColor: "#039be3",
              color: "#fff",
              width: "80px",
              maxWidth: "100%",
              borderRadius: "50px",
              height: "40px",
            }}
            onClick={handleClose2}
            color="primary"
            autoFocus
          >
            Cancel
          </Button>
          &nbsp;&nbsp;
          {checked && checkedTerms && (
            <Button
              style={{
                backgroundColor: "#039be3",
                color: "#fff",
                width: "80px",
                maxWidth: "100%",
                borderRadius: "50px",
                height: "40px",
              }}
              disabled={!checked && !checkedTerms}
              onClick={() => onWalletConnectHandler(data)}
              color="primary"
              autoFocus
            >
              Proceed
            </Button>
          )}
        </DialogActions>
      </Dialog> */}

      {/* QI wallet */}

      <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.paper }}
      >
        {/* <DialogActions>
          <IconButton
            onClick={handleClose2}
            className={classes.customizedButton}
          >
            <GiCancel />
          </IconButton>
        </DialogActions> */}
        <DialogContent className={classes.dialogBox}>
          <Box className="modal_text">
            <Typography variant="h5">Optimism Terms Of Service</Typography>
            <Typography variant="body2" style={{ marginBottom: "10px" }}>
              Please take a few minutes to read and understand NftTokenABI terms
              of services to continue all need to accept the terms of services
              by checking the box
            </Typography>
            <Typography variant="body2">
              <Checkbox
                style={{ color: "#35a5f5" }}
                onChange={handleChange}
                color="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
              I am atleast 13 years old
            </Typography>
            <Typography variant="body2" style={{ marginBottom: "10px" }}>
              <Checkbox
                style={{ color: "#35a5f5" }}
                onChange={handleChangecheckedTerms}
                color="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
              I accept the Optimism{" "}
              <Link
                target="_blank"
                to="/terms-conditions"
                style={{ color: "#039be3", textDecoration: "none" }}
              >
                Terms of Services
              </Link>
            </Typography>
            <Button
              onClick={handleClose2}
              variant="contained"
              color="secondary"
              autoFocus
            >
              Cancel
            </Button>{" "}
            {checked && checkedTerms && user?.walletdata === "BLOCK" ? (
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={walletBlocktoast}
                autoFocus
              >
                Proceed
              </Button>
            ) : (
              <>
                {checked && checkedTerms && (
                  <>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      onClick={() => onWalletConnectHandler(data)}
                      autoFocus
                    >
                      Proceed
                    </Button>
                  </>

                  // <Button
                  //   variant="contained"
                  //   size="small"
                  //   color="primary"
                  //   onClick={() => onWalletConnectHandler(data)}
                  //   autoFocus
                  // >
                  //   Proceed
                  // </Button>
                )}
              </>
            )}
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog
        open={user.errorPop}
        onClose={() => user.setErrorPop(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.paper }}
      >
        <DialogActions>
          <IconButton
            onClick={() => user.setErrorPop(false)}
            className={classes.customizedButton}
          >
            <GiCancel />
          </IconButton>
        </DialogActions>
        <DialogContent className={classes.dialogBox}>
          <Box className="modal_text">
            <Box
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <ErrorIcon style={{ color: "red" }} />
            </Box>
            <Typography variant="h6" align="center">
              Error
            </Typography>
            <Box style={{ textAlign: "center" }}>
              <Typography variant="body2">{user.errorMsg}</Typography>
              <Typography variant="body2">
                If the problem persist please{" "}
                <span style={{ color: "#039be3" }}>Contact support</span>
              </Typography>
              <Button
                style={{
                  backgroundColor: "#039be3",
                  color: "#fff",
                  borderRadius: "50px",
                  height: "40px",
                  marginTop: "12px",
                  width: "160px",
                }}
                onClick={() => {
                  const selectectWalletDetails = SUPPORTED_WALLETS.filter(
                    (data) =>
                      data.name === window.sessionStorage.getItem("walletName")
                  );
                  onWalletConnectHandler(selectectWalletDetails[0]);
                }}
              >
                TRY AGAIN
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

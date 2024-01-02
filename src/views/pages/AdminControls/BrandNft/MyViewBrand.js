import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  Container,
  makeStyles,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Apiconfig from "src/ApiConfig/ApiConfig";
import { Link, useLocation } from "react-router-dom";
import moment from "moment";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { UserContext } from "src/context/User";
import { toast } from "react-toastify";

import Apiconfigs from "src/ApiConfig/ApiConfig";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
const useStyles = makeStyles({
  mainBox: {
    paddingTop: "32px",
    "& .termsAndConditions": {
      border: "1px solid #f1e7e7",
      padding: "25px",
      background: "#ffffff",
      borderRadius: "10px",
      filter: "drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.25))",
      boxShadow: "rgb(99 99 99 / 20%) 0px 2px 8px 0px",
      marginTop: "50px",
      backdropFilter: "blur(44px)",
    },
  },
  btn: {
    backgroundColor: "#313b48",
    color: "#FFFFFF",
    borderRadius: "40px",
    width: "150px",
    "&:hover": {
      background:
        "linear-gradient(124deg, rgba(47, 89, 149, 0.81) 18.76%, rgba(21, 29, 42, 0.87) 43.13%, rgba(0, 88, 241, 0.65) 96.83%)",
    },
  },
  imgbox: {
    marginTop: "10px",
    // display: "flex",
    // margin: "0 auto",
    // justifyContent: "center",

    "& img": {
      width: "100%",
      maxWidth: "300px",
      objectFit: "cover",
    },
  },
});

const MyViewBrand = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const { data } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const accessToken = window.localStorage.getItem("creatturAccessToken");
  const [mediaData, setMediaData] = React.useState([]);
  const [brandId, setBrandId] = React.useState("");
  const user = useContext(UserContext);
  console.log("userDataa****", user);
  const location = useLocation();
  console.log("location*****", location);
  const [formData, setFormData] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  useEffect(() => {
    if (location.search.substring(1, location.search.length)) {
      const id = location.search.substring(1, location.search.length);
      ViewHandler(id);
      setBrandId(id);
    }
  }, [location]);
  const [idds, setIdd] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeletecon = (id) => {
    setIdd(id);
    setOpen(true);
  };

  const ViewHandler = async (id) => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.ViewBrandnft,
        params: {
          _id: id,
        },
      });
      if (res.data.statusCode === 200) {
        setMediaData(res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const acceptbrandHandler = async () => {
    setIsLoader("approve");
    try {
      const res = await axios({
        method: "PUT",
        url: Apiconfigs.Approvebrand,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        params: {
          brandId: brandId,
        },
      });

      if (res.data.statusCode === 200) {
        toast.success(res.data.responseMessage);
        history.push("/brand-adminlist");
        setIsLoader(false);
      } else {
        setIsLoader(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoader(false);
    }
  };
  const rejectbrandHandler = async (id) => {
    setIsSubmit(true);
    try {
      if (formData !== "") {
        setIsLoader("reject");
        const res = await axios({
          method: "PUT",
          url: Apiconfigs.rejectbrand,
          headers: {
            token: window.sessionStorage.getItem("token"),
          },
          params: {
            brandId: brandId,
            reason: formData,
          },
        });

        if (res.data.statusCode === 200) {
          toast.success(res.data.responseMessage);
          setOpen(false);
          history.push("/brand-adminlist");
          setIsLoader(false);
        } else {
          toast.error(res.data.responseMessage);
        }
      }
    } catch (err) {
      console.log(err);
      setIsLoader(false);
    }
  };

  return (
    <>
      <Container maxWidth="md">
        <Box className={classes.mainBox}>
          <Box className="termsAndConditions">
            <Box>
              <Typography variant="h3"> View Brand NFT </Typography>
            </Box>
            <Grid container direction={"column"} spacing={3}>
              <Grid item xs={12}>
                <Box pt={3}>
                  <Grid container spacing={1}>
                    <Grid item lg={3} md={3} sm={3} xs={12}>
                      <Box>
                        <Typography variant="h6">Brand name </Typography>
                      </Box>
                    </Grid>

                    <Grid item lg={9} md={9} sm={9} xs={12}>
                      <Typography variant="body1">
                        {/* {faqdata.question}  */}
                        {mediaData?.brandName ? mediaData?.brandName : "N/A"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <Grid container spacing={1}>
                    <Grid item lg={3} md={3} sm={3} xs={12}>
                      <Typography variant="h6" style={{ marginTop: "-23px" }}>
                        Status{" "}
                      </Typography>
                    </Grid>
                    <Grid item lg={9} md={9} sm={9} xs={12}>
                      <Typography
                        variant="body1"
                        style={{ marginTop: "-23px" }}
                      >
                        {/* {faqdata.status} */}
                        {mediaData?.brandApproval
                          ? mediaData?.brandApproval
                          : "N/A"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              {mediaData?.brandApproval === "REJECT" ? (
                <>
                  <Grid item xs={12}>
                    <Box mt={2}>
                      <Grid container spacing={1}>
                        <Grid item lg={3} md={3} sm={3} xs={12}>
                          <Typography
                            variant="h6"
                            style={{ marginTop: "-23px" }}
                          >
                            Reason{" "}
                          </Typography>
                        </Grid>
                        <Grid item lg={9} md={9} sm={9} xs={12}>
                          <Typography
                            variant="body1"
                            style={{ marginTop: "-23px" }}
                          >
                            {/* {faqdata.status} */}
                            {mediaData?.reason ? mediaData?.reason : "N/A"}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </>
              ) : (
                ""
              )}

              <Grid item xs={12}>
                <Box>
                  <Grid container spacing={1}>
                    <Grid item lg={3} md={3} sm={3} xs={12}>
                      <Typography variant="h6">Date & Time</Typography>
                    </Grid>
                    <Grid item lg={9} md={9} sm={9} xs={12}>
                      <Typography
                        variant="body1"
                        style={{ wordBreak: "break-all" }}
                      >
                        {/* {moment(faqdata.createdAt).format("lll")} */}
                        {/* {faqdata.url} */}
                        {moment(
                          mediaData?.createdAt ? mediaData?.createdAt : "N/A"
                        ).format("lll")}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <Grid container spacing={1}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <Typography variant="h6">Logo</Typography>

                      <Box className={classes.imgbox}>
                        <img
                          //   src={faqdata.image ? faqdata.image : "N/A"}
                          src={
                            mediaData?.brandLogo ? mediaData?.brandLogo : "N/A"
                          }
                          alt=""
                          width="100%"
                        />
                      </Box>
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <Typography variant="h6">Cover Image</Typography>

                      <Box className={classes.imgbox}>
                        <img
                          //   src={faqdata.image ? faqdata.image : "N/A"}
                          src={
                            mediaData?.coverImage
                              ? mediaData?.coverImage
                              : "N/A"
                          }
                          alt=""
                          width="100%"
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            <Box pt={2}>
              <Grid container direction={"column"} spacing={2}>
                <Grid item xs={12} align="center">
                  <Box pb={2} pt={1}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isLoader}
                      onClick={() => history.push("/my-brandlist")}
                    >
                      Back
                    </Button>
                    {user?.userData?.userType === "Admin" &&
                    mediaData?.brandApproval === "PENDING" ? (
                      <>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          style={{ margin: "0px 10px" }}
                          onClick={() => acceptbrandHandler()}
                          disabled={isLoader}
                        >
                          Approve
                          {isLoader === "approve" && <ButtonCircularProgress />}
                        </Button>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          disabled={isLoader}
                          onClick={() => handleDeletecon()}
                        >
                          Reject
                        </Button>
                      </>
                    ) : (
                      ""
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            disabled={isLoader}
            fullWidth
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent className={classes.placeholdercolor}>
              <Typography variant="h4">Reason for rejection</Typography>
              <Box mt={1}>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  fullWidth
                  name="comment"
                  type="text"
                  multiline
                  rowsMax={5}
                  rows={5}
                  value={formData}
                  inputProps={{
                    maxLength: 650,
                  }}
                  onChange={(e) => setFormData(e.target.value)}
                  error={isSubmit && formData === ""}
                  helperText={
                    isSubmit &&
                    formData === "" &&
                    "Please enter your rejection reason"
                  }
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={rejectbrandHandler}
                className={classes.buttonApproveDailog}
                variant="contained"
                color="primary"
                disabled={isLoader}
                type="submit"
              >
                Yes {isLoader === "reject" && <ButtonCircularProgress />}
              </Button>
              <Button
                onClick={handleClose}
                className={classes.buttonRejectDailog}
                variant="contained"
                color="primary"
              >
                No
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Container>
    </>
  );
};

export default MyViewBrand;

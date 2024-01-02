import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  IconButton,
  List,
  ListItem,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as Yup from "yup";

import React, { useState, useContext, useEffect } from "react";
import { MdEmail, MdReport } from "react-icons/md";
import { Formik } from "formik";
import {
  FaTelegramPlane,
  FaCopy,
  FaTwitter,
  FaShareAlt,
  FaFacebookF,
} from "react-icons/fa";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { GiCancel } from "react-icons/gi";
import ApiConfig from "src/ApiConfig/ApiConfig";
import Owned from "./Owned";
import OnSale from "./OnSale";
import * as yup from "yup";
import axios from "axios";
import ShareSocialMedia from "src/component/ShareSocialMedia";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import { toast } from "react-toastify";
import { sortAddress } from "src/utils";
import CopyToClipboard from "react-copy-to-clipboard";
import { useLocation } from "react-router-dom";
import { UserContext } from "src/context/User";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import DataNotFound from "src/component/DataNotFound";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "70px 0px",
  },
  customizedButton: {
    position: "absolute",
    top: "-42px",
    right: "-9px",
    color: "#fff",
  },
  bannerimg: {
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundRepeat: " no-repeat !important",
    backgroundSize: "100% !important",
    height: "260px",
    borderRadius: "10px",
    margin: "0px",
    "@media(max-width:1010px)": {
      height: "140px",
      borderRadius: "10px",
    },
    "& img": {
      minHeight: "100%",
      minWidth: "100%",
      height: "auto",
      width: "auto",
    },
  },
  subsection: {
    display: "flex",
    justifyContent: "start",
    "& h4": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "40px",
      lineHeight: "130%",
    },
    "& h5": {
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "130%",
      color: "rgba(0, 0, 0, 0.5)",
    },
  },
  text1: {
    "& h4": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "40px",
      lineHeight: "130%",
      "@media(max-width:1010px)": {
        fontSize: "30px",
      },
      "@media(max-width:930px)": {
        fontSize: "25px",
      },
    },
    "& h5": {
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "130%",
      color: "rgba(0, 0, 0, 0.5)",
    },
  },
  idtxt: {
    display: "flex",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "18px",
    color: "#3B0D60",
    alignItems: "center",
    "@media(max-width:818px)": {
      display: "block",
    },
  },
  btnbox1: {
    "& button": {
      borderRadius: "10px",
      fontWeight: "600",
      fontSize: "14px",
      marginRight: "4px",
      "&.active": {
        color: "#fff",
        boxShadow: "0px 4px 4px rgb(0 0 0 / 25%)",
        background:
          "linear-gradient(261.87deg, #62D3F0 13.12%, #35A5F5 83.57%)",
      },
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

  socialMediaIcon: {
    fontSize: "30px",
    color: "#C6BECC",
  },
  btnfollow: {
    borderRadius: "10px",
    "& Button": { borderRadius: "10px", margin: "0px" },
    "& .IconButton": {
      borderRadius: "10px",
    },
  },
  btnfollow2: {
    background: "linear-gradient(261.87deg, #62D3F0 13.12%, #35A5F5 83.57%)",
    backdropFilter: "blur(24px)",
    borderRadius: "10px",
    margin: "0px 10px",
    padding: "15px 15px",
    height: "40px",
    "@media(max-width:818px)": {
      padding: "6px 16px",
    },
  },
  btnfollow3: {
    padding: "15px 15px",
    background: "linear-gradient(261.87deg, #62D3F0 13.12%, #35A5F5 83.57%)",
    backdropFilter: "blur(24px)",
    borderRadius: "10px",
    height: "40px",
  },
  headbox2: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    marginBottom: "15px",
    "@media(max-width:767px)": {
      display: "block",
      padding: "0 10px",
    },
  },
  btnhead: {
    display: "flex",
    marginTop: "-170px",
    alignItems: "center",
    "@media(max-width:800px)": { marginTop: "20px", marginBottom: "20px" },
  },
  profileimg: {
    marginTop: "-140px",
    overflow: "hidden",
    display: "flex",
    backgroundPosition: "center !important",
    backgroundSize: "100% !important",
    backgroundRepeat: " no-repeat !important",
    width: "175px",
    height: "175px",
    border: "2px solid #4ea6f5",
    borderRadius: "10px",
    "@media(max-width:1010px)": {
      marginTop: "-100px",
      width: "110px",
      height: "110px",
    },
    "@media(max-width:800px)": {
      marginTop: "-65px",
      width: "110px",
      height: "110px",
    },
    "& img": {
      minHeight: "100%",
      minWidth: "100%",
      height: "auto",
      width: "auto",
    },
  },

  FollowingBox: {
    overflowx: "scroll",
  },
  file: {
    padding: "10px 10px 10px 10px",
    borderRadius: "50%",
    "& svg": {
      color: "#4ea6f5",
    },
  },
  address: {
    display: "flex",
    alignItems: "center",
    "& h6": {
      color: theme.palette.secondary.main,
      fontWeight: "bold",
      color: "#fff",
    },
  },
}));

export default function Author() {
  const user = useContext(UserContext);
  const [openShare, setOpenShare] = useState(false);
  const [openReport, SetOpenReport] = useState(false);
  const [openBuy, setOpenBuy] = useState(false);
  const location = useLocation();

  const [tabview, setTabView] = useState("OnSale");
  const handleClose = () => {
    setOpenBuy(false);
  };
  const [isLoadingData, setIsLoadingData] = useState(true);
  const classes = useStyles();
  const [isActive, setActive] = useState(false);
  const [isActive1, setActive1] = useState(false);
  const [onOwnedCount, setOnOwnedCount] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [onSaleList, setOnSaleList] = useState([]);
  const [userId, setUserId] = useState();
  const [idd, setIdd] = useState();
  const [onsaleCount, setOnsaleCount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [textfield, settextfield] = useState();
  useEffect(() => {
    if (location.search && location.search.length > 0) {
      const ids = location.search.split("?");
      if (ids[1]) {
        setUserId(ids[1]);
      }
    }
  }, [location]);

  const formInitialSchema = { formData: "" };
  const formValidationSchema = yup
    .object()
    .shape({ formData: Yup.string().required("Please Enter Message field") });

  const [data, setData] = useState({
    search: "",
  });
  useEffect(() => {
    if (location.search.substring(1, location.search.length)) {
      const id = location.search.substring(1, location.search.length);
      setIdd(id);
    }
  }, [location.search, idd]);

  const toggleClass = () => {
    setActive(!isActive);
  };
  const toggleClass1 = () => {
    setActive1(!isActive1);
  };
  const getProfileHandler = async (id, cancelTokenSource) => {
    try {
      const res = await axios.get(Apiconfigs.getUserDetails + id, {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
      });

      if (res.data.statusCode === 200) {
        setProfileData(res.data.result[0]);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  const userReportHandler = async (values) => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "POST",
        url: Apiconfigs.userReports,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          userId: userId,
          message: values.formData,
        },
      });
      if (res.data.statusCode === 200) {
        toast.success("You report this user successfully");
        SetOpenReport(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const userOwnedCountHAndler = async (id) => {
    try {
      const res = await axios.get(ApiConfig.userOwendCount + id, {
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        setOnOwnedCount(res.data.result);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    if (userId) {
      getProfileHandler(userId, cancelTokenSource);
      userOnSaleCountHandler(userId, cancelTokenSource);
      getFollowersCountsApiData(userId, cancelTokenSource);
      userOwnedCountHAndler(userId);
    }
    return () => {
      cancelTokenSource.cancel();
    };
  }, [userId, user.userData]);
  const updateDatahandler = async () => {
    if (userId) {
      getProfileHandler(userId);
      userOnSaleCountHandler(userId);
      getFollowersCountsApiData(userId);
    }
  };
  const followUnfollowHandler = async (id) => {
    if (user.isLogin) {
      try {
        const res = await axios.get(ApiConfig.followUnfollow + id, {
          headers: {
            token: window.sessionStorage.getItem("token"),
          },
        });
        if (res.data.statusCode === 200) {
          toast.success(res.data.responseMessage);
          updateDatahandler(userId);
        } else {
          toast.warn(res.data.responseMessage);
        }
      } catch (error) {
        console.log("ERRROR", error);
        toast.error(error.message);
      }
    } else {
      toast.warn("Please connect your wallet");
    }
  };
  const getFollowersCountsApiData = async (id, cancelTokenSource) => {
    try {
      const res = await axios.get(ApiConfig.userFollowerCount + id, {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
      });
      if (res.status === 200) {
        if (user.userData) {
          const resArr = res.data.result.followers.filter(
            (data) => data._id === user.userData._id
          );
          setIsFollowing(resArr.length > 0 ? true : false);
        }
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  const userOnSaleCountHandler = async (id, cancelTokenSource) => {
    try {
      const res = await axios.get(ApiConfig.userOnSaleCount + id, {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
      });

      if (res.data.statusCode === 200) {
        setOnSaleList(res.data.result.docs);
      }
      setIsLoadingData(false);
    } catch (error) {
      setIsLoadingData(false);

      console.log("ERROR", error);
    }
  };
  useEffect(() => {
    setOnOwnedCount([]);
    setOnSaleList([]);
  }, []);

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    if (userId) {
      getProfileHandler(userId, cancelTokenSource);
    }
    return () => {
      cancelTokenSource.cancel();
    };
  }, [userId, user.userData]);
  return (
    <Box className={classes.root}>
      <Container maxWidth="lg">
        <figure className={classes.bannerimg}>
          <img
            src={
              profileData?.coverPic
                ? profileData?.coverPic
                : "/images/BannerImg.png"
            }
            alt="bannerimg"
          />
        </figure>
        <Box className={classes.headbox2}>
          <Box style={{ display: "flex", flexWrap: "wrap" }}>
            <figure className={classes.profileimg}>
              <img
                src={
                  profileData?.profilePic
                    ? profileData?.profilePic
                    : "/images/Profile.png"
                }
                alt=""
              />
            </figure>
            <Box className={classes.text1}>
              <Typography variant="h4">
                {" "}
                {profileData?.name ? profileData?.name : "-"}
              </Typography>
              <Typography variant="h5">{profileData?.userName}</Typography>
              <Box className={classes.address} mt={1}>
                <Typography variant="h6">
                  {" "}
                  {sortAddress(profileData?.walletAddress)}&nbsp;
                </Typography>
                <CopyToClipboard text={profileData?.walletAddress}>
                  <IconButton>
                    <FaCopy
                      src="/images/file.png"
                      alt="hghgh"
                      style={{ cursor: "pointer", fontSize: "18px" }}
                      onClick={() => toast.info("Copied")}
                    />
                  </IconButton>
                </CopyToClipboard>
              </Box>
            </Box>
          </Box>
          <Box className={classes.btnhead}>
            <Box className={classes.btnfollow}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={() => followUnfollowHandler(userId)}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            </Box>
            <IconButton
              className={classes.btnfollow2}
              onClick={() => setOpenShare(true)}
            >
              <FaShareAlt style={{ color: "#FFFFFF" }} />
            </IconButton>
            <IconButton
              className={classes.btnfollow3}
              onClick={() => SetOpenReport(true)}
            >
              <MdReport style={{ color: "#FFFFFF" }} />
            </IconButton>
          </Box>
        </Box>
        <Box className={classes.btnbox1}>
          <Button
            variant="h6"
            className={tabview === "OnSale" ? "active" : ""}
            onClick={() => setTabView("OnSale")}
          >
            On sale
          </Button>
          <Button
            className={tabview === "Owned" ? "active" : " "}
            onClick={() => setTabView("Owned")}
          >
            Owned
          </Button>
        </Box>
        <hr
          style={{
            border: "1px solid rgb(98 212 240)",
            marginTop: "8px",
          }}
        />
        {isLoadingData ? (
          <Box
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <ButtonCircularProgress />
          </Box>
        ) : (
          <Box mt={3}>
            {tabview === "Owned" ? <Owned onOwnedCount={onOwnedCount} /> : ""}
            {tabview === "OnSale" ? <OnSale onSaleList={onSaleList} /> : ""}
          </Box>
        )}

        <Dialog
          open={openShare}
          onClose={() => setOpenShare(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          classes={{ paper: classes.paper }}
          maxWidth="xs"
        >
          <DialogActions>
            <IconButton
              onClick={() => setOpenShare(false)}
              className={classes.customizedButton}
            >
              <GiCancel />
            </IconButton>
          </DialogActions>
          <DialogContent className={classes.padding0}>
            <Box className={classes.sharemodal} mb={2} align="center" mt={3}>
              <ShareSocialMedia url={window.location} />
            </Box>
          </DialogContent>
        </Dialog>
        <Dialog
          open={openReport}
          onClose={() => SetOpenReport(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          classes={{ paper: classes.paper }}
          maxWidth="xs"
        >
          <DialogActions>
            <IconButton
              onClick={() => SetOpenReport(false)}
              className={classes.customizedButton}
            >
              <GiCancel />
            </IconButton>
          </DialogActions>
          <DialogContent className={classes.padding0}>
            <Box mb={3}>
              <Typography variant="body2" style={{ fontSize: "12px" }}>
                Describe why you think this item should be removed from
                marketplace
              </Typography>

              <Formik
                initialValues={formInitialSchema}
                initialStatus={{
                  success: false,
                  successMsg: "",
                }}
                validationSchema={formValidationSchema}
                onSubmit={(values) => userReportHandler(values)}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  touched,
                  values,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Box className={classes.maintext}>
                      <Grid container spacing={2}>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                          <Box mt={2}>
                            <TextField
                              id="outlined-basic"
                              variant="outlined"
                              error={Boolean(
                                touched.formData && errors.formData
                              )}
                              helperText={touched.formData && errors.formData}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.formData}
                              name="formData"
                              placeholder="Tell us some details..."
                              type="text"
                              fullWidth
                              multiline
                              rowsMax={5}
                              rows={5}
                            />
                          </Box>
                        </Grid>

                        <Box mt={2} align="right">
                          <Button
                            disabled={isLoading}
                            type="submit"
                            variant="contained"
                            color="primary"
                            // onClick={() => userReportHandler()}
                          >
                            Report {isLoading && <ButtonCircularProgress />}
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            style={{ marginLeft: "10px" }}
                            onClick={() => SetOpenReport(false)}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </Grid>
                    </Box>
                  </form>
                )}
              </Formik>
            </Box>
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
}

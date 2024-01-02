import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  TextField,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { UserContext } from "src/context/User";
import {
  NftTokenAddress,
  ACTIVE_NETWORK,
  swichNetworkHandler,
  currency,
} from "src/constants";
import Button from "@material-ui/core/Button";
import axios from "axios";
import ApiConfig from "src/ApiConfig/ApiConfig";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";

import {
  validUrl,
  validemailUrl,
  validinsta,
  validtwitter,
  validtelegram,
} from "src/utils";

const useStyles = makeStyles((theme) => ({
  bannerBox: {
    padding: "40px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "50px 0",
    },
    "& .MuiOutlinedInput-multiline": {
      padding: "7px",
    },
  },
  nftImg: {
    width: "100%",
    height: "165px",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "100% !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "10px 10px 10px 10px",
    backgroundColor: "#ccc !important",
  },
  fontSixeText: {
    fontSize: "16px",
    fontWeight: "300",
  },
  paper: {
    overflowY: "unset",
  },
  root: {
    padding: "50px 30px",
    boxShadow: "rgb(99 99 99 / 20%) 0px 2px 8px 0px",
    boxSizing: "border-box",
    borderRadius: "10px",
    backdropFilter: "blur(44px)",
    backgroundColor: "#FFFFFF",
    "& h1": {
      color: "#fff",
      fontSize: "40px",
      fontWeight: "600",
      textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      [theme.breakpoints.down("xs")]: {
        fontSize: "20px",
      },
    },
  },
  imgbox: {
    width: "100%",
    minHeight: "150px",
    border: "1px solid rgba(0, 0, 0, 0.4)",
    borderRadius: "10px",
    marginTop: "10px",
    // padding: "8px",
  },
  linktext1: {
    fontSize: "20px",
    fontWeight: "500",
    color: "#fff",
  },
  formcontrolbox: {
    "& .MuiInputBase-root": {
      width: "100%",
    },
  },
  outlineborder1: {
    "& .react-tel-input .form-control": {
      width: "100%",
      backgroundColor: "transparent",
      color: "#6D6D6D",
      borderBottom: "1px solid #949494",
      borderTop: " none",
      borderLeft: "none",
      borderRight: "none",
      borderRadius: "0px",
    },
    "& .react-tel-input .country-list .country": {
      padding: "7px 9px",
      textAlign: "left",
      backgroundColor: "#fff",
      color: "#000",
      "&:hover": {
        backgroundColor: "#d9ebf4",
      },
    },
    "& .react-tel-input .selected-flag": {
      backgroundColor: "#202020",
    },
    "& .react-tel-input .selected-flag .arrow": {
      left: "20px",
    },
    "& .react-tel-input .country-list .country.highlight": {
      backgroundColor: "#f1f1f1",
    },
    "& .react-tel-input .selected-flag": {
      "&:hover": {
        backgroundColor: "none",
      },
    },
    "& .react-tel-input .flag-dropdown ": {
      backgroundColor: "transparent",
      borderRight: "1px solid #949494",
      border: "none",
      height: "25px",
      position: "absolute",
      top: "5px",
    },
    "& .react-tel-input .flag-dropdown.open .selected-flag": {
      backgroundColor: "#f1f1f1",
    },
  },
}));

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 41,
    height: 20,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(19px)",
      color: "#039BE3",
      "& + $track": {
        opacity: 1,
        backgroundColor: "#039BE3",
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 17,
    height: 17,
    backgroundColor: "#fff",
    boxShadow: "none",
  },
  track: {
    borderRadius: 25,
    opacity: 1,
    backgroundColor: "#039BE3",
  },

  checked: {},
}))(Switch);

export default function Addyourbrand(props) {
  const classes = useStyles();
  const { account, library, chainId } = useWeb3React();
  const { data, type, index } = props;
  const location = useLocation();
  const history = useHistory();
  const [isInvalidUrl, setIsInValidVUrl] = useState(false);
  const [isInstaUrl, setIsInstaUrl] = useState(false);
  const [isTwitterUrl, setIsTwitterUrl] = useState(false);
  const [isTelegramUrl, setIsTelegramUrl] = useState(false);
  const [isInvalidemailUrl, setIsInValidemailVUrl] = useState(false);

  const user = useContext(UserContext);
  const [description, setDescription] = useState("");
  const [tabview, setTabView] = useState("BARCODE");
  const [isAdvance, setIsAdvance] = useState(false);
  const [imgBlob, setImgBlob] = useState("");
  const [imgBlob1, setImgBlob1] = useState("");
  const [isSubmit1, setIsSubmit1] = useState(false);
  const [imgFile, setImgFile] = useState("");
  const [imgFile1, setImgFile1] = useState("");
  const [craft, setCraft] = useState("");
  const [imgFileBase, setImgFileBase] = useState("");
  const [imgFileBase1, setImgFileBase1] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [coverBlob, setCoverBlob] = useState("");
  const [fileTypeCheck, setFileTypeCheck] = useState("");
  const [fileTypeCheck1, setFileTypeCheck1] = useState("");
  const [allCategory, setlistCategory] = useState();
  const [selectCData, setSelectCData] = useState();
  const [brandname, setBrandname] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instragram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [telegram, setTelegram] = useState("");
  const [bio, setBio] = useState("");
  const [features, setFeatures] = useState("");
  const [physical, setPhysical] = useState("");
  const [benefits, setBenefits] = useState("");
  const [emailid, setEmailid] = useState("");
  const [countryCode, setCountryCode] = useState();
  const [mobileNumber, setFieldValue] = useState();
  console.log("mobilenooo**", mobileNumber);
  const [procons, setProcons] = useState("");
  const web3 = (window.web3 = new Web3(window.ethereum));
  const [transactionStatus, setTransactionStatus] = useState("Submit");

  const listCategoryapi = async (id) => {
    try {
      const formData = new FormData();
      formData.append("brandId", id);
      formData.append("contractAddress", NftTokenAddress);
      formData.append("network", chainId);
      formData.append("displayName", brandname);
      formData.append("collectionImage", imgFile);
      formData.append("bannerImage", imgFile1);
      const res = await axios({
        method: "POST",
        url: ApiConfig.createCollection,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: formData,
        // data: {
        //   brandId: id,
        //   contractAddress: "",
        //   network: "",
        //   displayName: brandname,
        //   symbol: "",
        //   shortURL: "",
        //   collectionImage: imgFileBase,
        //   bannerImage: imgFileBase1,
        //   baseURI: "",
        //   isPromoted: "",
        // },
      });
      if (res.data.statusCode == 200) {
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (err) {
      console.log("Error: ", err);
    };
  };

  const submitCreateNFTHanlder = async () => {
    setIsSubmit1(true);
    if (chainId === ACTIVE_NETWORK) {
      if (
        brandname !== "" &&
        bio !== "" &&
        features !== "" &&
        physical !== "" &&
        benefits !== "" &&
        emailid !== "" &&
        imgFileBase !== "" &&
        imgFileBase1 !== ""
      ) {
        setIsLoading(true);
        setTransactionStatus("Loading...");
        // toast.warn("Please do not refresh the page");
        try {
          const formData = new FormData();
          const res = await axios({
            method: "POST",
            url: ApiConfig.addBrand,
            headers: {
              token: window.sessionStorage.getItem("token"),
            },
            data: {
              brandName: brandname,
              bio: bio,
              brandLogo: imgFileBase,
              coverImage: imgFileBase1,
              // codeType: tabview,
              facebookLink: facebook,
              twitterLink: twitter,
              instagramLink: instragram,
              telegramLink: telegram,
              pros: procons,
              benefits: benefits,
              storeAddress: physical,
              email: emailid,
              mobileNumber: mobileNumber,
              cons: features,
            },
          });
          if (res.data.statusCode == 200) {
            toast.success("Add brand request sent successfully");
            setIsLoading(false);
            setIsSubmit1(false);

            // listCategoryapi(res.data.result._id);
            setTransactionStatus("Submit");
            history.push({
              pathname: "my-brandlist",
            });
          } else {
            setIsLoading(false);
            setTransactionStatus("Submit");
            toast.warn("This branch name is already in use.");
          }
        } catch (error) {
          console.log(error);
          setIsLoading(false);
          setTransactionStatus("Submit");
          if (error.response) {
            toast.error(error.response.data.responseMessage);
          } else {
            toast.error(error.message);
          }
        }
      } else {
        toast.warn("Please enter valid data ");
      }
    } else {
      swichNetworkHandler();
      setIsLoading(false);
    }
  };
  return (
    <>
      <Box className={classes.bannerBox}>
        <Container maxWidth="md">
          <Box className={classes.root}>
            <Box className={classes.heading}>
              <Typography variant="h1">
                Add Your {""}
                <span style={{ color: "#e5cf58" }}>Brand</span>
              </Typography>
            </Box>
            <Box>
              <Box mt={3}>
                <label className={classes.fontSixeText}>
                  Brand Name <span style={{ color: "#ff7d68" }}>*</span>
                </label>
                <FormControl fullWidth>
                  <TextField
                    inputProps={{ maxLength: 35 }}
                    placeholder="Brand name"
                    disabled={isLoading}
                    value={brandname}
                    onChange={(e) => setBrandname(e.target.value)}
                    error={isSubmit1 && brandname === ""}
                    helperText={
                      isSubmit1 && brandname === "" && "Please enter brand name"
                    }
                  />
                </FormControl>
              </Box>
              <Box mt={2}>
                <label className={classes.fontSixeText}>
                  Enter Bio<span style={{ color: "#ff7d68" }}>*</span>
                </label>
                <FormControl fullWidth>
                  <TextField
                    id="standard-multiline-flexible"
                    multiline
                    maxRows={4}
                    inputProps={{
                      maxLength: 600,
                    }}
                    fullWidth
                    placeholder="Please enter bio"
                    value={bio}
                    disabled={isLoading}
                    onChange={(e) => setBio(e.target.value)}
                    error={isSubmit1 && bio === ""}
                    helperText={isSubmit1 && bio === "" && "Please enter bio"}
                  />
                </FormControl>
              </Box>
              <Box mt={3}>
                <Grid container spacing={2}>
                  <Grid
                    item
                    lg={7}
                    md={7}
                    sm={7}
                    xs={12}
                    className={classes.gridbox1}
                  >
                    <Grid item xs={12} md={12}>
                      <Box className="cardCreate">
                        <label className={classes.fontSixeText}>
                          Upload Brand Logo{" "}
                          <span style={{ color: "#ff7d68" }}>*</span>
                        </label>

                        <Box className="uploadBox" mt={1}>
                          <Typography
                            variant="body2"
                            style={{
                              color: "rgba(0, 0, 0, 0.25)",
                              fontSize: " 16px",
                            }}
                          >
                            JPG, PNG, GIF, WEBP. Max 10mb.
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{
                              color: "rgba(0, 0, 0, 0.25)",
                              fontSize: " 16px",
                            }}
                          >
                            (620 x 620 recommended)
                          </Typography>
                          <Box mt={2}>
                            <input
                              disabled={isLoading}
                              style={{ display: "none" }}
                              id="raised-button-file-img"
                              accept="image/*,.mp4,.webp,.mp3"
                              multiple
                              type="file"
                              onChange={(e) => {
                                if (e.target.files[0]) {
                                  setImgBlob(
                                    URL.createObjectURL(e.target.files[0])
                                  );
                                  setImgFile(e.target.files[0]);
                                  getBase64(e.target.files[0], (result) => {
                                    setImgFileBase(result);
                                  });
                                  var fileExtention = e.target.files[0].name
                                    .split(".")
                                    .pop();
                                  var fileType =
                                    fileExtention == "mp4" ||
                                    fileExtention == "webp"
                                      ? "video"
                                      : fileExtention == "mp3"
                                      ? "audio"
                                      : "image";

                                  setFileTypeCheck(fileType);
                                }
                              }}
                            />
                            <FormHelperText error>
                              {imgFile &&
                                imgFile.size > 20000000 &&
                                "File limit 20MB"}
                            </FormHelperText>
                            <label htmlFor="raised-button-file-img">
                              {imgBlob ? (
                                <Button
                                  disabled={isLoading}
                                  variant="contained"
                                  color="primary"
                                  component="span"
                                >
                                  Edit File
                                </Button>
                              ) : (
                                <Button
                                  disabled={isLoading}
                                  variant="contained"
                                  color="primary"
                                  component="span"
                                >
                                  Choose File
                                </Button>
                              )}
                            </label>
                            {isSubmit1 && imgBlob === "" && (
                              <Typography
                                variant="body2"
                                style={{
                                  color: "#ff7d68",
                                  fontSize: "0.75rem",
                                }}
                              >
                                Please select image
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                  {/* //one */}
                  <Grid
                    item
                    lg={5}
                    md={5}
                    sm={5}
                    xs={12}
                    className={classes.gridbox}
                    order="0"
                  >
                    <Box className={classes.imgbox}>
                      <Box>
                        {coverBlob && (
                          <Box
                            className={classes.nftImg}
                            style={{
                              background: `url(${
                                coverBlob !== ""
                                  ? coverBlob
                                  : "/media/cc0-videos/flower.mp4"
                              })`,
                            }}
                          ></Box>
                        )}
                        {fileTypeCheck === "video" && (
                          <video
                            controls="false"
                            autoplay="true"
                            loop
                            muted
                            playsinline="true"
                            style={{ height: "98px" }}
                          >
                            <source src={imgBlob} type="video/mp4" />
                          </video>
                        )}
                        {fileTypeCheck === "audio" && (
                          <audio controls>
                            <source src={imgBlob} type="audio/mpeg" />
                          </audio>
                        )}
                        {fileTypeCheck === "image" && (
                          <Box
                            className={classes.nftImg}
                            style={{
                              background: `url(${
                                imgBlob !== ""
                                  ? imgBlob
                                  : "/media/cc0-videos/flower.mp4"
                              })`,
                            }}
                          ></Box>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    lg={7}
                    md={7}
                    sm={7}
                    xs={12}
                    className={classes.gridbox1}
                  >
                    <Grid item xs={12} md={12}>
                      <Box className="cardCreate">
                        <label className={classes.fontSixeText}>
                          Upload Cover Photo{" "}
                          <span style={{ color: "#ff7d68" }}>*</span>
                        </label>
                        <Box className="uploadBox" mt={1}>
                          <Typography
                            variant="body2"
                            style={{
                              color: "rgba(0, 0, 0, 0.25)",
                              fontSize: " 16px",
                            }}
                          >
                            JPG, PNG, GIF, WEBP. Max 10mb.
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{
                              color: "rgba(0, 0, 0, 0.25)",
                              fontSize: " 16px",
                            }}
                          >
                            (620 x 620 recommended)
                          </Typography>
                          <Box mt={2}>
                            <input
                              disabled={isLoading}
                              style={{ display: "none" }}
                              id="raised-button-file-img1"
                              accept="image/*,.mp4,.webp,.mp3"
                              multiple
                              type="file"
                              onChange={(e) => {
                                if (e.target.files[0]) {
                                  setImgBlob1(
                                    URL.createObjectURL(e.target.files[0])
                                  );
                                  setImgFile1(e.target.files[0]);
                                  getBase64(e.target.files[0], (result) => {
                                    setImgFileBase1(result);
                                  });
                                  var fileExtention = e.target.files[0].name
                                    .split(".")
                                    .pop();
                                  var fileType =
                                    fileExtention == "mp4" ||
                                    fileExtention == "webp"
                                      ? "video"
                                      : fileExtention == "mp3"
                                      ? "audio"
                                      : "image";

                                  setFileTypeCheck1(fileType);
                                }
                              }}
                            />
                            <FormHelperText error>
                              {imgFile1 &&
                                imgFile1.size > 20000000 &&
                                "File limit 20MB"}
                            </FormHelperText>
                            <label htmlFor="raised-button-file-img1">
                              {imgBlob1 ? (
                                <Button
                                  disabled={isLoading}
                                  variant="contained"
                                  color="primary"
                                  component="span"
                                >
                                  Edit File
                                </Button>
                              ) : (
                                <Button
                                  disabled={isLoading}
                                  variant="contained"
                                  color="primary"
                                  component="span"
                                >
                                  Choose File
                                </Button>
                              )}
                            </label>
                            {isSubmit1 && imgBlob1 === "" && (
                              <Typography
                                variant="body2"
                                style={{
                                  color: "#ff7d68",
                                  fontSize: "0.75rem",
                                }}
                              >
                                Please select image
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    lg={5}
                    md={5}
                    sm={5}
                    xs={12}
                    className={classes.gridbox}
                    order="0"
                  >
                    <Box className={classes.imgbox}>
                      <Box>
                        {coverBlob && (
                          <Box
                            className={classes.nftImg}
                            style={{
                              background: `url(${
                                coverBlob !== ""
                                  ? coverBlob
                                  : "/media/cc0-videos/flower.mp4"
                              })`,
                            }}
                          ></Box>
                        )}
                        {fileTypeCheck1 === "video" && (
                          <video
                            controls="false"
                            autoplay="true"
                            loop
                            muted
                            playsinline="true"
                            style={{ height: "98px" }}
                          >
                            <source src={imgBlob1} type="video/mp4" />
                          </video>
                        )}
                        {fileTypeCheck1 === "audio" && (
                          <audio controls>
                            <source src={imgBlob1} type="audio/mpeg" />
                          </audio>
                        )}
                        {fileTypeCheck1 === "image" && (
                          <Box
                            className={classes.nftImg}
                            style={{
                              background: `url(${
                                imgBlob1 !== ""
                                  ? imgBlob1
                                  : "/media/cc0-videos/flower.mp4"
                              })`,
                            }}
                          ></Box>
                        )}
                      </Box>
                    </Box>
                  </Grid>

                  <Box style={{ padding: "8px" }}>
                    <Grid container spacing={2}>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Box mt={3}>
                          <label className={classes.fontSixeText}>
                            Features<span style={{ color: "#ff7d68" }}>*</span>
                          </label>
                          <FormControl fullWidth>
                            <TextField
                              id="standard-multiline-flexible"
                              multiline
                              maxRows={4}
                              inputProps={{
                                maxLength: 600,
                              }}
                              placeholder="Please enter features"
                              value={features}
                              disabled={isLoading}
                              onChange={(e) => setFeatures(e.target.value)}
                              error={isSubmit1 && features === ""}
                              helperText={
                                isSubmit1 &&
                                features === "" &&
                                "Please enter features"
                              }
                            />
                          </FormControl>
                        </Box>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Box mt={3}>
                          <label className={classes.fontSixeText}>
                            Pro and Cons
                            <span style={{ color: "#ff7d68" }}>*</span>
                          </label>
                          <FormControl fullWidth>
                            <TextField
                              disabled={isLoading}
                              fullWidth
                              id="standard-multiline-flexible"
                              multiline
                              maxRows={4}
                              inputProps={{
                                maxLength: 600,
                              }}
                              placeholder="Please enter pro and cons"
                              value={procons}
                              onChange={(e) => setProcons(e.target.value)}
                              error={isSubmit1 && procons === ""}
                              helperText={
                                isSubmit1 &&
                                procons === "" &&
                                "Please enter pro and cons"
                              }
                            />
                          </FormControl>
                        </Box>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Box>
                          <label className={classes.fontSixeText}>
                            Benefits<span style={{ color: "#ff7d68" }}>*</span>
                          </label>
                          <FormControl fullWidth>
                            <TextField
                              disabled={isLoading}
                              fullWidth
                              id="standard-multiline-flexible"
                              multiline
                              maxRows={4}
                              inputProps={{
                                maxLength: 600,
                              }}
                              placeholder="Please enter benefits"
                              value={benefits}
                              onChange={(e) => setBenefits(e.target.value)}
                              error={isSubmit1 && benefits === ""}
                              helperText={
                                isSubmit1 &&
                                benefits === "" &&
                                "Please enter benefits"
                              }
                            />
                          </FormControl>
                        </Box>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Box>
                          <label className={classes.fontSixeText}>
                            Physical store address
                            <span style={{ color: "#ff7d68" }}>*</span>
                          </label>
                          <FormControl fullWidth>
                            <TextField
                              disabled={isLoading}
                              fullWidth
                              id="standard-multiline-flexible"
                              multiline
                              maxRows={4}
                              inputProps={{
                                maxLength: 600,
                              }}
                              placeholder="Please enter physical store address"
                              value={physical}
                              onChange={(e) => setPhysical(e.target.value)}
                              error={isSubmit1 && physical === ""}
                              helperText={
                                isSubmit1 &&
                                physical === "" &&
                                "Please enter physical store address"
                              }
                            />
                          </FormControl>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                  <Grid item xs={12} md={12}>
                    <Box className="cardCreate" mt={4}>
                      <Box>
                        <label className={classes.linktext1}>
                          Contact us details
                        </label>
                        <Box mt={2}>
                          <Box>
                            <Grid container spacing={2} alignItems="center">
                              <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Box>
                                  <label className={classes.fontSixeText}>
                                    Email{" "}
                                    <span style={{ color: "#ff7d68" }}>*</span>
                                  </label>
                                  <FormControl fullWidth>
                                    <TextField
                                      inputProps={{ maxLength: 80 }}
                                      disabled={isLoading}
                                      value={emailid}
                                      type="email"
                                      onChange={(e) => {
                                        if (validemailUrl(e.target.value)) {
                                          setIsInValidemailVUrl(false);
                                        } else {
                                          setIsInValidemailVUrl(true);
                                        }
                                        setEmailid(e.target.value);
                                      }}
                                      error={isSubmit1 && emailid === ""}
                                      placeholder="Please enter email"
                                      helperText={
                                        isSubmit1 &&
                                        emailid === "" &&
                                        "Please enter email"
                                      }
                                    />
                                    {isInvalidemailUrl && emailid !== "" && (
                                      <FormHelperText error>
                                        Please enter valid email
                                      </FormHelperText>
                                    )}
                                  </FormControl>
                                </Box>
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Box>
                                  <label className={classes.fontSixeText}>
                                    Phone number (Optional)
                                  </label>
                                  <FormControl
                                    fullWidth
                                    variant="filled"
                                    className={classes.outlineborder1}
                                  >
                                    <PhoneInput
                                      type="number"
                                      country={"in"}
                                      name="mobileNumber"
                                      inputProps={{ maxLength: 20 }}
                                      disabled={isLoading}
                                      value={mobileNumber}
                                      onChange={(phone, e) => {
                                        setCountryCode(e.dialCode);
                                        setFieldValue(phone);
                                      }}
                                      error={isSubmit1 && mobileNumber === ""}
                                      placeholder="Please enter phone number"
                                    />

                                    {/* {isSubmit1 && mobileNumber !== "" && (
                                      <FormHelperText error>
                                        Please enter phone number
                                      </FormHelperText>
                                    )} */}
                                  </FormControl>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Box className="cardCreate" mt={4}>
                      <Box>
                        <label className={classes.linktext1}>
                          External Links
                          <span style={{ fontSize: "16px", fontWeight: "300" }}>
                            {" "}
                            (Optional)
                          </span>
                        </label>
                        <Box mt={2}>
                          <Box>
                            <Grid container spacing={2} alignItems="center">
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <Box>
                                  <label className={classes.fontSixeText}>
                                    Facebook URL :
                                  </label>
                                  <FormControl fullWidth>
                                    <TextField
                                      className={classes.formcontrolbox}
                                      inputProps={{ maxLength: 80 }}
                                      disabled={isLoading}
                                      value={facebook}
                                      onChange={(e) => {
                                        if (validUrl(e.target.value)) {
                                          setIsInValidVUrl(false);
                                        } else {
                                          setIsInValidVUrl(true);
                                        }
                                        setFacebook(e.target.value);
                                      }}
                                      error={isSubmit1 && facebook === ""}
                                      placeholder="https://"
                                    />
                                    {isInvalidUrl && facebook !== "" && (
                                      <FormHelperText error>
                                        Please enter valid facebook link.
                                      </FormHelperText>
                                    )}
                                  </FormControl>
                                </Box>
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <Box>
                                  <label className={classes.fontSixeText}>
                                    Instragram URL :{" "}
                                  </label>
                                  <FormControl fullWidth multiline rows={4}>
                                    <TextField
                                      className={classes.formcontrolbox}
                                      inputProps={{ maxLength: 50 }}
                                      disabled={isLoading}
                                      value={instragram}
                                      onChange={(e) => {
                                        if (validinsta(e.target.value)) {
                                          setIsInstaUrl(false);
                                        } else {
                                          setIsInstaUrl(true);
                                        }
                                        setInstagram(e.target.value);
                                      }}
                                      multiline
                                      error={isSubmit1 && instragram === ""}
                                      placeholder="https://"
                                    />
                                    {isInstaUrl && instragram !== "" && (
                                      <FormHelperText error>
                                        Please enter valid instragram link.
                                      </FormHelperText>
                                    )}
                                  </FormControl>
                                </Box>
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <Box>
                                  <label className={classes.fontSixeText}>
                                    Twitter URL :{" "}
                                  </label>
                                  <FormControl fullWidth multiline rows={4}>
                                    <TextField
                                      inputProps={{ maxLength: 1500 }}
                                      disabled={isLoading}
                                      className={classes.formcontrolbox}
                                      value={twitter}
                                      onChange={(e) => {
                                        if (validtwitter(e.target.value)) {
                                          setIsTwitterUrl(false);
                                        } else {
                                          setIsTwitterUrl(true);
                                        }
                                        setTwitter(e.target.value);
                                      }}
                                      multiline
                                      error={isSubmit1 && twitter === ""}
                                      placeholder="https://"
                                    />
                                    {isTwitterUrl && twitter !== "" && (
                                      <FormHelperText error>
                                        Please enter valid twitter link.
                                      </FormHelperText>
                                    )}
                                  </FormControl>
                                </Box>
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <Box>
                                  <label className={classes.fontSixeText}>
                                    Telegram URL :{" "}
                                  </label>
                                  <FormControl fullWidth multiline rows={4}>
                                    <TextField
                                      inputProps={{ maxLength: 1500 }}
                                      disabled={isLoading}
                                      value={telegram}
                                      onChange={(e) => {
                                        if (validtelegram(e.target.value)) {
                                          setIsTelegramUrl(false);
                                        } else {
                                          setIsTelegramUrl(true);
                                        }
                                        setTelegram(e.target.value);
                                      }}
                                      multiline
                                      className={classes.formcontrolbox}
                                      error={isSubmit1 && telegram === ""}
                                      placeholder="https://"
                                    />
                                    {isTelegramUrl && telegram !== "" && (
                                      <FormHelperText error>
                                        Please enter valid telegram link.
                                      </FormHelperText>
                                    )}
                                  </FormControl>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                        </Box>
                      </Box>

                      <Box
                        mt={3}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        {user?.isLogin ? (
                          <Button
                            variant="contained"
                            size="large"
                            color="primary"
                            disabled={isLoading}
                            onClick={() => submitCreateNFTHanlder()}
                          >
                            {transactionStatus}{" "}
                            {isLoading && <ButtonCircularProgress />}
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            size="large"
                            color="primary"
                            to="/conect-wallet"
                            component={Link}
                            style={{ whiteSpace: "pre" }}
                          >
                            Connect Wallet
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

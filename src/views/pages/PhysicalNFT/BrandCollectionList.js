import React, { useState, useContext, useEffect } from "react";
import {
  makeStyles,
  Box,
  Container,
  Typography,
  Grid,
  Button,
  IconButton,
} from "@material-ui/core";
import { BsInfoCircle } from "react-icons/bs";
import { FaTwitter, FaFacebookF } from "react-icons/fa";
import Apiconfig from "src/ApiConfig/ApiConfig";
import axios from "axios";
import { useLocation } from "react-router-dom";
import FacebookIcon from "@material-ui/icons/Facebook";
import { UserContext } from "../../../context/User";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import DataNotFound from "src/component/DataNotFound";
import Pagination from "@material-ui/lab/Pagination";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import BrandCollectionListcard from "src/component/BrandCollectionListcard";
import InstagramIcon from "@material-ui/icons/Instagram";
import TelegramIcon from "@material-ui/icons/Telegram";
import CloseIcon from "@material-ui/icons/Close";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "60px 0px",
    [theme.breakpoints.down("xs")]: {
      padding: "50px 0px",
    },
    "& .heading": {
      "& h2": {
        paddingBottom: "30px",
      },
    },
    "& .maincontent": {},
  },

  profileimg: {
    marginTop: "-140px",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "100% !important",
    backgroundRepeat: " no-repeat !important",
    width: "175px",
    height: "175px",
    borderRadius: "10px",
    position: "relative",
    border: "2px solid #FFFFFF",
    backgroundColor: "#b6b6b6 !important",
    "@media(max-width:1010px)": {
      marginTop: "-65px",
      width: "110px",
      height: "110px",
    },
    "@media(max-width:800px)": {
      marginTop: "-65px",
      width: "90px",
      height: "90px",
    },
    "& .editprofilebutton": {
      background: "linear-gradient(261.87deg, #62D3F0 13.12%, #e5cf58 83.57%)",
      position: "absolute",
      right: "3px",
      bottom: "3px",
      "@media(max-width:800px)": {
        width: "35px",
        height: "35px",
      },
      "& svg": {
        color: "#FFFFFF",
      },
    },
    "& img": {
      minHeight: "100%",
      minWidth: "100%",
      height: "auto",
      width: "auto",
    },
  },
  bannerimg: {
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "100% !important",
    backgroundRepeat: " no-repeat !important",
    height: "260px",
    borderRadius: "10px",
    "@media(max-width:1010px)": {
      height: "140px",
      borderRadius: "25px",
    },
    "& img": {
      minHeight: "100%",
      minWidth: "100%",
      height: "auto",
      width: "auto",
    },
  },
  headbox2: {
    padding: "0 20px",
    marginBottom: "15px",
    "@media(max-width:767px)": {
      padding: "0 10px",
    },
  },
  text1: {
    display: "flex",

    margin: "30px 0px 70px",
    "@media(max-width:375px)": {
      margin: "30px 0px 30px",
    },
    "& h1": {
      fontSize: "40px",
      fontWeight: "700",
      marginRight: "40px",
    },
    "& p": {
      fontSize: "10px",
      fontWeight: "400",
    },
    "& svg": {
      background: "linear-gradient(261.87deg, #62D3F0 13.12%, #e5cf58 83.57%)",
      borderRadius: "50%",
      fontSize: "30px",
    },
  },

  conrnerBox: {
    height: "auto",
    background: "linear-gradient(261.87deg, #62D3F0 13.12%, #e5cf58 83.57%)",
    marginRight: "20px",
    borderRadius: "10px",
    padding: "10px",
    marginTop: "12px",
    width: "100%",
  },
  socialMediaIcon: {
    fontSize: "30px",
    color: "#FFFFFF",
  },
  biobox1: {
    backdropFilter: "blur(44px)",
    borderRadius: "10px",
    filter: "drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.25))",
    background: "#F7722F",
    boxShadow: "rgb(99 99 99 / 20%) 0px 2px 8px 0px",

    "& h3": {
      fontWeight: "600",
      color: "#fff",
      fontSize: "20px",
    },
    "& p": {
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "14px",
      marginTop: "2px",
      color: "rgba(0, 0, 0, 0.6)",
      wordBreak: "break-word",
    },
    "& .biobox": {
      background: "rgba(0, 0, 0, 0.1)",
      boxShadow: "rgb(99 99 99 / 20%) 0px 2px 8px 0px",
      backdropFilter: "blur(10px)",
      borderRadius: "10px",
      position: "absolute",
      bottom: "16px",
      padding: "21px",
      position: "relative",
    },
    "& .boxcontrol": {
      padding: "21px 21px 10px 21px",
      marginTop: "20px",
    },
    "& .scrollbox": {
      overflowY: "auto",
      overflowX: "hidden",
      height: "248px",
      minHeight: "248px",
      padding: "21px",
    },
  },
  rightbox: {
    display: "flex",
    alignItems: "center",
    marginBottom: "30px",
    "& h1": {
      fontSize: "40px",
      fontWeight: "700",
    },
  },
  infomodal: {
    "& h1": {
      fontSize: "40px",
      fontWeight: "700",
      color: "#e5cf58",
      marginBottom: "30px",
    },
    "& h4": {
      fontWeight: "400",
      color: "#fff",
      marginBottom: "10px",
    },
    "& h6": {
      fontWeight: "400",
      color: "#646464",
    },
  },
  dialogsec: {
    "& .MuiDialog-paperWidthXs": {
      maxWidth: "661px",
      overflowY: "auto",
      overflowX: "hidden",
      height: "583px",
      minHeight: "583px",
    },
  },
}));

function BrandCollectionList(props) {
  const classes = useStyles();
  const accessToken = window.sessionStorage.getItem("token");
  const [collectionList, setCollectionList] = useState([]);
  const [pages, setpages] = useState(1);
  const [numpages, setNumpages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modaldata, setModaldata] = useState("");
  const user = useContext(UserContext);
  const [isPromoted, setisPromoted] = useState(false);
  const location = useLocation();
  console.log("location******", location);
  const [mediaData, setMediaData] = React.useState([]);
  const [check, setcheck] = useState(false);
  const [hotdata, setHotdata] = useState([]);
  const [search, setSearch] = useState();

  useEffect(() => {
    if (location.search && location.search.length > 0) {
      const ids = location.search.split("?");
      console.log("ids**-", ids);
      if (ids[1]) {
        // setOrderId(ids[1]);
        ViewHandler(ids[1]);

        getBrandCollectionListHanlder(ids[1]);
      }
    }
  }, [location]);
  const getBrandCollectionListHanlder = async (id) => {
    axios({
      method: "POST",
      url: Apiconfig.brandCollectionList,
      data: {
        brandId: id,
      },
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          if (res.data.result.docs) {
            setCollectionList(res.data.result.docs);
          } else {
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const ViewHandler = async (id) => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfig.ViewBrandnft,
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
  // const getCollectionListHanlder = async (cancelTokenSource) => {
  //   setIsLoading(true);
  //   if (search != "") {
  //     axios({
  //       method: "GET",
  //       url: `${Apiconfig.collectionList}?page=${pages}`,
  //       cancelToken: cancelTokenSource && cancelTokenSource.token,

  //       params: {
  //         limit: 24,
  //         search: search,
  //         isPromoted: isPromoted,
  //       },
  //     })
  //       .then(async (res) => {
  //         if (res.data.statusCode === 200) {
  //           if (res.data.result.docs) {
  //             const result = res.data.result.docs.filter(
  //               (data) => data.contractAddress.length > 10
  //             );
  //             const filterData = res.data.result.docs.filter(
  //               (data) => data?.displayName.trim() != "GenerativeNFT"
  //             );
  //             setNumpages(res.data.result.pages);
  //             setCollectionList(res.data.result.docs);
  //             setIsLoading(false);
  //           } else {
  //             setCollectionList([]);
  //             setIsLoading(false);
  //           }
  //           user.getlistCollection();
  //           setIsLoading(false);
  //         }
  //       })
  //       .catch(() => {
  //         setIsLoading(false);
  //       });
  //   } else {
  //     axios({
  //       method: "GET",
  //       url: `${Apiconfig.collectionList}?page=${pages}`,
  //       cancelToken: cancelTokenSource && cancelTokenSource.token,

  //       params: {
  //         limit: 24,
  //         isPromoted: isPromoted,
  //       },
  //     })
  //       .then(async (res) => {
  //         if (res.data.statusCode === 200) {
  //           if (res.data.result.docs) {
  //             const result = res.data.result.docs.filter(
  //               (data) => data.contractAddress.length > 10
  //             );
  //             const filterData = res.data.result.docs.filter(
  //               (data) => data?.displayName != "GenerativeNFT "
  //             );
  //             setNumpages(res.data.result.pages);
  //             setCollectionList(filterData);
  //             setIsLoading(false);
  //           } else {
  //             setCollectionList([]);
  //             setIsLoading(false);
  //           }
  //           user.getlistCollection();
  //           setIsLoading(false);
  //         }
  //       })
  //       .catch(() => {
  //         setIsLoading(false);
  //       });
  //   }
  // };
  // useEffect(() => {
  //   const cancelTokenSource = axios.CancelToken.source();
  //   getCollectionListHanlder(cancelTokenSource);
  //   // getCollectionListHanlder();
  //   setCollectionList([]);
  //   return () => {
  //     cancelTokenSource.cancel();
  //   };
  // }, [pages, search, isPromoted]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (data) => {
    setOpen(true);
    setModaldata(data);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box className={classes.root}>
        <Container maxWidth="lg">
          <Box
            className={classes.bannerimg}
            style={
              mediaData?.coverImage
                ? { background: "url(" + mediaData?.coverImage + ")" }
                : {
                    background: "url(" + "/images/market_detail.png" + ")",
                  }
            }
          ></Box>
          <Box className={classes.headbox2}>
            <Box style={{ display: "flex", flexWrap: "wrap" }}>
              <Box
                style={
                  mediaData?.brandLogo
                    ? {
                        background: "url(" + mediaData?.brandLogo + ")",
                      }
                    : {
                        background: "url(" + "/images/Profile.png" + ")",
                      }
                }
                className={classes.profileimg}
              ></Box>
            </Box>
            <Box className={classes.text1}>
              <Typography variant="h1">
                {mediaData?.brandName ? mediaData?.brandName : "N/A"}
              </Typography>
              <Box>
                <IconButton
                  onClick={() => {
                    handleClickOpen(mediaData);
                  }}
                  // onClick={() => ViewHandler(mediaData)}
                >
                  <BsInfoCircle />
                </IconButton>
                <Typography variant="body1">Brand info</Typography>
              </Box>
            </Box>
          </Box>
          <Grid container spacing={3}>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <Box>
                <Box className={classes.biobox1}>
                  <Box>
                    <Box display="flex" className="scrollbox">
                      <Typography variant="h3">Bio:</Typography>&nbsp;
                      <Typography variant="body2">
                        {mediaData?.bio ? mediaData?.bio : "N/A"}
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="boxcontrol">
                    <Box className="biobox">
                      <Grid container spacing={1}>
                        {mediaData?.twitterLink === "" &&
                        mediaData?.instagramLink === "" &&
                        mediaData?.telegramLink === "" &&
                        mediaData?.facebookLink === "" ? (
                          <>
                            <Box>
                              <Typography
                                variant="body1"
                                style={{ textAlign: "center" }}
                              >
                                Social Media Not Found
                              </Typography>
                            </Box>
                          </>
                        ) : (
                          <>
                            {mediaData?.twitterLink && (
                              <Grid item sm={2} lg={6} md={6} xs={3}>
                                <a
                                  href={mediaData?.twitterLink}
                                  target="_blank"
                                >
                                  <Button
                                    className={classes.conrnerBox}
                                    fullWidth
                                  >
                                    <FaTwitter
                                      className={classes.socialMediaIcon}
                                    />
                                  </Button>
                                </a>
                              </Grid>
                            )}
                            {mediaData?.instagramLink && (
                              <Grid item sm={2} lg={6} md={6} xs={3}>
                                <a
                                  href={mediaData?.instagramLink}
                                  target="_blank"
                                >
                                  <Button className={classes.conrnerBox}>
                                    <InstagramIcon
                                      className={classes.socialMediaIcon}
                                    />
                                  </Button>
                                </a>
                              </Grid>
                            )}
                            {mediaData?.facebookLink && (
                              <Grid item sm={2} lg={6} md={6} xs={3}>
                                <a
                                  href={mediaData?.facebookLink}
                                  target="_blank"
                                >
                                  <Button className={classes.conrnerBox}>
                                    <FacebookIcon
                                      className={classes.socialMediaIcon}
                                    />
                                  </Button>
                                </a>
                              </Grid>
                            )}
                            {mediaData?.telegramLink && (
                              <Grid item sm={2} lg={6} md={6} xs={3}>
                                <a
                                  href={mediaData?.telegramLink}
                                  target="_blank"
                                >
                                  <Button className={classes.conrnerBox}>
                                    <TelegramIcon
                                      className={classes.socialMediaIcon}
                                    />
                                  </Button>
                                </a>
                              </Grid>
                            )}
                          </>
                        )}
                      </Grid>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={9} md={9} sm={12} xs={12}>
              <Box className={classes.rightbox}>
                <Box>
                  <figure style={{ margin: "0" }}>
                    <img src="images/Emoji.png" alt="Search Image" />
                  </figure>
                </Box>
                <Box pl={1}>
                  <Typography variant="h1">Collections</Typography>
                </Box>
              </Box>

              <Box className="maincontent">
                <Grid container spacing={3}>
                  {isLoading ? (
                    <Box
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <ButtonCircularProgress />
                    </Box>
                  ) : (
                    <>
                      {" "}
                      {collectionList &&
                        collectionList?.map((data, i) => {
                          return (
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                              <BrandCollectionListcard
                                type="Card"
                                data={data}
                                key={i}
                              />
                            </Grid>
                          );
                        })}
                    </>
                  )}
                  {!isLoading && !collectionList && (
                    <Box
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <DataNotFound />
                    </Box>
                  )}
                  {!isLoading &&
                    collectionList &&
                    collectionList.length === 0 && <DataNotFound />}
                </Grid>
                {collectionList.length != 0 ? (
                  <Box
                    className={classes.tabBtn}
                    pt={2}
                    display="flex"
                    justifyContent="end"
                  >
                    <Pagination
                      onChange={(e, v) => setpages(v)}
                      count={parseInt(numpages)}
                      color="secondary"
                    />
                  </Box>
                ) : (
                  ""
                )}
              </Box>
              <Box>
                <Typography variant="h1">Tranding NFT</Typography>
              </Box>
            </Grid>
          </Grid>
          <Box>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              maxWidth="xs"
              fullWidth
              className={classes.dialogsec}
            >
              <DialogContent style={{ paddingTop: "0px" }}>
                <Box display="flex" justifyContent="flex-end">
                  <IconButton
                    onClick={() => setOpen(false)}
                    className={classes.closeButton}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
                <Box className={classes.infomodal}>
                  <Typography variant="h1">Brand info</Typography>
                  <Box mb={3}>
                    <Typography variant="h4">Features</Typography>
                    <Typography variant="h6">{modaldata?.cons}</Typography>
                  </Box>
                  <Box mb={3}>
                    <Typography variant="h4">Pro and cons</Typography>
                    <Typography variant="h6">{modaldata?.pros}</Typography>
                  </Box>
                  <Box mb={3}>
                    <Typography variant="h4">Benefit</Typography>
                    <Typography variant="h6">{modaldata?.benefits}</Typography>
                  </Box>
                  <Box mb={3}>
                    <Typography variant="h4">Physical store address</Typography>
                    <Typography variant="h6">
                      {modaldata?.storeAddress}
                    </Typography>
                  </Box>
                </Box>
              </DialogContent>
            </Dialog>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default BrandCollectionList;

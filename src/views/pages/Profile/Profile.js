import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  IconButton,
  Hidden,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useContext, useState, useEffect } from "react";
import ExploreCard from "src/component/ExploreCard";
import CollectionCard from "src/component/CollectionCard";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { useWeb3React } from "@web3-react/core";
import { GiCancel } from "react-icons/gi";
import Following from "./Following";
import Bio from "./Bio";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

import ProfileNft from "../Author/ProfileNft";
import Ownednft from "../Author/Ownednft";
import NormalNft from "../Author/NormalNft";
import { toast } from "react-toastify";
import axios from "axios";
import Apiconfig from "src/ApiConfig/ApiConfig";
import { sortAddress } from "src/utils";
import DataNotFound from "src/component/DataNotFound";
import { collectionData } from "src/constants";
import { FaCopy, FaUserEdit, FaUserCheck } from "react-icons/fa";
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "src/context/User";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import Sale from "./Sale";
import CopyToClipboard from "react-copy-to-clipboard";
import Created from "./Created";
import Owned from "./Owned";
import Liked from "./Liked";
import All from "./All";
import { stubTrue } from "lodash";
import AllNft from "../Author/AllNft";
import { contractKovan } from "src/constants";
const useStyles = makeStyles((theme) => ({
  root: { padding: "50px 0px" },
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
    marginLeft: "16px",
    "@media(max-width:375px)": {
      marginTop: "5px",
      marginLeft: "0px",
      wordBreak: "break-word",
    },
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
      color: "#000",
    },
  },
  whitebox: {
    background: "#FFFFFF",
    filter: "drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.25))",
    boxShadow: "rgb(99 99 99 / 20%) 0px 2px 8px 0px",
    borderRadius: "10px",
    paddingTop: "10px",
    paddingBottom: "10px",
  },

  idtxt: {
    display: "flex",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "18px",
    alignItems: "center",
    "@media(max-width:818px)": {
      display: "block",
    },
  },
  file: {
    padding: "10px 10px 10px 10px",
    // background: "#FCF2FA",
    borderRadius: "50%",
  },

  boxsection: {
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "40px",
    "& h6": {
      color: " #3B0D60",
      fontWeight: "bold",
      fontSize: "18px",
      paddingTop: "7px",
      textAlign: "center",
    },
  },
  box3: {
    display: "flex",
    alignItems: "center",
    paddingTop: "13px",
    "& h6": {
      color: "#C6BECC",
      marginLeft: "10px",
      paddingBottom: "10px",
      [theme.breakpoints.up("sm")]: {
        fontSize: "15px",
      },
      [theme.breakpoints.up("xs")]: {
        fontSize: "12px",
      },
    },
  },
  text3: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "10px",
    "& h5": {
      color: "#E4C3DE",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "130%",
    },
  },
  text4: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "10px",
    "& h4": {
      color: "#D200A5",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "130%",
    },
  },
  btnbox1: {
    "@media(max-width:818px)": {
      marginTop: "5px",
    },
    "& Button": {
      margin: "5px",
    },
    "& h6": {
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "130%",
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
  btnfollow2: {
    background: "rgba(255, 255, 255, 0.3)",
    backdropFilter: "blur(24px)",
    borderRadius: "10px",
    marginRight: "10px",
    padding: "15px 15px",
    [theme.breakpoints.down("sm")]: {
      background: "rgb(52 162 240 / 60%)",
    },
    "@media(max-width:818px)": {
      padding: "6px 16px",
    },
    "& h2": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "28px",
      lineHeight: "130%",
      textAlign: "center",
      color: "#FFFFFF",
      "@media(max-width:818px)": {
        fontSize: "18px",
      },
    },
    "& h5": {
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#FFFFFF",
      textAlign: "center",
      "@media(max-width:818px)": {
        fontSize: "12px",
      },
    },
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
    "@media(max-width:800px)": { marginTop: "20px", marginBottom: "20px" },
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
    backgroundColor: "#8e9493 !important",
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
      background: "linear-gradient(261.87deg, #62D3F0 13.12%, #35A5F5 83.57%)",
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

  FollowingBox: {
    overflowx: "scroll",
  },
  profileWallet: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    "@media(max-width:767px)": {
      borderBottom: "1px solid gray",
    },

    "& h6": {
      color: "#00000",
      "@media(max-width:800px)": { fontSize: "17px" },
    },
  },
  customizedButton: {
    position: "absolute",
    top: "-42px",
    right: "-9px",
    color: "#fff",
  },
  tabBtn: {
    "@media(max-width:767px)": {
      marginTop: "10px",
    },

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
}));

export default function Profile(nftList) {
  const { account } = useWeb3React();
  const [openBuy, setOpenBuy] = useState(false);
  const history = useHistory();
  const [bougthNftCount, setBougthNftCount] = useState([]);
  const [tabview, setTabView] = useState("all");
  const [openPlaceBid, setOpenPlaceBid] = useState(false);
  const user = useContext(UserContext);
  const [createdNftoCount, setCreatedNftoCount] = useState([]);
  const [onSaleList, setOnSaleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [likesCount, setLikesCount] = useState([]);
  const [followingCount, setFollowingCounts] = useState([]);
  const [allNftList, setAllNftList] = useState([]);
  const [normalNFTList, setNormalNFTList] = useState([]);
  const [normalNFTListofline, setNormalNFTListofline] = useState([]);
  const [mintresale, setMintresale] = useState();
  const location = useLocation();

  const [followersCount, setFollowersCounts] = useState([]);
  const [favoritelist, setfavoritelist] = useState([]);

  const classes = useStyles();

  // useEffect(() => {
  //   if (mintresale === "resalemint") {
  //     setTabView("normal");
  //   }
  // }, [account, mintresale]);

  const getLikesHandler = async (id) => {
    try {
      const res = await axios.get(Apiconfig.userLikesCount + id, {
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode == 200) {
        setLikesCount(res.data.result);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  const userOnSaleCountHandler = async (id, cancelTokenSource) => {
    try {
      const res = await axios.get(Apiconfig.userOnSaleCount + id, {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
      });

      if (res.data.statusCode === 200) {
        setOnSaleList(res.data.result.docs);

        setIsLoading(false);
      }
    } catch (error) {
      console.log("ERROR", error);
      setIsLoading(false);
    }
  };

  const setCreatedNftoCountHandler = async (id) => {
    try {
      const res = await axios.get(Apiconfig.userCreatedCount + id, {
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        setCreatedNftoCount(res.data.result);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("ERROR", error);
      setIsLoading(false);
    }
  };

  const userBuyAndCreatedListHandler = async (id) => {
    try {
      const res = await axios.get(Apiconfig.userBuyAndCreatedList + id, {
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        setAllNftList(res.data.result);

        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.log("ERROR", error);
    }
  };
  const normalNFTListHandler = async (id) => {
    if (account === user.ownerAccount) {
      console.log("+++++++++++admin+++++++++++");
      try {
        const res = await axios.get(Apiconfig.listNFT, {
          headers: {
            token: window.sessionStorage.getItem("token"),
          },
        });
        if (res.data.statusCode === 200) {
          const dataList = res.data.result.filter(
            (data) =>
              data.isPlace === false &&
              // data.isCancel == true &&
              data?.collectionId?.contractAddress == contractKovan &&
              data.isResale === false
          );

          setNormalNFTList(dataList);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("ERROR", error);
        setIsLoading(false);
      }
    } else {
      console.log("+++++++++++user+++++++++++");

      try {
        const res = await axios.get(Apiconfig.listNFT, {
          headers: {
            token: window.sessionStorage.getItem("token"),
          },
        });
        if (res.data.statusCode === 200) {
          const dataList = res.data.result.filter(
            (data) => data.isPlace === false && data.isResale === false
          );

          setNormalNFTList(dataList);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("ERROR", error);
        setIsLoading(false);
      }
    }
  };

  // const normalNFTListHandlerOffline = async (id) => {
  //   try {
  //     const res = await axios.get(Apiconfig.listNFT, {
  //       headers: {
  //         token: window.sessionStorage.getItem("token"),
  //       },
  //     });
  //     if (res.data.statusCode === 200) {
  //       const dataList = res.data.result.filter(
  //         (data) =>
  //           data.isPlace === false &&
  //           // data.isCancel == true &&
  //           // data?.collectionId?.contractAddress == contractKovan &&
  //           data.isResale === false
  //       );

  //       setNormalNFTListofline(dataList);
  //       setIsLoading(false);
  //     }
  //   } catch (error) {
  //     console.log("ERROR", error);
  //     setIsLoading(false);
  //   }
  // };

  const setBougthNftCountHandler = async (id) => {
    try {
      const res = await axios.get(Apiconfig.userOwendCount + id, {
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        const dataList = res.data.result.filter(
          (data) => data?.nftId?.isPlace === false
        );
        setBougthNftCount(dataList);
        console.log("dataList", dataList);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("ERROR", error);
      setIsLoading(false);
    }
  };
  // const id = user?.userData?._id;

  useEffect(() => {
    updateDatahandler();
  }, [user?.userData?._id]);

  const updateDatahandler = () => {
    if (user?.userData?._id) {
      const id = user?.userData._id;
      setBougthNftCountHandler(id);
      getLikesHandler(id);
      userOnSaleCountHandler(id);
      setCreatedNftoCountHandler(id);
      getFollowersCountsApiData(id);
      getFollowingCountsApiData(id);
      userBuyAndCreatedListHandler(id);
      normalNFTListHandler(id);
      favoriteNFTlistAPI(id);

      user.getProfileHandler(window.sessionStorage.getItem("token"));
    }
  };

  const getFollowersCountsApiData = async (id, cancelTokenSource) => {
    try {
      const res = await axios.get(Apiconfig.userFollowerCount + id, {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
      });

      if (res.status === 200) {
        setFollowersCounts(res.data.result);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  const getFollowingCountsApiData = async (id, cancelTokenSource) => {
    try {
      const res = await axios.get(Apiconfig.userFollowingCount + id, {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
      });

      if (res.status === 200) {
        setFollowingCounts(res.data.result);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  const followUnfollowHandler = async (id) => {
    if (user.isLogin) {
      try {
        const res = await axios.get(Apiconfig.followUnfollow + id, {
          headers: {
            token: window.sessionStorage.getItem("token"),
          },
        });
        if (res.data.statusCode === 200) {
          toast.success(res.data.responseMessage);
          updateDatahandler();
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
  const favoriteNFTlistAPI = async (id) => {
    try {
      const res = await axios.get(Apiconfig.userFavourateCount + id, {
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        setfavoritelist(res.data.result);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("ERROR", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setAllNftList([]);
    setCreatedNftoCount([]);
    setOnSaleList([]);
    setBougthNftCount([]);
    setNormalNFTList([]);
    setfavoritelist([]);
  }, []);

  // useEffect(() => {
  //   if (location.search.substring(1, location.search.length)) {
  //     const id = location.search.substring(1, location.search.length);

  //     setMintresale(id);
  //   }
  // }, [location.search]);

  return (
    <Box className={classes.root}>
      <Container maxWidth="lg">
        <Box
          className={classes.bannerimg}
          style={
            user.userData?.coverPic
              ? { background: "url(" + user.userData?.coverPic + ")" }
              : { background: "url(/images/BannerImg.png)" }
          }
        ></Box>

        <Box className={classes.headbox2}>
          <Box style={{ display: "flex", flexWrap: "wrap" }}>
            {user.userData?.profilePic ? (
              <Box
                style={{ background: "url(" + user.userData?.profilePic + ")" }}
                className={classes.profileimg}
              >
                <IconButton
                  className="editprofilebutton"
                  // onClick={() => {
                  //   history.push({
                  //     pathname: "/edit-profile",
                  //     // search: user.userData._id,
                  //     state: { data: user.userData },
                  //   });
                  // }}
                  onClick={() => history.push("edit-profile")}
                >
                  <FaUserEdit />
                </IconButton>
              </Box>
            ) : (
              <Box
                style={{ background: "url(/images/idicon.svg)" }}
                className={classes.profileimg}
              >
                <IconButton
                  className="editprofilebutton"
                  onClick={() => history.push("/edit-profile")}
                >
                  <FaUserEdit />
                </IconButton>
              </Box>
            )}

            <Box className={classes.text1}>
              <Typography variant="h4" style={{ wordBreak: "break-word" }}>
                {user.userData?.name}
              </Typography>
              <Typography variant="h5">{user.userData?.email}</Typography>
            </Box>
          </Box>
          <Box className={classes.btnhead}>
            <Box
              className={classes.btnfollow2}
              onClick={() => setOpenBuy(true)}
            >
              <Typography variant="h2">
                {" "}
                {user?.userData?.followersCount}
              </Typography>
              <Typography variant="h5">Followers</Typography>
            </Box>
            <Box
              className={classes.btnfollow2}
              onClick={() => setOpenPlaceBid(true)}
            >
              <Typography variant="h2">
                {" "}
                {user?.userData?.followingCount}
              </Typography>
              <Typography variant="h5">Following</Typography>
            </Box>
          </Box>
        </Box>
        <Box my={3}>
          <Hidden mdUp>
            {" "}
            <Bio />
          </Hidden>
        </Box>
        <Box className={classes.whitebox}>
          <Container>
            <Box className={classes.idtxt}>
              <Box className={classes.profileWallet}>
                <Typography variant="h6">id</Typography>&nbsp;&nbsp;
                <Typography variant="body2">
                  {sortAddress(user.userData?.walletAddress)}
                </Typography>
                <Box className={classes.file}>
                  <CopyToClipboard text={user?.userData?.walletAddress}>
                    <FileCopyIcon
                      style={{ cursor: "pointer", fontSize: "18px" }}
                      onClick={() => toast.info("Copied")}
                    />
                  </CopyToClipboard>
                </Box>
              </Box>
              <Box className={classes.tabBtn}>
                <Button
                  className={tabview === "all" ? "active" : ""}
                  onClick={() => setTabView("all")}
                >
                  All
                </Button>
                <Button
                  className={tabview === "Created" ? "active" : " "}
                  onClick={() => setTabView("Created")}
                >
                  Created
                </Button>
                <Button
                  className={tabview === "sale" ? "active" : " "}
                  onClick={() => setTabView("sale")}
                >
                  On sale
                </Button>
                <Button
                  className={tabview === "Owned" ? "active" : " "}
                  onClick={() => setTabView("Owned")}
                >
                  Owned
                </Button>

                {/* <Button
                  className={tabview === "Liked" ? "active" : " "}
                  onClick={() => history.push("/resale-nft")}
                >
                  Resale-Nft
                </Button> */}

                {account &&
                user &&
                user.ownerAccount &&
                account === user.ownerAccount ? (
                  <Button
                    className={tabview === "normal" ? "active" : " "}
                    onClick={() => setTabView("normal")}
                  >
                    HovR Hooligans
                  </Button>
                ) : (
                  <Button
                    className={tabview === "normal" ? "active" : " "}
                    onClick={() => setTabView("normal")}
                  >
                    Normal NFT
                  </Button>
                )}

                <Button
                  className={tabview === "favourite" ? "active" : " "}
                  onClick={() => setTabView("favourite")}
                >
                  Favourite NFT
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
        <Grid container spacing={3}>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <Hidden smDown>
              {" "}
              <Bio />
            </Hidden>
          </Grid>
          <Grid item md={9} sm={12} xs={12} lg={9}>
            {isLoading ? (
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <ButtonCircularProgress />
              </Box>
            ) : (
              <>
                <Box style={{ marginTop: "26px" }}>
                  {tabview === "all" ? (
                    <AllNft
                      nftList={allNftList}
                      callbackFun={() => updateDatahandler()}
                    />
                  ) : (
                    ""
                  )}

                  {tabview === "Created" ? (
                    <AllNft
                      nftList={createdNftoCount}
                      callbackFun={() => updateDatahandler()}
                    />
                  ) : (
                    ""
                  )}

                  {tabview === "sale" ? (
                    <ProfileNft
                      nftList={onSaleList}
                      callbackFun={() => updateDatahandler()}
                    />
                  ) : (
                    ""
                  )}

                  {tabview === "Owned" ? (
                    <Ownednft
                      nftList={bougthNftCount}
                      callbackFun={() => updateDatahandler()}
                    />
                  ) : (
                    ""
                  )}

                  {tabview === "normal" ? (
                    <NormalNft
                      nftList={normalNFTList}
                      callbackFun={() => updateDatahandler()}
                      account={account}
                    />
                  ) : (
                    ""
                  )}
                  {tabview === "favourite" ? (
                    <ProfileNft
                      nftList={favoritelist}
                      callbackFun={() => updateDatahandler()}
                    />
                  ) : (
                    ""
                  )}
                </Box>
              </>
            )}
          </Grid>
        </Grid>
        <Box>
          {openPlaceBid && (
            <Dialog
              open={openPlaceBid}
              onClick={() => setOpenPlaceBid(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              classes={{ paper: classes.paper }}
              maxWidth="xs"
            >
              <DialogActions>
                <IconButton
                  onClick={() => setOpenPlaceBid(false)}
                  className={classes.customizedButton}
                >
                  <GiCancel />
                </IconButton>
              </DialogActions>
              <DialogContent className={classes.padding0}>
                <Box align="center" mb={5}>
                  <FaUserCheck style={{ fontSize: "45px", color: "#4ea6f5" }} />
                  <Typography variant="h5">Following</Typography>
                </Box>
                <Box className={classes.FollowingBox}>
                  <Grid container>
                    {followingCount?.followingCount === 0 && (
                      <Box style={{ padding: "0px 50px" }}>
                        <DataNotFound />
                      </Box>
                    )}
                    {console.log("followingCount", followingCount)}
                    {followingCount?.following &&
                      followingCount?.following.map((data, i) => {
                        return (
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            key={i}
                            className="walletSet"
                          >
                            <Following
                              userData={user?.userData}
                              followUnfollowHandler={(id) =>
                                followUnfollowHandler(data?._id)
                              }
                              data={data}
                              type="timing"
                              index={i}
                            />
                          </Grid>
                        );
                      })}
                  </Grid>
                </Box>
              </DialogContent>
            </Dialog>
          )}
        </Box>
        <Box>
          {openBuy && (
            <Dialog
              open={openBuy}
              onClick={() => setOpenBuy(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              classes={{ paper: classes.paper }}
              maxWidth="xs"
            >
              <DialogActions>
                <IconButton
                  onClick={() => setOpenBuy(false)}
                  className={classes.customizedButton}
                >
                  <GiCancel />
                </IconButton>
              </DialogActions>
              <DialogContent className={classes.padding0}>
                <Box align="center" mb={5}>
                  <FaUserCheck style={{ fontSize: "45px", color: "#4ea6f5" }} />
                  <Typography variant="h5">Followers</Typography>
                </Box>
                <Box className={classes.FollowingBox}>
                  <Grid container>
                    {followersCount?.followersCount === 0 && (
                      <Box style={{ padding: "0px 50px" }}>
                        <DataNotFound />
                      </Box>
                    )}
                    {followersCount?.followers &&
                      followersCount?.followers.map((data, i) => {
                        return (
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            key={i}
                            className="walletSet "
                          >
                            <Following
                              userData={user?.userData}
                              isFollowers={true}
                              followUnfollowHandler={(id) =>
                                followUnfollowHandler(data?._id)
                              }
                              data={data}
                              type="timing"
                              index={i}
                            />
                          </Grid>
                        );
                      })}
                  </Grid>
                </Box>
              </DialogContent>
            </Dialog>
          )}
        </Box>
      </Container>
    </Box>
  );
}

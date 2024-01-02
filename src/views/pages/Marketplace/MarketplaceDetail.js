import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Link,
} from "@material-ui/core";
// import { Link,import { IconName } from "react-icons/md"; useHistory } from "react-router-dom";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { makeStyles } from "@material-ui/styles";
import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

import History from "./History";
import { toast } from "react-toastify";
import Sale from "./Sale";
import Bids from "./Bids";
import Slider from "react-slick";
import { FaRegCopy, FaTwitter } from "react-icons/fa";
import DataLoading from "src/component/DataLoading";

import { CategoryButtons, exploreData } from "src/constants";
import MarketplaceCard from "src/component/MarketplaceCard";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Apiconfig from "src/ApiConfig/ApiConfig";
import { Details } from "./Details";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "50px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "35px 0",
    },
    "& h3": {
      fontWeight: 700,
      fontSize: "30px",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",
      [theme.breakpoints.down("xs")]: {
        fontSize: "20px",
      },
    },
  },
  nftcard: {
    background: "#FFFFFF",
    backdropFilter: "blur(44px)",
    borderRadius: "10px",
    padding: "15px",
    boxShadow: "rgb(99 99 99 / 20%) 0px 2px 8px 0px",
    boxSizing: "border-box",
  },
  nftImg: {
    width: "100%",
    // minHeight: "282px",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "10px 10px 10px 10px",
  },
  tabBtn: {
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
  bidsDetails: {
    background: "#FFFFFF",
    backdropFilter: "blur(44px)",
    border: "0.5px solid #D3D3D3",
    boxSizing: "border-box",
    borderRadius: "22px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    padding: "5px",
  },
  profileimg: {
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      width: "75px",
      marginRight: "20px",
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
    "& h5": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "28px",
      lineHeight: "130%",
      color: "#3B0D60",
    },
    "& h6": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#3B0D60",
      marginTop: "5px",
      "& span": {
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "14px",
        lineHeight: "130%",
        color: "#D200A5",
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

export default function Nft() {
  const [tabview, setTabView] = useState("bids");
  const classes = useStyles();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState();
  const { account, library, chainId } = useWeb3React();

  const [bidList, setBidList] = useState([]);
  const [orderId, setOrderId] = useState("");

  const [orderList, setOrderList] = useState([]);

  const [Privatedata, setPrivatedata] = useState("");
  const [isPrivatebtn, setIsPrivatebtn] = useState(false);

  const [dataList, setDataList] = useState();
  const settings = {
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false,
    centerPadding: "0px",
    arrows: true,
    className: "recomended",
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: false,
    // prevArrow: <AiOutlineLeftSquare />,
    // nextArrow: <NavButton />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          centerMode: false,
          centerPadding: "20px",
          autoplay: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          centerMode: false,
          centerPadding: "20px",
          autoplay: false,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          centerPadding: "20px",
          autoplay: false,
        },
      },
    ],
  };

  const collectionOrderListHandler = async (id, tokenId) => {
    try {
      axios({
        method: "GET",
        url: Apiconfig.particularCollectionOrderList,

        params: {
          _id: id,
        },
      }).then(async (res) => {
        if (res.data.statusCode === 200) {
          const filterData = res.data.result.filter(
            (data) => data.nftId.tokenId != tokenId
          );
          setOrderList(filterData);
        } else {
          setOrderList([]);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const viewCollectionHandler = async (id) => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfig.viewOrder + id,
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        setDataList(res.data.result);
        downloadPrivateurlHandler(res.data.result?._id);
        collectionOrderListHandler(
          res.data.result?.collectionId?._id,
          res.data.result?.nftId?.tokenId
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateDatahandler(orderId);
  }, []);

  useEffect(() => {
    if (location.search && location.search.length > 0) {
      const ids = location.search.split("?");

      if (ids[1]) {
        setOrderId(ids[1]);
        viewCollectionHandler(ids[1]);
      }
    }
  }, [location]);
  const updateDatahandler = () => {
    if (orderId) {
      collectionOrderListHandler(orderId);
    }
  };

  useEffect(() => {
    if (account && dataList) {
      if (
        dataList.nftId.itemCategory === "private documents" &&
        dataList.currentOwner.walletAddress.toLowerCase() ===
          account.toLowerCase()
      ) {
        setIsPrivatebtn(true);
      } else {
        setIsPrivatebtn(false);
      }
    }
  }, [account, dataList]);

  const downloadPrivateurlHandler = async (id) => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfig.downloadPrivateurl,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        params: {
          orderId: id,
        },
      });
      if (res.data.statusCode === 200) {
        setPrivatedata(res.data.result?.nftId?.uri);
        // toast.success(res.data.responseMessage);
      } else {
        toast.success(res.data.responseMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Box className={classes.root}>
      <Container>
        <Grid container spacing={3}>
          {isLoading ? (
            <DataLoading />
          ) : (
            <Grid item lg={5} md={7} sm={12} xs={12}>
              <Box className={classes.nftcard}>
                {orderDetails?.nftId?.mediaType !== "video" && (
                  <Box className={classes.nftImg}>
                    <figure style={{ margin: 0 }}>
                      <img
                        src={dataList?.nftId?.mediaFile}
                        alt=""
                        style={{
                          width: "100%",
                          borderRadius: "10px",
                        }}
                      />
                    </figure>
                  </Box>
                )}
                {orderDetails?.nftId?.mediaType === "audio" && (
                  <Box className={classes.nftImg}>
                    <figure style={{ margin: 0 }}>
                      <img
                        src={dataList?.nftId?.coverImage}
                        alt=""
                        style={{
                          width: "100%",
                          borderRadius: "10px",
                        }}
                      />
                    </figure>
                  </Box>
                )}
                {(orderDetails?.nftId?.mediaType === "audio" ||
                  orderDetails?.nftId?.mediaType === "video") && (
                  <Box style={{ width: "100%" }}>
                    <video
                      width="100%"
                      controls="false"
                      autoplay="true"
                      loop
                      muted
                      playsinline="true"
                      style={
                        orderDetails?.nftId?.mediaType === "audio"
                          ? { height: 75, borderRadius: "35px" }
                          : { borderRadius: "35px" }
                      }
                    >
                      <source src={orderDetails?.nftId?.uri} type="video/mp4" />
                    </video>
                  </Box>
                )}
                {account && isPrivatebtn && (
                  <>
                    <Box
                      style={{
                        display: " flex",
                        justifyContent: "end",
                        paddingTop: "10px",
                      }}
                    >
                      <a
                        href={Privatedata}
                        target="_blank"
                        style={{ textDecoration: "none" }}
                      >
                        <Button style={{ fontSize: "20px" }}>
                          <span style={{ fontSize: "13px" }}>
                            {" "}
                            Download your private document
                          </span>{" "}
                          &nbsp;
                          <FaArrowAltCircleDown style={{ color: "#4ea6f5" }} />
                        </Button>
                      </a>
                    </Box>
                  </>
                )}

                <Box className={classes.tabBtn} mt={2} mb={1}>
                  <Button
                    className={tabview === "bids" ? "active" : ""}
                    onClick={() => setTabView("bids")}
                  >
                    Bids
                  </Button>
                  <Button
                    className={tabview === "details" ? "active" : " "}
                    onClick={() => setTabView("details")}
                  >
                    Details
                  </Button>
                  <Button
                    className={tabview === "history" ? "active" : " "}
                    onClick={() => setTabView("history")}
                  >
                    History
                  </Button>
                </Box>
                <Box>
                  {tabview === "bids" ? <Bids bidList={bidList} /> : ""}
                  {tabview === "details" ? (
                    <Details orderDetails={orderDetails} />
                  ) : (
                    ""
                  )}
                  {tabview === "history" ? (
                    <History orderDetails={orderDetails} />
                  ) : (
                    ""
                  )}
                </Box>
              </Box>
            </Grid>
          )}
          <Grid item lg={7} md={5} sm={12} xs={12}>
            <Box>
              <Sale
                orderId={orderId}
                setOrderDetailsParent={(data) => setOrderDetails(data)}
                setBidListParent={(list) => setBidList(list)}
                setIsLoadingParent={(status) => setIsLoading(status)}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
      {orderList.length !== 0 && (
        <Box mt={5}>
          <Container maxWidth="lg">
            <Typography variant="h3">More from this collection</Typography>
            <Box mt={5}>
              {orderList && orderList.length === 0 && (
                <Box pl={1}>
                  <Typography
                    variant="h5"
                    style={{ color: "rgb(98 98 98)", fontSize: "16px" }}
                  >
                    NO OTHER ITEMS FOUND
                  </Typography>
                </Box>
              )}
              <Slider {...settings} style={{ width: "100%" }}>
                {orderList.map((data, i) => {
                  return (
                    <Box key={i}>
                      <MarketplaceCard
                        data={data}
                        callbackFun={() => updateDatahandler()}
                        type="timing"
                        index={i}
                      />
                    </Box>
                  );
                })}
              </Slider>
            </Box>
          </Container>
        </Box>
      )}
    </Box>
  );
}

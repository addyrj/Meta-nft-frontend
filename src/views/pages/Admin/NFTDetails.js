import {
  Box,
  Button,
  Grid,
  makeStyles,
  Typography,
  IconButton,
  Container,
} from "@material-ui/core";
import React, { useState, useRef, useEffect, useContext } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import { FiMoreHorizontal } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import apiConfig from "src/ApiConfig/ApiConfig";
import axios from "axios";
import { toast } from "react-toastify";
import { useWeb3React } from "@web3-react/core";

import {
  getWeb3ContractObject,
  sortAddress,
  calculateTimeLeft,
} from "src/utils";

import {
  deadAddress,
  getMarketplaceContractAddress,
  getNetworkDetails,
  NetworkContextName,
  getNormalMarketplaceContractAddress,
} from "src/constants";
import { UserContext } from "src/context/User";
import moment from "moment";
import DeployABI from "src/constants/ABI/DeployABI.json";
import LazyMarketPlaceABI from "src/constants/ABI/MarketplaceABI.json";
import DataLoading from "src/component/DataLoading";
import DataNotFound from "src/component/DataNotFound";
import { useLocation, Link } from "react-router-dom";
import MarketplaceABI from "src/constants/ABI/MarketplaceABI.json";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "70px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "35px 0",
    },
  },
  nftcard: {
    background: "#FFFFFF",
    backdropFilter: "blur(44px)",
    borderRadius: "40px",
    padding: "10px",
  },
  nftImg: {
    cursor: "pointer",
    width: "100%",
    height: "330px",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "40px 40px 10px 10px",
    backgroundColor: "#ccc !important",
  },
  headbox: {
    background: "#ffffff",
    backdropFilter: "blur(44px)",
    borderRadius: "30px",
    padding: "30px",
  },
  subBox: {
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& h4": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "28px",
      lineHeight: "130%",
      color: "#fff",
    },
  },
  creatorbox: {
    alignItems: "center",
    marginTop: "12px",
    "& figure": {
      "& img": { width: "70px", borderRadius: "50%" },
    },
    "& h4": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
    },
  },
  heading: { display: "flex" },
  creColl: {
    display: "flex",
    alignItems: "center",
    marginLeft: "-38px",
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // borderRadius: "100%",
      // overflow: "hidden",
      // width: "100px",
      // height: "100px",
      width: "50px",
      height: "50px",
      minWidth: "50px",
      borderRadius: "50%",
      overflow: "hidden",
      background: "rgba(0,0,0,0.1)",
      "& img": {
        cursor: "pointer",
        // minHeight: "100%",
        maxWidth: "100%",
        display: "block",
      },
    },
    "& h4": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "16px",
      lineHeight: "130%",
    },
  },
  highBids: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "130%",
    marginTop: "32px",
  },
  notifi: {
    background: "rgba(59, 13, 96, 0.4)",
    backdropFilter: "blur(44px)",
    borderRadius: "30px",
    padding: "15px 30px 15px 30px",
    marginTop: "18px",
    "& h4": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
    },
  },
  profilebox: {
    display: "flex",

    "& figure": {
      "& img": { width: "70px", borderRadius: "50%" },
    },
  },
  auctionend: {
    "& h4": {
      paddingTop: "10px",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "130%",
    },
    "& h6": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
      color: "rgba(255, 255, 255, 0.5)",
    },
  },
  bestbid: {
    "& h4": {
      paddingTop: "10px",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "130%",
    },
    "& h6": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
      color: "rgba(255, 255, 255, 0.5)",
    },
  },
  name1: {
    paddingLeft: "15px",
    "& h4": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "130%",
    },
    "& h6": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "16px",
      lineHeight: "130%",
      color: "#FFFFFF",
      paddingTop: "10px",
    },
  },
  bidauction: { display: "flex", marginTop: "5px" },
  chain: {
    "& h4": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "16px",
      lineHeight: "130%",
    },
  },
  contract: {
    "& h4": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
    },
    "& h6": {
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
      color: "rgba(255, 255, 255, 0.5)",
    },
  },
  token: {
    "& h4": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
    },
    "& h6": {
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
      color: "rgba(255, 255, 255, 0.5)",
    },
  },
  blockchain: {
    "& h4": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
    },
    "& h6": {
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
      color: "rgba(255, 255, 255, 0.5)",
    },
  },
  more: {
    "& h4": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "21px",
      lineHeight: "27px",
      [theme.breakpoints.down("md")]: {
        fontSize: "17px",
        lineHeight: "22px",
      },
    },
  },
  boxsection: {
    backgroundColor: "#fff",
    borderRadius: "40px",
    padding: "10px",
  },
  nftImg: {
    width: "100%",
    minHeight: "230px",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "10px 10px 10px 10px",
  },
  likecount: {
    display: "flex",
    fontStyle: "normal",
    alignItems: "center",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "130%",
    color: "#C6BECC",
    "& button": {
      background: "#FCF2FA",
      borderRadius: "50%",
      padding: "11px",
      color: "#D200A5",
      fontSize: "18px",
    },
  },
  box3: {
    display: "flex",
    alignItems: "center",
    paddingTop: "13px",
    "& h6": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#3B0D60",
    },
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "60px",
      overflow: "hidden",
      "& img": {
        maxHeight: "100%",
        maxWidth: "100%",
        height: "auto",
        width: "auto",
        display: "block",
      },
    },
  },
  price3: {
    padding: "3px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& h5": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#D200A5",
    },
  },
  threedot: {
    fontSize: "20px",
    color: "#fff",
    fontWeight: "600",
    height: "100%",
    width: "100%",
    borderRadius: "50%",
    "& button": {},
  },
  headDialog: {
    padding: "30px",
  },
  dialogContent1: {
    padding: "10px 20px 20px 20px",
    "& h2": {
      color: theme.palette.secondary.main,
    },
    "& label": {
      padding: "4px 0px 1px",
    },
  },
  customizedButton: {
    position: "absolute",
    top: "-42px",
    right: "-9px",
    color: "#fff",
  },
}));
export function NFTDetails({
  orderId,
  setOrderDetailsParent,
  setIsLoadingParent,
  reportId,
  reportDetails,
  getReportDetailsHandler,
}) {
  const history = useHistory();
  const { account, chainId, library } = useWeb3React();
  const classes = useStyles();

  const user = useContext(UserContext);
  const [orderDetails, setOrderDetails] = useState();
  const [orderExtraDeails, setOderExtraDeails] = useState();
  const [bidList, setBidList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentOwner, setCurrentOwner] = useState("");
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [properties, setProperties] = useState("");
  const [openBuy, setOpenBuy] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isOrderExpired, setIsOrderExpired] = useState(false);
  const [bidExtraDetails, setBidExtraDetails] = useState();
  const [networkDetails, setNetworkDetails] = useState();

  //   const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    setIsLoadingParent(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (orderDetails) {
      setOrderDetailsParent(orderDetails);
    }
  }, [orderDetails]);

  useEffect(() => {
    if (orderId) {
      getNftDetails(orderId);
    } else {
    }
  }, [orderId, user.userData]);

  const getNftDetails = async (id) => {
    try {
      const res = await axios.get(apiConfig.viewOrder + id, {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        setOrderDetails(res.data.result);

        setBidList(res.data.result[0].bidId.reverse());
        if (res.data.result[0]?.nftId[0]?.properties) {
          setProperties(JSON.parse(res.data.result[0].nftId[0].properties));
        }
        if (user.userData && res.data.result[0]) {
          let likesUsers = res.data.result[0].likesUsers.filter(
            (order) => order === user.userData._id
          );
          //   setIsLike(likesUsers.length > 0);
        }
        setIsOrderExpired(
          parseFloat(res.data.result[0].endTime) < parseFloat(moment().unix())
        );

        if (
          res.data.result[0].collectionId[0].contractAddress &&
          res.data.result[0].network
        ) {
          getOrderExtraDetails(
            res.data.result[0].collectionId[0].contractAddress,
            res.data.result[0].nftId[0].tokenId,
            res.data.result[0].network,
            res.data.result[0].collectionId[0]?.isLazyMinting,
            res.data.result[0].nftId[0]?.isResale
          );
        }
      } else {
        setOrderDetails();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.log("ERROR", error);
    }
  };

  const getOrderExtraDetails = async (
    contractAddress,
    tokenID,
    chianId,
    isLazyMinting,
    isResale
  ) => {
    const OpenMarketplace = !isResale
      ? getMarketplaceContractAddress(chianId)
      : getNormalMarketplaceContractAddress(chianId);
    const networkDetails = getNetworkDetails(chianId);
    setNetworkDetails(networkDetails[0]);

    const contractObj = await getWeb3ContractObject(
      DeployABI,
      contractAddress,
      networkDetails[0].rpcUrls
    );

    const contractObjNormal = await getWeb3ContractObject(
      MarketplaceABI,
      OpenMarketplace,
      networkDetails[0].rpcUrls
    );

    try {
      const ownerOf = await contractObj.methods.ownerOf(tokenID).call();
      setCurrentOwner(ownerOf);
    } catch (error) {
      console.log("ERROR", error);
    }

    try {
      if (isLazyMinting && !isResale) {
        const ordersData = await contractObjNormal.methods
          .orderByAssetId(tokenID)
          .call();

        setOderExtraDeails(ordersData);
        if (ordersData?.seller == deadAddress) {
          setIsCancelled(true);
        }
      } else {
        const ordersData = await contractObjNormal.methods
          .orderByAssetId(contractAddress, tokenID)
          .call();

        setOderExtraDeails(ordersData);
        if (ordersData?.seller == deadAddress) {
          setIsCancelled(true);
        }
      }
    } catch (error) {
      console.log("ERROR", error);
      setIsCancelled(true);
    }
    try {
      if (isLazyMinting && !isResale) {
        const bidByOrderId = await contractObjNormal.methods
          .bidByOrderId(tokenID)
          .call();
        setBidExtraDetails(bidByOrderId);
      } else {
        const bidByOrderId = await contractObjNormal.methods
          .bidByOrderId(contractAddress, tokenID)
          .call();
        setBidExtraDetails(bidByOrderId);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const blockReportHandler = async () => {
    try {
      const res = await axios.get(apiConfig.blockReport + reportId, {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode == 200) {
        toast.success(res.data.responseMessage);
        if (getReportDetailsHandler) {
          getReportDetailsHandler();
        }
      } else {
        toast.error(res.data.responseMessage);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <DataLoading />
      ) : (
        <>
          {!orderDetails ? (
            <DataNotFound />
          ) : (
            <>
              <Box className={classes.headbox}>
                <Box
                  className={classes.subBox}
                  onClick={() => {
                    history.push({
                      pathname: "/marketplace-Detail",
                      search: orderId,
                    });
                  }}
                >
                  <Typography
                    variant="h4"
                    // style={{
                    //   overflow: "hidden",
                    //   width: "91%",
                    //   whiteSpace: "pre",
                    //   textOverflow: "ellipsis",
                    // }}
                  >
                    {orderDetails?.nftId?.tokenName}
                  </Typography>
                </Box>
                <Typography style={{ lineBreak: "anywhere" }}>
                  {" "}
                  {orderDetails?.description}
                </Typography>
                <Box mt={2}>
                  {!account && (
                    <Typography variant="h4">Please Login</Typography>
                  )}
                  {/* {account &&
                    isCancelled &&
                    currentOwner &&
                    currentOwner.toLowerCase() != account.toLowerCase() && (
                      <Typography variant="h4" style={{ color: "red" }}>
                        Expired
                      </Typography>
                    )} */}
                  <Grid container spacing={1}>
                    <Grid container spacing={1}>
                      <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                          fullWidth
                          onClick={() => blockReportHandler()}
                        >
                          {reportDetails?.actionApply ? "Unblock" : "Block"}
                        </Button>
                      </Grid>
                      <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Link to="/admin" style={{ textDecoration: "none" }}>
                          <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            fullWidth
                          >
                            Reject
                          </Button>
                        </Link>
                      </Grid>
                    </Grid>
                    <Box>
                      <Box className={classes.chain} mt={3}>
                        <Typography variant="h4">Reporter Name : </Typography>
                        <Typography>{reportDetails?.name}</Typography>
                      </Box>

                      <Box className={classes.headboxx} mt={3}>
                        <Box className={classes.chain}>
                          <Typography variant="h4">Report Details</Typography>
                        </Box>

                        <Box mt={2} style={{ wordBreak: "break-all" }}>
                          <Typography>{reportDetails?.message}</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Box>
              </Box>
            </>
          )}
        </>
      )}
    </>
  );
}

export default function NFTDetailsData() {
  const classes = useStyles();
  const user = useContext(UserContext);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [orderId, setOrderId] = useState();
  const location = useLocation();
  const [reportDetails, setReportDetails] = useState();
  const [orderDetails, setOrderDetails] = useState();
  const [reportId, setReportId] = useState();

  useEffect(() => {
    if (location.search && location.search.length > 0) {
      const ids = location.search.split("?");
      if (ids[1]) {
        setReportId(ids[1]);
      }
    }
  }, [location]);

  // useEffect(() => {
  //   if (!user.isAdmin) {
  //     history.goBack();
  //   }
  // }, [user.isAdmin]);

  const getReportDetailsHandler = async () => {
    try {
      const res = await axios.get(apiConfig.viewReport + reportId, {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });

      if (res.data.statusCode === 200) {
        setReportDetails(res.data.result);
        setOrderId(res.data.result?.orderId?._id);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    if (reportId) {
      getReportDetailsHandler(reportId, cancelTokenSource);
    } else {
      // setIsLoading(false);
    }

    return () => {
      cancelTokenSource.cancel();
    };
  }, [reportId, user.userData]);

  return (
    <Box className={classes.root}>
      <Container>
        <Grid container spacing={2}>
          {isLoading ? (
            <DataLoading />
          ) : (
            <Grid item lg={7} md={7} sm={12} xs={12}>
              <Box className={classes.nftcard}>
                {/* <Box
                  className={classes.nftImg}
                  style={{
                    background: `url(${
                      orderDetails?.nftId?.coverImage
                        ? orderDetails?.nftId?.coverImage
                        : "/images/cat.png"
                    })`,
                  }}
                ></Box> */}
                <Box
                  className={classes.nftImg}
                  onClick={() => {
                    history.push({
                      pathname: "/marketplace-Detail",
                      search: orderId,
                    });
                  }}
                >
                  <figure
                    style={{
                      margin: 0,
                      display: "flex",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={orderDetails?.nftId?.coverImage}
                      alt=""
                      style={{
                        width: "66%",
                        borderRadius: "10px",
                      }}
                    />
                  </figure>
                </Box>
              </Box>
              {/*  */}
            </Grid>
          )}
          <Grid item lg={5} md={5} sm={12} xs={12}>
            <Box>
              <NFTDetails
                orderId={orderId}
                setOrderDetailsParent={(data) => setOrderDetails(data)}
                setIsLoadingParent={(status) => setIsLoading(status)}
                reportId={reportId}
                reportDetails={reportDetails}
                getReportDetailsHandler={getReportDetailsHandler}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

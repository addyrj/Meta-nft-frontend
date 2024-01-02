import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  FormControl,
  InputAdornment,
  Input,
  FormHelperText,
} from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";
import NftTokenABI from "src/constants/ABI/NftTokenABI.json";
import Apiconfig from "src/ApiConfig/ApiConfig";
import { toast } from "react-toastify";
import axios from "axios";
import Button from "@material-ui/core/Button";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { useWeb3React } from "@web3-react/core";
import moment from "moment";
import { UserContext } from "src/context/User";
import { useHistory, useLocation } from "react-router-dom";
import MarketplaceABI from "src/constants/ABI/MarketplaceABI.json";
import {
  approveTokenHandler,
  placeNormalOrderBlockchainHandler,
} from "src/services";
import {
  NetworkDetails,
  marketplaceContract,
  swichNetworkHandler,
  currency,
  contractKovan,
} from "src/constants";
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "40px",
    paddingBottom: theme.spacing(10),
    "& .heading": {
      "& h2": {
        color: "#fff",
      },
    },
  },
  PageHeading: {
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "39px",
    color: "#898989",
    paddingBottom: "10px",
    display: "flex",
    alignItems: "center",
    "& span": {
      color: "#000",
      lineHeight: "0",
      cursor: "pointer",
      position: "relative",
      "&:hover div": {
        opacity: "1",
      },
      "& svg": {
        paddingLeft: "5px",
        color: "#898989",
      },
    },
  },
  button: {
    marginBottom: "15px",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "0px",
    boxShadow: "none",
    borderBottom: "0",
    borderRadius: "0",
    height: "50px",
    background: "transparent",
    color: "#898989",
    "&:hover": {
      backgroundColor: "#E6E6E6",
      boxShadow: "none",
      borderRadius: "5px",
    },
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
  boxsection: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "10px",
  },
  nftImg: {
    width: "100%",
    height: "165px ",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "100% !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "10px 10px 0px 0px",
    backgroundColor: "#ccc !important",
  },
  price3: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& h5": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "18px",
      lineHeight: "130%",
      color: "#4ea6f5",
    },
  },
  likecount: {
    display: "flex",
    alignItems: "center",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "18px",
    lineHeight: "130%",
    color: "#fff",
    "& button": {
      borderRadius: "50%",
      padding: "15px",
      // color: "#4ea6f5",
      fontSize: "18px",
    },
  },
  box3: {
    display: "flex",
    alignItems: "center",
    "& h6": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#fff",
      marginLeft: "8px",
    },
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "75px",
      overflow: "hidden",
      width: "75px",
      border: "2px solid #4ea6f5",
      borderRadius: "10px",
      "& img": {
        maxHeight: "100%",
        maxWidth: "100%",
        height: "auto",
        width: "auto",
        display: "block",
      },
    },
  },
  innerCollection: {
    position: "absolute",
    width: "calc(100% - 40px)",
    bottom: "0px",
    left: "50%",
    transform: "translateX(-50%)",
    borderRadius: "20px 20px 0 0",
    padding: "20px",
    background: "#1a1919",
  },
  selectOption: {
    width: "300px",
    display: "flex",
    justifyContent: "space-around",

    flexDirection: "row",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "100%",
    margin: "0 10px",
  },
  sectionTitleHead: {
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
    margin: "10px 0 ",
    padding: "0 0",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  title: {
    borderBottom: "1px solid #eaeaea",
  },
  ListItem: {
    "& span": {
      fontSize: "20px",
      lineHeight: "30px",
      color: "#0F8ACA",
      fontWeight: "400",
    },
    "& p": {
      fontSize: "14px",
      lineHeight: "22px",
      color: "#898989",
      fontWeight: "400",
    },
  },

  createIcon: {
    width: 100,
    height: 100,
    color: "#222",
  },
  formControl: {
    padding: 0,
    width: "100%",
  },
  walletSet: {
    padding: "0 15px 0 0",
  },

  price: {
    "& label": { color: "#fff" },
  },
  label1: {
    color: "#fff",
  },
  NftImg: {
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "210px",
      overflow: "hidden",
      background: "rgba(0 , 0, 0, 0.041)",
      "& img": {
        maxHeight: "100%",
        maxWidth: "100%",
        height: "auto",
        width: "auto",
        display: "block",
      },
    },
  },
  nftTitle: {
    "& h6": { color: "#3B0D60 !important" },
    "& h5": {
      color: "#D200A5 !important",
      fontWeight: "boldimport { UserContext } from 'src/context/User'",
      fontSize: "14px",
      lineHeight: "21px",
    },
  },
  CreateFormField: {
    padding: "25px",
    boxShadow: "rgb(99 99 99 / 20%) 0px 2px 8px 0px",
    boxSizing: "border-box",
    borderRadius: "10px",
    backdropFilter: "blur(44px)",
    backgroundColor: "#FFFFFF",
  },
  tabBox: {
    cursor: "pointer",
    display: "flex",
    backdropFilter: "blur(44px)",
    boxShadow: "rgb(99 99 99 / 20%) 0px 2px 8px 0px",
    boxSizing: "border-box",
    justifyContent: "center",
    alignItems: "center",
    padding: "15px",
    borderRadius: "10px",
    border: "1px solid #4ea6f5",
    "&:hover": {
      background: " linear-gradient(261.87deg, #62D3F0 13.12%, #35A5F5 83.57%)",
      color: "#fff",
    },
    "& h6": {
      fontSize: "16px",
      [theme.breakpoints.down("xs")]: {
        fontSize: "12px",
      },
    },
  },
}));

export default function CreateNFT(props) {
  const classes = useStyles();
  const history = useHistory();
  const [orderId, setOrderId] = useState();
  const user = useContext(UserContext);
  const { account, chainId, library } = useWeb3React();
  const { data, type, index } = props;
  const [isSubmit, setIsSubmit] = useState(false);
  const [orderDetails, setOrderDetails] = useState();
  const [resalemsg, setResalemsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [price, setPrice] = useState("");
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [network, setNetwork] = useState(NetworkDetails[0]);
  const [endDate, setEndDate] = useState(moment().add(1, "h"));
  const [royalty, setRoyalty] = useState("");
  const [isValidRoyalty, setIsRoyaltyValid] = useState(true);

  const UserID = location.orderIddata;
  console.log("UserID+++", UserID);
  const updateDimensions = () => {
    var offsetWidth = document.getElementById("imagecard" + index).offsetWidth;
    var newoofsetWidth = offsetWidth - 80;
    document.getElementById("imagecard" + index).style.height =
      newoofsetWidth + "px";
  };
  useEffect(() => {
    updateDimensions();
  }, [data, index]);
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (location.search && location.search.length > 0) {
      const ids = location.search.split("?");
      if (ids[1]) {
        setOrderId(ids[1]);
      }
    }
  }, [location]);
  useEffect(() => {
    if (orderDetails && NetworkDetails) {
      const networkData = NetworkDetails.filter(
        (list) => list.chainId == orderDetails.network
      );
      setNetwork(networkData[0]);
      swichNetworkHandler(orderDetails.network);
    }
  }, [NetworkDetails, orderDetails]);
  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    if (orderId) {
      getNftDetails(orderId, cancelTokenSource);
    } else {
    }

    return () => {
      cancelTokenSource.cancel();
    };
  }, [orderId, user.userData]);
  const getNftDetails = async (id, cancelTokenSource) => {
    try {
      const res = await axios.get(Apiconfig.viewNFT + id, {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        console.log("res.data.result-----", res.data.result);
        setOrderDetails(res.data.result);
      } else {
        setOrderDetails();
      }
      setIsLoadingData(false);
    } catch (error) {
      setIsLoadingData(false);

      console.log("ERROR", error);
    }
  };
  const submitHandler = async () => {
    setIsSubmit(true);
    // if (chainId == orderDetails?.network) {
    if (price !== "" && parseFloat(price) > 0) {
      try {
        setIsLoading(true);
        setResalemsg("Approving");
        if (
          await approveTokenHandler(
            orderDetails.tokenId.toString(),
            orderDetails?.collectionId?.contractAddress,
            NftTokenABI,
            library,
            account,
            marketplaceContract
          )
        ) {
          setResalemsg("Creating Order");
          const royaltySendCheck =
            orderDetails?.collectionId?.contractAddress === contractKovan &&
            account === user?.ownerAccount
              ? royalty
              : orderDetails?.royalties;
          if (
            await placeNormalOrderBlockchainHandler(
              marketplaceContract,
              MarketplaceABI,
              library,
              account,
              orderDetails?.collectionId?.contractAddress,
              orderDetails?.tokenId,
              price?.toString(),
              royaltySendCheck,
              endDate,
              currency
            )
          ) {
            const token = sessionStorage.getItem("token");

            let body = {
              nftId: orderDetails?._id,
              orderId: UserID,
              title: orderDetails?.title,
              details: orderDetails?.description,
              time: (moment().unix() * 1000).toString(),
              startingBid: price.toString(),
              tokenName: orderDetails?.tokenName,
              description: orderDetails?.description,
              royalties: royaltySendCheck,
              startPrice: price?.toString(),
              price: price?.toString(),
              coupounAddress: "0x",
              startTime: (moment().unix() * 1000).toString(),
              endTime: (moment(endDate).unix() * 1000)?.toString(),
              expiryTime: (moment(endDate).unix() * 1000)?.toString(),
              currentOwner: account,
              network: orderDetails?.network,
              currentOwner: user?.userData?._id,
            };
            console.log("body----", body);
            const placeres = await axios({
              method: "post",
              url: Apiconfig["createOrder"],
              data: body,
              headers: {
                token,
              },
            });

            if (placeres) {
              if (placeres && placeres.data.statusCode === 200) {
                toast.success(placeres.data.responseMessage);
                history.push("/explore");
              } else {
                setResalemsg("");
                toast.error(placeres.data.responseMessage);
              }
            } else {
              setResalemsg("");
              toast.error("Something went wrong");
            }
          } else {
            setResalemsg("");
            toast.error("Something went wrong");
          }
        } else {
          // toast.error(error.message);
          // setResalemsg("");
          toast.error("Something went wrong");
        }
      } catch (error) {
        setResalemsg("");
        toast.error(error.message);
        setIsLoading(false);
      }
    } else {
      setResalemsg("");
      toast.error("Please enter valid data");
    }

    setIsLoading(false);
  };

  return (
    <Box className={classes.root}>
      <Container maxWidth="md">
        <Box className="heading">
          <Typography variant="h2">
            {orderDetails &&
            orderDetails.collectionId &&
            orderDetails.collectionId.contractAddress === contractKovan &&
            account === user?.ownerAccount
              ? "Sell NFT"
              : `Resale NFT`}
          </Typography>
        </Box>
        <Box mt={2}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              {/* <label className={classes.label1}>Preview</label> */}
              <Box className={classes.boxsection}>
                <Box
                  id={`imagecard${index}`}
                  className={classes.nftImg}
                  style={
                    orderDetails?.coverImage
                      ? { background: "url(" + orderDetails?.coverImage + ")" }
                      : {
                          background: "url(" + "images/market_detail.png" + ")",
                        }
                  }
                >
                  <Typography variant="h6"></Typography>
                </Box>
                <Box className={classes.box3}>
                  <figure>
                    <img
                      src={
                        user?.userData?.profilePic
                          ? user?.userData?.profilePic
                          : "images/Profile.png"
                      }
                      alt="nftimg"
                    />
                  </figure>
                  <Typography variant="h6">{user.userData?.name}</Typography>
                </Box>
              </Box>
              {(orderDetails?.mediaType === "audio" ||
                orderDetails?.mediaType === "video") && (
                <Box style={{ width: "100%" }}>
                  <video
                    width="100%"
                    loop={false}
                    autoPlay={false}
                    muted={true}
                    controls
                    style={
                      orderDetails?.mediaType === "audio" ? { height: 75 } : {}
                    }
                  >
                    <source src={orderDetails?.uri} type="video/mp4" />
                  </video>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} md={6} className="order2">
              <Box mb={2} className={classes.CreateFormField}>
                <Typography variant="subtitle1">
                  {" "}
                  Please enter preferred price for your NFT to allow users to
                  instantly purchase.
                </Typography>
                <Box mt={4}>
                  <Box>
                    <Box mt={3} className={classes.price}>
                      <label style={{ fontSize: "0.875rem" }}>Price</label>
                      <FormControl fullWidth className={classes.margin}>
                        <Input
                          id="standard-adornment-amount"
                          placeholder="0.00"
                          type="number"
                          disabled={isLoading}
                          onKeyPress={(event) => {
                            if (event?.key === "-" || event?.key === "+") {
                              event.preventDefault();
                            }
                          }}
                          onChange={(e) => {
                            if (e.target.value && e.target.value != "-") {
                              setPrice(Math.abs(Number(e.target.value)));
                            } else {
                              setPrice();
                            }
                          }}
                          error={
                            isSubmit && (price === "" || parseFloat(price) <= 0)
                          }
                          helperText={
                            isSubmit &&
                            (price === "" || parseFloat(price) <= 0) &&
                            "Please enter price"
                          }
                          endAdornment={
                            <InputAdornment position="end">QIE</InputAdornment>
                          }
                        />
                      </FormControl>
                    </Box>
                    {orderDetails &&
                      orderDetails.collectionId &&
                      orderDetails.collectionId.contractAddress ===
                        contractKovan &&
                      account === user?.ownerAccount && (
                        <Box mt={3} className={classes.price}>
                          <label style={{ fontSize: "0.875rem" }}>
                            Royalty
                          </label>
                          <FormControl fullWidth className={classes.margin}>
                            <Input
                              id="standard-adornment-amount"
                              placeholder="0"
                              type="number"
                              disabled={isLoading}
                              value={royalty}
                              onKeyPress={(event) => {
                                if (
                                  event?.key === "-" ||
                                  event?.key === "+" ||
                                  event?.key === "."
                                ) {
                                  event.preventDefault();
                                }
                              }}
                              onChange={(e) => {
                                setRoyalty(e.target.value);
                                if (e.target.value < 0 || e.target.value > 10) {
                                  setIsRoyaltyValid(false);
                                } else {
                                  setIsRoyaltyValid(true);
                                }
                              }}
                              endAdornment={
                                <InputAdornment position="end">
                                  QIE
                                </InputAdornment>
                              }
                            />
                            {!isValidRoyalty && royalty !== "" && (
                              <FormHelperText error>
                                Please enter royalty between 0 to 10
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Box>
                      )}

                    <Box mt={4}>
                      <label style={{ fontSize: "0.875rem" }}>
                        Expiration Date
                      </label>
                      <FormControl className={classes.formControl}>
                        <DateTimePicker
                          value={endDate}
                          onChange={(date) => {
                            setEndDate(date);
                          }}
                          disabled={isLoading}
                          format="DD/MM/yyyy hh:mm A"
                          minDate={moment()}
                        />
                      </FormControl>
                    </Box>

                    <Box mt={3}></Box>
                  </Box>
                </Box>
                <Box mt={4}>
                  {!isLoading ? (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={submitHandler}
                        disabled={isLoading || !isValidRoyalty}
                      >
                        {`${
                          orderDetails?.collectionId?.contractAddress ===
                            contractKovan && account === user?.ownerAccount
                            ? "Sell"
                            : "Resell"
                        } Item`}{" "}
                        {isLoading && <ButtonCircularProgress />}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={isLoading || !isValidRoyalty}
                      >
                        {resalemsg} {isLoading && <ButtonCircularProgress />}
                      </Button>
                    </>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

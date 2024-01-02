import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  TableCell,
  TableContainer,
  TableHead,
  Table,
  TableBody,
  TableRow,
  Divider,
  IconButton,
  MenuItem,
  TextField,
  DialogActions,
  DialogContentText,
} from "@material-ui/core";

import { FaArrowAltCircleDown } from "react-icons/fa";
import { makeStyles } from "@material-ui/styles";
import React, { useState, useEffect, useContext } from "react";
import { useWeb3React } from "@web3-react/core";
import AddIcon from "@material-ui/icons/Add";
import History from "./History";
import { toast } from "react-toastify";
import Sale from "./Sale";
import Bids from "./Bids";
import Slider from "react-slick";
import DataLoading from "src/component/DataLoading";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DialogContent from "@material-ui/core/DialogContent";
import MarketplaceCard from "src/component/MarketplaceCard";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import Apiconfig from "src/ApiConfig/ApiConfig";
import { Details } from "./Details";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { UserContext } from "src/context/User";
import moment from "moment";
import DataNotFound from "src/component/DataNotFound";

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
    "& .nftDetailbox": {
      background: "#FFFFFF",
      backdropFilter: "blur(44px)",
      borderRadius: "10px",
      padding: "15px",
      boxShadow:
        "1px 3px 2px -1px #ff5d0c, 0px 1px 0px 0px #ff5d0c, 0px 1px 3px 0px #ff5d0c",
      boxSizing: "border-box",
    },
    "& .nftDetailbox1": {
      background: "#FFFFFF",
      backdropFilter: "blur(44px)",
      borderRadius: "10px",
      padding: "15px",
      boxShadow: "rgb(99 99 99 / 20%) 0px 2px 8px 0px",
      boxSizing: "border-box",
      border: "1px solid #A8CEDF",
    },
  },
  nftImg: {
    width: "100%",

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
          "linear-gradient(261.87deg, #62D3F0 13.12%, #e5cf58 83.57%)",
      },
    },
  },
  imagesSection: {
    "& img": {
      height: "70px",
      borderRadius: "5px",
      objectFit: "cover",
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
  tableroot: {
    "& .MuiTableCell-root": {
      textAlign: "left",
    },
    "& .tableHead": {
      backgroundColor: "#ECECEC",
      "& th": {
        color: "#383838",
        whiteSpace: "pre",
        fontSize: "18px",
        fontWeight: "500",
        padding: "15px 23px",
        borderBottom: "none",
      },
    },
    "& .descriptionbox": {
      whiteSpace: "pre-line",
      "@media(max-width:768px)": {
        whiteSpace: "nowrap",
      },
    },
  },

  tableRow1: {
    "& td": {
      textAlign: "left",

      color: "#808080",
      whiteSpace: "pre",
      fontSize: "16px",
      fontWeight: "400",
      padding: "17px 23px",
      borderBottom: "1px solid #E0E0E0",
      background: "#FFFFFF",
    },
    "& th": {
      color: theme.palette.text.black,
      whiteSpace: "pre",
      backgroundColor: "#ECECEC",
    },
  },
  tabletopbox: {
    background: "linear-gradient(261.87deg, #62D3F0 13.12%, #e5cf58 83.57%)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "23px",
    marginTop: "70px",
    minHeight: "52px",
    maxHeight: "52px",
    "& .addbox": {
      width: "28px",
      height: "28px",
      borderRadius: "100%",
      backgroundColor: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "& svg": {
        color: "#f3ba2f",
      },
    },
    "& h4": {
      fontWeight: "400",
      color: "#fff",
    },
  },
  dialogsec: {
    "& .MuiDialog-paperWidthXs": {
      maxWidth: "610px",
      overflowY: "auto",
      overflowX: "hidden",
      height: "600px",
      minHeight: "600px",
    },
    "& .MuiFormHelperText-contained": {
      color: "red",
    },
  },
  infomodal: {
    "& h1": {
      fontSize: "30px",
      fontWeight: "600",
      color: "#e5cf58",
      textAlign: "center",
      marginBottom: "16px",
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
    "& h5": {
      fontWeight: "300",
      marginBottom: "10px",
      color: "#fff",
    },
  },
  formControl: {
    width: "100%",
    "& .MuiSelect-outlined.MuiSelect-outlined": {
      paddingRight: "32px",
      paddingTop: "16px",
      paddingBottom: "16px",
    },
  },
  butm: {
    display: "flex",
    justifyContent: "center",
  },
  butm1: {
    backgroundColor: "#252d47",
    color: "#fff",
    "&:hover": {
      background:
        "linear-gradient(124deg, rgba(47, 89, 149, 0.81) 18.76%, rgba(21, 29, 42, 0.87) 43.13%, rgba(0, 88, 241, 0.65) 96.83%)",
    },
  },
  butm2: {
    backgroundColor: "#252d47",
    color: "#fff",
    "&:hover": {
      background:
        "linear-gradient(124deg, rgba(47, 89, 149, 0.81) 18.76%, rgba(21, 29, 42, 0.87) 43.13%, rgba(0, 88, 241, 0.65) 96.83%)",
    },
  },
}));
const Ddata = [
  {
    srno: "12/10/2022   12:29 PM",
    name: "Packed",
    id: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit adipiscing nibh sed dolor. Vulputate neque facilisi tortor ipsum sit. Arcu nunc commodo neque neque, dolor amet, sit mattis.",
  },
  {
    srno: "12/10/2022   12:29 PM",
    name: "Shipping",
    id: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit adipiscing nibh sed dolor. Vulputate neque facilisi tortor ipsum sit. Arcu nunc commodo neque neque, dolor amet, sit mattis.",
  },
  {
    srno: "12/10/2022   12:29 PM",
    name: "Shipping",
    id: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit adipiscing nibh sed dolor. Vulputate neque facilisi tortor ipsum sit. Arcu nunc commodo neque neque, dolor amet, sit mattis.",
  },
  {
    srno: "12/10/2022   12:29 PM",
    name: "Shipping",
    id: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit adipiscing nibh sed dolor. Vulputate neque facilisi tortor ipsum sit. Arcu nunc commodo neque neque, dolor amet, sit mattis.",
  },
];

export default function Nft() {
  const [tabview, setTabView] = useState("bids");
  const classes = useStyles();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [openId, setOpenId] = useState("");
  const [orderDetails, setOrderDetails] = useState();
  const { account, library, chainId } = useWeb3React();
  const [bidList, setBidList] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [orderList, setOrderList] = useState([]);
  const [Privatedata, setPrivatedata] = useState("");
  const [isPrivatebtn, setIsPrivatebtn] = useState(false);
  const [selectdata, setSelectdata] = useState("PACKED");
  const [dataList, setDataList] = useState();
  console.log("dataList**---**", dataList);
  const PhysicalNFTtype = location?.state?.data;
  const Physicaldataprofile = location?.state?.dataprofile;
  // ---------traking----
  const [trakingpreviousOwner, setTrakingpreviousOwner] = useState("");

  const [datetime, setDatetime] = useState("");
  const [isSubmit1, setIsSubmit1] = useState(false);
  const [description, setDescription] = useState("");
  const [isLoadingtrack, setIsLoadingtrack] = useState(false);
  const [trakingdatalist, setTrakingdata] = useState([]);
  const user = useContext(UserContext);

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

  const [tabView5, setTabView5] = useState("");
  // console.log("tabView5++++", tabView5);
  const [eventData, setEventData] = useState({});
  const eventListHandler = async (id) => {
    try {
    } catch (error) {}
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
          // const filterData = res.data.result.filter(
          //   (data) => data.nftId.tokenId != tokenId
          // );
          setOrderList(res.data.result);
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
        url: Apiconfig.viewPhysicalOrder + id,
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        setDataList(res.data.result);
        setTabView5(res.data.result?.nftId.mediaFile);
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
  // useEffect(() => {
  //   const filterdata = dataList?.nftId?.mediaFile.find((data) => {
  //     return data;
  //   });
  //   setTabView5(filterdata);
  // }, [dataList]);

  // useEffect(() => {
  //   const eventId = location.search.split("?")[1];
  //   if (eventId) {
  //     eventListHandler(eventId);
  //   }
  // }, [location]);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen1 = (id) => {
    setOpen1(true);
    setOpenId(id);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const currentDate = new Date();
  console.log("currentDate---", currentDate);

  const submitTrackingHanlder = async () => {
    setIsSubmit1(true);

    if (datetime !== "" && description !== "") {
      setIsLoading(true);
      try {
        const res = await axios({
          method: "POST",
          url: Apiconfig.addtracking,
          headers: {
            token: window.sessionStorage.getItem("token"),
          },
          data: {
            nftId: orderDetails?._id,
            comment: description,
            userId: orderDetails?.userId?._id,
            trackingStatus: selectdata,
            date: datetime,
          },
        });

        if (res.data.statusCode === 200) {
          toast.success("Tracking successful");
          setIsLoading(false);
          ListtrakingHandle();
          setOpen(false);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  };
  const ItemrecieveHandle = async (id) => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "POST",
        url: Apiconfig.addtracking,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          nftId: orderDetails?._id,
          userId: orderDetails?.userId?._id,
          trackingStatus: "COMPLETE",
          previousOwner: trakingpreviousOwner,
        },
      });
      if (res.data.statusCode === 200) {
        toast.success("Item recieved successfully.");
        setIsLoading(false);
        ListtrakingHandle();
        setOpen1(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const ListtrakingHandle = async (id) => {
    setIsLoadingtrack(true);
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfig.listTracking,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        params: {
          nftId: id,
        },
      });
      if (res.data.statusCode === 200) {
        setTrakingdata(res.data.result);
        setTrakingpreviousOwner(res.data.result[0]?.creatorId?._id);

        setIsLoadingtrack(false);
      } else {
        setIsLoadingtrack(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoadingtrack(false);
    }
  };
  useEffect(() => {
    ListtrakingHandle(orderDetails?._id);
  }, [user?.userData]);
  return (
    <Box className={classes.root}>
      <Container>
        <Grid container spacing={3}>
          {isLoading ? (
            <DataLoading />
          ) : (
            <Grid item lg={5} md={7} sm={12} xs={12}>
              <Box className={classes.nftcard}>
                <Box
                  className={
                    dataList?.nftId?.nftType === "PHYSICAL"
                      ? "nftDetailbox"
                      : "nftDetailbox1"
                  }
                >
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
                  {((orderDetails &&
                    orderDetails?.nftId?.mediaType === "audio") ||
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
                        <source
                          src={orderDetails?.nftId?.uri}
                          type="video/mp4"
                        />
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
                            <FaArrowAltCircleDown
                              style={{ color: "#4ea6f5" }}
                            />
                          </Button>
                        </a>
                      </Box>
                    </>
                  )}
                  {/* ------------------------start */}
                  {console.log("dataList?", orderDetails?.nftId?.mediaType)}
                  {orderDetails &&
                    orderDetails?.nftId?.mediaType !== "audio" && (
                      <Grid container spacing={1}>
                        {dataList?.nftId?.physicalNftImage &&
                          dataList?.nftId?.physicalNftImage.map((data, i) => {
                            return (
                              <Grid item xs={2} lg={2} sm={2} md={2}>
                                <Box
                                  className={classes.imagesSection}
                                  onClick={() => setTabView5(data)}
                                  style={{ cursor: "pointer" }}
                                >
                                  <img
                                    src={data}
                                    alt=""
                                    className="img"
                                    width="100%"
                                  />
                                </Box>
                              </Grid>
                            );
                          })}
                      </Grid>
                    )}

                  {/* ------------end */}

                  <Box className={classes.tabBtn} mt={2} mb={1}>
                    {dataList?.nftId?.physicalType === "SINGLE" && (
                      <>
                        <Button
                          className={tabview === "bids" ? "active" : ""}
                          onClick={() => setTabView("bids")}
                        >
                          Bids
                        </Button>
                      </>
                    )}

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
              </Box>
            </Grid>
          )}
          <Grid item lg={7} md={5} sm={12} xs={12}>
            <Box>
              <Sale
                Physicaldataprofile={Physicaldataprofile}
                PhysicalNFTtype={PhysicalNFTtype}
                orderId={orderId}
                setOrderDetailsParent={(data) => setOrderDetails(data)}
                setBidListParent={(list) => setBidList(list)}
                setIsLoadingParent={(status) => setIsLoading(status)}
              />
            </Box>
          </Grid>
        </Grid>
        {orderDetails?.nftId?.physicalType === "MULTIPLE" ? (
          ""
        ) : (
          <>
            <Box className={classes.tableroot}>
              <Box className={classes.tabletopbox}>
                <Typography variant="h4">Tracking info</Typography>

                <IconButton onClick={() => handleClickOpen()}>
                  {dataList?.creatorId?.walletAddress?.toLowerCase() ===
                    account?.toLowerCase() && (
                    <Box className="addbox">
                      <AddIcon />
                    </Box>
                  )}
                </IconButton>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow className={`${classes.tablerow1} tableHead`}>
                      <TableCell>Date and time</TableCell>
                      <TableCell>Shipment Status</TableCell>
                      <TableCell>Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {trakingdatalist.map((data) => (
                      <TableRow className={classes.tableRow1}>
                        <TableCell style={{ borderRight: "none" }}>
                          {data?.date
                            ? moment(data?.date).format("lll")
                            : moment(data?.updatedAt).format("lll")}
                        </TableCell>{" "}
                        <TableCell style={{ borderRight: "none" }}>
                          {data.trackingStatus}
                        </TableCell>{" "}
                        <TableCell className="descriptionbox">
                          {data.comment ? data.comment : "N/A"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {!isLoadingtrack &&
                trakingdatalist &&
                trakingdatalist.length === 0 && (
                  <Box
                    style={{
                      dislay: "flex",
                      justifyContent: "cener",
                      marginTop: "1rem",
                    }}
                  >
                    <DataNotFound />
                  </Box>
                )}
              {isLoadingtrack && (
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    position: "absolute",
                    marginTop: "10px",
                  }}
                >
                  <ButtonCircularProgress />
                </Box>
              )}
            </Box>
            {dataList?.creatorId.walletAddress.toLowerCase() !==
              account?.toLowerCase() && (
              <>
                <Box display="flex" justifyContent="flex-end" mt={2}>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    disabled={isLoading}
                    onClick={() => handleClickOpen1(orderDetails?._id)}
                  >
                    Item received {isLoading && <ButtonCircularProgress />}
                  </Button>
                </Box>
              </>
            )}
          </>
        )}

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
                <Typography variant="h1">Add Traking Details</Typography>
                <Box mb={2}>
                  <Divider />
                </Box>
                <Box>
                  <Typography variant="h5">Shipment status</Typography>
                </Box>
                <FormControl variant="outlined" className={classes.formControl}>
                  <Select
                    value={selectdata}
                    onChange={(e) => setSelectdata(e.target.value)}
                    name="Gender"
                    inputProps={{ "aria-label": "Without label" }}
                    fullWidth
                    variant="outlined"
                  >
                    <MenuItem value="PACKED">Packed</MenuItem>
                    <MenuItem value="SHIPPING">Shipping</MenuItem>
                    <MenuItem value="DISPATCH">Dispatch</MenuItem>
                    <MenuItem value="COMPLETE">Complete</MenuItem>
                    <MenuItem value="DELIVERED">Delivered</MenuItem>
                  </Select>
                </FormControl>
                <Box mt={2}>
                  <Typography variant="h5">Date and time</Typography>
                </Box>
                <TextField
                  type="datetime-local"
                  id="datetime-local"
                  variant="outlined"
                  fullWidth
                  name="fromDate"
                  defaultValue={currentDate}
                  format="DD/MM/yyyy hh:mm"
                  minDate={new Date()}
                  value={datetime}
                  onChange={(e) => setDatetime(e.target.value)}
                  error={isSubmit1 && datetime === ""}
                  helperText={
                    isSubmit1 &&
                    datetime === "" &&
                    "Please select date and time"
                  }
                />
                <Box mt={2}>
                  <Typography variant="h5">Description</Typography>
                </Box>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  fullWidth
                  name="message"
                  type="text"
                  multiline
                  rowsMax={5}
                  rows={5}
                  placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  helperText={
                    isSubmit1 &&
                    description === "" &&
                    "Please enter description"
                  }
                />
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  mt={3}
                >
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    disabled={isLoading}
                    onClick={() => submitTrackingHanlder()}
                  >
                    Submit {isLoading && <ButtonCircularProgress />}
                  </Button>
                </Box>
              </Box>
            </DialogContent>
          </Dialog>
        </Box>
        <Box>
          <Dialog
            open={open1}
            onClose={handleClose1}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            maxWidth="xs"
          >
            <DialogContent style={{ paddingTop: "0px" }}>
              <DialogContentText
                id="alert-dialog-slide-description"
                style={{
                  color: "#52565c",
                  fontSize: "18px",
                  fontWeight: "400",
                  marginTop: "12px",
                }}
              >
                Are you sure want to received item ?
              </DialogContentText>
            </DialogContent>
            <DialogActions className={classes.butm}>
              <Box mb={2}>
                <Button
                  style={{ marginRight: "5px" }}
                  onClick={() => {
                    ItemrecieveHandle(openId);
                  }}
                  variant="contained"
                  color="primary"
                >
                  Yes
                </Button>
                <Button
                  style={{ marginLeft: "5px" }}
                  onClick={handleClose1}
                  variant="contained"
                  color="primary"
                >
                  No
                </Button>
              </Box>
            </DialogActions>
          </Dialog>
        </Box>
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

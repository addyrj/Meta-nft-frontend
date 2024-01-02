import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Link,
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
} from "@material-ui/core";

import { FaArrowAltCircleDown } from "react-icons/fa";
import { makeStyles } from "@material-ui/styles";
import React, { useState, useEffect, useContext } from "react";
import { useWeb3React } from "@web3-react/core";
import AddIcon from "@material-ui/icons/Add";
import History from "./History";
import { toast } from "react-toastify";
import Sale from "./Sale";
import moment from "moment";

import Bids from "./Bids";
import { UserContext } from "src/context/User";
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
  const [tabview, setTabView] = useState("details");
  const classes = useStyles();
  const user = useContext(UserContext);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingtrack, setIsLoadingtrack] = useState(false);
  const [orderDetails, setOrderDetails] = useState();
  const { account, library, chainId } = useWeb3React();
  const [bidList, setBidList] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [orderList, setOrderList] = useState([]);
  const [trakingdatalist, setTrakingdata] = useState([]);
  const [trakingpreviousOwner, setTrakingpreviousOwner] = useState();
  const [Privatedata, setPrivatedata] = useState("");
  const [isPrivatebtn, setIsPrivatebtn] = useState(false);
  const [selectdata, setSelectdata] = useState("PACKED");

  const [dataList, setDataList] = useState();

  const PhysicalNFTtype = location?.state?.data;
  const Physicaldataprofile = location?.state?.dataprofile;

  const [datetime, setDatetime] = useState("");
  const [isSubmit1, setIsSubmit1] = useState(false);
  const [description, setDescription] = useState("");
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
        url: Apiconfig.viewPhysicalNFT + id,
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        setDataList(res.data.result);
        setTabView5(res.data.result?.nftId.mediaFile);
        ListtrakingHandle(res.data.result?._id);
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

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const currentDate = new Date();

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
  const ItemrecieveHandle = async () => {
    setIsLoading("item");
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
          nftId: id ? id : orderDetails?._id,
        },
      });
      if (res.data.statusCode === 200) {
        setTrakingdata(res.data.result);
        setTrakingpreviousOwner(res.data.result[0]?.previousOwner?._id);
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
                    dataList?.nftType === "PHYSICAL"
                      ? "nftDetailbox"
                      : "nftDetailbox1"
                  }
                >
                  {orderDetails?.mediaType !== "video" && (
                    <Box className={classes.nftImg}>
                      <figure style={{ margin: 0 }}>
                        <img
                          src={dataList?.mediaFile}
                          alt=""
                          style={{
                            width: "100%",
                            borderRadius: "10px",
                          }}
                        />
                      </figure>
                    </Box>
                  )}
                  {orderDetails?.mediaType === "audio" && (
                    <Box className={classes.nftImg}>
                      <figure style={{ margin: 0 }}>
                        <img
                          src={dataList?.coverImage}
                          alt=""
                          style={{
                            width: "100%",
                            borderRadius: "10px",
                          }}
                        />
                      </figure>
                    </Box>
                  )}
                  {((orderDetails && orderDetails?.mediaType === "audio") ||
                    orderDetails?.mediaType === "video") && (
                    <Box style={{ width: "100%" }}>
                      <video
                        width="100%"
                        controls="false"
                        autoplay="true"
                        loop
                        muted
                        playsinline="true"
                        style={
                          orderDetails?.mediaType === "audio"
                            ? { height: 75, borderRadius: "35px" }
                            : { borderRadius: "35px" }
                        }
                      >
                        <source src={orderDetails?.uri} type="video/mp4" />
                      </video>
                    </Box>
                  )}

                  {/* ------------------------start */}
                  {console.log("dataList?", orderDetails?.nftId?.mediaType)}
                  {orderDetails && orderDetails?.mediaType !== "audio" && (
                    <Grid container spacing={1}>
                      {dataList?.physicalNftImage &&
                        dataList?.physicalNftImage.map((data, i) => {
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
                    {dataList?.physicalType === "SINGLE" && (
                      <>
                        <Button
                          disabled
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
                      disabled
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
        <Box className={classes.tableroot}>
          <Box className={classes.tabletopbox}>
            <Typography variant="h4">Tracking info</Typography>

            <IconButton onClick={() => handleClickOpen()}>
              {dataList?.previousOwner.walletAddress.toLowerCase() ===
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
                  <TableCell>Discription</TableCell>
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
                {!isLoadingtrack &&
                  trakingdatalist &&
                  trakingdatalist.length === 0 && (
                    <Box
                      style={{
                        dislay: "flex",
                        justifyContent: "center",
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
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {dataList?.previousOwner.walletAddress.toLowerCase() !==
          account?.toLowerCase() && (
          <>
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                disabled={
                  isLoading === "item" ||
                  dataList?.delivered === true ||
                  trakingdatalist.length === 0
                }
                onClick={() => ItemrecieveHandle()}
              >
                Item received{" "}
                {isLoading === "item" && <ButtonCircularProgress />}
              </Button>
            </Box>
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
                  <Typography variant="h5">Discription</Typography>
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
      </Container>
      {/* {orderList.length !== 0 && (
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
      )} */}
    </Box>
  );
}

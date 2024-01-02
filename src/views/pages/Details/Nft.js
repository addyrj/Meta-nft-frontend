import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  IconButton,
  FormControl,
  TextField,
} from "@material-ui/core";
import { getWeb3Obj, getContract } from "src/utils";
import { marketplaceContract, ACTIVE_NETWORK } from "src/constants";
import MarketplaceABI from "src/constants/ABI/MarketplaceABI.json";
import { makeStyles } from "@material-ui/styles";
import React, { useState, useContext, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { GiCancel } from "react-icons/gi";
import Checkbox from "@material-ui/core/Checkbox";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import Apiconfig from "src/ApiConfig/ApiConfig";
import { useHistory, useLocation } from "react-router-dom";
import DataNotFound from "src/component/DataNotFound";
import { UserContext } from "src/context/User";
import axios from "axios";
import { toast } from "react-toastify";
import All from "./All";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
const useStyles = makeStyles((theme) => ({
  root: { padding: "70px 0px" },
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
  btnhead: {
    display: "flex",
    marginTop: "-130px",
    alignItems: "center",
    "@media(max-width:800px)": { marginTop: "20px", marginBottom: "20px" },
  },
  btnfollow: {
    borderRadius: "10px",
    "& Button": { borderRadius: "10px", margin: "0px" },
    "& .IconButton": {
      borderRadius: "10px",
    },
  },
  createCollection: {
    "& figure": {
      height: 100,
      width: 100,
      minWidth: 100,
      marginRight: 15,
      borderRadius: "50%",
      background: "#C4C4C4",
      marginLeft: "-2px",
    },
    "& button": {
      marginTop: 15,
    },
  },
  link: {
    color: "#35a5f5",
    justifyContent: "start",
  },
  link1: {
    color: "#ff7d68",
    justifyContent: "start",
  },
}));

export default function Profile(props) {
  const collectionData = props?.location?.state?.data;

  const { account, library, chainId } = useWeb3React();
  const web3 = (window.web3 = new Web3(window.ethereum));
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const user = useContext(UserContext);
  const [particularorderlist, setparticularorderlist] = useState([]);
  const [hotdata, setHotdata] = useState([]);

  const [isLoading, setisLoading] = useState(true);
  const userId = user?.userData?._id;
  const [dataList, setDataList] = useState([]);
  const [idd, setIdd] = useState();
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [imgFile, setImgFile] = useState("");
  const [imgFileBase, setImgFileBase] = useState(
    collectionData?.collectionImage
  );
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [symbol, setSymbol] = useState("");
  const [isPromoted, setisPromoted] = useState(true);

  const [imgBlob, setImgBlob] = useState("");
  const [check, setcheck] = useState(false);
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
  const [formValue, setFormValue] = useState({
    // displayName: "",
    symbol: "",
    description: "",
    categoryType: "",
  });

  const getparticularorderlist = async (id) => {
    try {
      const res = await axios.get(Apiconfig.particularCollectionOrderList, {
        params: {
          _id: id,
        },
      });
      if (res.data.statusCode === 200) {
        setparticularorderlist(res.data.result);

        setisLoading(false);
      } else {
        setparticularorderlist();

        setisLoading(false);
      }
    } catch (error) {
      setparticularorderlist();

      setisLoading(false);
    }
  };
  const viewCollectionHandler = async (id) => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfig.viewCollection + id,
      });
      if (res.data.statusCode === 200) {
        setDataList(res.data.result);
        console.log("collectionDetails", res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (location.search.substring(1, location.search.length)) {
      const id = location.search.substring(1, location.search.length);
      if (id) {
        viewCollectionHandler(id);
        getparticularorderlist(id);
        setIdd(id);
      }
    }
  }, [location.search]);
  const updateDatahandler = () => {
    if (idd) {
      getparticularorderlist(idd);
    }
  };

  useEffect(() => {
    setparticularorderlist([]);
  }, []);
  const collectiondata = props?.location?.state?.collectionId?.data;

  const getHotcollectionData = async () => {
    const res = await axios({
      method: "GET",
      url: Apiconfig.getCollectionFee,
    }).then(async (res) => {
      if (res.data.statusCode === 200) {
        setHotdata(res.data.result[0]?.collectionFee);
      }
    });
  };

  useEffect(() => {
    getHotcollectionData();
  }, []);

  const handleSubmit = async () => {
    // setIsSubmit(true);
    if (!isPromoted) {
      setcheck(true);
      return;
    }
    // if (imgFileBase === "") {
    //   toast.warn("Please select image");
    //   return;
    // }
    // if (category === "") {
    //   toast.warn("Please enter category");
    //   return;
    // }
    // if (symbol === "") {
    //   toast.warn("Please enter symbol");
    //   return;
    // }

    try {
      setIsUpdatingData(true);
      // const formData = new FormData();
      // formData.append("_id", idd);
      // formData.append("contractAddress", dataList?.contractAddress);
      // formData.append("collectionImage", imgFileBase);
      // formData.append("categoryType", formValue.categoryType);
      // formData.append("symbol", formValue.symbol);
      // formData.append("isPromoted", isPromoted);
      // console.log("formData++", formData);

      const contract = getContract(
        marketplaceContract,
        MarketplaceABI,
        library,
        account
      );

      // *********************** Owner

      const AdminOwner = await contract.owner();
      await AdminOwner;

      const transfer = await web3.eth.sendTransaction(
        {
          from: account,
          to: AdminOwner,
          value: web3.utils.toWei(
            hotdata ? hotdata.toString() : (0.001).toString()
          ),
        },
        function async(err, transactionHash) {
          if (err) {
            console.log("Payment failed Error", err);
            return;
          } else {
          }
        }
      );

      const res = await axios({
        method: "PUT",
        url: Apiconfig.editCollection,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          _id: idd,
          contractAddress: dataList?.contractAddress,
          collectionImage: imgFileBase ? imgFileBase : comment.collectionImage,
          displayName: category,
          isPromoted,
        },
      });
      if (res.data.statusCode === 200) {
        history.push("/my-collections");
        setIsUpdatingData(false);
        setOpen(false);
        toast.success(res.data.responseMessage);
      }
    } catch (error) {
      console.log(error);
      setIsUpdatingData(false);
    }
  };
  const [comment, setComment] = React.useState([]);
  const OpenModal = (comment) => {
    setComment(comment);
    console.log("comment", comment);
    setCategory(comment.displayName);
    setDescription(comment.description);
    setSymbol(comment.symbol);

    setOpen(true);
  };

  return (
    <Box className={classes.root}>
      <Container maxWidth="lg">
        <Box
          className={classes.bannerimg}
          style={
            collectionData?.bannerImage
              ? { background: "url(" + collectionData?.bannerImage + ")" }
              : {
                  background: "url(" + "/images/market_detail.png" + ")",
                } && dataList?.bannerImage
              ? {
                  background: "url(" + dataList?.bannerImage + ")",
                }
              : { background: "url(/images/market_detail.png)" }
          }
        ></Box>
        <Box className={classes.headbox2}>
          <Box style={{ display: "flex", flexWrap: "wrap" }}>
            <Box
              style={
                collectionData?.collectionImage
                  ? {
                      background:
                        "url(" + collectionData?.collectionImage + ")",
                    }
                  : {
                      background: "url(" + "/images/Profile.png" + ")",
                    } && dataList?.collectionImage
                  ? {
                      background: "url(" + dataList?.collectionImage + ")",
                    }
                  : { background: "url(" + "/images/Profile.png" + ")" }
              }
              className={classes.profileimg}
            ></Box>

            <Box className={classes.text1}>
              <Typography variant="h2">
                {collectionData?.displayName
                  ? collectionData?.displayName
                  : dataList?.displayName}
              </Typography>
              <Typography>
                {collectionData?.description
                  ? collectionData?.description
                  : dataList?.description}
              </Typography>
            </Box>
          </Box>
          {dataList &&
            userId &&
            dataList?.userId === userId &&
            dataList.collectionType === "REGULAR" &&
            dataList.displayName !== "HovR Hooligans" &&
            !dataList?.isPromoted && (
              <>
                {" "}
                <Box className={classes.btnhead}>
                  <Box className={classes.btnfollow}>
                    <Button
                      variant="contained"
                      size="large"
                      color="primary"
                      onClick={() => OpenModal(dataList)}
                      // onClick={() => followUnfollowHandler(userId)}
                    >
                      Promote or Edit
                    </Button>
                  </Box>
                </Box>
              </>
            )}
          {account &&
            user &&
            user.ownerAccount === account &&
            dataList.collectionType === "DEFAULT" &&
            dataList.displayName === "HovR Hooligans" && (
              <Box className={classes.btnhead}>
                <Box className={classes.btnfollow}>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={() => OpenModal(dataList)}
                    // onClick={() => followUnfollowHandler(userId)}
                  >
                    Promote or Edit
                  </Button>
                </Box>
              </Box>
            )}
        </Box>

        <Grid container spacing={3}>
          <Grid item md={12} sm={12} xs={12} lg={12}>
            <Box>
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
                <All
                  particularorderlist={particularorderlist}
                  callbackFun={() => updateDatahandler()}
                />
              )}
              {!isLoading && !particularorderlist && <DataNotFound />}
            </Box>
            {/* <Box align="right" style={{ marginTop: "20px" }}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                component={Link}
                to="/"
              >
                Promote this collection
              </Button>
            </Box>
            <Box align="right">
              <span style={{ color: "#000c", fontSize: "13px" }}>
                Fee= 0.01
              </span>
            </Box> */}
          </Grid>
        </Grid>
      </Container>

      <Dialog
        open={open}
        className={classes.createbox}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.paper }}
      >
        <DialogActions>
          <IconButton
            onClick={() => setOpen(false)}
            className={classes.customizedButton}
          >
            <GiCancel />
          </IconButton>
        </DialogActions>
        <DialogContent className={classes.dialogBox}>
          <Box className={classes.NftBreed}>
            <Box className="modal_text">
              <Typography
                variant="h5"
                align="center"
                style={{ color: " #039be3" }}
              >
                Promote Collection
              </Typography>
              {/* <Box
                className={classes.createCollection}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  {bannerImageBlob !== "" ? (
                    <img
                      src={bannerImageBlob}
                      alt=""
                      width="100"
                      height="100"
                      style={{ borderRadius: "50%" }}
                    />
                  ) : (
                    <figure></figure>
                  )}
                </Box>
                <Box pl={2}>
                  <Typography variant="body2">
                    We recommend an image of at least 400x400.
                  </Typography>
                  <Typography variant="body2" style={{ color: "#000" }}>
                    Select Banner Image
                  </Typography>
                  <Box>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="raised-button-file-banner"
                      type="file"
                      name="collectionIMG"
                      // onChange={(e) => {
                      //   if (e.target.files[0]) {
                      //     getBase64(e.target.files[0], (result) => {
                      //       setBannerImage(result);
                      //     });

                      //     const valueBlob = URL.createObjectURL(
                      //       e.target.files[0]
                      //     );
                      //     setBannerImageBlob(valueBlob);
                      //   }
                      // }}
                    />
                    <label htmlFor="raised-button-file-banner">
                      <Button
                        variant="contained"
                        color="secondary"
                        component="span"
                      >
                        Choose File
                      </Button>
                    </label>
                    {isSubmit && bannerImage === "" && (
                      <Typography style={{ color: "#ff7d68" }} variant="body2">
                        Please select banner image
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box> */}
              <Box
                className={classes.createCollection}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  {/* {imgFile !== "" ? ( */}
                  <img
                    src={imgFileBase}
                    alt=""
                    width="100"
                    height="100"
                    style={{ borderRadius: "50%" }}
                  />
                  {/* ) : (
                    <figure></figure>
                  )} */}
                </Box>
                <Box pl={2}>
                  <Typography variant="body2">
                    We recommend an image of at least 400x400.
                  </Typography>
                  <Typography variant="body2" style={{ color: "#000" }}>
                    Select Image (Optional)
                  </Typography>
                  <Box>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="raised-button-file78"
                      multiple
                      type="file"
                      name="collectionIMG"
                      onChange={(e) => {
                        setImgBlob(URL.createObjectURL(e.target.files[0]));
                        setImgFile(e.target.files[0]);
                        getBase64(e.target.files[0], (result) => {
                          setImgFileBase(result);
                        });
                      }}
                    />
                    <label htmlFor="raised-button-file78">
                      <Button
                        variant="contained"
                        color="secondary"
                        component="span"
                      >
                        Choose File
                      </Button>
                    </label>
                    {/* {isSubmit && imgFileBase === "" && (
                      <Typography style={{ color: "#ff7d68" }} variant="body2">
                        Please select image
                      </Typography>
                    )} */}
                  </Box>
                </Box>
              </Box>
              <Box mt={2} className={classes.textfiledlabel}>
                {/* <Box mt={2}>
                  <label>Display name (required)</label>
                  <FormControl fullWidth className={classes.margin}>
                    <TextField
                      id
                      inputProps={{ maxLength: 20 }}
                      placeholder="Enter token name"
                      name="displayName"
                      value={formValue.displayName}
                      onChange={(e) => _onInputChange(e)}
                      error={isSubmit && formValue.displayName === ""}
                      helperText={
                        isSubmit &&
                        formValue.displayName === "" &&
                        "Please enter name"
                      }
                    />
                    <small>Token name cannot be changed in future</small>
                  </FormControl>
                </Box> */}
                <Box mt={2}>
                  <label style={{ color: "#fffdb", fontSize: "14px" }}>
                    Collection Name (Optional)
                  </label>
                  <FormControl fullWidth className={classes.margin}>
                    <TextField
                      disabled={isUpdatingData}
                      id
                      inputProps={{ maxLength: 20 }}
                      placeholder="Please enter collection name"
                      name="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      // error={isSubmit && category == ""}
                      // helperText={
                      //   isSubmit &&
                      //   category == "" &&
                      //   "Please enter collection name"
                      // }
                    />
                    {/* <small>Token name cannot be changed in future</small> */}
                  </FormControl>
                </Box>
                <Box mt={3}>
                  <label style={{ color: "#fffdb", fontSize: "14px" }}>
                    Symbol
                  </label>
                  <FormControl fullWidth className={classes.margin}>
                    <TextField
                      disabled
                      id
                      placeholder={"Please enter symbol"}
                      name="symbol"
                      value={symbol}
                      onChange={(e) => setSymbol(e.target.value)}
                      // error={isSubmit && symbol === ""}
                      // helperText={
                      //   isSubmit && symbol === "" && "Please enter symbol"
                      // }
                    />
                  </FormControl>
                </Box>
                <Box mt={3}>
                  <label style={{ color: "#fffdb", fontSize: "14px" }}>
                    Description (Optional)
                  </label>
                  <FormControl fullWidth className={classes.margin}>
                    <TextField
                      disabled={isUpdatingData}
                      id
                      placeholder="Please enter description"
                      name="description"
                      value={description}
                      // onChange={(e) => _onInputChange(e)}
                      onChange={(e) => setDescription(e.target.value)}
                      // error={isSubmit && description === ""}
                      // helperText={
                      //   isSubmit &&
                      //   description === "" &&
                      //   "Please enter description"
                      // }
                    />
                  </FormControl>
                </Box>
                {/* <Box mt={3}>
                  <label>Short url (optional) </label>
                  <FormControl fullWidth className={classes.margin}>
                    <Input
                      id
                      placeholder="Enter short url"
                      startAdornment={
                        <InputAdornment position="start">
                          NftTokenABI.com/
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Box> */}

                <Box mt={3}>
                  {/* <FormControlLabel
                    control={ */}
                  <Typography>
                    {check ? (
                      <Checkbox
                        // onChange={handleChange}
                        inputProps={{
                          "aria-label": "secondary checkbox",
                        }}
                        className={classes.link1}
                        name="checked"
                        color="green"
                        checked={isPromoted}
                        onChange={(e) => {
                          setisPromoted(e.target.checked);
                          setcheck(false);
                        }}
                        label="Check me"
                      />
                    ) : (
                      <Checkbox
                        className={classes.link}
                        inputProps={{
                          "aria-label": "secondary checkbox",
                        }}
                        // onChange={handleChange}
                        name="checked"
                        color="green"
                        checked={isPromoted}
                        onChange={(e) => {
                          setisPromoted(e.target.checked);
                        }}
                        label="Check me"
                      />
                    )}
                    Promote this collection for {hotdata ? hotdata : "0.001"}{" "}
                    QIE
                  </Typography>
                  {/* }
                    label="Promote collection"
                  /> */}
                </Box>
              </Box>
              <Box mt={3} mb={4} textAlign="Center">
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleSubmit}
                  color="primary"
                  disabled={isUpdatingData}
                >
                  Promote {isUpdatingData && <ButtonCircularProgress />}
                </Button>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

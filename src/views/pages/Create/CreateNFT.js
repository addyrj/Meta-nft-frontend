import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  TextField,
  Select,
  Link,
  MenuItem,
  IconButton,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  Input,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import Switch from "@material-ui/core/Switch";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import moment from "moment";

import { AiOutlineCheckCircle } from "react-icons/ai";
import { useHistory, useLocation } from "react-router-dom";

import { CgShapeHalfCircle } from "react-icons/cg";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import {
  FaFacebookF,
  FaInstagramSquare,
  FaTelegramPlane,
  FaTwitter,
} from "react-icons/fa";
import {
  getDateDiff,
  uploadNFTHandler,
  createNFTHandler,
  uploadContractHandler,
  placeOrderAPIHandler,
  getTokenId,
  placeOrderBlockchainHandler,
  createNFTBlockchainHanlder,
  addImageHandler,
  uploadImageHandler,
  createCollectionAPIHanlder,
} from "src/services";
import { UserContext } from "src/context/User";
import {
  NftTokenAddress,
  marketplaceContract,
  contractKovan,
  NetworkContextName,
  ACTIVE_NETWORK,
  swichNetworkHandler,
  currency,
} from "src/constants";
import { ethers } from "ethers";
import { MdCancel, MdEmail } from "react-icons/md";
import MarketplaceABI from "src/constants/ABI/MarketplaceABI.json";
import GenerativeNFTABI from "src/constants/ABI/GenerativeNFTABI.json";
import NftTokenABI from "src/constants/ABI/NftTokenABI.json";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import { MdAddCircle } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { CgTimelapse } from "react-icons/cg";

import { HiTag } from "react-icons/hi";
import { FaGamepad } from "react-icons/fa";
import axios from "axios";
import ApiConfig from "src/ApiConfig/ApiConfig";
import { BsMusicNote } from "react-icons/bs";
import { useWeb3React } from "@web3-react/core";
import { GiRoundStruck } from "react-icons/gi";
import { BiFace } from "react-icons/bi";
import CollectionCard from "./CollectionCard";
import Web3 from "web3";

import {
  getWeb3Obj,
  getContract,
  balanceOfValue,
  getWeb3ContractObject,
  sortAddressamount,
} from "src/utils";
import { GiCancel, GiPaintBrush } from "react-icons/gi";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { FaThumbsUp } from "react-icons/fa";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { DateTimePicker } from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  bannerBox: {
    padding: "40px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "50px 0",
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
    fontSize: " 0.875rem",
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
  FilterDiv: {
    "& button": {
      borderRadius: "10px",
      marginBottom: "5px !important",
      marginRight: "4px",
    },
  },
  customizedButton: {
    position: "absolute",
    top: "-42px",
    right: "-9px",
    color: "#fff",
  },
  paper: {
    overflowY: "unset",
  },
  root: {
    backgroundColor: "#FFFFFF",
    borderRadius: "10px",
    padding: "25px",
    backdropFilter: "blur(44px)",
    boxShadow: "rgb(99 99 99 / 20%) 0px 2px 8px 0px",
    boxSizing: "border-box",

    "& h2": {
      color: "#fff",
      textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      [theme.breakpoints.down("xs")]: {
        fontSize: "20px",
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
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "0px",
    boxShadow: "none",
    // borderBottom: "0",
    borderRadius: "0",
    height: "40px",
    background: "transparent",
    // color: "#35a5f5 !important ",
    borderRadius: "10px",
    "& svg": {
      width: "34px",
      height: "35px",
      background: "#FCF2FA",
      borderRadius: "10px",
      padding: "5px 6px",
      color: "rgba(152, 126, 171, 0.5)",
    },
    "&:hover": {
      backgroundColor: "#E6E6E6",
      boxShadow: "none",
      borderRadius: "10px",
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
  box3: {
    display: "flex",
    alignItems: "center",
    paddingTop: "13px",
    "& h6": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#000",
    },
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "75px",
      width: "75px",
      overflow: "hidden",
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
  price3: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& h5": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#35a5f5",
    },
  },
  likecount: {
    display: "flex",
    alignItems: "center",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "130%",
    color: "#C6BECC",
    "& button": {
      background: "#FCF2FA",
      borderRadius: "50%",
      padding: "15px",
      color: "#35a5f5",
      fontSize: "18px",
    },
  },
  ListItem: {
    "& span": {
      fontSize: "20px",
      lineHeight: "30px",
      color: theme.palette.secondary.main,
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
  creatcollection: {
    color: "#3B0D60",
    fontSize: "40px",
    fontWeight: "700",
    fontFamily: "'Montserrat', sans-serif",
  },
  NftBreed: {
    // width: 700,
    maxWidth: "100%",
    // padding: "15px",
    "& h5": {
      color: theme.palette.secondary.main,
    },
    "& label": {
      color: "#fffdb",
      fontSize: "14px",
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
  textfiledlabel: {
    "& label": {
      color: "#fffdb",
      fontSize: "14px",
    },
  },
  imgbox: {
    width: "100%",
    minHeight: "150px",
    border: "1px solid #4ea6f5",
    borderRadius: "10px",
    // padding: "8px",
  },

  selectedbutton: {
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "0px",
    boxShadow: "none",
    borderBottom: "0",
    borderRadius: "0",
    height: "40px",
    borderRadius: "10px",
    backgroundColor: "#E6E6E6",
    boxShadow: "none",
  },
  selectedbuttons: {
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "0px",
    boxShadow: "none",
    borderBottom: "0",
    borderRadius: "0",
    height: "50px",
    borderRadius: "5px",
    backgroundColor: "#E6E6E6",
    boxShadow: "none",
  },
  // gridbox: {
  //   "@media(max-width:600px)": {
  //     order: "0",
  //   },
  // },
  // gridbox1: {
  //   "@media(max-width:600px)": {
  //     order: "2",
  //   },
  // },
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

export default function ResellNFT(props) {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });

  const classes = useStyles();
  const { account, library, chainId } = useWeb3React();

  const { data, type, index } = props;
  const location = useLocation();
  const [tabview, setTabView] = useState("fixed");
  const [tabview2, setTabView2] = useState("create");
  const [settings, setSettings] = useState(true);
  const [share, setShare] = useState(false);
  const history = useHistory();
  const user = useContext(UserContext);

  const [startDate, setstartDate] = useState(new Date());
  const [open, setOpen] = React.useState(false);
  const [imageFile, setImageFile] = useState("");
  const [imgBuild, setimgBuild] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [description, setDescription] = useState("");
  const [royalties, setRoyalties] = useState("0");

  const [isAdvance, setIsAdvance] = useState(false);
  const [imgBlob, setImgBlob] = useState("");
  const [imgBlob1, setImgBlob1] = useState("");
  const [imageBannerr, setImageBanner] = useState("");
  const [propertyFirst, setpropertyFirst] = useState("");
  const [properySecond, setProperySecond] = useState("");
  const [alternateText, setAlternateText] = useState("");
  const [collectionList, setCollectionList] = useState([]);

  const [isSubmit, setIsSubmit] = useState(false);
  const [isSubmit1, setIsSubmit1] = useState(false);
  const [banarImage, setBanarImage] = useState("");
  const [endDate, setEndDate] = useState(moment().add(1, "h"));
  const [hotdata, setHotdata] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");

  const [selectedCollection, setSelectedCollection] = useState("create");

  const [imgFile, setImgFile] = useState("");

  const [craft, setCraft] = useState("");
  const [openTransactionModal, setOpenTransactionModal] = useState(false);
  const [imgFileBase, setImgFileBase] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [uploadBanner, setUploadBanner] = useState(false);
  const [banarImageBase64, setBanarImageBase64] = useState("");
  const [banarImageBuild, setBanarImageBuild] = useState("");
  const [isMp3, setIsMp3] = useState(false);
  const [mediaType, setMediaType] = useState("");
  const [coverBlob, setCoverBlob] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [bannerImageBlob, setBannerImageBlob] = useState("");

  const [transactionStatus, setTransactionStatus] = useState("Create Item");
  const [coverFile, setCoverFile] = useState("");

  const [coverPrivate, setCoverPrivate] = useState(""); //coverPrivate
  const [privateDoc, setPrivateDoc] = useState(""); //PrivateDoc

  const [fileTypeCheck, setFileTypeCheck] = useState("");

  const [fileTypeCheckp, setFileTypeCheckprivate] = useState("");

  const [title, setTitle] = useState("");
  const [backImage, setBackImage] = useState("");
  const [coverFileBase, setCoverFileBase] = useState("");
  const [recipientWalletAddress, setwalletAddress] = React.useState("");
  const [recipientBackupWalletAddress, setbackupwalletAddress] =
    React.useState("");
  const [allCategory, setlistCategory] = useState();
  const [selectCData, setSelectCData] = useState();

  const [createmsg, setCreatemsg] = useState("");
  const dataCraft = location?.state?.data;

  const [orderStatus, setOrderStatus] = useState("Mint");
  const [isAuction, SetIsAuction] = useState("fixed");
  const [startPrice, setStartPrice] = useState("");
  const [price, setPrice] = useState("");
  const [timeDiffObj, setTimeDiffObj] = useState(getDateDiff(endDate));
  const [unloackData, setUnloackData] = useState("");
  const web3 = (window.web3 = new Web3(window.ethereum));
  // const { allCategory } = user;
  const [isCreateOrder, setIsCreateOrder] = useState(true);
  const [check, setcheck] = useState(false);

  const [isPromoted, setisPromoted] = useState(false);

  const handleChangeStatus2 = async (file) => {
    try {
      // setisloading1(true);

      const formDataImages = new FormData();
      formDataImages.append("file", imgFile);

      const response = await axios({
        method: "POST",
        url: ApiConfig.uploadImage,
        data: formDataImages,
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (response.data.statusCode === 200) {
        // toast.success("Image submitted successfully");
        setBackImage(response.data.result);

        // setisloading1(false);
      } else {
        // setisloading1(false);
        // toast.error("Image not uploaded");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleChangeStatus2();
  }, [imgFile]);

  const [formValue, setFormValue] = useState({
    displayName: "",
    symbol: "",
    description: "",
    shortUrl: "",
    collectionIMG: "",
    bannerImage: "",
  });
  //main
  let buttons = document.querySelectorAll("collButton");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      buttons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
    });
  });

  const getHotcollectionData = async () => {
    const res = await axios({
      method: "GET",
      url: ApiConfig.getCollectionFee,
    }).then(async (res) => {
      if (res.data.statusCode === 200) {
        setHotdata(res.data.result[0]?.collectionFee);
      }
    });
  };

  useEffect(() => {
    getHotcollectionData();
  }, []);

  useEffect(() => {
    if (dataCraft && dataCraft === "craft") {
      setSelectedCategory("private documents");
    }
  }, []);

  const listCategoryapi = async () => {
    try {
      const res = await axios({
        method: "Get",
        url: ApiConfig.listCategory,
        // parms: {
        //   search: "",
        // },
      });
      if (res.data.statusCode == 200) {
        if (res.data.result.docs) {
          setlistCategory(res.data.result.docs);
        }
        const resultdata = res.data.result.docs.filter((data) => {
          return data?.categoryTitle === "Private documents ";
        });
        setSelectCData(resultdata[0]?.categoryTitle);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  useEffect(() => {
    listCategoryapi();
  }, []);

  const _onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const temp = { ...formValue, [name]: value };
    setFormValue(temp);
  };

  const _onInputFileChange = (e) => {
    const valueBlob = URL.createObjectURL(e.target.files[0]);
    setImageBanner(valueBlob);

    const name = e.target.name;
    const value = e.target.files[0];
    const temp = { ...formValue, [name]: value };
    setFormValue(temp);
  };
  const _onInputFileChange1 = (e) => {
    const valueBlob = URL.createObjectURL(e.target.files[0]);

    setImgBlob1(valueBlob);

    const name = e.target.name;
    const value = e.target.files[0];
    const temp = { ...formValue, [name]: value };
    setFormValue(temp);
    console.log("temp", temp);
  };

  useEffect(() => {
    if (location.search.substring(1, location.search.length)) {
      const id = location.search.substring(1, location.search.length);
      setCraft(id);
    }
  }, [location.search]);

  //Collection function
  const handleSubmit = async () => {
    setIsSubmit(true);
    if (
      formValue.bannerImage !== "" &&
      formValue.displayName !== "" &&
      formValue.symbol !== "" &&
      formValue.description !== "" &&
      formValue.collectionIMG !== ""
    ) {
      setIsLoading1(true);

      // if (isValidAddress) {
      if (formValue.collectionIMG !== "") {
        await addImageHandler(formValue.collectionIMG)
          .then(async (res) => {
            if (isPromoted) {
              const contract = getContract(
                marketplaceContract,
                MarketplaceABI,
                library,
                account
              );

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
                    return;
                  } else {
                  }
                }
              );

              let receipt = "";
              await uploadContractHandler(
                formValue.displayName,
                formValue.symbol,
                res,
                formValue.collectionIMG,
                account,
                (result) => {
                  receipt = result;
                }
              );
              if (receipt != false) {
                const resResult = await createCollectionAPIHanlder(
                  NftTokenAddress,
                  formValue.displayName,
                  formValue.symbol ? formValue.symbol : "NA",
                  formValue.description ? formValue.description : "NA",
                  isPromoted,
                  formValue.collectionIMG,
                  formValue.bannerImage,
                  res,
                  formValue.shortUrl ? formValue.shortUrl : "NA",

                  "createCollection"
                );
                // setSuccessMSG(resResult.data.responseMessage);
                setIsLoading1(false);

                if (resResult && resResult.data.statusCode === 200) {
                  // getCollectionListHanlder();
                  toast.success(resResult.data.responseMessage);
                  setOpen(false);
                  setIsLoading1(false);
                  await getCollectionListHanlder();
                  // setSuccessMSG('');
                  // setImgBlob("");
                  setIsSubmit(false);
                  setFormValue({
                    displayName: "",
                    symbol: "",
                    description: "",
                    bannerImage: "",
                    collectionIMG: "",
                    shortUrl: "",
                  });
                  user.getCollectionList();
                } else {
                  if (resResult) {
                    toast.error(resResult.data.responseMessage);
                  } else {
                    toast.error("Something went wrong");
                    setIsLoading1(false);
                  }
                }
              } else {
                setIsLoading1(false);
                setIsLoading(false);
                // setSuccessMSG('Please try again');
              }
            } else {
              let receipt = "";
              await uploadContractHandler(
                formValue.displayName,
                formValue.symbol,
                res,
                formValue.collectionIMG,
                account,
                (result) => {
                  receipt = result;
                }
              );
              if (receipt != false) {
                const resResult = await createCollectionAPIHanlder(
                  NftTokenAddress,
                  formValue.displayName,
                  formValue.symbol ? formValue.symbol : "NA",
                  formValue.description ? formValue.description : "NA",
                  isPromoted,
                  formValue.collectionIMG,
                  formValue.bannerImage,
                  res,
                  formValue.shortUrl ? formValue.shortUrl : "NA",

                  "createCollection"
                );
                // setSuccessMSG(resResult.data.responseMessage);
                setIsLoading1(false);

                if (resResult && resResult.data.statusCode === 200) {
                  // getCollectionListHanlder();
                  toast.success(resResult.data.responseMessage);
                  setOpen(false);
                  setIsLoading1(false);
                  await getCollectionListHanlder();
                  // setSuccessMSG('');
                  // setImgBlob("");
                  setIsSubmit(false);
                  setFormValue({
                    displayName: "",
                    symbol: "",
                    description: "",
                    bannerImage: "",
                    collectionIMG: "",
                    shortUrl: "",
                  });
                  user.getCollectionList();
                } else {
                  if (resResult) {
                    toast.error(resResult.data.responseMessage);
                  } else {
                    toast.error("Something went wrong");
                    setIsLoading1(false);
                  }
                }
              } else {
                setIsLoading1(false);
                setIsLoading(false);
                // setSuccessMSG('Please try again');
              }
            }
          })
          .catch((err) => {
            // toast.error("Something went to wrong");
            setIsLoading(false);

            setIsLoading1(false);
            console.log("err", err);
          });
      }
    }
    // }
  };
  const GenerativeID = "62727dbd31b40d4f8a1513a1";
  const extensionCheckFun = (image) => {
    if (image) {
      const extention = image.name.split(".").pop();
      if (extention === "mp3" || extention === "mp4") {
        setUploadBanner(true);
        setIsMp3(true);
      }
      if (extention === "mp3") {
        setMediaType("MP3");
        setIsMp3(true);
      } else if (extention === "mp4") {
        setMediaType("VIDEO");
        setIsMp3(true);
      } else {
        setMediaType("IMAGE");
      }
    }
  };
  const accessToken = window.sessionStorage.getItem("token");
  const getCollectionListHanlder = async () => {
    setOpen(false);
    axios({
      method: "GET",
      url: ApiConfig.myCollectionList,
      headers: {
        token: accessToken,
      },
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          if (res.data.result.docs) {
            const result = res.data.result.docs.filter(
              (data) => data.contractAddress.length > 10
            );
            const filterData = res.data.result.docs.filter((data) => {
              return data?.displayName.trim() !== "GenerativeNFT";
            });

            const newData = filterData.filter((data) => {
              return (
                data?.collectionType !== "DEFAULT" ||
                (data?.collectionType === "DEFAULT" &&
                  data.userType !== user?.userData?.userType)
              );
            });
            setCollectionList(newData);
          } else {
            setCollectionList([]);
          }
          user.getlistCollection();
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    getCollectionListHanlder(cancelTokenSource);
    // if (image !== "") {
    //   extensionCheckFun();
    // }
    return () => {
      cancelTokenSource.cancel();
    };
  }, [user.userData, isCreateOrder]);

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

  //only CreateNFT
  const submitHanlder = async () => {
    setIsSubmit1(true);
    // const checkPrice = isAuction === "fixed" ? price : startPrice;
    const checkPrice = price;

    const mediaURLCheck = imgFile ? imgFile : imgFileBase;
    if (chainId === ACTIVE_NETWORK) {
      const isValidAddress = await ethers.utils.isAddress(
        recipientWalletAddress
      );

      const isValidAddress1 = await ethers.utils.isAddress(
        recipientBackupWalletAddress
      );
      if (
        dataCraft === "craft" ||
        selectedCategory.trim() === "private documents"
      ) {
        if (!isValidAddress) {
          toast.error("Please put valid wallet address", {
            position: "top-right",
            theme: "colored",
            autoClose: 3000,
            hideProgressBar: true,
          });
          return;
        }
        if (recipientBackupWalletAddress != "") {
          if (!isValidAddress1) {
            toast.error("Please put valid backup wallet address", {
              position: "top-right",
              theme: "colored",
              autoClose: 3000,
              hideProgressBar: true,
            });
            return;
          }
        }
      }

      if (
        (title !== "" &&
          royalties !== "" &&
          parseFloat(royalties) >= 0 &&
          parseFloat(royalties) <= 10 &&
          selectedCollection !== "create" &&
          selectedCollection &&
          selectedCategory !== "" &&
          imgFileBase !== "") ||
        coverPrivate !== ""
      ) {
        setIsLoading(true);
        setTransactionStatus("Loading...");
        toast.warn("Please do not refresh the page");
        if (selectedCategory.trim() === "private documents") {
          await addImageHandler(imgFile)
            .then(async (res) => {
              const body = new FormData();
              body.append("tokenName", title);
              body.append("description", description);
              body.append("image", res);

              setTransactionStatus("Uploading...");
              await uploadImageHandler(privateDoc).then(async (res) => {
                const body = new FormData();
                body.append("image", res);
                const receipt = await uploadNFTHandler(body, res, "uploadNFT");
                let advanceSettings = {
                  propertyFirst: propertyFirst,
                  properySecond: properySecond,
                  alternateText: alternateText,
                };

                let fileExtention = imgFile.name.split(".").pop();
                let fileType =
                  fileExtention == "mp4" || fileExtention == "webp"
                    ? "video"
                    : fileExtention == "mp3"
                    ? "audio"
                    : "image";
                let createBody = {
                  coverFile: coverFileBase,
                  imgFile:
                    fileType == "video" || fileType == "audio"
                      ? backImage
                      : imgFileBase, // ? coverFileBase : imgFileBase,,
                  uri: res,
                  title: title,
                  categoryType: selectedCategory,

                  collectionId: selectedCollection._id,
                  contractAddress: selectedCollection.contractAddress,
                  description: description,
                  royalties: royalties,

                  currentOwner: user?.walletuserId,
                  network: chainId,
                  price: price !== "" ? price : "0",
                  startPrice: startPrice !== "" ? startPrice : " 0",

                  mediaType: fileType,
                  recipientWalletAddress: recipientWalletAddress,
                  recipientBackupWalletAddress: recipientBackupWalletAddress,
                  couponAddress: "0x",
                  isDirectSale:
                    price !== "" && startPrice !== ""
                      ? true
                      : isAuction === "fixed"
                      ? true
                      : false,
                  isAuction:
                    price !== "" && startPrice !== ""
                      ? true
                      : isAuction === "fixed"
                      ? false
                      : true,
                  endTime: moment(endDate).unix() * 1000,
                  startDate: moment(startDate).unix(),
                  saleType: isAuction === "fixed" ? "ONSALE" : "ONSALE",
                  orderType:
                    price !== "" && startPrice !== ""
                      ? "AUCTION_FIXEDPRICE_BOTH"
                      : isAuction === "fixed"
                      ? "FIXED_PRICE"
                      : "TIMED_AUCTION",
                };

                if (receipt) {
                  setIsLoading(true);
                  const web3 = await getWeb3Obj();
                  try {
                    if (
                      await createNFTBlockchainHanlder(
                        selectedCollection?.contractAddress,
                        NftTokenABI,
                        library,
                        account,
                        receipt,
                        title,
                        royalties
                      )
                    ) {
                      const tokenId = await getTokenId(
                        selectedCollection?.contractAddress,
                        NftTokenABI,
                        library,
                        account
                      );

                      let tokenIdN = parseInt(tokenId);

                      const creRes = await createNFTHandler(
                        createBody,
                        tokenIdN.toString(),
                        marketplaceContract,
                        MarketplaceABI,
                        library,
                        account,
                        advanceSettings
                      );
                      if (creRes && creRes.data.statusCode === 200) {
                        setIsLoading(false);
                        setTransactionStatus("Create Item");
                        toast.success(creRes.data.responseMessage);
                        setTimeout(() => {
                          history.push({
                            pathname: "/profile",
                            search: user.userData._id,
                          });
                        }, 1000);
                      } else {
                        if (creRes) {
                          toast.error(creRes.data.responseMessage);
                        } else {
                          toast.error("Something went wrong");
                        }

                        setIsLoading(false);
                        setTransactionStatus("Create Item");
                      }
                    } else {
                      toast.error("Something went wrong");
                      setIsLoading(false);
                      setTransactionStatus("Create Item");
                    }
                    // }
                  } catch (error) {
                    if (error?.data?.message) {
                      toast.error(error?.data?.message);
                    } else {
                      toast.error(error.message);
                    }
                    setIsLoading(false);
                    setTransactionStatus("Create Item");
                    console.log("ERROR", error);
                  }
                } else {
                  toast.error("Unable to upload image on IPFS");

                  setIsLoading(false);
                  setTransactionStatus("Create Item");
                }
              });
            })
            .catch((error) => {
              toast.error("Unable to upload image");

              setIsLoading(false);
              setTransactionStatus("Create Item");
            });
        } else {
          await addImageHandler(imgFile)
            .then(async (res) => {
              const body = new FormData();
              body.append("tokenName", title);
              body.append("description", description);
              body.append("image", res);

              setTransactionStatus("Uploading...");

              const receipt = await uploadNFTHandler(body, res, "uploadNFT");
              let advanceSettings = {
                propertyFirst: propertyFirst,
                properySecond: properySecond,
                alternateText: alternateText,
              };

              let fileExtention = imgFile.name.split(".").pop();
              let fileType =
                fileExtention == "mp4" || fileExtention == "webp"
                  ? "video"
                  : fileExtention == "mp3"
                  ? "audio"
                  : "image";
              let createBody = {
                coverFile: coverFileBase ? coverFileBase : imgFileBase,

                imgFile:
                  fileType == "video" || fileType == "audio"
                    ? backImage
                    : imgFileBase, // ? coverFileBase : imgFileBase,,
                uri: res,
                title: title,
                categoryType: selectedCategory,

                collectionId: selectedCollection._id,
                contractAddress: selectedCollection.contractAddress,
                description: description,
                royalties: royalties,

                currentOwner: user?.walletuserId,
                network: chainId,
                price: price !== "" ? price : "0",
                startPrice: startPrice !== "" ? startPrice : " 0",

                mediaType: fileType,
                recipientWalletAddress: recipientWalletAddress,
                recipientBackupWalletAddress: recipientBackupWalletAddress,
                couponAddress: "0x",
                isDirectSale:
                  price !== "" && startPrice !== ""
                    ? true
                    : isAuction === "fixed"
                    ? true
                    : false,
                isAuction:
                  price !== "" && startPrice !== ""
                    ? true
                    : isAuction === "fixed"
                    ? false
                    : true,
                endTime: moment(endDate).unix() * 1000,
                startDate: moment(startDate).unix() * 1000,
                saleType: isAuction === "fixed" ? "ONSALE" : "ONSALE",
                orderType:
                  price !== "" && startPrice !== ""
                    ? "AUCTION_FIXEDPRICE_BOTH"
                    : isAuction === "fixed"
                    ? "FIXED_PRICE"
                    : "TIMED_AUCTION",
              };

              if (receipt) {
                setIsLoading(true);
                const web3 = await getWeb3Obj();
                try {
                  if (
                    await createNFTBlockchainHanlder(
                      selectedCollection?.contractAddress,
                      NftTokenABI,
                      library,
                      account,
                      receipt,
                      title,
                      royalties
                    )
                  ) {
                    const tokenId = await getTokenId(
                      selectedCollection?.contractAddress,
                      NftTokenABI,
                      library,
                      account
                    );

                    let tokenIdN = parseInt(tokenId);

                    const creRes = await createNFTHandler(
                      createBody,
                      tokenIdN.toString(),
                      marketplaceContract,
                      MarketplaceABI,
                      library,
                      account,
                      advanceSettings
                    );
                    if (creRes && creRes.data.statusCode === 200) {
                      setIsLoading(false);
                      setTransactionStatus("Create Item");
                      toast.success(creRes.data.responseMessage);
                      setTimeout(() => {
                        history.push({
                          pathname: "/profile",
                          search: user.userData._id,
                        });
                      }, 1000);
                    } else {
                      if (creRes) {
                        toast.error(creRes.data.responseMessage);
                      } else {
                        toast.error("Something went wrong");
                      }

                      setIsLoading(false);
                      setTransactionStatus("Create Item");
                    }
                  } else {
                    toast.error("Something went wrong");
                    setIsLoading(false);
                    setTransactionStatus("Create Item");
                  }
                  // }
                } catch (error) {
                  if (error?.data?.message) {
                    toast.error(error?.data?.message);
                  } else {
                    toast.error(error.message);
                  }
                  setIsLoading(false);
                  setTransactionStatus("Create Item");
                  console.log("ERROR", error);
                }
              } else {
                toast.error("Unable to upload image on IPFS");

                setIsLoading(false);
                setTransactionStatus("Create Item");
              }
              // });
            })
            .catch((error) => {
              toast.error("Unable to upload image");

              setIsLoading(false);
              setTransactionStatus("Create Item");
            });
        }
      } else {
        toast.warn("Please enter valid data ");
      }
    }
    // } else {
    //   swichNetworkHandler();
    //   setIsLoading(false);
    // }
  };

  //Ordercreat
  const submitCreateNFTHanlder = async () => {
    setIsSubmit1(true);

    const checkPrice = price;

    const mediaURLCheck = imgFile ? imgFile : imgFileBase;
    // const mediaTypeCheck = imgFile ? "image" : imgFileBase ? "video" : "audio";
    if (chainId === ACTIVE_NETWORK) {
      const isValidAddress = await ethers.utils.isAddress(
        recipientWalletAddress
      );

      const isValidAddress1 = await ethers.utils.isAddress(
        recipientBackupWalletAddress
      );
      if (
        dataCraft === "craft" ||
        selectedCategory.trim() === "private documents"
      ) {
        if (!isValidAddress) {
          toast.error("Please put valid wallet address", {
            position: "top-right",
            theme: "colored",
            autoClose: 3000,
            hideProgressBar: true,
          });
          return;
        }
        if (recipientBackupWalletAddress != "") {
          if (!isValidAddress1) {
            toast.error("Please put valid backup wallet address", {
              position: "top-right",
              theme: "colored",
              autoClose: 3000,
              hideProgressBar: true,
            });
            return;
          }
        }
      }
      if (
        // // network.chainId &&

        (title !== "" &&
          description !== "" &&
          checkPrice !== "" &&
          parseFloat(checkPrice) > 0 &&
          royalties !== "" &&
          description !== "" &&
          parseFloat(royalties) >= 0 &&
          parseFloat(royalties) <= 10 &&
          selectedCollection !== "create" &&
          selectedCollection &&
          // selectedCollection._id &&
          selectedCategory !== "" &&
          imgFileBase !== "") ||
        coverPrivate !== ""

        // checkCover &&
        // coverFile !== ""
      ) {
        // setOpenTransactionModal(true);
        setIsLoading(true);
        setTransactionStatus("Loading...");
        toast.warn("Please do not refresh the page");
        if (selectedCategory.trim() === "private documents") {
          await addImageHandler(imgFile)
            .then(async (res) => {
              const body = new FormData();
              body.append("tokenName", title);
              body.append("description", description);
              body.append("image", res);

              setTransactionStatus("Uploading...");

              await uploadImageHandler(privateDoc).then(async (res) => {
                const body = new FormData();
                body.append("image", res);
                const receipt = await uploadNFTHandler(body, res, "uploadNFT");

                let advanceSettings = {
                  propertyFirst: propertyFirst,
                  properySecond: properySecond,
                  alternateText: alternateText,
                };
                let fileExtention = imgFile.name.split(".").pop();

                let fileType =
                  fileExtention == "mp4" || fileExtention == "webp"
                    ? "video"
                    : fileExtention == "mp3"
                    ? "audio"
                    : "image";
                let createBody = {
                  coverFile: coverFileBase ? coverFileBase : imgFileBase,
                  imgFile:
                    fileType == "video" || fileType == "audio"
                      ? backImage
                      : imgFileBase,
                  uri: res,
                  title: title,
                  categoryType: selectedCategory,
                  unlockOncePurchased: unloackData,
                  collectionId: selectedCollection._id,
                  contractAddress: selectedCollection.contractAddress,
                  description: description,
                  royalties: royalties,
                  // privateImageUrl: res,
                  // privateImageUrlType: fileTypeCheckp,
                  // currentOwner: account,
                  currentOwner: user?.walletuserId,
                  network: chainId,
                  recipientWalletAddress: recipientWalletAddress
                    ? recipientWalletAddress
                    : "String",
                  recipientBackupWalletAddress: recipientBackupWalletAddress
                    ? recipientBackupWalletAddress
                    : "String",
                  price: price !== "" ? price : "0",
                  startPrice: startPrice !== "" ? startPrice : " 0",
                  // price: isAuction === 'fixed' ? price : '0',
                  // startPrice: isAuction === 'fixed' ? '0' : price,
                  mediaType: fileTypeCheck,
                  couponAddress: "0x",
                  isDirectSale:
                    price !== "" && startPrice !== ""
                      ? true
                      : isAuction === "fixed"
                      ? true
                      : false,
                  isAuction:
                    price !== "" && startPrice !== ""
                      ? true
                      : isAuction === "fixed"
                      ? false
                      : true,
                  // endTime: moment(endDate).unix(),
                  // startDate: moment(startDate).unix(),
                  endTime: moment(endDate).unix() * 1000,
                  startDate: moment(startDate).unix() * 1000,
                  saleType: isAuction === "fixed" ? "ONSALE" : "ONSALE",
                  orderType:
                    price !== "" && startPrice !== ""
                      ? "AUCTION_FIXEDPRICE_BOTH"
                      : isAuction === "fixed"
                      ? "FIXED_PRICE"
                      : "TIMED_AUCTION",
                };
                if (receipt) {
                  const web3 = await getWeb3Obj();
                  try {
                    if (
                      await createNFTBlockchainHanlder(
                        selectedCollection?.contractAddress,
                        NftTokenABI,
                        library,
                        account,
                        receipt,
                        title,
                        royalties
                      )
                    ) {
                      const tokenId = await getTokenId(
                        selectedCollection?.contractAddress,
                        NftTokenABI,
                        library,
                        account
                      );

                      let tokenIdN = parseInt(tokenId);

                      const creRes = await createNFTHandler(
                        createBody,
                        tokenIdN.toString(),
                        marketplaceContract,
                        MarketplaceABI,
                        library,
                        account,
                        advanceSettings
                      );

                      if (creRes && creRes.data.statusCode === 200) {
                        setIsLoading(true);
                        setTransactionStatus("Create Item");
                        const contractObj = getContract(
                          NftTokenAddress,
                          NftTokenABI,
                          library,
                          account
                        );

                        const NFTApprovalID = await contractObj.approve(
                          marketplaceContract,
                          tokenIdN.toString()
                        );
                        await NFTApprovalID.wait();
                        const createObjm = getContract(
                          marketplaceContract,
                          MarketplaceABI,
                          library,
                          account
                        );

                        const marketPlace = await createObjm.createOrder(
                          NftTokenAddress,
                          tokenIdN.toString(),
                          ethers.utils.parseEther(price.toString()),
                          royalties.toString(),
                          moment(endDate).unix(),
                          currency
                        );
                        await marketPlace.wait();

                        const placeres = await placeOrderAPIHandler(
                          createBody,
                          creRes.data.result._id,
                          account,
                          advanceSettings
                        );

                        setIsLoading(true);
                        setTransactionStatus("Create Item");
                        if (placeres) {
                          if (placeres && placeres.data.statusCode === 200) {
                            setIsLoading(false);
                            toast.success(placeres.data.responseMessage);
                            setTimeout(() => {
                              history.push({
                                pathname: "/profile",
                              });
                            }, 1000);
                          } else {
                            toast.error(placeres.data.responseMessage);
                          }
                        } else {
                          toast.error("Something went wrong");
                        }
                      } else {
                        if (creRes) {
                          toast.error(creRes.data.responseMessage);
                        } else {
                          toast.error("Something went wrong");
                        }

                        setIsLoading(false);
                        setTransactionStatus("Create Item");
                      }
                    } else {
                      toast.error("Something went wrong");
                      setIsLoading(false);
                      setTransactionStatus("Create Item");
                    }
                    // }
                  } catch (error) {
                    if (error?.data?.message) {
                      toast.error(error?.data?.message);
                    } else {
                      toast.error(error.message);
                    }
                    setIsLoading(false);
                    setTransactionStatus("Create Item");
                    console.log("ERROR", error);
                  }
                } else {
                  toast.error("Unable to upload image on IPFS");

                  setIsLoading(false);
                  setTransactionStatus("Create Item");
                }
              });
            })
            .catch((error) => {
              toast.error("Unable to upload image");

              setIsLoading(false);
              setTransactionStatus("Create Item");
            });
        } else {
          await addImageHandler(imgFile)
            .then(async (res) => {
              const body = new FormData();
              body.append("tokenName", title);
              body.append("description", description);
              body.append("image", res);

              setTransactionStatus("Uploading...");

              // await addImageHandler(privateDoc).then(async (res) => {
              const receipt = await uploadNFTHandler(body, res, "uploadNFT");

              let advanceSettings = {
                propertyFirst: propertyFirst,
                properySecond: properySecond,
                alternateText: alternateText,
              };
              let fileExtention = imgFile.name.split(".").pop();

              let fileType =
                fileExtention == "mp4" || fileExtention == "webp"
                  ? "video"
                  : fileExtention == "mp3"
                  ? "audio"
                  : "image";

              let createBody = {
                coverFile: coverFileBase,
                imgFile:
                  fileType == "video" ||
                  fileType == "audio" ||
                  fileType == "mp3"
                    ? backImage
                    : imgFileBase,
                uri: res,
                title: title,
                categoryType: selectedCategory,
                unlockOncePurchased: unloackData,
                collectionId: selectedCollection._id,
                contractAddress: selectedCollection.contractAddress,
                description: description,
                royalties: royalties,

                currentOwner: user?.walletuserId,
                network: chainId,
                recipientWalletAddress: recipientWalletAddress
                  ? recipientWalletAddress
                  : "String",
                recipientBackupWalletAddress: recipientBackupWalletAddress
                  ? recipientBackupWalletAddress
                  : "String",
                price: price !== "" ? price : "0",
                startPrice: startPrice !== "" ? startPrice : " 0",

                mediaType: fileTypeCheck,
                couponAddress: "0x",
                isDirectSale:
                  price !== "" && startPrice !== ""
                    ? true
                    : isAuction === "fixed"
                    ? true
                    : false,
                isAuction:
                  price !== "" && startPrice !== ""
                    ? true
                    : isAuction === "fixed"
                    ? false
                    : true,

                endTime: moment(endDate).unix() * 1000,
                startDate: moment(startDate).unix() * 1000,
                saleType: isAuction === "fixed" ? "ONSALE" : "ONSALE",
                orderType:
                  price !== "" && startPrice !== ""
                    ? "AUCTION_FIXEDPRICE_BOTH"
                    : isAuction === "fixed"
                    ? "FIXED_PRICE"
                    : "TIMED_AUCTION",
              };
              if (receipt) {
                const web3 = await getWeb3Obj();

                try {
                  if (
                    await createNFTBlockchainHanlder(
                      selectedCollection?.contractAddress,
                      NftTokenABI,
                      library,
                      account,
                      receipt,
                      title,
                      royalties
                    )
                  ) {
                    const tokenId = await getTokenId(
                      selectedCollection?.contractAddress,
                      NftTokenABI,
                      library,
                      account
                    );

                    let tokenIdN = parseInt(tokenId);

                    const creRes = await createNFTHandler(
                      createBody,
                      tokenIdN.toString(),
                      marketplaceContract,
                      MarketplaceABI,
                      library,
                      account,
                      advanceSettings
                    );

                    if (creRes && creRes.data.statusCode === 200) {
                      setIsLoading(true);
                      setTransactionStatus("Create Item");
                      const contractObj = getContract(
                        NftTokenAddress,
                        NftTokenABI,
                        library,
                        account
                      );

                      const NFTApprovalID = await contractObj.approve(
                        marketplaceContract,
                        tokenIdN.toString()
                      );
                      await NFTApprovalID.wait();
                      const createObjm = getContract(
                        marketplaceContract,
                        MarketplaceABI,
                        library,
                        account
                      );

                      const marketPlace = await createObjm.createOrder(
                        NftTokenAddress,
                        tokenIdN.toString(),
                        ethers.utils.parseEther(price.toString()),
                        royalties.toString(),
                        moment(endDate).unix(),
                        currency
                      );
                      await marketPlace.wait();

                      const placeres = await placeOrderAPIHandler(
                        createBody,
                        creRes.data.result._id,
                        account,
                        advanceSettings
                      );

                      setIsLoading(true);
                      setTransactionStatus("Create Item");
                      if (placeres) {
                        if (placeres && placeres.data.statusCode === 200) {
                          setIsLoading(false);
                          toast.success(placeres.data.responseMessage);
                          setTimeout(() => {
                            history.push({
                              pathname: "/profile",
                            });
                          }, 1000);
                        } else {
                          toast.error(placeres.data.responseMessage);
                        }
                      } else {
                        toast.error("Something went wrong");
                      }
                    } else {
                      if (creRes) {
                        toast.error(creRes.data.responseMessage);
                      } else {
                        toast.error("Something went wrong");
                      }

                      setIsLoading(false);
                      setTransactionStatus("Create Item");
                    }
                  } else {
                    toast.error("Something went wrong");
                    setIsLoading(false);
                    setTransactionStatus("Create Item");
                  }
                  // }
                } catch (error) {
                  if (error?.data?.message) {
                    toast.error(error?.data?.message);
                  } else {
                    toast.error(error.message);
                  }
                  setIsLoading(false);
                  setTransactionStatus("Create Item");
                  console.log("ERROR", error);
                }
              } else {
                toast.error("Unable to upload image on IPFS");

                setIsLoading(false);
                setTransactionStatus("Create Item");
              }
              // });
            })
            .catch((error) => {
              toast.error("Unable to upload image");

              setIsLoading(false);
              setTransactionStatus("Create Item");
            });
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
            <Grid container>
              <Grid item lg={12} sm={12} xs={12}>
                <Box className="cardCreate" mb={3} textAlign="center">
                  <Button
                    disabled={isLoading}
                    variant="contained"
                    size="large"
                    color="primary"
                    className={
                      isCreateOrder ? classes.selectedbutton : classes.button
                    }
                    onClick={() => setIsCreateOrder(true)}
                  >
                    {" "}
                    Create Live Nft
                  </Button>
                  &nbsp;&nbsp;
                  <Button
                    disabled={isLoading}
                    variant="contained"
                    size="large"
                    color="primary"
                    className={
                      !isCreateOrder ? classes.selectedbutton : classes.button
                    }
                    onClick={() => setIsCreateOrder(false)}
                  >
                    {" "}
                    Create Offline Nft
                  </Button>
                </Box>
              </Grid>
            </Grid>
            {isCreateOrder ? (
              <Box className={classes.heading}>
                <Typography variant="h2">
                  Create Live {""}
                  <span style={{ color: "#22A7F0" }}>Nft</span>
                </Typography>
              </Box>
            ) : (
              <Box className={classes.heading}>
                <Typography variant="h2">
                  Create Offline {""}
                  <span style={{ color: "#22A7F0" }}>Nft</span>
                </Typography>
              </Box>
            )}

            <Box>
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
                    <Box className="cardCreate" mb={2} mt={3}>
                      {(dataCraft === "craft" &&
                        selectedCategory.trim() === "private documents") ||
                      selectedCategory.trim() === "private documents" ? (
                        <label className={classes.fontSixeText}>
                          Upload cover
                          <span style={{ color: "#ff7d68" }}>*</span>
                        </label>
                      ) : (
                        <label className={classes.fontSixeText}>
                          Upload file{" "}
                          <span style={{ color: "#ff7d68" }}>*</span>
                        </label>
                      )}

                      <Box className="uploadBox" mt={1}>
                        <Typography
                          variant="body2"
                          style={{
                            color: "rgba(0, 0, 0, 0.75)",
                            fontSize: " 12px",
                          }}
                        >
                          JPG, PNG, GIF, WEBP, MP4 or MP3. Max 10mb.
                        </Typography>
                        <Typography
                          variant="body2"
                          style={{
                            color: "rgba(0, 0, 0, 0.75)",
                            fontSize: " 12px",
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
                              style={{ color: "#ff7d68", fontSize: "0.75rem" }}
                            >
                              Please select image
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Grid>

                  {(fileTypeCheck === "video" || fileTypeCheck === "audio") && (
                    <Grid item xs={12} md={12}>
                      <Box className="cardCreate" mb={2}>
                        <label className={classes.fontSixeText}>
                          Upload cover
                        </label>
                        <Box className="uploadBox" mt={1}>
                          <Typography
                            variant="body2"
                            style={{
                              color: "rgba(0, 0, 0, 0.75)",
                              fontSize: "12px",
                            }}
                          >
                            JPG, PNG, GIF, WEBP Max 10mb.
                          </Typography>
                          <Box mt={2}>
                            <input
                              disabled={isLoading}
                              style={{ display: "none" }}
                              id="raised-button-file-cover"
                              multiple
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                setCoverBlob(
                                  URL.createObjectURL(e.target.files[0])
                                );
                                setCoverFile(e.target.files[0]);
                                getBase64(e.target.files[0], (result) => {
                                  setCoverFileBase(result);
                                });
                              }}
                              error={isSubmit && coverFileBase === ""}
                              helperText={
                                isSubmit1 &&
                                coverFileBase === "" &&
                                "Please seect cover image"
                              }
                            />
                            <label htmlFor="raised-button-file-cover">
                              <Button
                                variant="contained"
                                disabled={isLoading}
                                color="primary"
                                component="span"
                              >
                                Choose File
                              </Button>
                            </label>
                          </Box>
                        </Box>
                        <label className={classes.fontSixeText}>
                          Please add cover image to your media file
                        </label>
                      </Box>
                      {isSubmit1 && coverFileBase === "" && (
                        <Typography
                          variant="body2"
                          style={{ color: "#ff7d68" }}
                        >
                          Please select cover image
                        </Typography>
                      )}
                    </Grid>
                  )}
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

                <Grid item xs={12} md={12}>
                  <Box className="cardCreate" mb={3}>
                    <label className={classes.fontSixeText}>
                      Item Category <span style={{ color: "#ff7d68" }}>*</span>
                    </label>
                    <Box
                      style={{ marginBottom: "-25px" }}
                      className={classes.FilterDiv}
                      mt={2}
                    >
                      {allCategory ? (
                        allCategory &&
                        allCategory.map((data, i) => {
                          return (
                            // <Box key={i} >
                            <Button
                              variant="contained"
                              size="large"
                              color="primary"
                              className={
                                selectedCategory ===
                                data?.categoryTitle.toLowerCase()
                                  ? classes.selectedbutton
                                  : classes.button
                              }
                              key={data.categoryTitle}
                              onClick={() =>
                                setSelectedCategory(
                                  data.categoryTitle.toLowerCase()
                                )
                              }
                              disabled={isLoading}
                            >
                              {data.categoryTitle}
                            </Button>
                          );
                        })
                      ) : (
                        <Button
                          variant="contained"
                          size="large"
                          color="primary"
                          className={
                            selectedCategory === data?.categoryTitle
                              ? classes.selectedbutton
                              : classes.button
                          }
                          onClick={() =>
                            setSelectedCategory(
                              data?.categoryTitle.toLowerCase()
                            )
                          }
                          disabled={isLoading}
                        >
                          Sale
                        </Button>
                      )}

                      <></>
                    </Box>
                  </Box>
                  {isSubmit1 && selectedCategory === "" && (
                    <Typography
                      variant="body2"
                      style={{ color: "#ff7d68", fontSize: "0.75rem" }}
                    >
                      Please select category
                    </Typography>
                  )}
                  {selectedCategory === "tickets" && (
                    <Box>
                      <Typography variant="body2" style={{ color: "#ff7d68" }}>
                        Coming soon
                      </Typography>
                    </Box>
                  )}
                  {(dataCraft === "craft" &&
                    selectedCategory.trim() === "private documents") ||
                  selectedCategory.trim() === "private documents" ? (
                    <>
                      <Box
                        mt={2}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          paddingTop: "20px",
                        }}
                      >
                        <input
                          disabled={isLoading}
                          style={{
                            display: "none",
                          }}
                          id="raised-button-file-pdf"
                          multiple
                          type="file"
                          // accept="image/*"

                          accept={["application/pdf", "application/msword"]}
                          onChange={(e) => {
                            // setCoverBlob(URL.createObjectURL(e.target.files[0]));
                            setCoverPrivate(e.target.files[0].name);
                            setPrivateDoc(e.target.files[0]);
                            // getBase64(e.target.files[0], (result) => {
                            //   setImgFileBase(result);
                            // });
                            var fileExtention = e.target.files[0].type
                              .split(".")
                              .pop();
                            var fileType =
                              fileExtention == "application/pdf"
                                ? "pdf"
                                : fileExtention == "application/msword"
                                ? "doc"
                                : "hhhh";

                            setFileTypeCheckprivate(fileType);
                          }}
                          error={isSubmit1 && coverPrivate === ""}
                          helperText={
                            isSubmit1 &&
                            coverPrivate === "" &&
                            "Please seect pdf or doc"
                          }
                        />

                        <label htmlFor="raised-button-file-pdf">
                          <Button
                            variant="contained"
                            disabled={isLoading}
                            color="primary"
                            component="span"
                          >
                            Choose File pdf or doc
                          </Button>
                        </label>
                        <Typography>&nbsp; {coverPrivate}</Typography>
                      </Box>
                      {coverPrivate === "" ? (
                        <p style={{ color: "#ff7d68", fontSize: " 0.75rem" }}>
                          Please select .pdf or .doc file
                        </p>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </Grid>

                {isCreateOrder && (
                  <Box
                    className="cardCreate"
                    mb={3}
                    style={{ marginLeft: "10px" }}
                  >
                    <Box mt={2}>
                      <label className={classes.fontSixeText}>
                        Price In QIE <span style={{ color: "#ff7d68" }}>*</span>
                      </label>
                      <FormControl fullWidth className={classes.margin}>
                        <TextField
                          disabled={isLoading}
                          type="number"
                          placeholder="0.00"
                          value={price}
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
                            isSubmit1 &&
                            (price === "" || parseFloat(price) <= 0)
                          }
                          helperText={
                            isSubmit1 &&
                            (price === "" || parseFloat(price) <= 0) &&
                            "Please enter price"
                          }
                        />
                      </FormControl>
                      <Box mt={4}>
                        <label className={classes.fontSixeText}>
                          Expiration Date{" "}
                          <span style={{ color: "#ff7d68" }}>*</span>
                        </label>
                        <FormControl className={classes.formControl}>
                          <DateTimePicker
                            value={endDate}
                            onChange={(date) => {
                              setEndDate(date);
                            }}
                            disabled={isLoading}
                            format="DD/MM/yyyy hh:mm A"
                            minDate={moment(startDate)}
                          />
                        </FormControl>
                      </Box>
                    </Box>
                  </Box>
                )}
                <Grid item xs={12} md={12}>
                  <Box className="cardCreate">
                    <Box>
                      <label className={classes.fontSixeText}>
                        Create or add to existing collection{" "}
                        <span style={{ color: "#ff7d68" }}>*</span>
                      </label>
                      <Box mt={2}>
                        <Grid container spacing={2}>
                          <Button
                            variant="contained"
                            size="large"
                            color="secondary"
                            onClick={() => setOpen(true)}
                            style={{
                              width: "auto",
                              marginBottom: "5px !important",
                              whiteSpace: "nowrap",
                              alignSelf: "center",
                            }}
                            disabled={isLoading}
                          >
                            <MdAddCircle
                              style={{
                                fontSize: "25px",
                                marginRight: "7px",
                                width: "32px",
                                minWidth: "37px",
                              }}
                            />{" "}
                            Create QIE-721 Collection
                          </Button>

                          {collectionList.map((data, i) => {
                            return (
                              <Grid
                                item
                                lg={3}
                                md={3}
                                sm={4}
                                xs={12}
                                key={i}
                                className="collButton"
                              >
                                <CollectionCard
                                  selectedCollection={selectedCollection}
                                  setSelectedCollection={(selectedColl) =>
                                    setSelectedCollection(selectedColl)
                                  }
                                  getCollectionListHanlder={
                                    getCollectionListHanlder
                                  }
                                  key={i}
                                  data={data}
                                  isLoading={isLoading}
                                />
                              </Grid>
                            );
                          })}
                        </Grid>
                        {isSubmit1 && selectedCollection === "create" && (
                          <Typography
                            variant="body2"
                            style={{
                              color: "#ff7d68",
                              fontSize: "0.75rem",
                              marginTop: "10px",
                            }}
                          >
                            Please select collection
                          </Typography>
                        )}
                        <Box>
                          <Box mt={3}>
                            <label className={classes.fontSixeText}>
                              Title <span style={{ color: "#ff7d68" }}>*</span>
                            </label>
                            <FormControl fullWidth>
                              <TextField
                                inputProps={{ maxLength: 80 }}
                                disabled={isLoading}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                error={isSubmit1 && title === ""}
                                helperText={
                                  isSubmit1 &&
                                  title === "" &&
                                  "Please enter title"
                                }
                                placeholder="e. g. 'Redeemable T-Shirt with logo'"
                              />
                            </FormControl>
                          </Box>
                          <Box mt={3}>
                            <label className={classes.fontSixeText}>
                              Description{" "}
                              <span style={{ color: "#ff7d68" }}>*</span>
                            </label>
                            <FormControl fullWidth multiline rows={4}>
                              <TextField
                                inputProps={{ maxLength: 1500 }}
                                disabled={isLoading}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                multiline
                                error={isSubmit1 && description === ""}
                                helperText={
                                  isSubmit1 &&
                                  description === "" &&
                                  "Please enter description"
                                }
                                placeholder=" e. g. 'After purchasing you’ll be able to get the real T-Shirt'"
                              />
                              <small
                                style={{
                                  color: "rgba(0, 0, 0, 0.75)",
                                  fontSize: "12px",
                                }}
                              >
                                With preserved line-breaks
                              </small>
                            </FormControl>
                          </Box>
                          <Box mt={3}>
                            <label className={classes.fontSixeText}>
                              Royalties{" "}
                              <span style={{ color: "#ff7d68" }}>*</span>
                            </label>
                            <FormControl fullWidth className={classes.margin}>
                              <TextField
                                value={royalties}
                                placeholder="e. g. 10%"
                                type="number"
                                onKeyPress={(event) => {
                                  if (
                                    event?.key === "-" ||
                                    event?.key === "+" ||
                                    event?.key === "."
                                  ) {
                                    event.preventDefault();
                                  }
                                }}
                                maxlength="2"
                                onChange={(e) => {
                                  if (e.target.value <= 10) {
                                    setRoyalties(e.target.value);
                                  }
                                }}
                                // onChange={(e) => setRoyalties(e.target.value)}
                                error={
                                  isSubmit1 &&
                                  royalties === "" &&
                                  parseFloat(royalties) <= 0
                                }
                                InputProps={{
                                  inputProps: { min: 0 },
                                }}
                                helperText={
                                  isSubmit1 &&
                                  royalties === "" && (
                                    <p
                                      style={{
                                        color: "#ff7d68",
                                        marginTop: "1px",
                                      }}
                                    >
                                      {" "}
                                      Please enter royalties
                                    </p>
                                  )
                                }
                                disabled={isLoading}
                              />
                              <small
                                style={{
                                  color: "rgba(0, 0, 0, 0.75)",
                                  fontSize: "12px",
                                }}
                              >
                                Suggested : 0 - 10%
                              </small>
                            </FormControl>
                          </Box>
                          {/* selectedCategory === "private documents" */}
                          {(dataCraft === "craft" &&
                            selectedCategory.trim() === "private documents") ||
                          selectedCategory.trim() === "private documents" ? (
                            <>
                              <Box mt={3}>
                                <label className={classes.fontSixeText}>
                                  Recipient Wallet Address{" "}
                                  <span style={{ color: "#ff7d68" }}>*</span>{" "}
                                </label>
                                <FormControl
                                  fullWidth
                                  className={classes.margin}
                                >
                                  <TextField
                                    disabled={isLoading}
                                    placeholder="e. g. 1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"
                                    onChange={(e) =>
                                      setwalletAddress(e.target.value)
                                    }
                                    // error={
                                    //   isSubmit1 &&
                                    //   recipientWalletAddress === false
                                    // }
                                    // helperText={
                                    //   isSubmit1 &&
                                    //   recipientWalletAddress === "" &&
                                    //   recipientWalletAddress === false && (
                                    //     <p
                                    //       style={{
                                    //         color: "#ff7d68",
                                    //         marginTop: "1px",
                                    //       }}
                                    //     >
                                    //       {" "}
                                    //       Please enter recipientWalletAddress
                                    //     </p>
                                    //   )
                                    // }
                                  />
                                </FormControl>
                              </Box>
                              <Box mt={3}>
                                <label className={classes.fontSixeText}>
                                  Recipient Backup Wallet Address (Optional){" "}
                                </label>
                                <FormControl
                                  fullWidth
                                  className={classes.margin}
                                >
                                  <TextField
                                    disabled={isLoading}
                                    placeholder="e. g. 1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVT3"
                                    onChange={(e) =>
                                      setbackupwalletAddress(e.target.value)
                                    }
                                  />
                                </FormControl>
                              </Box>
                            </>
                          ) : (
                            ""
                          )}

                          {/* {isCreateOrder && (
                            <Box mt={2}>
                              <Button
                                variant="contained"
                                size="large"
                                color="primary"
                                // onClick={() => setSettings(!settings)}
                                onClick={() => setIsAdvance(!isAdvance)}
                                disabled={isLoading}
                              >
                                {isAdvance ? "Hide" : "Show"} advanced settings
                              </Button>
                            </Box>
                          )} */}
                        </Box>
                      </Box>
                    </Box>
                    {isAdvance && (
                      <Box mt={2}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Box mt={2}>
                              <label className={classes.fontSixeText}>
                                {" "}
                                Properties(Optional)
                              </label>
                              <FormControl fullWidth>
                                <Input
                                  placeholder="e.g. Size"
                                  value={propertyFirst}
                                  onChange={(e) =>
                                    setpropertyFirst(e.target.value)
                                  }
                                  disabled={isLoading}
                                />
                              </FormControl>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box mt={2}>
                              <label>&nbsp;</label>
                              <FormControl fullWidth>
                                <Input
                                  onChange={(e) =>
                                    setProperySecond(e.target.value)
                                  }
                                  placeholder="e.g. M"
                                  disabled={isLoading}
                                />
                              </FormControl>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    )}
                    <Box
                      mt={3}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Button
                        onClick={() =>
                          isCreateOrder === false
                            ? submitHanlder()
                            : submitCreateNFTHanlder()
                        }
                        // variant="contained"
                        // color="secondary"
                        variant="contained"
                        size="large"
                        color="primary"
                        disabled={isLoading || selectedCategory === "tickets"}
                      >
                        {transactionStatus}{" "}
                        {isLoading && <ButtonCircularProgress />}
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Dialog
              open={open}
              className={classes.createbox}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              classes={{ paper: classes.paper }}
            >
              <DialogActions>
                <IconButton
                  disabled={isLoading1}
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
                      Collection
                    </Typography>
                    <Box
                      className={classes.createCollection}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box>
                        {imageBannerr !== "" ? (
                          <img
                            src={imageBannerr}
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
                        <Typography
                          variant="body2"
                          style={{
                            color: "#000",
                            fontSize: "15px",
                            fontWeight: "600px",
                          }}
                        >
                          Select Banner Image{" "}
                          <span style={{ color: "#ff7d68" }}>*</span>
                        </Typography>
                        <Box>
                          <input
                            accept="image/*"
                            style={{ display: "none" }}
                            id="raised-button-file-banner"
                            type="file"
                            name="bannerImage"
                            onChange={(e) => {
                              _onInputFileChange(e);
                            }}
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
                          {isSubmit && formValue.bannerImage === "" && (
                            <Typography
                              style={{ color: "#ff7d68" }}
                              variant="body2"
                            >
                              Please select banner image
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      className={classes.createCollection}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box>
                        {imgBlob1 !== "" ? (
                          <img
                            src={imgBlob1}
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
                        <Typography
                          variant="body2"
                          style={{
                            color: "#000",
                            fontSize: "15px",
                            fontWeight: "600px",
                          }}
                        >
                          Select Image{" "}
                          <span style={{ color: "#ff7d68" }}>*</span>
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
                              _onInputFileChange1(e);
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
                          {isSubmit && formValue.collectionIMG === "" && (
                            <Typography
                              style={{ color: "#ff7d68" }}
                              variant="body2"
                            >
                              Please select image
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </Box>
                    <Box mt={2} className={classes.textfiledlabel}>
                      <Box mt={2}>
                        <label>
                          Display name{" "}
                          <span style={{ color: "#ff7d68" }}>*</span>
                        </label>
                        <FormControl fullWidth className={classes.margin}>
                          <TextField
                            disabled={isLoading1}
                            id
                            inputProps={{ maxLength: 20 }}
                            placeholder="Please enter displayname"
                            name="displayName"
                            value={formValue.displayName}
                            onChange={(e) => _onInputChange(e)}
                            error={isSubmit && formValue.displayName === ""}
                            helperText={
                              isSubmit &&
                              formValue.displayName === "" &&
                              "Please enter displayname"
                            }
                          />
                          {/* <small>Token name cannot be changed in future</small> */}
                        </FormControl>
                      </Box>
                      <Box mt={3}>
                        <label>
                          Symbol <span style={{ color: "#ff7d68" }}>*</span>
                        </label>
                        <FormControl fullWidth className={classes.margin}>
                          <TextField
                            disabled={isLoading1}
                            id
                            placeholder="Please enter symbol"
                            name="symbol"
                            value={formValue.symbol}
                            onChange={(e) => _onInputChange(e)}
                            error={isSubmit && formValue.symbol === ""}
                            helperText={
                              isSubmit &&
                              formValue.symbol === "" &&
                              "Please enter symbol"
                            }
                          />
                        </FormControl>
                      </Box>
                      <Box mt={3}>
                        <label>
                          Description{" "}
                          <span style={{ color: "#ff7d68" }}>*</span>
                        </label>
                        <FormControl fullWidth className={classes.margin}>
                          <TextField
                            disabled={isLoading1}
                            id
                            placeholder="Please enter description"
                            name="description"
                            value={formValue.description}
                            onChange={(e) => _onInputChange(e)}
                            error={isSubmit && formValue.description === ""}
                            helperText={
                              isSubmit &&
                              formValue.symbol === "" &&
                              "Please enter description"
                            }
                          />
                        </FormControl>
                      </Box>

                      <Box mt={3}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              // onChange={handleChange}
                              style={{ color: "#35a5f5" }}
                              name="checkedB"
                              color="primary"
                              checked={isPromoted}
                              onChange={(e) => {
                                setisPromoted(e.target.checked);
                                setcheck(false);
                              }}
                            />
                          }
                          label={`Promote this collection in hot section for  ${
                            hotdata ? hotdata : "0.001"
                          } QIE `}
                        />
                      </Box>
                    </Box>
                    <Box mt={3} mb={4} textAlign="Center">
                      <Button
                        variant="contained"
                        size="large"
                        onClick={handleSubmit}
                        color="primary"
                        disabled={isLoading1}
                      >
                        Create Collection{" "}
                        {isLoading1 && <ButtonCircularProgress />}
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </DialogContent>
            </Dialog>
            <Dialog
              open={share}
              onClose={() => setShare(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              maxWidth="xs"
              fullWidth
            >
              <DialogActions>
                <IconButton
                  onClick={() => setShare(false)}
                  className={classes.customizedButton}
                >
                  <MdCancel />
                </IconButton>
              </DialogActions>
              <DialogContent>
                <Box>
                  <Typography variant="body2">
                    You have successfully Minted your NFT, Share now on
                  </Typography>
                </Box>
                <Box
                  className={classes.sharemodal}
                  mb={2}
                  align="center"
                  mt={3}
                >
                  <Button>
                    <Box>
                      <FaFacebookF style={{ fontSize: "30px" }} /> <br />
                      Facebook
                    </Box>
                  </Button>
                  <Button>
                    <Box>
                      <MdEmail style={{ fontSize: "30px" }} /> <br />
                      E-mail
                    </Box>
                  </Button>
                  <Button>
                    <Box>
                      <FaTelegramPlane style={{ fontSize: "30px" }} /> <br />
                      Teligram
                    </Box>
                  </Button>
                  <Button>
                    <Box>
                      {" "}
                      <FaTwitter style={{ fontSize: "30px" }} /> <br />
                      Twitter
                    </Box>
                  </Button>
                </Box>
              </DialogContent>
            </Dialog>
            <Dialog
              open={openTransactionModal}
              onClose={() => setOpenTransactionModal(false)}
              className={classes.createbox}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              classes={{ paper: classes.paper }}
              disableBackdropClick={isLoading}
              disableEscapeKeyDown={isLoading}
            >
              <DialogContent>
                <Typography
                  variant="h4"
                  className="modalTitle"
                  style={{ textAlign: "center" }}
                >
                  Steps
                </Typography>
                <Box className="checktoggel">
                  {" "}
                  <Grid container spacing={2}>
                    <Grid item sm={3} xm={3}>
                      <AiOutlineCheckCircle
                        style={
                          orderStatus === "Mint"
                            ? { fontSize: 24, color: "#039be3" }
                            : { fontSize: 24 }
                        }
                      />
                    </Grid>
                    <Grid item sm={9} xm={9}>
                      <Box display="flex" alignItems="centers">
                        <Typography
                          style={
                            orderStatus === "Mint" ? { color: "#039be3" } : {}
                          }
                        >
                          Mint{" "}
                        </Typography>
                        <Box>
                          {isLoading && orderStatus === "Mint" && (
                            <ButtonCircularProgress />
                          )}
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item sm={3} xm={3}>
                      <CgShapeHalfCircle
                        style={
                          orderStatus === "Approve"
                            ? { fontSize: 24, color: "#039be3" }
                            : { fontSize: 24 }
                        }
                      />
                    </Grid>
                    <Grid item sm={9} xm={9}>
                      <Box display="flex" alignItems="centers">
                        <Typography
                          style={
                            orderStatus === "Approve"
                              ? { color: "#039be3" }
                              : {}
                          }
                        >
                          Approve{" "}
                        </Typography>
                        <Box>
                          {isLoading && orderStatus === "Approve" && (
                            <ButtonCircularProgress />
                          )}
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </DialogContent>
              <DialogContent className={classes.dialogBox}></DialogContent>
            </Dialog>
          </Box>
        </Container>
      </Box>
    </>
  );
}

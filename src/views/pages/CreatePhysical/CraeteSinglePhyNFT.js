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
  FormHelperText,
  FormControl,
  DialogContentText,
  InputLabel,
  Input,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import Switch from "@material-ui/core/Switch";
import moment from "moment";
import Pagination from "@material-ui/lab/Pagination";
import PublishIcon from "@material-ui/icons/Publish";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useHistory, useLocation, Link as RouterLink } from "react-router-dom";
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
  createSingleNFTHandler,
  uploadContractHandler,
  createPhysingNFTHandler,
  placeOrderAPIHandler,
  placePhyOrderAPIHandler,
  getTokenId,
  createNFTBlockchainHanlder,
  addImageHandler,
  createPhysicalNFTHandler,
  createBrandCollectionAPIHanlder,
} from "src/services";
import { UserContext } from "src/context/User";
import {
  singleNftTokenAddress,
  singlemarketplaceContract,
  ACTIVE_NETWORK,
  swichNetworkHandler,
  currency,
} from "src/constants";
import { ethers } from "ethers";
import { MdCancel, MdEmail } from "react-icons/md";
import SingPhyMarketABI from "src/constants/ABI/SingPhyMarketABI.json";
import SingPhyNftTokenABI from "src/constants/ABI/SingPhyNftTokenABI.json";
import Button from "@material-ui/core/Button";
import { MdAddCircle } from "react-icons/md";
import axios from "axios";
import ApiConfig from "src/ApiConfig/ApiConfig";
import { useWeb3React } from "@web3-react/core";
import ImageUploading from "react-images-uploading";
import Web3 from "web3";
import { getWeb3Obj, getContract } from "src/utils";
import { GiCancel, GiPaintBrush } from "react-icons/gi";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { DateTimePicker } from "@material-ui/pickers";
import BrandCollection from "../PhysicalNFT/BrandCollection";
import BrandsubCollection from "../PhysicalNFT/BrandsubCollection";

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
      background: " linear-gradient(261.87deg, #62D3F0 13.12%, #e5cf58 83.57%)",
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
    color: "#e5cf58 !important ",
    borderRadius: "10px",
    "@media(max-width:405px)": {
      width: "100%",
    },
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
      color: "#e5cf58",
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
      color: "#e5cf58",
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
    maxWidth: "100%",
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
    height: "40px",
    borderRadius: "10px",
    backgroundColor: "#E6E6E6",
    margin: "0px 10px",
    "@media(max-width:405px)": {
      width: "100%",
      margin: "0px",
    },
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
  const [_strainListData, setStrainListData] = useState([]);
  const [_isloader, setLoader] = useState(false);
  const [images, setImages] = useState([]);
  const [multiimage, setMultiimage] = useState([]);
  const [settings, setSettings] = useState(true);
  const [share, setShare] = useState(false);
  const [selectBrand, setSelectBrand] = useState(false);
  const [loaderdata, setLoaderdata] = useState(false);
  const history = useHistory();
  const user = useContext(UserContext);
  const [pages, setpages] = useState(1);
  const [numpages, setNumpages] = useState(1);
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
  const [collectionListdata, setCollectionList] = useState([]);
  const [brandlist, setBrandlist] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSubmit1, setIsSubmit1] = useState(false);
  const [banarImage, setBanarImage] = useState("");
  const [endDate, setEndDate] = useState(moment().add(1, "h"));
  const [hotdata, setHotdata] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("create");
  const [selectedbrandCollection, setSelectedbrandCollection] =
    useState("create");
  const [brandcollection, setBrandcollection] = useState([]);
  const [imgFile, setImgFile] = useState("");
  const [craft, setCraft] = useState("");
  const [openTransactionModal, setOpenTransactionModal] = useState(false);
  const [imgFileBase, setImgFileBase] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [uploadBanner, setUploadBanner] = useState(false);
  const [isMp3, setIsMp3] = useState(false);
  const [mediaType, setMediaType] = useState("");
  const [coverBlob, setCoverBlob] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [selectBrandcolId, setSelectBrandcolId] = useState("");
  const [bannerImageBlob, setBannerImageBlob] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("Create Item");
  const [coverFile, setCoverFile] = useState("");
  const [updatevalidation, setUpdatevalidation] = useState(false); //PrivateDoc
  const [fileTypeCheck, setFileTypeCheck] = useState("");
  const [title, setTitle] = useState("");
  const [backImage, setBackImage] = useState("");
  const [coverFileBase, setCoverFileBase] = useState("");
  const [recipientWalletAddress, setwalletAddress] = React.useState("");
  const [recipientBackupWalletAddress, setbackupwalletAddress] =
    React.useState("");
  const [allCategory, setlistCategory] = useState();
  const [selectCData, setSelectCData] = useState();
  const [dataselect, setDataselect] = useState("");
  const dataCraft = location?.state?.data;
  const [isAuction, SetIsAuction] = useState("fixed");
  const [startPrice, setStartPrice] = useState("");
  const [price, setPrice] = useState("");
  const [unloackData, setUnloackData] = useState("");
  const web3 = (window.web3 = new Web3(window.ethereum));
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
      } else {
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

  const getBrandHanlder = (id) => {
    console.log("idddd", id);
  };

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

  const brandCollectionType = "SINGLE_BRAND";

  //Collection function
  const handleSubmit = async () => {
    console.log("selectBrandcolId++", selectBrandcolId);
    setIsSubmit(true);
    if (
      formValue.bannerImage !== "" &&
      formValue.displayName !== "" &&
      formValue.symbol !== "" &&
      formValue.description !== "" &&
      formValue.collectionIMG !== ""
    ) {
      setIsLoading1(true);
      toast.warn("Please do not refresh the page");
      // if (isValidAddress) {
      if (formValue.collectionIMG !== "") {
        await addImageHandler(formValue.collectionIMG)
          .then(async (res) => {
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
            console.log("singleaddress", receipt);
            if (receipt != false) {
              const resResult = await createBrandCollectionAPIHanlder(
                receipt,
                formValue.displayName,
                formValue.symbol ? formValue.symbol : "NA",
                formValue.description ? formValue.description : "NA",
                isPromoted,
                selectBrandcolId,
                formValue.collectionIMG,
                formValue.bannerImage,
                res,
                formValue.shortUrl ? formValue.shortUrl : "NA",
                brandCollectionType,
                "createCollection"
              );
              setIsLoading1(false);
              if (resResult && resResult.data.statusCode === 200) {
                // getCollectionListHanlder();
                toast.success(resResult.data.responseMessage);
                setOpen(false);
                setIsLoading1(false);
                console.log(
                  "resResult.data.result?.brandId===",
                  resResult.data.result?.brandId
                );
                await getBrandListHanlder(resResult.data.result?.brandId);
                setIsSubmit(false);
                setFormValue({
                  displayName: "",
                  symbol: "",
                  description: "",
                  bannerImage: "",
                  collectionIMG: "",
                  shortUrl: "",
                });
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
          })
          .catch((err) => {
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

  // const getCollectionListHanlder = async () => {
  //   setOpen(false);
  //   axios({
  //     method: "GET",
  //     url: ApiConfig.collectionList,
  //   })
  //     .then(async (res) => {
  //       if (res.data.statusCode === 200) {
  //         if (res.data.result.docs) {
  //           const filterData = res.data.result.docs.filter((data) => {
  //             return data?.displayName.trim() === "Brand_collection";
  //           });
  //           console.log("Brand_collection++", filterData);
  //           // setCollectionList(filterData);
  //         } else {
  //           setCollectionList([]);
  //         }
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  // useEffect(() => {
  //   const cancelTokenSource = axios.CancelToken.source();
  //   getCollectionListHanlder(cancelTokenSource);
  //   return () => {
  //     cancelTokenSource.cancel();
  //   };
  // }, [user.userData, isCreateOrder]);
  //BRAND
  const accessToken = window.sessionStorage.getItem("token");
  const getBrandCollectionListHanlder = async (id) => {
    setLoaderdata(true);
    try {
      axios({
        method: "POST",
        url: ApiConfig.brandListParticular,
        headers: {
          token: accessToken,
        },
        // params: {
        //   search: search ? search : null,
        //   limit: 12,
        // },
      }).then(async (res) => {
        if (res.data.statusCode === 200) {
          if (res.data.result.docs) {
            setBrandlist(res.data.result.docs);
            // setNumpages(res.data.result.pages);
            setLoaderdata(false);
            if (res.data.result.docs.length === 0) {
              setOpenTransactionModal(true);
            } else {
              setOpenTransactionModal(false);
            }
          } else {
            // setCollectionList([]);
            setLoaderdata(false);
          }
          setLoaderdata(false);

          // user.getlistCollection();
        } else {
          setLoaderdata(false);
        }
      });
    } catch (error) {
      console.log(error);
      setLoaderdata(false);
    }
  };

  const pageCheck = pages === 1 ? 12 : 0;

  useEffect(() => {
    getBrandCollectionListHanlder();
  }, [user.userData]);
  // collections
  const getBrandListHanlder = async (id) => {
    setSelectBrandcolId(id);
    try {
      setLoader(true);
      axios({
        method: "GET",
        url: ApiConfig.getCollectionOnBrand,
        headers: {
          token: accessToken,
        },
        params: {
          brandId: id,
        },
      }).then(async (res) => {
        if (res.data.statusCode === 200) {
          setBrandcollection(res.data.result);
          setLoader(false);
        }
      });
    } catch (error) {
      console.log(error);
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

  //only CreateNFT
  const submitHanlder = async () => {
    setIsSubmit1(true);
    // const checkPrice = isAuction === "fixed" ? price : startPrice
    const checkPrice = price;
    const mediaURLCheck = imgFile ? imgFile : imgFileBase;
    if (chainId === ACTIVE_NETWORK) {
      if (
        title !== "" &&
        selectedCollection !== "create" &&
        selectedCollection &&
        imgFileBase !== ""
      ) {
        setIsLoading(true);
        setTransactionStatus("Loading...");
        toast.warn("Please do not refresh the page");

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
              copies: "1",
              physicalType: "SINGLE",
              brandId: selectedCollection._id,
              collectionId: selectedbrandCollection._id,
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
                console.log("++++++++++++++++++0++++++++++++++++++++");
                if (
                  await createNFTBlockchainHanlder(
                    selectedbrandCollection?.contractAddress,
                    SingPhyNftTokenABI,
                    library,
                    account,
                    receipt,
                    title,
                    royalties
                  )
                ) {
                  const tokenId = await getTokenId(
                    selectedbrandCollection?.contractAddress,
                    SingPhyNftTokenABI,
                    library,
                    account
                  );

                  let tokenIdN = parseInt(tokenId);
                  console.log("++++++++++++++++++1++++++++++++++++++++");
                  const creRes = await createPhysicalNFTHandler(
                    createBody,
                    tokenIdN.toString(),
                    singlemarketplaceContract,
                    SingPhyMarketABI,
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
  const brandId = selectedCollection._id;
  const submitCreateNFTHanlder = async () => {
    setIsSubmit1(true);
    const checkPrice = price;
    const mediaURLCheck = imgFile ? imgFile : imgFileBase;
    // const mediaTypeCheck = imgFile ? "image" : imgFileBase ? "video" : "audio";
    if (chainId === ACTIVE_NETWORK) {
      if (
        title !== "" &&
        description !== "" &&
        checkPrice !== "" &&
        parseFloat(checkPrice) > 0 &&
        description !== "" &&
        selectedCollection !== "create" &&
        selectedCollection &&
        imgFileBase !== ""
      ) {
        setIsLoading(true);
        setTransactionStatus("Loading...");
        toast.warn("Please do not refresh the page");
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
                fileType == "video" || fileType == "audio" || fileType == "mp3"
                  ? backImage
                  : imgFileBase,
              uri: res,
              title: title,
              categoryType: selectedCategory,
              // physicalNftImage: multiimage,
              copies: "1",
              physicalType: "SINGLE",
              unlockOncePurchased: unloackData,
              collectionId: selectedbrandCollection._id,
              contractAddress: selectedCollection.contractAddress,
              description: description,
              royalties: royalties,
              brandId: selectedCollection._id,
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
                console.log(
                  "+++++++selectedbrandCollection+++++++",
                  selectedbrandCollection?.contractAddress
                );
                if (
                  await createNFTBlockchainHanlder(
                    selectedbrandCollection?.contractAddress,
                    SingPhyNftTokenABI,
                    library,
                    account,
                    receipt,
                    title
                  )
                ) {
                  console.log("+++++++++++++++54++++++++++++++++++++++");

                  const tokenId = await getTokenId(
                    selectedbrandCollection?.contractAddress,
                    SingPhyNftTokenABI,
                    library,
                    account
                  );
                  console.log("+++++++++++++++53++++++++++++++++++++++");

                  let tokenIdN = parseInt(tokenId);
                  const creRes = await createPhysingNFTHandler(
                    createBody,
                    tokenIdN.toString(),
                    singlemarketplaceContract,
                    SingPhyMarketABI,
                    library,
                    account,
                    advanceSettings
                  );
                  console.log("+++++++++++++++0+++++++++++++++++++++++");
                  if (creRes && creRes.data.statusCode === 200) {
                    console.log("+++++++++++++++1+++++++++++++++++++++++");
                    setIsLoading(true);
                    setTransactionStatus("Create Item");
                    const contractObj = getContract(
                      selectedbrandCollection?.contractAddress,
                      SingPhyNftTokenABI,
                      library,
                      account
                    );
                    console.log("+++++++++++++++2+++++++++++++++++++++++");
                    const NFTApprovalID = await contractObj.approve(
                      singlemarketplaceContract,
                      tokenIdN.toString()
                    );
                    console.log("+++++++++++++++3+++++++++++++++++++++++");
                    await NFTApprovalID.wait();
                    const createObjm = getContract(
                      singlemarketplaceContract,
                      SingPhyMarketABI,
                      library,
                      account
                    );
                    console.log("+++++++++++++++4+++++++++++++++++++++++");

                    const marketPlace = await createObjm.createOrder(
                      brandId.toString(),
                      selectedbrandCollection?.contractAddress,
                      tokenIdN.toString(),
                      web3.utils.toWei(price.toString()).toString(),
                      moment(endDate).unix(),
                      currency
                    );
                    await marketPlace.wait();
                    console.log("+++++++++++++++5+++++++++++++++++++++++");

                    const placeres = await placePhyOrderAPIHandler(
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
      } else {
        toast.warn("Please enter valid data ");
      }
    } else {
      swichNetworkHandler();
      setIsLoading(false);
    }
  };

  const functionKey = "ADD";
  const ImageUpload_API = async () => {};
  const maxNumber = 4;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    let array = [];
    setMultiimage(array);
    for (var i = 0; i < imageList.length; i++) {
      const url = imageList[i]?.data_url;
      array.push(url);
    }
    setImages(imageList);
  };

  //Modal
  // console.log("brandlist++12", brandlist.length);
  // console.log("loaderdata", loaderdata);
  // useEffect(() => {
  //   if (loaderdata) {
  //   } else {
  //     if (brandlist.length === 0) {
  //       setOpenTransactionModal(true);
  //     } else {
  //       setOpenTransactionModal(false);
  //     }
  //   }
  // }, [brandlist, loaderdata]);
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
                    style={{ marginBottom: "8px" }}
                    className={
                      isCreateOrder ? classes.selectedbutton : classes.button
                    }
                    onClick={() => setIsCreateOrder(true)}
                  >
                    {" "}
                    Create Live Nft
                  </Button>

                  <Button
                    disabled={isLoading}
                    variant="contained"
                    size="large"
                    color="primary"
                    style={{ marginBottom: "8px" }}
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
                  Create Live
                  <span style={{ color: "#e5cf58" }}> Physical Nft</span>
                </Typography>
              </Box>
            ) : (
              <Box className={classes.heading}>
                <Typography variant="h2">
                  Create Offline {""}
                  <span style={{ color: "#e5cf58" }}> Physical Nft</span>
                </Typography>
              </Box>
            )}
            <Box>
              <Typography>Single edition on QIE</Typography>
            </Box>

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
                      <label className={classes.fontSixeText}>
                        Upload file <span style={{ color: "#ff7d68" }}>*</span>
                      </label>

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
                {/* start */}

                {/* <Grid item md={12} sm={12} lg={12} xs={12}>
                  <Box>
                    <ImageUploading
                      multiple
                      value={images}
                      onChange={onChange}
                      maxNumber={maxNumber}
                      dataURLKey="data_url"
                    >
                      {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                      }) => (
                        // write your building UI
                        <Box>
                          <Box>
                            <Box pb={1}>
                              <label className={classes.fontSixeText}>
                                Select Product images (Optional)
                              </label>
                            </Box>
                            <Button
                              variant="contained"
                              color="primary"
                              style={isDragging ? { color: "red" } : undefined}
                              onClick={onImageUpload}
                              {...dragProps}
                            >
                              Choose File
                            </Button>
                            &nbsp;
                       
                            {imageList?.length > 1 ? (
                              <Button
                                className={classes.uploadBtn}
                                onClick={onImageRemoveAll}
                              >
                                Remove all images
                              </Button>
                            ) : (
                              ""
                            )}
                          </Box>
                          <Box
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {imageList.map((image, index) => (
                              <Box
                                key={index}
                                className={classes.imageItem}
                                mt={1}
                              >
                                <img
                                  src={image["data_url"]}
                                  alt=""
                                  style={{
                                    width: "133px",
                                    height: "110px",
                                  }}
                                />
                                <Box>
                                  <Button
                                    className={classes.uploadBtn}
                                    onClick={() => onImageUpdate(index)}
                                  >
                                    Update
                                  </Button>
                                  <Button
                                    className={classes.uploadBtn}
                                    onClick={() => onImageRemove(index)}
                                  >
                                    Remove
                                  </Button>
                                </Box>
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      )}
                    </ImageUploading>
                  </Box>
                </Grid> */}

                {/* end */}
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
                      {/* Brand */}
                      <Box>
                        <Box>
                          <label className={classes.fontSixeText}>
                            Existing brand
                            <span style={{ color: "#ff7d68" }}>*</span>
                          </label>

                          <Box mt={2}>
                            <Grid container spacing={2}>
                              {brandlist.map((data, i) => {
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
                                    <BrandCollection
                                      selectedCollection={selectedCollection}
                                      setSelectedCollection={(selectedColl) =>
                                        setSelectedCollection(selectedColl)
                                      }
                                      setUpdatevalidation={setUpdatevalidation}
                                      getBrandCollectionListHanlder={
                                        getBrandCollectionListHanlder
                                      }
                                      setSelectBrand={setSelectBrand}
                                      key={i}
                                      data={data}
                                      isLoading={isLoading}
                                      getBrandListHanlder={(e) =>
                                        getBrandListHanlder(e)
                                      }
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
                                Please select brand
                              </Typography>
                            )}
                            {/* {brandlist && brandlist.length >= pageCheck ? (
                              <Box
                                className={classes.tabBtn}
                                pt={5}
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
                            )} */}
                          </Box>
                        </Box>
                      </Box>
                      <Box>
                        {selectBrand && (
                          <Box pt={2}>
                            <label className={classes.fontSixeText}>
                              <label className={classes.fontSixeText}>
                                Create or add to existing brand collection
                                <span style={{ color: "#ff7d68" }}>*</span>
                              </label>
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

                                {_isloader ? (
                                  <Box>
                                    <ButtonCircularProgress />
                                  </Box>
                                ) : (
                                  <>
                                    {/* {collectionListdata.map((data, i) => {
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
                                          <BrandsubCollection
                                            selectedbrandCollection={
                                              selectedbrandCollection
                                            }
                                            setSelectedbrandCollection={(
                                              selectedColll
                                            ) =>
                                              setSelectedbrandCollection(
                                                selectedColll
                                              )
                                            }
                                            setUpdatevalidation={
                                              setUpdatevalidation
                                            }
                                            setDataselect={setDataselect}
                                            key={i}
                                            data={data}
                                            isLoading={isLoading}
                                          />
                                        </Grid>
                                      );
                                    })} */}

                                    {brandcollection.map((data, i) => {
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
                                          <BrandsubCollection
                                            selectedbrandCollection={
                                              selectedbrandCollection
                                            }
                                            setSelectedbrandCollection={(
                                              selectedColll
                                            ) =>
                                              setSelectedbrandCollection(
                                                selectedColll
                                              )
                                            }
                                            setUpdatevalidation={
                                              setUpdatevalidation
                                            }
                                            setDataselect={setDataselect}
                                            key={i}
                                            data={data}
                                            isLoading={isLoading}
                                          />
                                        </Grid>
                                      );
                                    })}
                                  </>
                                )}
                              </Grid>

                              {selectBrand && dataselect === "" && (
                                <Typography
                                  variant="body2"
                                  style={{
                                    color: "#ff7d68",
                                    fontSize: "0.75rem",
                                    marginTop: "10px",
                                  }}
                                >
                                  Please select brand collection
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        )}
                      </Box>
                      {/* end */}

                      <Box>
                        <Box mt={2}>
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
            {/* //Collection create */}
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
                      Brand Collection
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
            {/* //end */}
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
              className={classes.createbox}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              classes={{ paper: classes.paper }}
            >
              <DialogContent>
                <DialogContentText
                  id="alert-dialog-description"
                  align="center"
                  style={{
                    color: "#ffbf00",
                    fontSize: "18px",
                    fontWeight: "600",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Brand required !!
                  <Typography variant="h6" style={{ color: "#000" }}>
                    Please add your brand first
                  </Typography>
                  <Box>
                    <Typography style={{ color: "#000" }}>
                      When admin approves your brand then you can create Nft and
                      after that you can check the status of your brand by going
                      through your profile.
                    </Typography>
                  </Box>
                </DialogContentText>
                <Box display="flex" justifyContent="center" pb={2}>
                  <Box className={classes.btnname}>
                    <RouterLink to="/" style={{ textDecoration: "none" }}>
                      <Button variant="contained" color="primary">
                        Back
                      </Button>
                    </RouterLink>
                  </Box>
                  <Box className={classes.btnname} pl={1}>
                    <RouterLink
                      to="/add-brand"
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="contained" color="primary">
                        Go to add brand
                      </Button>
                    </RouterLink>
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

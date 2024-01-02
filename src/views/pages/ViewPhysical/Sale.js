import {
  Box,
  Button,
  Grid,
  makeStyles,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  DialogActions,
  FormControl,
  InputAdornment,
  Input,
  Container,
  List,
  ListItem,
  TextField,
  withStyles,
  FormHelperText,
  Switch,
} from "@material-ui/core";
import WalletCard from "src/component/WalletCard";
import { SUPPORTED_WALLETS } from "src/connectors";
import {
  sortAddress,
  getContract,
  calculateTimeLeft,
  getWeb3ContractObject,
} from "src/utils";
import {
  NftTokenAddress,
  marketplaceContract,
  contractKovan,
  multimarketplaceContract,
  singlemarketplaceContract,
  singleNftTokenAddress,
  deadAddress,
  multiNftTokenAddress,
  NetworkContextName,
  getphyMultipleMarketplaceAddress,
  getphysicalsingleMarketplaceAddress,
  ACTIVE_NETWORK,
  getNetworkDetails,
  RPC_URL,
  swichNetworkHandler,
} from "src/constants";
import ShareSocialMedia from "src/component/ShareSocialMedia";

import { createNFTBlockchainHanlder, getTokenId } from "src/services";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import CopyToClipboard from "react-copy-to-clipboard";
import { useWeb3React } from "@web3-react/core";
import { DateTimePicker } from "@material-ui/pickers";
import Web3 from "web3";
import CollectionCard from "src/component/CollectionCard";
import React, { useState, useRef, useContext, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { collectionData } from "src/constants";
import { FaThumbsUp } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { BiLockOpen } from "react-icons/bi";
import { SiFacebook } from "react-icons/si";
import { FaTwitter } from "react-icons/fa";

import { ethers } from "ethers";
import { FaTelegramPlane } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { FiMoreHorizontal } from "react-icons/fi";
import Slider from "react-slick";
import FileCopyIcon from "@material-ui/icons/FileCopy";
// import { BsPatchCheckFill } from 'react-icons/bs';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
// import { MdContentCopy } from 'react-icons/md';
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import Apiconfig from "src/ApiConfig/ApiConfig";
import DataLoading from "src/component/DataLoading";
import DataNotFound from "src/component/DataNotFound";
import { UserContext } from "src/context/User";
import moment from "moment";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import MarketplaceABI from "src/constants/ABI/MarketplaceABI.json";
import NftTokenABI from "src/constants/ABI/NftTokenABI.json";
import SingPhyMarketABI from "src/constants/ABI/SingPhyMarketABI.json";
import SingPhyNftTokenABI from "src/constants/ABI/SingPhyNftTokenABI.json";
import MultiPhyMarketABI from "src/constants/ABI/MultiPhyMarketABI.json";
import MultiPhyNftTokenABI from "src/constants/ABI/MultiPhyNftTokenABI.json";
import { Power } from "react-feather";
import { QRCodeSVG } from "qrcode.react";
import ConstructorMultiABI from "src/constants/ABI/ConstructorMultiABI.json";

const useStyles = makeStyles((theme) => ({
  headbox: {
    background: "#FFFFFF",
    borderRadius: "10px",
    padding: "15px",
    backdropFilter: "blur(44px)",
    boxShadow: "rgb(99 99 99 / 20%) 0px 2px 8px 0px",
    boxSizing: "border-box",
  },
  subBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& h3": {
      fontWeight: "bold",
      color: "#fff",
    },
  },
  creatorbox: {
    alignItems: "center",
    marginTop: "12px",
    "& figure": {
      "& img": { width: "70px" },
    },
    "& h4": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
    },
  },
  creColl: {
    marginLeft: "-39px",
    display: "flex",
    alignItems: "center",
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // borderRadius: "100%",
      // overflow: "hidden",
      // width: "100px",
      width: "50px",
      height: "50px",
      minWidth: "50px",
      borderRadius: "50%",
      overflow: "hidden",
      background: "rgba(0,0,0,0.1)",
      "& img": {
        // minHeight: "100%",
        maxWidth: "100%",
        display: "block",
      },
    },
    "& p": {
      fontStyle: "normal",
      color: "#4ea6f5",
    },
  },
  highBids: {
    "& h4": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "20px",
      lineHeight: "130%",
      margin: "30px 0px",
    },
  },
  notifi: {
    background: "rgb(218 244 255)",
    backdropFilter: "blur(44px)",
    borderRadius: "10px",
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
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      width: "75px",
      margin: "40px 20px",
      borderRadius: "10px",
      border: "2px solid #4ea6f5",
    },
    "& img": {
      maxHeight: "100%",
      maxWidth: "100%",
      height: "auto",
      width: "auto",
      display: "block",
    },
  },
  name1: {
    paddingLeft: "15px",
    "& h3": {
      fontWeight: "500",
      fontWeight: "bold",
      fontSize: "20px",
      color: "#fff",
    },
    "& h6": {
      fontStyle: "normal",
      color: "#fff",
      paddingTop: "10px",
    },
    "& .pricedetail": {
      "& h4": {
        color: "#fff",
        fontWeight: "bold",
      },
      "& h6": {
        color: "#000",
      },
    },
  },

  contract: {
    "& h6": {
      fontWeight: "500",
      width: "max-content",
      color: "#fff",
    },
    "& p": {
      fontWeight: "500",
      color: "#727486",
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
    height: "165px",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "100% !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "40px 40px 10px 10px",
    backgroundColor: "#ccc !important",
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

    "& h3": {
      color: "#fff",
      display: "flex",
      fontSize: "28px",
      alignItems: "center",
      fontWeight: "700",
      marginBottom: "7px",
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

  posrel: {
    position: "relative",
    "& h6": {
      fontSize: "18px",
      fontWeight: "600",
      color: "#000",
      display: "flex",
      alignItems: "center",
      "& svg": {
        color: "green",
        marginLeft: "10px",
      },
    },
    "& h4": {
      fontSize: "30px",
      margin: "10px 0",
      color: "#fff",
    },
    "& label": {
      letterSpacing: "1px",
      "& span": {
        color: "#000",
      },
      "& strong": {
        color: "#000",
        cursor: "pointer",
      },
    },
    "& p": {
      lineHeight: "22px",
    },
  },
  playertype: {
    position: "absolute",
    top: "0",
    right: "0",
    padding: " 6px 10px",
    backgroundColor: "rgb(254 254 254)",
    color: "#000",
    borderRadius: "6px",
  },

  artwork: {
    marginTop: "50px",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "50px",
    },
    "& .artworkmaingrid": {
      "& .artworkgrid": {
        "&:last-child": {
          "& .artworkbox": {
            "&::after": {
              display: "none",
            },
          },
        },
      },
    },
    "& .artworkbox": {
      position: "relative",
      padding: "10px 0",
      "&::after": {
        position: "absolute",
        top: 0,
        right: 0,
        height: "100%",
        content: "''",
        width: "1px",
        backgroundColor: "#484848",
      },
    },
    "& h2": {
      fontWeight: 700,
      fontSize: "30px",
      color: "#fff",
      [theme.breakpoints.down("xs")]: {
        fontSize: "20px",
      },
    },
    "& p": {
      fontWeight: 400,
      fontSize: "18px",
      marginTop: "10px",
      color: "rgba(0, 0, 0, 0.5)",
      [theme.breakpoints.down("xs")]: {
        fontSize: "14px",
      },
    },
  },
  nftname: {
    fontSize: "30px",
    fontWeight: "bold",
    lineHeight: "36px !important",
    color: "#fff",
    [theme.breakpoints.down("xs")]: {
      fontSize: "20px",
    },
  },
  chain: {
    "& h4": {
      fontWeight: "bold",
    },
  },
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
}))(Switch);
export default function Sale({
  Physicaldataprofile,
  PhysicalNFTtype,
  orderId,
  setOrderDetailsParent,
  setBidListParent,
  setIsLoadingParent,
}) {
  const history = useHistory();
  const classes = useStyles();
  const user = useContext(UserContext);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [networkDetails, setNetworkDetails] = useState();
  const { account, chainId, library } = useWeb3React();
  const [message, setMessage] = useState("");
  const [openPlaceBid, setOpenPlaceBid] = useState(false);
  const [openBuy, setOpenBuy] = useState(false);
  const moreRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [openSale, setOpenSale] = useState(false);
  const [policy, setPolicy] = useState(false);
  const [isInvalidUrl, setIsInValidVUrl] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const [orderDetails, setOrderDetails] = useState();
  const [updateexpirydate, setUpdateExpirydate] = useState();
  const [bidList, setBidList] = useState([]);
  const [tokenIdarray, setTokenIdarray] = useState([]);
  console.log("tokenIdarray", tokenIdarray);
  const [properties, setProperties] = useState("");
  const [orderExtraDeails, setOderExtraDeails] = useState();
  const [isUpdatingAcceptBid, setIsUpdatingAcceptBid] = useState(false);
  const [isCancelOrderUpdating, setIsCancelOrderUpdating] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isUpdateprice, setIsUpdateprice] = useState(false);
  const [isUpdateQuantity, setIsUpdateQuantity] = useState(false);
  const [price, setPrice] = useState("");
  const [numberofCopies, setNumberofCopies] = useState("");
  const [numberofQuantity, setNumberofQuantity] = useState("");
  const [numberofPrice, setNumberofPrice] = useState("");
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [cancelBidUpdating, setCancelBidUpdating] = useState(false);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isCancelled, setIsCancelled] = useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open7, setOpen7] = React.useState(false);
  const [currentOwner, setCurrentOwner] = useState("");

  const [isOrderExpired, setIsOrderExpired] = useState(false);
  const [bidExtraDetails, setBidExtraDetails] = useState();
  const [isPrivate, setIsPrivate] = useState(false);
  // const location = useLocation();
  // const PhysicalNFTtype = location.state.data

  const handleMenuOpen = () => {
    setOpenMenu(true);
  };
  const handleMenuClose = () => {
    setOpenMenu(false);
  };
  const hellochange = () => {
    setOpen2(true);
  };

  //walletBalance
  const [balanceValue, setBalanceValue] = React.useState(0);
  const httpProvider = new Web3.providers.HttpProvider(RPC_URL);
  const web3 = new Web3(httpProvider);
  const [isValidExpiry, setIsValidExpiry] = useState(false);
  //
  const GetBalance = async () => {
    try {
      const value = await web3.eth.getBalance(account);
      setBalanceValue(web3.utils.fromWei(value));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (account) {
      GetBalance();
    }
  }, [account]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(
        calculateTimeLeft(
          new Date(
            parseInt(
              orderDetails?.expiryTime
                ? orderDetails?.expiryTime
                : updateexpirydate?.expiryTime
            )
          )
        )
        // calculateTimeLeft(new Date(parseInt(updateexpirydate?.expiryTime) * 1000))
      );
    }, 1000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    if (orderId) {
      getNftDetails(orderId, cancelTokenSource);
    } else {
      // setIsLoading(false);
    }

    return () => {
      cancelTokenSource.cancel();
    };
  }, [orderId, user.userData]);

  useEffect(() => {
    if (orderDetails) {
      setOrderDetailsParent(orderDetails);
    }
  }, [orderDetails]);

  useEffect(() => {
    if (bidList) {
      setBidListParent(bidList);
    }
  }, [bidList]);

  useEffect(() => {
    setIsLoadingParent(isLoading);
  }, [isLoading]);

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    if (orderId) {
      getNftDetails(orderId, cancelTokenSource);
    } else {
      // setIsLoading(false);
    }
    return () => {
      cancelTokenSource.cancel();
    };
  }, [orderId, user.userData]);

  const getNftDetails = async (id, cancelTokenSource) => {
    setIsSubmit(false);
    try {
      const res = await axios.get(Apiconfig.viewPhysicalNFT + id, {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        setOrderDetails(res.data.result);
        setBidList(res.data.result.bidId.reverse());
        if (user.userData && res.data.result) {
          let likesUsers = res.data.result.likesUsers.filter(
            (order) => order === user.userData._id
          );
          setIsLike(likesUsers.length > 0);
        }
        setIsOrderExpired(
          parseFloat(res.data.result.endTime) < parseFloat(moment().unix())
        );
        const Contractsingle =
          res.data.result?.nftId?.physicalType === "SINGLE";
        const Contractmultiple =
          res.data.result?.nftId?.physicalType === "MULTIPLE";

        if (Contractsingle) {
          console.log("Contractsingle", Contractsingle);
          if (res.data.result?.collectionId?.contractAddress) {
            getOrderExtraDetailssingle(
              res.data.result?.collectionId?.contractAddress,
              res.data.result?.nftId?.tokenId,
              res.data.result?.network,
              res.data.result?.nftId?.isResale
            );
          }
        }
        if (Contractmultiple) {
          console.log("Contractmultiple", Contractmultiple);
          if (res.data.result?.collectionId?.contractAddress) {
            getOrderExtraDetailsmultiple(
              res.data.result?.collectionId?.contractAddress,
              res.data.result?.nftId?.tokenId,
              res.data.result?.network,
              res.data.result?.nftId?.isResale
            );
          }
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

  const getOrderExtraDetailssingle = async (
    contractAddress,
    tokenID,
    chianId,
    isResale
  ) => {
    const OpenMarketplace = !isResale
      ? getNetworkDetails(chianId)
      : getphysicalsingleMarketplaceAddress(chianId);
    const networkDetails = getNetworkDetails(chianId);
    setNetworkDetails(networkDetails);
    const contractObj = await getWeb3ContractObject(
      SingPhyNftTokenABI,
      contractAddress,
      networkDetails[0]?.rpcUrls
    );
    const contractObjNormal = await getWeb3ContractObject(
      SingPhyMarketABI,
      singlemarketplaceContract,
      networkDetails[0]?.rpcUrls
    );
    try {
      const ownerOf = await contractObj.methods.ownerOf(tokenID).call();
      setCurrentOwner(ownerOf);
    } catch (error) {
      console.log("ERROR", error);
    }
    try {
      if (isResale) {
        const ordersData = await contractObjNormal.methods
          .orderByAssetId(singleNftTokenAddress, tokenID)
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
      if (!isResale) {
        const bidByOrderId = await contractObjNormal.methods
          .bidByOrderId(contractAddress, tokenID)
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
  const getOrderExtraDetailsmultiple = async (
    contractAddress,
    tokenID,
    chianId,
    isResale
  ) => {
    const OpenMarketplace = !isResale
      ? getNetworkDetails(chianId)
      : getphyMultipleMarketplaceAddress(chianId);
    const networkDetails = getNetworkDetails(chianId);
    setNetworkDetails(networkDetails);
    const contractObj = await getWeb3ContractObject(
      MultiPhyNftTokenABI,
      contractAddress,
      networkDetails[0]?.rpcUrls
    );
    const contractObjNormal = await getWeb3ContractObject(
      MultiPhyMarketABI,
      multimarketplaceContract,
      networkDetails[0]?.rpcUrls
    );
    try {
      const ownerOf = await contractObj.methods.ownerOf(tokenID).call();
      setCurrentOwner(ownerOf);
    } catch (error) {
      console.log("ERROR", error);
    }
    try {
      if (isResale) {
        const ordersData = await contractObjNormal.methods
          .orderByAssetId(multiNftTokenAddress, tokenID)
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
      if (!isResale) {
        const bidByOrderId = await contractObjNormal.methods
          .bidByOrderId(contractAddress, tokenID)
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

  //Buyt NFT
  const buyOrderBlockchainHandler = async () => {
    if (orderDetails.network && chainId == orderDetails.network) {
      if (orderDetails?.nftId?.physicalType === "SINGLE") {
        console.log("data+++++++++++++++++++++++daata1");
        if (
          !isOrderExpired &&
          orderExtraDeails?.seller?.toLowerCase() !== deadAddress?.toLowerCase()
        ) {
          if (
            orderExtraDeails?.seller?.toLowerCase() !== account?.toLowerCase()
          ) {
            try {
              setIsUpdatingData(true);

              const contractObj = getContract(
                singlemarketplaceContract,
                SingPhyMarketABI,
                library,
                account
              );
              if (Number(orderDetails?.price) < Number(balanceValue)) {
                const safeExecute = await contractObj.safeExecuteOrder(
                  orderDetails?.brandId,
                  orderDetails?.collectionId?.contractAddress,
                  orderDetails.nftId.tokenId,
                  0,
                  {
                    value: ethers.utils.parseEther(
                      orderDetails.price.toString()
                    ),
                  }
                );
                await safeExecute.wait();
                await buyphysicalSingleOrderHandler(false);
              } else {
                toast.error("Your wallet balance is too low");
                setOpenPlaceBid(false);
              }
              setIsUpdatingData(false);
            } catch (error) {
              setIsUpdatingData(false);
              console.log(error);
              toast.error(error.message);
            }
          } else {
            toast.warn("Owner can't buy it");
            setIsUpdatingData(false);
          }
        } else {
          toast.error("Order expired");
          setIsUpdatingData(false);
        }
      } else {
        console.log("data+++++++++++++++++++++++");
        try {
          setIsUpdatingData(true);
          if (numberofCopies !== "" && isInvalidUrl === false) {
            // if (numberofCopies !== "0" && numberofCopies !== "1") {
            const contractObj = getContract(
              orderDetails?.nftId?.contractAddress,
              ConstructorMultiABI,
              library,
              account
            );
            console.log("contractObjy1212++++", contractObj);
            const totalSupply = await contractObj.totalSupply();
            console.log("totalSupply1212", totalSupply.toString());
            const totalSupplyConv = parseInt(totalSupply.toString());
            console.log("totalSupplyConv+++12", totalSupplyConv.toString());
            console.log("numberofCopiesnv+++12", numberofCopies);
            let price =
              orderDetails.price.toString() * numberofCopies.toString();
            const tx = await contractObj.mintNFT(numberofCopies, {
              value: ethers.utils.parseEther(price.toString()),
              from: account,
            });
            await tx.wait();
            console.log(tx);
            let tokenarray = [];
            console.log("1idatatokenarray", tokenarray);
            setTokenIdarray(tokenarray);
            for (
              var tokenid = Number(totalSupplyConv.toString());
              tokenid <
              Number(totalSupplyConv.toString()) + Number(numberofCopies);
              tokenid++
            ) {
              console.log("tokenarray21data -  ", tokenid);
              tokenarray.push(tokenid?.toString());
            }
            // if (Number(orderDetails?.price) < Number(balanceValue)) {
            // const safeExecute = await contractObj.mintNFT(numberofCopies);
            // await safeExecute.wait();
            console.log("tokenarray21data", tokenarray);
            await buyphysicalOrderHandler(tokenarray);
            // } else {
            //   toast.error("Your wallet balance is too low");
            //   setOpenPlaceBid(false);
            // }
            // } else {
            //   toast.warn("Please enter copies greater then 0 and 1");
            // }
          } else {
            toast.warn("Please enter valid no of copies");
          }
        } catch (error) {
          console.log(error);
          setIsUpdatingData(true);
        }

        setIsUpdatingData(false);
      }
    } else {
      swichNetworkHandler(orderDetails.network);
      toast.warn(
        "Please switch network to " + networkDetails?.nativeCurrency?.name
      );
    }
  };

  //For Physical NFT single
  const buyphysicalSingleOrderHandler = async (isAccept) => {
    try {
      try {
        if (orderDetails.nftId.tokenId !== false) {
          const res = await axios.post(
            Apiconfig.buyPhysicalNft,
            {
              orderId: orderDetails._id,
              collectionId: orderDetails.collectionId._id,
              description: orderDetails.description,
              royalties: orderDetails.royalties,
              currentOwner: user?.userData?._id,
              network: orderDetails.network,
              tokenId: orderDetails.nftId.tokenId,
              quantity: numberofCopies ? numberofCopies : "1",
              price: orderDetails?.nftId?.price,
            },
            {
              headers: {
                token: sessionStorage.getItem("token"),
              },
            }
          );
          getNftDetails(orderDetails._id);
          if (res.data.statusCode === 200) {
            if (isAccept) {
              // deleteOrderHandler();
            }
            toast.success(res.data.responseMessage);
            setOpenBuy(false);
            history.push("/profile");
          } else {
            toast.warn(res.data.responseMessage);
          }
        } else {
          toast.error("Something went wrong");
        }
        setIsUpdatingData(false);
      } catch (error) {
        setIsUpdatingData(false);
        toast.error(error.message);
      }

      setIsUpdatingData(false);
    } catch (error) {
      setIsUpdatingData(false);
      toast.error(error.message);
    }
  };
  //For Buy Physical NFT Multiple
  const buyphysicalOrderHandler = async (tokenarray) => {
    console.log("tokenIdarray+++12", tokenarray);
    try {
      if (orderDetails.nftId.tokenId !== false) {
        const res = await axios.post(
          Apiconfig.buyPhysicalOrderUpdated,
          {
            orderId: orderDetails._id,
            tokenArray: tokenarray,
            quantity: numberofCopies ? numberofCopies : "1",
          },
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        );
        getNftDetails(orderDetails._id);
        if (res.data.statusCode === 200) {
          setIsUpdatingData(true);
          toast.success(res.data.responseMessage);
          setOpenBuy(false);
          history.push("/profile");
        } else {
          toast.warn(res.data.responseMessage);
        }
      } else {
        toast.error("Something went wrong");
      }
      setIsUpdatingData(false);
    } catch (error) {
      setIsUpdatingData(false);
      toast.error(error.message);
    }
  };

  //Place BID
  const placeBidBlockchainHandler = async () => {
    if (orderDetails.network && chainId == orderDetails.network) {
      if (parseFloat(price) > 0) {
        if (moment(expiryDate).unix() > moment().unix()) {
          if (!isValidExpiry) {
            if (
              !isOrderExpired &&
              orderExtraDeails.seller.toLowerCase() !==
                deadAddress.toLowerCase()
            ) {
              if (
                orderExtraDeails.seller.toLowerCase() !== account.toLowerCase()
              ) {
                setIsSubmit(true);

                const checkPrice =
                  bidExtraDetails && bidList.length > 0
                    ? parseFloat(price) > parseFloat(bidList[0].price)
                    : true;
                if (checkPrice) {
                  try {
                    setIsUpdatingData(true);
                    if (orderDetails?.nftId?.physicalType === "SINGLE") {
                      const contractObj = getContract(
                        singlemarketplaceContract,
                        SingPhyMarketABI,
                        library,
                        account
                      );
                      console.log("+++++safeplacebid", contractObj);
                      if (Number(price) < Number(balanceValue)) {
                        const safePlaceBid = await contractObj.safePlaceBid(
                          // orderDetails?.collectionId?.brandId,
                          orderDetails?.collectionId?.contractAddress,
                          orderDetails.nftId.tokenId,
                          0,
                          moment(expiryDate).unix(),
                          { value: ethers.utils.parseEther(price.toString()) }
                        );

                        await safePlaceBid.wait();
                        createBidHanlder();
                      } else {
                        toast.error("Your wallet balance is too low");
                        // setOpenPlaceBid(false);
                        setIsUpdatingData(false);
                      }
                    } else {
                      const contractObj = getContract(
                        multimarketplaceContract,
                        MultiPhyMarketABI,
                        library,
                        account
                      );

                      if (Number(price) < Number(balanceValue)) {
                        const safePlaceBid = await contractObj.safePlaceBid(
                          orderDetails?.collectionId?.brandId,
                          orderDetails?.collectionId?.contractAddress,
                          orderDetails.nftId.tokenId,
                          0,
                          moment(expiryDate).unix(),
                          { value: ethers.utils.parseEther(price.toString()) }
                        );

                        await safePlaceBid.wait();
                        createBidHanlder();
                      } else {
                        toast.error("Your wallet balance is too low");
                        // setOpenPlaceBid(false);
                        setIsUpdatingData(false);
                      }
                    }
                  } catch (error) {
                    setIsUpdatingData(false);

                    console.log("ERROR", error);
                    toast.error(error.message);
                  }
                } else {
                  setIsUpdatingData(false);

                  toast.error(
                    "Bid amount should be greater then last bid amount"
                  );
                }
              } else {
                setIsUpdatingData(false);

                toast.warn("Owner can't place a bid");
              }
            } else {
              setIsUpdatingData(false);

              toast.warn("Order expired");
            }
          } else {
            toast.warn("Please place a bid before expire time.");
          }
        } else {
          toast.warn("Please fill the proper expiry date");
        }
      } else {
        setIsUpdatingData(false);

        toast.error("Please enter valid price");
      }
    } else {
      swichNetworkHandler(orderDetails.network);
      toast.warn(
        "Please switch network to " + networkDetails?.nativeCurrency?.name
      );
    }
  };
  const createBidHanlder = async () => {
    try {
      const res = await axios.post(
        Apiconfig.createBid,
        {
          orderId: orderDetails._id,
          bid: price.toString(),
          price: parseFloat(price),
          date: moment(expiryDate).unix().toString(),
        },
        {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        }
      );
      getNftDetails(orderDetails._id);
      if (res.data.statusCode === 200) {
        setIsUpdatingData(false);
        toast.success(res.data.responseMessage);
        setOpenPlaceBid(false);
      } else {
        toast.warn(res.data.responseMessage);
      }
    } catch (error) {
      setIsUpdatingData(false);

      toast.error(error.message);
    }
  };
  //Update Order
  const updateOrderBlockchainHandler = async () => {
    if (orderDetails.network && chainId == orderDetails.network) {
      if (
        !isOrderExpired &&
        orderExtraDeails.seller.toLowerCase() !== deadAddress.toLowerCase()
      ) {
        setIsSubmit(true);
        if (parseFloat(price) > 0) {
          const checkPrice =
            bidExtraDetails && bidList.length > 0
              ? parseFloat(price) > parseFloat(bidList[0].price)
              : true;
          if (checkPrice) {
            try {
              setIsUpdatingData(true);
              if (orderDetails?.nftId?.physicalType === "SINGLE") {
                const contractObj = getContract(
                  singlemarketplaceContract,
                  SingPhyMarketABI,
                  library,
                  account
                );
                // if (Number(price) < Number(balanceValue)) {
                const updateOrder = await contractObj.updateOrder(
                  orderDetails?.collectionId?.contractAddress,
                  orderDetails.nftId.tokenId,
                  ethers.utils.parseEther(price.toString()),
                  moment(expiryDate).unix()
                );
                await updateOrder.wait();
                UpdatePhysicalOrderHanlder();
                // } else {
                //   toast.error("Your wallet balance is too low");
                //   setOpenPlaceBid(false);
                //   setIsUpdatingData(false);
                // }
              } else {
                const contractObj = getContract(
                  multimarketplaceContract,
                  MultiPhyMarketABI,
                  library,
                  account
                );
                // if (Number(price) < Number(balanceValue)) {
                const updateOrder = await contractObj.updateOrder(
                  orderDetails?.collectionId?.contractAddress,
                  orderDetails.nftId.tokenId,
                  ethers.utils.parseEther(price.toString()),
                  moment(expiryDate).unix()
                );
                await updateOrder.wait();
                UpdatePhysicalOrderHanlder();
                // } else {
                //   toast.error("Your wallet balance is too low");
                //   setOpenPlaceBid(false);
                //   setIsUpdatingData(false);
                // }
              }
            } catch (error) {
              setIsUpdatingData(false);
              console.log("ERROR", error);
              toast.error(error.message);
            }
          } else {
            setIsUpdatingData(false);
            toast.error("Bid amount should be greater then last bid amount");
          }
        } else {
          setIsUpdatingData(false);
          toast.error("Please enter valid price");
        }
      } else {
        setIsUpdatingData(false);
        toast.warn("Order expired");
      }
    } else {
      swichNetworkHandler(orderDetails.network);
      toast.warn(
        "Please switch network to " + networkDetails?.nativeCurrency?.name
      );
    }
  };

  //Update Order Multiple price
  const UpdateNewPriceBlockchainHandler = async () => {
    if (orderDetails.network && chainId == orderDetails.network) {
      setIsSubmit(true);
      try {
        setIsUpdatingData(true);
        const contractObj = getContract(
          orderDetails?.nftId?.contractAddress,
          ConstructorMultiABI,
          library,
          account
        );
        // if (Number(price) < Number(balanceValue)) {

        const updateOrder = await contractObj.update_MINT_PRICE(
          ethers.utils.parseEther(numberofPrice.toString())
        );
        await updateOrder.wait();
        UpdateMultiPhysicalOrderHanlder();
        // } else {
        //   toast.error("Your wallet balance is too low");
        //   setOpenPlaceBid(false);
        //   setIsUpdatingData(false);
        // }
      } catch (error) {
        setIsUpdatingData(false);
        console.log("ERROR", error);
        toast.error(error.message);
      }
    } else {
      swichNetworkHandler(orderDetails.network);
      toast.warn(
        "Please switch network to " + networkDetails?.nativeCurrency?.name
      );
    }
  };
  //Physical NFT Multi update price
  const UpdateMultiPhysicalOrderHanlder = async () => {
    try {
      const res = await axios.post(
        Apiconfig.updatePriceOrquantity,
        {
          orderId: orderDetails?._id,
          price: parseFloat(numberofPrice).toString(),
        },
        {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        }
      );
      getNftDetails(orderDetails?._id);
      if (res.data.statusCode === 200) {
        setUpdateExpirydate(res.data.result);
        setIsUpdateprice(false);
        setIsUpdatingData(false);

        toast.success(res.data.responseMessage);
      } else {
        toast.warn(res.data.responseMessage);
        setIsUpdateprice(false);
        setIsUpdatingData(false);
      }
    } catch (error) {
      setIsUpdateprice(false);
      setIsUpdatingData(false);

      toast.error(error.message);
    }
  };
  //Physical NFT
  const UpdatePhysicalOrderHanlder = async () => {
    try {
      const res = await axios.put(
        Apiconfig.updatePhysicalNft,
        {
          _id: orderDetails?._id,
          collectionId: orderDetails.collectionId[0]?._id,
          startPrice: price.toString(),
          price: parseFloat(price).toString(),
          expiryTime: moment(expiryDate * 1000)
            .unix()
            .toString(),
        },
        {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        }
      );
      getNftDetails(orderDetails?._id);
      if (res.data.statusCode === 200) {
        setUpdateExpirydate(res.data.result);
        setIsUpdatingData(false);
        toast.success(res.data.responseMessage);
        setOpenPlaceBid(false);
      } else {
        toast.warn(res.data.responseMessage);
      }
    } catch (error) {
      setIsUpdatingData(false);

      toast.error(error.message);
    }
  };

  //Update Order Multiple quantity
  const UpdateNewQuantityBlockchainHandler = async () => {
    if (orderDetails.network && chainId == orderDetails.network) {
      setIsSubmit(true);

      try {
        setIsUpdatingData(true);
        const contractObj = getContract(
          orderDetails?.nftId?.contractAddress,
          ConstructorMultiABI,
          library,
          account
        );
        // if (Number(price) < Number(balanceValue)) {
        const updateOrder = await contractObj.add_NFT_SUPPLY(
          ethers.utils.parseEther(numberofQuantity.toString())
        );
        await updateOrder.wait();
        UpdateMultiPhysicalquantityHanlder();
        // } else {
        //   toast.error("Your wallet balance is too low");
        //   setOpenPlaceBid(false);
        //   setIsUpdatingData(false);
        // }
      } catch (error) {
        setIsUpdatingData(false);
        console.log("ERROR", error);
        toast.error(error.message);
      }
    } else {
      swichNetworkHandler(orderDetails.network);
      toast.warn(
        "Please switch network to " + networkDetails?.nativeCurrency?.name
      );
    }
  };

  //Physical NFT Multi update price
  const UpdateMultiPhysicalquantityHanlder = async () => {
    try {
      const res = await axios.post(
        Apiconfig.updatePriceOrquantity,
        {
          orderId: orderDetails?._id,
          quantity: numberofQuantity,
        },
        {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        }
      );
      getNftDetails(orderDetails?._id);
      if (res.data.statusCode === 200) {
        setUpdateExpirydate(res.data.result);
        setIsUpdateQuantity(false);
        setIsUpdatingData(false);

        toast.success(res.data.responseMessage);
      } else {
        toast.warn(res.data.responseMessage);
        setIsUpdateQuantity(false);
        setIsUpdatingData(false);
      }
    } catch (error) {
      setIsUpdateQuantity(false);
      setIsUpdatingData(false);

      toast.error(error.message);
    }
  };

  //Cancel Bid
  const cancelBidBlockchainhandler = async () => {
    if (chainId == orderDetails.network) {
      try {
        setCancelBidUpdating(true);

        if (orderDetails?.nftId?.physicalType === "SINGLE") {
          const singlemarketplaceContract = getphysicalsingleMarketplaceAddress(
            orderDetails.network
          );
          const contractObj = getContract(
            singlemarketplaceContract,
            SingPhyMarketABI,
            library,
            account
          );

          const res = await contractObj.cancelBid(
            orderDetails?.collectionId?.contractAddress,
            orderDetails.nftId.tokenId
          );
          await res.wait();
          getNftDetails(orderDetails._id);
          toast.success("Cancelled successfully");
          setCancelBidUpdating(false);
        } else {
          const multimarketplaceContract = getphyMultipleMarketplaceAddress(
            orderDetails.network
          );
          const contractObj = getContract(
            multimarketplaceContract,
            MultiPhyMarketABI,
            library,
            account
          );

          const res = await contractObj.cancelBid(
            orderDetails?.collectionId?.contractAddress,
            orderDetails.nftId.tokenId
          );
          await res.wait();
          getNftDetails(orderDetails._id);
          toast.success("Cancelled successfully");
          setCancelBidUpdating(false);
        }
      } catch (error) {
        setCancelBidUpdating(false);
        toast.error(error.message);
      }
    } else {
      swichNetworkHandler(orderDetails.network);
      toast.warn(
        "Please switch network to " + networkDetails.nativeCurrency.name
      );
    }
  };
  //AcceptBid
  const acceptBidBlockchainHandler = async () => {
    if (chainId == orderDetails.network) {
      if (
        bidList.length > 0 &&
        bidList[0].price &&
        bidExtraDetails &&
        bidExtraDetails.bidder.toLowerCase() !== deadAddress.toLowerCase()
      ) {
        setIsUpdatingAcceptBid(true);
        try {
          const singlemarketplaceContract = getphysicalsingleMarketplaceAddress(
            orderDetails.network
          );
          const contractObj = getContract(
            singlemarketplaceContract,
            MarketplaceABI,
            library,
            account
          );

          const res = await contractObj.acceptBid(
            orderDetails?.collectionId?.contractAddress,
            orderDetails.nftId.tokenId,
            ethers.utils.parseEther(bidList[0].price.toString())
          );
          await res.wait();
          acceptBidAPIHandler(false);
        } catch (error) {
          setIsUpdatingAcceptBid(false);
          toast.error(error.message);
        }
      } else {
        toast.warn("Bid not found");
      }
    } else {
      swichNetworkHandler(orderDetails.network);
      toast.warn(
        "Please switch network to " + networkDetails?.nativeCurrency?.name
      );
    }
  };
  const acceptBidAPIHandler = async (isAccept) => {
    try {
      if (orderDetails.nftId.tokenId !== false) {
        const res = await axios({
          method: "post",
          url: Apiconfig.sendOrderToUser,
          headers: {
            token: sessionStorage.getItem("token"),
          },
          data: {
            description: orderDetails.description,
            royalties: orderDetails.royalties,
            currentOwner: bidList[0].userId._id,
            collectionId: orderDetails.collectionId._id,
            orderId: orderDetails._id,
            userId: bidList[0].userId._id,
            network: orderDetails.network,
            tokenId: orderDetails.nftId.tokenId,
          },
        });
        // getNftDetails(orderDetails._id);
        if (res.data.statusCode === 200) {
          if (isAccept) {
            // deleteOrderHandler();
          }
          toast.success(res.data.responseMessage);
          history.push("/profile");
        } else {
          toast.warn(res.data.responseMessage);
        }
      } else {
        toast.error("Something went wrong");
      }
      setIsUpdatingAcceptBid(false);
    } catch (error) {
      setIsUpdatingAcceptBid(false);
      toast.error(error.message);
    }
  };
  //CancelOrder
  const cancelOrderHanlder = async () => {
    console.log("++++12+++++++++++++");

    if (chainId == orderDetails.network) {
      setIsCancelOrderUpdating(true);
      try {
        const singlemarketplaceContract = getphysicalsingleMarketplaceAddress(
          orderDetails.network
        );
        if (orderDetails?.nftId?.physicalType === "SINGLE") {
          const contractObj = getContract(
            singlemarketplaceContract,
            SingPhyMarketABI,
            library,
            account
          );

          const res = await contractObj.cancelOrder(
            orderDetails?.collectionId?.contractAddress,
            orderDetails.nftId?.tokenId
          );
          await res.wait();
          await cancelPhysicalOrderAPIHanlder();
        } else {
          const multimarketplaceContract = getphyMultipleMarketplaceAddress(
            orderDetails.network
          );
          const contractObj = getContract(
            multimarketplaceContract,
            MultiPhyMarketABI,
            library,
            account
          );
          const res = await contractObj.cancelOrder(
            orderDetails?.collectionId?.contractAddress,
            orderDetails.nftId?.tokenId
          );
          await res.wait();
          await cancelPhysicalOrderAPIHanlder();
        }
      } catch (error) {
        toast.error(error.message);
        setIsCancelOrderUpdating(false);
      }
    } else {
      swichNetworkHandler(orderDetails.network);
      toast.warn(
        "Please switch network to " + networkDetails?.nativeCurrency?.name
      );
    }
  };

  //Physical cancel orde
  const cancelPhysicalOrderAPIHanlder = async () => {
    try {
      const res = await axios.patch(
        Apiconfig.cancelPhysicalOrder,
        {
          _id: orderDetails._id,
        },
        {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        }
      );
      getNftDetails(orderDetails._id);
      if (res.data.statusCode === 200) {
        toast.success(res.data.responseMessage);
        history.push("/profile");
      } else {
        toast.warn(res.data.responseMessage);
      }
      setIsCancelOrderUpdating(false);
    } catch (error) {
      toast.error(error.message);
      setIsCancelOrderUpdating(false);
    }
  };

  const postReport = async () => {
    setIsSubmit(true);
    if (message !== "") {
      try {
        setIsUpdatingData(true);
        const res = await axios.post(
          Apiconfig.createOrderReports,
          {
            orderId: orderDetails._id,
            artist: orderDetails.currentOwner.displayName
              ? orderDetails.currentOwner.displayName
              : orderDetails.currentOwner.walletAddress,
            message,
          },
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        );
        setIsUpdatingData(false);

        if (res.data.statusCode === 200) {
          toast.success(res.data.responseMessage);
          setOpenReport(false);
        } else {
          toast.error(res.data.responseMessage);
        }
      } catch (error) {
        setIsUpdatingData(false);
        toast.error("Already Reported");
        console.log("ERROR", error);
      }
    }
  };

  useEffect(() => {
    if (account && orderDetails) {
      if (
        (orderDetails?.nftId?.itemCategory === "private documents" &&
          orderDetails?.nftId?.recipientWalletAddress?.toLowerCase() ===
            account?.toLowerCase()) ||
        orderDetails?.nftId.recipientBackupWalletAddress?.toLowerCase() ===
          account?.toLowerCase()
      ) {
        setIsPrivate(true);
      } else {
        setIsPrivate(false);
      }
    }
  }, [account, orderDetails]);

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
              <Box className={classes.banner}>
                <Box className={classes.posrel}>
                  <Box className={classes.playertype}>
                    <IconButton
                      style={{ color: "#000" }}
                      size="small"
                      className="m-l-10"
                      onClick={() => setOpenMenu(!openMenu)}
                      ref={moreRef}
                    >
                      <FiMoreHorizontal />
                    </IconButton>
                  </Box>
                  <Typography
                    variant="body2"
                    className={classes.nftname}
                    style={{
                      // overflow: "hidden",
                      // width: "91%",
                      // whiteSpace: " pre",
                      // textOverflow: "ellipsis",
                      lineBreak: "anywhere",
                      width: "91%",
                    }}
                  >
                    {orderDetails?.tokenName}
                  </Typography>
                  <Typography
                    style={{ lineBreak: "anywhere", paddingTop: "10px" }}
                  >
                    {" "}
                    {orderDetails?.description}
                  </Typography>

                  {/* <Typography variant="body2" component="label">
                    <span>Owned by :</span>{" "}
                    <span style={{ color: "#4ea6f5" }}>
                      {sortAddress(orderDetails?.currentOwner?.walletAddress)}{" "}
                      <CopyToClipboard
                        text={orderDetails?.currentOwner?.walletAddress}
                      >
                        <FaRegCopy
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => toast.info("Copied")}
                        />
                      </CopyToClipboard>
                    </span>
                  </Typography> */}
                </Box>

                <Box mt={2}>
                  <Grid container spacing={1}>
                    {orderDetails?.previousOwner.walletAddress.toLowerCase() !==
                      account?.toLowerCase() && (
                      <>
                        <>
                          {account && (
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                              <Button
                                variant="contained"
                                size="small"
                                color="primary"
                                fullWidth
                                disabled={orderDetails?.delivered === false}
                                onClick={() => {
                                  history.push({
                                    pathname: "/resalephysical-nft",
                                    search: orderDetails._id,
                                  });
                                }}
                              >
                                Resale NFT
                              </Button>
                            </Grid>
                          )}

                          {!account && (
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                              <Button
                                variant="contained"
                                size="small"
                                color="primary"
                                fullWidth
                                onClick={() =>
                                  user.connectWallet(SUPPORTED_WALLETS[0])
                                }
                              >
                                Connect Wallet
                              </Button>
                            </Grid>
                          )}
                        </>
                      </>
                    )}
                  </Grid>
                </Box>
                <Box mt={2}>
                  <Grid container spacing={0}>
                    <Grid lg={6} md={6} sm={6} xs={12}>
                      <Typography variant="body2">Creator</Typography>
                      <Box
                        style={{ cursor: "pointer" }}
                        className={classes.creColl}
                      >
                        <figure
                          className="profileImg"
                          style={{ marginRight: 10, marginTop: "5px" }}
                          onClick={() => {
                            history.push({
                              pathname: "/author",
                              search: orderDetails?.creatorId?._id,
                            });
                          }}
                        >
                          <img
                            src={
                              orderDetails?.creatorId?.profilePic
                                ? orderDetails?.creatorId?.profilePic
                                : "/images/Profile.png"
                            }
                            alt=""
                          />
                        </figure>
                        <Typography
                          variant="body2"
                          style={{
                            overflow: "hidden",
                            width: "91%",
                            whiteSpace: "pre",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {" "}
                          {orderDetails?.creatorId?.name
                            ? orderDetails?.creatorId?.name
                            : sortAddress(
                                orderDetails?.creatorId?.walletAddress
                              )}{" "}
                          <CopyToClipboard
                            text={orderDetails?.creatorId?.walletAddress}
                          >
                            <FaRegCopy
                              style={{
                                cursor: "pointer",
                              }}
                              onClick={() => toast.info("Copied")}
                            />
                          </CopyToClipboard>
                        </Typography>
                      </Box>
                    </Grid>
                    {orderDetails?.physicalType === "SINGLE" && (
                      <Grid lg={6} md={6} sm={6} xs={12}>
                        <Typography variant="body2">Brands</Typography>
                        <Box
                          style={{ cursor: "pointer" }}
                          className={classes.creColl}
                          onClick={() => {
                            history.push({
                              pathname: "/brandcollection-list",
                              search: orderDetails.collectionId?._id,
                              state: {
                                data: orderDetails.collectionId?.data,
                              },
                            });
                          }}
                        >
                          <figure
                            className="profileImg"
                            style={{ marginRight: 10, marginTop: "5px" }}
                          >
                            <img
                              src={
                                orderDetails?.brandId?.brandLogo &&
                                orderDetails?.brandId?.brandLogo
                                  ? orderDetails?.brandId?.brandLogo
                                  : "/images/Profile.png"
                              }
                              alt=""
                            />
                          </figure>
                          <Typography
                            variant="body2"
                            style={{
                              overflow: "hidden",
                              width: "91%",
                              whiteSpace: "pre",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {" "}
                            {orderDetails?.brandId?.brandName}
                          </Typography>
                        </Box>
                      </Grid>
                    )}
                    <Grid lg={6} md={6} sm={6} xs={12}>
                      {bidList && bidList?.length === 0 ? (
                        ""
                      ) : (
                        <Box
                          className={classes.creColl}
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            history.push({
                              pathname: "/author",
                              search: orderDetails?.bidId[0]?.userId?._id,
                            });
                          }}
                        >
                          <Typography
                            variant="body2"
                            style={{ marginLeft: "40px" }}
                          >
                            <span style={{ color: "#000" }}>
                              Highest bid by{" "}
                            </span>
                            {bidList[0]?.userId?.namee
                              ? bidList[0]?.userId?.namee
                              : sortAddress(bidList[0]?.userId?.walletAddress)}
                          </Typography>
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              {orderDetails?.physicalType === "SINGLE" && (
                <>
                  {orderDetails && orderDetails.isPlace && (
                    <Box style={{ marginTop: "5px" }}>
                      <Grid container spacing={0}>
                        {orderDetails?.nftId?.physicalType === "MULTIPLE" ? (
                          ""
                        ) : (
                          <Grid
                            lg={6}
                            md={6}
                            sm={6}
                            xs={12}
                            style={{ marginBottom: "16px" }}
                          >
                            <Box>
                              <Typography variant="subtitle2">
                                Minimum bid
                              </Typography>
                              <Typography variant="body2">
                                {bidList.length > 0
                                  ? bidList[bidList.length - 1]?.price
                                  : "--"}{" "}
                                QIE
                              </Typography>
                            </Box>
                          </Grid>
                        )}
                        {orderDetails &&
                        parseFloat(orderDetails.endTime) <
                          new Date().getTime() ? (
                          // parseFloat(moment().unix() * 1000))
                          <Box className={classes.auctionend}>
                            <Typography variant="subtitle2">Status</Typography>
                            <Typography variant="body2">
                              Order Expired
                            </Typography>
                          </Box>
                        ) : (
                          <>
                            {Physicaldataprofile === "profile" ? (
                              ""
                            ) : (
                              <>
                                <Grid lg={6} md={6} sm={6} xs={12} align="left">
                                  <Typography
                                    variant="h6"
                                    style={{ fontSize: "0.875rem" }}
                                  >
                                    Auction ends in
                                  </Typography>
                                  <ul
                                    className="MuiList"
                                    style={{ margin: "0px", padding: "0px" }}
                                  >
                                    <li className="MuiTypography-list">
                                      <Typography variant="body2">
                                        {timeLeft.days
                                          ? timeLeft.days && timeLeft.days
                                          : "0"}
                                      </Typography>
                                      <Typography variant="body2">
                                        Days
                                      </Typography>
                                    </li>
                                    <li className="MuiTypography-list">
                                      <Typography variant="body2">
                                        {timeLeft.hours
                                          ? timeLeft.hours && timeLeft.hours
                                          : "0"}
                                      </Typography>
                                      <Typography variant="body2">
                                        Hours
                                      </Typography>
                                    </li>
                                    <li className="MuiTypography-list">
                                      <Typography variant="body2">
                                        {" "}
                                        {timeLeft.minutes
                                          ? timeLeft.minutes && timeLeft.minutes
                                          : "0"}
                                      </Typography>
                                      <Typography variant="body2">
                                        Minutes
                                      </Typography>
                                    </li>
                                    <li className="MuiTypography-list">
                                      <Typography variant="body2">
                                        {" "}
                                        {timeLeft.seconds
                                          ? timeLeft.seconds && timeLeft.seconds
                                          : "0"}
                                      </Typography>
                                      <Typography variant="body2">
                                        Seconds
                                      </Typography>
                                    </li>
                                  </ul>
                                </Grid>
                              </>
                            )}
                          </>
                        )}
                      </Grid>
                    </Box>
                  )}
                </>
              )}

              <Box mt={2}>
                <Grid container spacing={0}>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Box className={classes.chain} mb={1}>
                      <Typography variant="h4">Chain info</Typography>
                    </Box>
                    <Box mb={2}>
                      <Grid container spacing={0}>
                        {orderDetails?.physicalType === "SINGLE" && (
                          <>
                            <Grid lg={6} md={6} sm={6} xs={6}>
                              <Typography variant="subtitle2">
                                Contract Address:
                              </Typography>
                            </Grid>
                            <Grid lg={6} md={6} sm={6} xs={6}>
                              <Typography variant="body2">
                                {orderDetails?.contractAddress
                                  ? sortAddress(orderDetails?.contractAddress)
                                  : "N/A"}{" "}
                                <CopyToClipboard
                                  text={orderDetails?.contractAddress}
                                >
                                  <FaRegCopy
                                    style={{
                                      cursor: "pointer",
                                    }}
                                    onClick={() => toast.info("Copied")}
                                  />
                                </CopyToClipboard>
                              </Typography>
                            </Grid>
                            <Grid lg={6} md={6} sm={6} xs={6}>
                              <Typography variant="subtitle2">
                                Token ID:
                              </Typography>
                            </Grid>
                            <Grid lg={6} md={6} sm={6} xs={6}>
                              <Typography variant="body2">
                                {orderDetails?.tokenId}
                              </Typography>
                            </Grid>
                            <Grid lg={6} md={6} sm={6} xs={6}>
                              <Typography variant="subtitle2">
                                Blockchain:
                              </Typography>
                            </Grid>
                            <Grid lg={6} md={6} sm={6} xs={6}>
                              <Typography variant="body2">
                                {" "}
                                qi-blockchain
                              </Typography>
                            </Grid>
                            <Grid lg={6} md={6} sm={6} xs={6}>
                              <Typography variant="subtitle2">
                                Price :
                              </Typography>
                            </Grid>
                            <Grid lg={6} md={6} sm={6} xs={6}>
                              <Typography variant="body2">
                                {orderDetails?.buyPrice
                                  ? orderDetails?.buyPrice
                                  : "N/A"}
                              </Typography>
                            </Grid>
                            <Grid lg={6} md={6} sm={6} xs={6}>
                              <Typography variant="subtitle2">
                                Sold to :
                              </Typography>
                            </Grid>
                            <Grid lg={6} md={6} sm={6} xs={6}>
                              <Typography variant="body2">
                                {orderDetails?.userId?.walletAddress
                                  ? sortAddress(
                                      orderDetails?.userId?.walletAddress
                                    )
                                  : "N/A"}{" "}
                                <CopyToClipboard
                                  text={orderDetails?.userId?.walletAddress}
                                >
                                  <FaRegCopy
                                    style={{
                                      cursor: "pointer",
                                    }}
                                    onClick={() => toast.info("Copied")}
                                  />
                                </CopyToClipboard>
                              </Typography>
                            </Grid>
                          </>
                        )}
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Box className={classes.chain} mb={1}>
                      <Typography variant="h4">QR Code</Typography>
                    </Box>
                    <Box
                      style={{
                        marginTop: "3px",
                        marginBottom: "10px",
                      }}
                    >
                      <Typography variant="body2">
                        Scan QR code and share your NFTs to others.
                      </Typography>
                    </Box>
                    <Box mb={2}>
                      {/* {account &&
                      orderDetails &&
                      orderDetails.saleType === "ONSALE" &&
                      orderExtraDeails &&
                      orderExtraDeails?.seller?.toLowerCase() ===
                        account?.toLowerCase() && ( */}
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <QRCodeSVG value={orderDetails?.barQRcodeLink} />
                      </Grid>
                      {/* )} */}
                    </Box>
                    {/* price */}
                  </Grid>
                </Grid>
              </Box>
            </>
          )}
        </>
      )}
    </>
  );
}

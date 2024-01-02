import {
  Box,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Typography,
  InputAdornment,
  InputBase,
  TextField,
  Grid,
  Button,
  MenuItem,
  FormControl,
  Select,
  FormHelperText,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import BlockIcon from "@material-ui/icons/Block";
import React, { useState, useEffect, useContext } from "react";
import { Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { useHistory } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
import axios from "axios";
import Apiconfig from "src/ApiConfig/ApiConfig";

import { Pagination } from "@material-ui/lab";
import DataLoading from "src/component/DataLoading";
import DataNotFound from "src/component/DataNotFound";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { UserContext } from "src/context/User";

import MarketplaceABI from "src/constants/ABI/MarketplaceABI.json";
import { getContract, sortAddress } from "src/utils";
import {
  contractKovan,
  marketplaceContract,
  NetworkContextName,
  ACTIVE_NETWORK,
  swichNetworkHandler,
} from "src/constants";
import {
  getMarketplaceContractAddress,
  getNetworkDetails,
  getNormalMarketplaceContractAddress,
  networkList,
  ACTIVE_NETWORK_BNB,
  ACTIVE_NETWORK_ETH,
} from "src/constants";
import ApiConfig from "src/ApiConfig/ApiConfig";

import { toast } from "react-toastify";
// import MarketPlaceABI from "src/constants/ABI/MarketPlaceABI.json";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
const useStyles = makeStyles((theme) => ({
  root2: {
    display: "flex",
    justifyContent: "space-between",
    "@media(max-width:420px)": {
      display: "block",
    },
  },
  heading: {
    "& h4": {
      fontSize: "25px",
      fontWeight: "700",
      color: "#35a5f5",
      [theme.breakpoints.down("xs")]: {
        fontSize: "23px",
      },
    },
  },
  tablesection: {
    "& td": {
      color: "#fff",
    },
  },
  colorbox: {
    // marginTop: "16px",
    // width: "100%",
    height: "auto",
    border: "1px solid #c9abe9",
    // background: "rgba(59, 13, 96, 0.4)",
    backdropFilter: "blur(44px)",
    borderRadius: "15px",
    padding: "20px",
  },
}));
const TableHeading = [
  {
    id: "Sr.No",
    label: "Sr.No",
    align: "left",
    minWidth: "25px",
    maxWidth: "70px",
  },
  { id: "name", label: "Name", align: "left", minWidth: "160px" },
  { id: "Gender", label: "Gender", align: "left", maxWidth: "160px" },
  {
    id: "Address",
    label: "Address",
    align: "left",
    minWidth: "160px",
  },
  {
    id: "Id Number",
    label: "Id Number",
    align: "left",
    minWidth: "130px",
  },

  {
    id: "kycStatus",
    label: "KYC Status",
    align: "left",
    minWidth: "160px",
  },
  { id: " Action", label: " Action", align: "left", minWidth: "160px" },
];

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}));
function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

export default function CreatorList() {
  const history = useHistory();
  const classes = useStyles();
  const { account, library, chainId } = useWeb3React();
  const user = useContext(UserContext);

  const [network, setNetwork] = useState({
    name: "select",
  });
  const [marketPlaceFee, setMarketPlaceFee] = useState("");
  const [collectionFee, setHotcollection] = useState("");
  const [currentFee, setCurrentFee] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [isLoading, setIsUpdating] = useState(false);
  const [isUpdatingMarketFee, setIsUpdatingMarketFee] = useState(false);

  const updateMarketPlaceFee = async () => {
    if (chainId == ACTIVE_NETWORK) {
      if (marketPlaceFee > "0") {
        setIsUpdatingMarketFee(true);
        try {
          const contractObj = getContract(
            marketplaceContract,
            MarketplaceABI,
            library,
            account
          );

          const setOwnerCutPerMillion = await contractObj.setOwnerCutPerMillion(
            parseFloat(marketPlaceFee) * 10000
          );

          await setOwnerCutPerMillion.wait();

          setIsUpdatingMarketFee(false);
          toast.success("Market fee has been updated successfully");
        } catch (error) {
          console.log(error);
          setIsUpdatingMarketFee(false);
          toast.error(error);
        }
      } else {
        toast.error("Please enter a valid amount");
        setIsUpdatingMarketFee(false);
      }
    } else {
      swichNetworkHandler();

      toast.warn("Please swich network to " + network.name);
    }
  };

  const addNetworkHandler = async () => {
    const NetworkDetails = getNetworkDetails(network.chainId);
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: NetworkDetails,
      });
    } catch (error) {
      console.log("ERROR", error);
      toast.warn(error.message);
    }
  };

  const handleFormSubmit = async () => {
    setIsUpdating(true);
    axios({
      method: "POST",
      url: Apiconfig.changeCollectionFee,
      // headers: {
      //   token: window.sessionStorage.getItem("token"),
      // },
      data: {
        collectionFee: collectionFee,
      },
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          toast.success(res.data.responseMessage);
          setIsUpdating(false);
          history.push("/");
        } else {
          toast.error(res.data.responseMessage);
          setIsUpdating(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsUpdating(false);
      });
  };

  const getHotcollectionData = async () => {
    const res = await axios({
      method: "GET",
      url: Apiconfig.getCollectionFee,
    }).then(async (res) => {
      if (res.data.statusCode === 200) {
        setCurrentFee(res.data.result[0]?.collectionFee);
      }
    });
  };

  useEffect(() => {
    getHotcollectionData();
  }, []);

  return (
    <Box>
      <Box className={classes.colorbox} mt={1}>
        <Grid container spacing={2}>
          <Grid item lg={6} sm={12} md={6} xs={12}>
            <Box className={classes.root2}>
              <Box className={classes.heading} pb={2}>
                <Typography variant="h4">Fee Management</Typography>
              </Box>
            </Box>
            <label>Marketplace Fee</label> &nbsp;&nbsp;
            <TextField
              variant="outlined"
              placeholder="Enter fee"
              style={{
                color: "#fff",
                marginRight: "10px",
                marginBottom: "10px",
              }}
              onChange={(e) => setMarketPlaceFee(e.target.value)}
              value={marketPlaceFee}
              type="number"
            />
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={updateMarketPlaceFee}
              disabled={
                marketPlaceFee === "" ||
                isUpdatingMarketFee ||
                user?.userData?.userType === "User"
              }
            >
              Submit {isUpdatingMarketFee && <ButtonCircularProgress />}
            </Button>
          </Grid>
          <Grid item lg={6} sm={12} md={6} xs={12}>
            <Box className={classes.root2}>
              <Box className={classes.heading} pb={2}>
                <Typography variant="h4">
                  Hot Collection Fee Management
                </Typography>
              </Box>
            </Box>
            <label>Hot Collection Fee</label> &nbsp;&nbsp;
            <FormControl multiline rows={4}>
              <TextField
                variant="outlined"
                placeholder="Enter qi fee"
                style={{
                  color: "#fff",
                  marginRight: "10px",
                  marginBottom: "5px",
                }}
                // onChange={(e) => {
                //   if (e.target.value <= 50) {
                //     setHotcollection(e.target.value);
                //   } else {
                //     toast.warn("max 50 QI");
                //   }
                // }}
                onChange={(e) => setHotcollection(e.target.value)}
                value={collectionFee}
                type="number"
              />
              <small
                style={{
                  color: "rgba(0, 0, 0, 0.75)",
                  fontSize: "12px",
                }}
              >
                Current collection fee {currentFee} QIE
              </small>
            </FormControl>
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={handleFormSubmit}
              disabled={
                collectionFee === "" ||
                isLoading ||
                user?.userData?.userType === "User"
              }
            >
              Submit {isLoading && <ButtonCircularProgress />}
            </Button>
            {/* <Typography style={{ fontSize: "13px" }}>
              Current collection fee {currentFee} QIE
            </Typography> */}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

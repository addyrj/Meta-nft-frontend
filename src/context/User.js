import React, { createContext, useEffect, useState } from "react";
import { injected } from "src/connectors";
import { useHistory } from "react-router-dom";
import Web3 from "web3";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  Box,
} from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import {
  contractKovan,
  NetworkContextName,
  NetworkDetails,
} from "src/constants";
import { ACTIVE_NETWORK, getNetworkDetails } from "src/constants";
import { SUPPORTED_WALLETS } from "src/connectors";
import GenerativeNFTABI from "src/constants/ABI/GenerativeNFTABI";
import Apiconfig from "src/ApiConfig/ApiConfig";
import axios from "axios";
import {
  getWeb3ContractObject,
  getWeb3Obj,
  getBalanceOf,
  getContract,
  // swichNetworkHandler,
} from "src/utils";
import { toast } from "react-toastify";
export const UserContext = createContext();

const setSession = (userAddress) => {
  if (userAddress) {
    sessionStorage.setItem("userAddress", userAddress);
  } else {
    sessionStorage.removeItem("userAddress");
  }
};
const setTokenSession = (token) => {
  if (token) {
    sessionStorage.setItem("token", token);
  } else {
    sessionStorage.removeItem("token");
  }
};
export default function AuthProvider(props) {
  const { activate, account, chainId, deactivate, library } = useWeb3React();
  const [collectionList, setCollectionList] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [nftPrice, setNftPrice] = useState(0);
  const [userData, setUserData] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const [totalSupply, setTotalSupply] = useState(0);
  const [successMSG, setSuccessMSG] = useState("");
  const [dashboarddata, setDashboarddata] = useState("");
  const [walletdata, setwalletData] = useState("");
  const [walletuserId, setwalletuserId] = useState("");
  const [generativeid, setGenerative] = useState("");
  const [generativeidc, setGenerativecon] = useState("");
  const [balanceOfValue, setBalanceOfValue] = useState(0);
  const [userNFtLoading, setUserNftLoading] = useState(false);
  const [userNFTList, setUserNFTList] = useState([]);
  const [ownerAccount, setOwnerAccount] = useState("");
  const [yourWalletBalance, setYourWalletBalance] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [walletError, setwalletError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [MAX_NFT_SUPPLY, setMAX_NFT_SUPPLY] = useState(0);
  const connectToWallet = (data) => {
    if (data) {
      const connector = data.data?.connector;
      window.sessionStorage.removeItem("walletName");
      window.sessionStorage.setItem("walletName", data.name);
      setErrorMsg("");
      setSuccessMSG("");
      if (connector && connector.walletConnectProvider?.wc?.uri) {
        connector.walletConnectProvider = undefined;
      }
      activate(connector, undefined, true).catch((error) => {
        if (error) {
          console.log("error", error.message);
          setwalletError(true);
          // toast.error(
          //   "Please add QIE chain network in your Metamask or switch to that network."
          // );
          setErrorMsg(error.message);
          activate(connector);
          setIsLoading(false);
          // setErrorPop(true);
        }
      });
    } else {
      setIsLoading(false);
    }
  };
  // const connectToWallet = () => {
  //   const connector = injected;
  //   console.log("-777777-");
  //   window.sessionStorage.removeItem("walletName");
  //   window.sessionStorage.setItem("walletName", "METAMASK");
  //   window.sessionStorage.setItem("isLogin", true);
  //   if (connector && connector.walletConnectProvider?.wc?.uri) {
  //     connector.walletConnectProvider = undefined;
  //   }
  //   activate(connector, undefined, true).catch((error) => {
  //     if (error) {
  //       console.log("error", error.message);
  //       // toast.error(error.message);
  //       // activate(connector);
  //     }
  //   });
  // };

  useEffect(() => {
    if (account && chainId) {
      if (chainId !== ACTIVE_NETWORK) {
        if (window.ethereum) {
          swichNetworkHandler();
        }
      }
    }
  }, [chainId, account]);

  const swichNetworkHandler = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x" + ACTIVE_NETWORK.toString(16) }],
      });
    } catch (error) {
      // toast.warn(error.message);
      if (error.code === 4902) {
        addNetworkHandler();
      }
    }
  };
  const addNetworkHandler = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: NetworkDetails,
      });
    } catch (error) {
      console.log("ERROR", error);
      // toast.warn(error.message);
    }
  };
  useEffect(() => {
    if (account) {
      connectWalletHandler(account);
    } else {
      setIsLogin(false);
      setUserData();
    }
  }, [account]);
  useEffect(() => {
    if (window.sessionStorage.getItem("walletName")) {
      const selectectWalletDetails = SUPPORTED_WALLETS.filter(
        (data) => data.name === window.sessionStorage.getItem("walletName")
      );
      connectToWallet(selectectWalletDetails[0]);
    } else {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    if (account) {
      getUserbalce();
    }
  }, [account, library]);

  const getUserbalce = async () => {
    var web3 = new Web3(library.provider);
    const balance = await web3.eth.getBalance(account);
    const balanceImETH = await web3.utils.fromWei(balance);
    setYourWalletBalance(parseFloat(balanceImETH).toFixed(2));
  };

  const connectWalletHandler = async (walletAddress) => {
    try {
      const res = await axios.post(Apiconfig.connectWallet, {
        walletAddress,
      });
      if (res.data.statusCode === 200) {
        getProfileHandler(res.data.result.token);
        setTokenSession(res.data.result.token);
        setwalletData(res.data.result.status);
        setwalletuserId(res.data.result.userId);
        window.localStorage.setItem("userAddresstoken", res.data.result.token);
        if (!window.sessionStorage.getItem("walletName")) {
          toast.success(res.data.responseMessage);
        }
      } else {
        deactivate();
        setIsLogin(false);
        setUserData();
        setIsLoading(false);
        toast.error(res.data.responseMessage);
      }
    } catch (error) {
      deactivate();
      setIsLogin(false);
      console.log("ERROR", error);
      setIsLoading(false);
    }
  };
  const getProfileHandler = async (token) => {
    try {
      const res = await axios.get(Apiconfig.profile, {
        headers: {
          token,
        },
      });
      if (res.data.statusCode === 200) {
        setUserData(res.data.result);

        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
      setTimeout(() => {
        setIsLoading(false);
      });
    } catch (error) {
      setIsLogin(false);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const userAddress = window.sessionStorage.getItem("userAddress");
    if (userAddress) {
      data.connectWallet();
    }
  }, []);

  useEffect(() => {
    data.updateUser(account);
  }, [account]);

  const getContractDetailsHandler = async () => {
    try {
      setIsLoadingData(true);
      const web3 = await getWeb3Obj();
      const contractObj = await getWeb3ContractObject(
        GenerativeNFTABI,
        contractKovan
      );

      const ownerfun = await contractObj.methods.owner().call();

      setOwnerAccount(ownerfun);

      setIsLoadingData(false);
    } catch (err) {
      console.log(err);
      setIsLoadingData(false);
    }
  };

  const getCurrentMintingDetails = async () => {
    const contractObj = await getWeb3ContractObject(
      GenerativeNFTABI,
      contractKovan
    );
    const MAX_NFT_SUPPLY = await contractObj.methods.MAX_NFT_SUPPLY().call();
    setMAX_NFT_SUPPLY(Number(MAX_NFT_SUPPLY));
    const totalSupply = await contractObj.methods.totalSupply().call();
    setTotalSupply(Number(totalSupply));
  };

  const userNFTListHadler = async (balanceOf) => {
    setUserNFTList([]);
    setUserNftLoading(true);
    const contract = getContract(
      contractKovan,
      GenerativeNFTABI,
      library,
      account
    );

    try {
      for (let i = 0; i < balanceOf; i++) {
        const id = await contract.tokenOfOwnerByIndex(account, i);
        const filter = await contract.tokenURI(id.toString());

        const res = await axios.get(filter);

        if (res.status === 200) {
          setUserNFTList((prev) => [
            ...prev,
            { id: id.toString(), nfdData: res.data },
          ]);
          setUserNftLoading(false);
        }
      }
    } catch (e) {
      console.log(e);
      setUserNftLoading(false);
    }
  };

  useEffect(() => {
    if (balanceOfValue > 0) {
      userNFTListHadler(balanceOfValue);
    }
  }, [balanceOfValue, account]);

  useEffect(() => {
    getContractDetailsHandler();
    getCurrentMintingDetails();
  }, []);

  const disconnectWallte = async () => {
    deactivate();
  };

  useEffect(() => {
    if (account) {
      getUserbalce();
    }
  }, [account, library]);

  const getCollectionList = async () => {
    try {
      const res = await axios.get(Apiconfig.myCollectionList, {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        if (res.data.result.docs) {
          setCollectionList(res.data.result.docs);
          const result = res.data.result.docs.filter(
            (data) => data?.displayName === "HovR Hooligans"
          );

          setGenerative(result[0]?._id);
          setGenerativecon(result[0]?.contractAddress);
        } else {
          setCollectionList(res.data.result.docs);
        }
      }
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  //Dashboard

  const getDashboardData = async () => {
    try {
      const res = await axios.get(Apiconfig.dashboardCount);
      if (res.data.statusCode === 200) {
        if (res.data.result) {
          setDashboarddata(res.data.result);
        } else {
          setDashboarddata(res.data.result.docs);
        }
      }
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  useEffect(() => {
    if (userData && userData._id) {
      getCollectionList();
      getDashboardData();
    }
  }, [userData]);

  let data = {
    updateUser: (account) => {
      setSession(account);
    },
    connectWallet: (data) => connectToWallet(data),
    getCollectionList: () => getCollectionList(),
    userData,
    isLogin,
    nftPrice,
    totalSupply,
    isLoading,
    balanceOfValue,
    MAX_NFT_SUPPLY,
    userNFTList,
    collectionList,
    generativeid,
    generativeidc,
    dashboarddata,
    walletdata,
    walletuserId,
    walletError,
    setwalletError,
    ownerAccount,
    getProfileHandler: (token) => getProfileHandler(token),
    dicconectWalletFun: () => {
      disconnectWallte();
      setIsLoading(false);
    },
    logoutHandler: () => {
      setIsLogin(false);
      setUserData();
      // setYourWalletBalance(0);
      deactivate();
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("walletName");
      window.localStorage.removeItem("userAddresstoken");
      window.location.href = "/";
    },
  };
  useEffect(() => {
    if (account) {
      getBalanceOfFun();
    }
  }, [account]);

  async function getBalanceOfFun() {
    setBalanceOfValue(
      await getBalanceOf(GenerativeNFTABI, contractKovan, account)
    );
  }

  return (
    <UserContext.Provider value={data}>{props.children}</UserContext.Provider>
  );
}

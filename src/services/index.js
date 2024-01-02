import ApiConfig from "src/ApiConfig/ApiConfig";
import axios from "axios";
import { getContract } from "src/utils";
import { ethers } from "ethers";
import moment from "moment";
import { toast } from "react-toastify";

import { deployData } from "src/constants";
// import DeployABI from "src/constants/ABI/DeployABI.json";
import NftTokenABI from "src/constants/ABI/NftTokenABI.json";
import DeployABI from "src/constants/ABI/DeployABI.json";

import Web3 from "web3";
import MarketplaceABI from "src/constants/ABI/MarketplaceABI.json";

import { contractKovan } from "src/constants/index";
const token = sessionStorage.getItem("token");
const web3 = (window.web3 = new Web3(window.ethereum));

var nfttokenContract = new web3.eth.Contract(DeployABI);

export const approveTokenHandler = async (
  tokenId,
  tokenAddress,
  abi,
  library,
  account,
  contractAddress
) => {
  try {
    const appContract = await getContract(tokenAddress, abi, library, account);

    const apr = await appContract.approve(contractAddress, tokenId);
    await apr.wait();
    return true;
  } catch (error) {
    alert(error.message);
    console.log("error", error);
    return false;
  }
};

export const getTokenId = async (contractAddress, abi, library, account) => {
  try {
    const tokenIDContract = await getContract(
      contractAddress,
      abi,
      library,
      account
    );

    const tokenID = await tokenIDContract.totalSupply();

    let token = parseInt(tokenID.toString()) - 1;

    return token;
  } catch (error) {
    console.log("errr", error);
    // return false;
  }
};

export const uploadNFTHandler = async (body, ipfsHash, apiEndPoint) => {
  const token = sessionStorage.getItem("token");

  try {
    const res = await axios.post(ApiConfig[apiEndPoint], body, {
      headers: {
        token,
      },
    });
    // const res = await axios({
    //   method: "POST",
    //   url: ApiConfig[apiEndPoint],
    //   headers: {
    //     token,
    //   },
    //   body,
    // });
    if (res.data.statusCode === 200) {
      return res.data.result;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error", error);
  }
};
export const uploadImageNFTHandler = async (body, ipfsHash, apiEndPoint) => {
  const token = sessionStorage.getItem("token");

  try {
    const res = await axios.post(ApiConfig[apiEndPoint], body, {
      headers: {
        token,
      },
    });
    // const res = await axios({
    //   method: "POST",
    //   url: ApiConfig[apiEndPoint],
    //   headers: {
    //     token,
    //   },
    //   body,
    // });
    if (res.data.statusCode === 200) {
      return res.data.result;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const createNFTBlockchainHanlder = async (
  contractAddress,
  abi,
  library,
  account,
  hash,
  name,
  royalties
) => {
  try {
    const contract = getContract(contractAddress, abi, library, account);

    const createRes = await contract.create(hash, name);

    await createRes.wait();
    return true;
  } catch (error) {
    console.log("ERROR", error);
    return false;
  }
};

export const createNFTHandler = async (
  body,
  tokenId,
  marketplaceContract,
  MarketplaceABI,
  library,
  account,
  cancelTokenSource
) => {
  try {
    const token = sessionStorage.getItem("token");

    // const addNftBody = new FormData();

    // addNftBody.append("currentOwnerId", body.currentOwner.toString());
    // addNftBody.append("collectionId", body.collectionId);
    // addNftBody.append("tokenId", tokenId);
    // addNftBody.append("tokenName", body.title);
    // addNftBody.append("uri", body.uri);
    // addNftBody.append("uri", body.uri);
    // addNftBody.append("description", body.description);
    // addNftBody.append(
    //   "mediaFile",
    //   body.coverFile ? body.coverFile : body.imgFile
    // );
    // addNftBody.append(
    //   "coverImage",
    //   body.coverFile ? body.coverFile : body.imgFile
    // );
    // addNftBody.append("itemCategory", body.categoryType);
    // addNftBody.append("royalties", body.royalties);
    // addNftBody.append("network", body.network.toString());
    // addNftBody.append("royalties", body.royalties);
    // addNftBody.append("mediaType", body.mediaType);
    // addNftBody.append(
    //   "recipientWalletAddress",
    //   body.recipientWalletAddress ? body.recipientWalletAddress : "String"
    // );
    // addNftBody.append(
    //   "recipientBackupWalletAddress",
    //   body.recipientBackupWalletAddress
    //     ? body.recipientBackupWalletAddress
    //     : "String"
    // );

    const addNftBody = {
      currentOwnerId: body.currentOwner.toString(),
      collectionId: body.collectionId,
      tokenId: tokenId.toString(),
      tokenName: body.title,
      uri: body.uri,
      description: body.description,
      coverImage: body.coverFile ? body.coverFile : body.imgFile,
      mediaFile: body.imgFile,
      itemCategory: body.categoryType,
      royalties: body.royalties,
      network: body.network.toString(),
      mediaType: body.mediaType,
      recipientWalletAddress: body.recipientWalletAddress
        ? body.recipientWalletAddress
        : "String",
      recipientBackupWalletAddress: body.recipientBackupWalletAddress
        ? body.recipientBackupWalletAddress
        : "String",
    };

    const res = await axios.post(
      ApiConfig["createNFT"],
      addNftBody,

      {
        // cancelToken: cancelTokenSource.token,
        headers: {
          token,
        },
      }
    );

    return res;
    if (res.data.statusCode === 200) {
    } else {
      return false;
    }
  } catch (error) {
    return false;
    console.log("error", error);
  }
};

export const placeOrderBlockchainHandler = async (
  address,
  abi,
  library,
  account,
  body,
  tokenId,
  nftId
) => {
  try {
    if (
      await approveTokenHandler(
        tokenId,
        body.contractAddress,
        library,
        account,
        address
      )
    ) {
      const contrsct = await getContract(address, abi, library, account);

      let price =
        body.price !== "" && parseFloat(body.price) > 0
          ? ethers.utils.parseEther(body.price.toString())
          : 0;
      let startPrice =
        body.startPrice !== "" && parseFloat(body.startPrice) > 0
          ? ethers.utils.parseEther(body.startPrice.toString())
          : 0;

      const createOrderRes = await contrsct.createOffer(
        body.contractAddress,
        tokenId,
        body.isDirectSale,
        body.isAuction,
        price,
        startPrice,
        body.startDate,
        body.endTime - body.startDate,
        {
          from: account,
        }
      );
      await createOrderRes.wait();

      return true;
    }
  } catch (error) {
    alert(error.message);

    return false;

    console.log("error", error);
  }
};

export const placeOrderAPIHandler = async (
  allData,
  nftId,
  account,
  advanceSettings
) => {
  try {
    const token = sessionStorage.getItem("token");

    let body = {
      nftId: nftId,
      title: allData.title,
      details: allData.description,
      time: allData.startDate.toString(),
      startingBid: allData.startPrice.toString(),
      tokenName: allData.title,
      description: allData.description,
      royalties: allData.royalties,
      startPrice: allData.startPrice.toString(),
      price: allData.price.toString(),
      coupounAddress: allData.couponAddress,
      startTime: allData.startDate.toString(),
      endTime: allData.endTime.toString(),
      expiryTime: allData.endTime.toString(),
      // endTime: allData.endTime.toISOString(),
      // expiryTime: allData.endTime.toISOString(),
      network: allData.network.toString(),
      // currentOwner: account,
      // network: allData.network,
      currentOwner: allData.currentOwner,
    };

    const res = await axios({
      method: "post",
      url: ApiConfig["createOrder"],
      data: body,
      headers: {
        token,
      },
    });
    return res;
  } catch (error) {
    return false;
    console.log("error", error);
  }
};

// export const uploadContractHandler = async (
//   name,
//   symbol,
//   baseURI,
//   collectionImage,
//   account,
//   cb
// ) => {
//   const token = sessionStorage.getItem("token");

//   await nfttokenContract
//     .deploy({
//       data: deployData,
//       arguments: [name, symbol, baseURI],
//     })
//     .send(
//       {
//         from: account,
//         gas: "5000000",
//       },
//       function (e, contract) {
//         console.log("------", e, contract);
//         if (
//           contract &&
//           contract.address &&
//           typeof contract.address !== "undefined"
//         ) {
//           console.log(
//             "Contract mined! address: " +
//               contract.address +
//               " transactionHash: " +
//               contract.transactionHash
//           );
//         }
//       }
//     )
//     .on("error", function (error) {
//       console.log("ERROR", error);
//       toast.error(error.message);

//       return false;
//     })
//     .on("transactionHash", function (transactionHash) {
//       console.log("transactionHash", transactionHash);
//     })
//     .on("receipt", async function (receipt) {
//       console.log(receipt.contractAddress);

//       cb(receipt.contractAddress);
//     })
//     .catch((error) => {
//       console.log("ERROR", error);
//       toast.error(error.message);

//       return false;
//     });
// };

export const uploadContractHandler = async (
  name,
  symbol,
  baseURI,
  collectionImage,
  account,
  cb
) => {
  const token = sessionStorage.getItem("token");

  await nfttokenContract
    .deploy({
      data: deployData,
      arguments: [name, symbol, baseURI],
    })
    .send(
      {
        from: account,
      },
      function (e, contract) {
        if (
          contract &&
          contract.address &&
          typeof contract.address !== "undefined"
        ) {
          console.log(
            "Contract mined! address: " +
              contract.address +
              " transactionHash: " +
              contract.transactionHash
          );
        }
      }
    )
    .on("error", function (error) {
      console.log("ERROR", error);
      toast.error(error.message);

      return false;
    })
    .on("transactionHash", function (transactionHash) {
      console.log("transactionHash", transactionHash);
    })
    .on("receipt", async function (receipt) {
      console.log(receipt.contractAddress);

      cb(receipt.contractAddress);
    })
    .catch((error) => {
      console.log("ERROR", error);
      toast.error(error.message);

      return false;
    });
};

export const createCollectionAPIHanlder = async (
  contractAddress,
  displayName,
  symbol,
  description,
  isPromoted,
  collectionImage,
  bannerImage,
  res,
  shortURL,
  apiEndPoint
) => {
  try {
    const token = sessionStorage.getItem("token");

    const formData = new FormData();
    formData.append("contractAddress", contractAddress);
    formData.append("displayName", displayName);
    formData.append("symbol", symbol);
    formData.append("description", description);
    formData.append("isPromoted", isPromoted);
    formData.append("collectionImage", collectionImage);
    formData.append("bannerImage", bannerImage);

    // formData.append("shortURL", shortURL);

    const res = await axios({
      method: "post",
      url: ApiConfig[apiEndPoint],
      data: formData,
      headers: {
        token,
      },
    });
    return res;
  } catch (error) {
    console.log("err", error);
    return false;
  }
};
// export const uploadContractHandler = async (
//   name,
//   symbol,
//   baseURI,
//   collectionImage,
//   account,
//   cb
// ) => {
//   const token = sessionStorage.getItem("token");

//   await nfttokenContract
//     .deploy({
//       data: deployData,
//       arguments: [name, symbol, baseURI],
//     })
//     .send(
//       {
//         from: account,
//         gas: "5000000",
//       },
//       function (e, contract) {
//         console.log("------", e, contract);
//         if (
//           contract &&
//           contract.address &&
//           typeof contract.address !== "undefined"
//         ) {
//           console.log(
//             "Contract mined! address: " +
//               contract.address +
//               " transactionHash: " +
//               contract.transactionHash
//           );
//         }
//       }
//     )
//     .on("error", function (error) {
//       console.log("ERROR", error);
//       toast.error(error.message);

//       return false;
//     })
//     .on("transactionHash", function (transactionHash) {
//       console.log("transactionHash", transactionHash);
//     })
//     .on("receipt", async function (receipt) {
//       console.log(receipt.contractAddress);

//       cb(receipt.contractAddress);
//     })
//     .catch((error) => {
//       console.log("ERROR", error);
//       toast.error(error.message);

//       return false;
//     });
// };

export const addImageHandler = (img) => {
  const token = sessionStorage.getItem("token");

  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", img);
    axios({
      method: "POST",
      url: ApiConfig.ipfsUpload,
      data: formData,
      headers: {
        token,
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res.data.statusCode === 200) {
          resolve(res.data.result.imageUrl);
        } else {
          reject(false);
        }
      })
      .catch((err) => {
        console.log("err", err);
        reject(false);
      });
  });
};

export const uploadImageHandler = (img) => {
  const token = sessionStorage.getItem("token");

  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", img);
    axios({
      method: "POST",
      url: ApiConfig.uploadImage,
      data: formData,
      headers: {
        token,
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res.data.statusCode === 200) {
          resolve(res.data.result);
        } else {
          reject(false);
        }
      })
      .catch((err) => {
        console.log("err", err);
        reject(false);
      });
  });
};

export const getDateDiff = (endDate, startDate = new Date()) => {
  var delta = Math.abs(endDate - startDate) / 1000;

  // calculate (and subtract) whole days
  var days = Math.floor(delta / 86400);
  delta -= days * 86400;

  // calculate (and subtract) whole hours
  var hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  // calculate (and subtract) whole minutes
  var minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  // what's left is seconds
  var seconds = parseInt(delta % 60); // in theory the modulus is not required

  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };

  // days > 0
  //   ? `+ ${days} days ${hours}h ${minutes}m ${seconds}s`
  //   : hours > 0
  //   ? `${hours}h ${minutes}m ${seconds}s`
  //   : `${minutes}m ${seconds}s`;
};

export const getBase64 = (file, cb) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (err) {
    console.log("Error: ", err);
  };
};

export function isValidEmail(value) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape
  return re.test(String(value).toLowerCase());
}

export function isUrlValid(userInput) {
  var res = userInput.match(
    /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
  );
  if (res == null) return false;
  else return true;
}

export function isUrlValidTelegram(userInput) {
  var res = userInput.match(
    /https?:\/\/(t(elegram)?\.me|telegram\.org)\/([A-Za-z0-9\_]{5,32})\/?/g // eslint-disable-line no-useless-escape
  );
  if (res == null) return false;
  else return true;
}
export const calculateTimeLeft = (endDate) => {
  if (endDate) {
    let difference = +new Date(endDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  } else {
    return false;
  }
};
export const placeNormalOrderBlockchainHandler = async (
  contractAddress,
  abi,
  library,
  account,
  address,
  tokenId,
  price,
  _royality,
  expiryDate,
  currency
) => {
  try {
    const contrsct = getContract(contractAddress, abi, library, account);

    const pricenumber = ethers.utils.parseEther(price?.toString())?.toString();

    const createOrderRes = await contrsct.createOrder(
      address,
      tokenId?.toString(),
      pricenumber,
      _royality,
      moment(expiryDate).unix(),
      currency
    );
    await createOrderRes.wait();
    console.log("createOrderRes", createOrderRes);

    return true;
  } catch (error) {
    console.log("error", error);
    return false;
  }
};

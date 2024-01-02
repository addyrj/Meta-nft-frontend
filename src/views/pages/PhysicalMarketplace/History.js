import { Box, makeStyles, Typography, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { sortAddress } from "src/utils";
import moment from "moment";
import DataNotFound from "src/component/DataNotFound";
import DataLoading from "src/component/DataLoading";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import CopyToClipboard from "react-copy-to-clipboard";
import ApiConfig from "src/ApiConfig/ApiConfig";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: { paddingBottom: "120px" },
  nftcard: {
    background: "#FFFFFF",
    backdropFilter: "blur(44px)",
    borderRadius: "40px",
    padding: "10px",
  },
  nftImg: {
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "10px",
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
  tabBtn: {
    margin: "20px 0px 10px 0px",
    backgroundColor: "#FCF2FA",
    borderRadius: "22px",
    padding: "14px",
    "& button": { borderRadius: "15px" },
  },
  bidsDetails: {
    background: "#FFFFFF",
    backdropFilter: "blur(44px)",
    border: "0.5px solid #D3D3D3",
    boxSizing: "border-box",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0px 0px 10px 0px",
    padding: "5px",
  },
  profileimg: {
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "10px",
      overflow: "hidden",
      margin: 0,
      marginRight: "20px",
      width: "60px",
    },
    "& img": {
      cursor: "pointer",
      maxHeight: "100%",
      maxWidth: "100%",
      height: "auto",
      width: "auto",
      display: "block",
    },
  },
  price1: {
    "& h2": {
      fontWeight: "bold",
      color: "#fff",
      [theme.breakpoints.down("sm")]: {
        fontSize: "20px",
      },
    },
    "& p": {
      fontStyle: "normal",
      color: "#fff",
      [theme.breakpoints.down("sm")]: {
        fontSize: "14px",
      },
      "& a": {
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "14px",
        lineHeight: "130%",
        color: "#4ea6f5",
        [theme.breakpoints.down("sm")]: {
          fontSize: "12px",
        },
      },
    },
  },
  ellips: {
    color: "#50c0f2",
    whiteSpace: "pre",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "250px",
    fontSize: "13px",
    "@media(max-width:520px)": {
      width: "100px",
    },
  },
  time: {
    paddingRight: "25px",
    [theme.breakpoints.down("sm")]: {
      paddingRight: "7px",
    },
    "& p": {
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#727486",
      [theme.breakpoints.down("sm")]: {
        fontSize: "10px",
      },
    },
  },
}));

export default function Bids({ orderDetails }) {
  const classes = useStyles();
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState();
  const [historyList, setHistoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const showNftHistoryhandler = async (_id, cancelTokenSource) => {
    try {
      const res = await axios.get(ApiConfig.showNftHistory, {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
        params: {
          _id,
          page,
          limit: 5,
        },
      });
      if (res.data.statusCode === 200) {
        setHistoryList(res.data.result.docs);

        setNoOfPages(res.data.result.pages);
      } else {
        // setHistoryList(setHistoryListsetHistoryList);

        setNoOfPages(res.data.result.pages);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("ERROR", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (orderDetails?.nftId?._id) {
      showNftHistoryhandler(orderDetails.nftId._id);
    }
  }, [orderDetails, page]);
  return (
    <Box>
      {/* {historyList && historyList.length === 0 && <ButtonCircularProgress />} */}
      {isLoading ? (
        <DataLoading />
      ) : (
        <Box>
          {historyList && historyList.length === 0 && <DataNotFound />}
          {historyList &&
            historyList?.map((data, index) => {
              return (
                <Box className={classes.bidsDetails}>
                  <Box style={{ alignItems: "center", display: "flex" }}>
                    <Box className={classes.profileimg}>
                      <figure>
                        <img
                          src={
                            data?.userId?.profilePic
                              ? data?.userId?.profilePic
                              : "/images/Profile.png"
                          }
                          alt=""
                          onClick={() => {
                            history.push({
                              pathname: "/author",
                              search: orderDetails.currentOwner._id,
                            });
                          }}
                        />
                      </figure>
                    </Box>

                    <Box
                      className={classes.price1}
                      style={{ lineHeight: 1.235 }}
                    >
                      <Typography variant="body2">
                        {data.type === "CREATE_COLLECTION" ? (
                          <>{`${data.collectionId.displayName.slice(
                            0,
                            20
                          )}...`}</>
                        ) : (
                          <>{`${data?.nftId?.tokenName?.slice(0, 20)}...`}</>
                        )}
                      </Typography>
                      <Typography variant="subtitle2">
                        {data.type === "ORDER_CREATE"
                          ? "List by"
                          : data.type === "LIKE" || data.type === "DISLIKE"
                          ? data.type.toLowerCase() + "d by"
                          : data.type === "NFT_CREATE"
                          ? "created this NFT"
                          : data.type === "SEND_NFT" ||
                            data.type === "SEND_ORDER" ||
                            data.type === "ORDER_SELL"
                          ? "bought by"
                          : data.type === "BID_CREATE"
                          ? `palced a bid by`
                          : data.type === "CREATE_COLLECTION"
                          ? "added collection"
                          : ""}
                      </Typography>
                      <Typography variant="h6" className={classes.ellips}>
                        {" "}
                        {data?.userId?.name
                          ? data?.userId?.name.toUpperCase()
                          : sortAddress(data?.userId?.walletAddress)}{" "}
                        &nbsp;
                        <CopyToClipboard text={data?.userId?.walletAddress}>
                          <FaRegCopy
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() => toast.info("Copied")}
                          />
                        </CopyToClipboard>
                      </Typography>
                    </Box>
                  </Box>
                  <Box cclassName={classes.time}>
                    <Typography
                      variant="body2"
                      style={{ fontSize: "12px", fontStyle: "normal" }}
                    >
                      {moment(data?.updatedAt).format("ll")}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{ fontSize: "12px", fontStyle: "normal" }}
                    >
                      {moment(data?.updatedAt).format("hh:mm A")}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          {noOfPages && noOfPages > 1 && (
            <Box display="flex" justifyContent="space-evenly">
              <Button
                disabled={parseInt(page) === 1}
                onClick={() => {
                  if (page > 1) {
                    setPage(parseInt(page) - 1);
                  }
                }}
              >
                Prev
              </Button>{" "}
              <Button
                disabled={page >= noOfPages}
                onClick={() => {
                  if (page <= noOfPages) {
                    setPage(parseInt(page) + 1);
                  }
                }}
              >
                Next
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

import { Box, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  heading: {
    "& h3": {
      color: theme.palette.secondary.main,
      fontSize: "40px",
      fontWeight: "700",
      [theme.breakpoints.down("xs")]: {
        fontSize: "23px",
      },
    },
  },
  nftimg: {
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "50px",
      width: "50px",
      backgroundColor: "#fafefd",
      overflow: "hidden",
      borderRadius: "10px",
      margin: "0",
      "& img": {
        maxHeight: "100%",
        maxWidth: "100%",
        height: "auto",
        width: "100%",
        display: "block",
      },
    },
  },
  colorbox: {
    display: "flex",
    alignItems: "center",
    // marginTop: "16px",
    height: "auto",
    borderRadius: "10px",
    padding: "10px",
    background: "#FFFFFF",
    boxShadow: " rgb(99 99 99 / 20%) 0px 2px 8px 0px",
  },
  // flexbox:{

  // },
  textbox: {
    "& h3": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "0.875rem",
      lineHeight: "13px",
      color: "#35a5f5",
    },
    "& h4": {
      marginTop: "3px",
      fontStyle: "normal",
      color: "#454545",
      fontWeight: "500",
      fontSize: "12px",
      lineHeight: "13px",
    },
    "& h5": {
      marginTop: "3px",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "11px",
      lineHeight: "13px",
      color: "#828282",
    },
  },
  pretext: {
    fontSize: "12px",
    fontStyle: " normal",
    width: "38%",
    overflow: "hidden",
    whiteSpace: "pre",
    textOverflow: "ellipsis",
    "@media(max-width:935px)": {
      width: "100%",
    },
  },
  // orer: {
  //   paddingTop: "20px",
  // },
}));

export default function MyActivity(props) {
  const classes = useStyles();
  const { type, data, activityNFTList } = props;
  const history = useHistory();
  return (
    <>
      {activityNFTList &&
        activityNFTList.map((data, index) => {
          return (
            <Grid item xs={12} md={6} sm={12} lg={6} className={classes.orer}>
              <Box className={classes.colorbox}>
                {/* <Box className={classes.nftimg}>
                <figure>
                  <img src={data?.userId?.profilePic} alt="" />
                </figure>
              </Box> */}
                <Box className={classes.nftimg} style={{ cursor: "pointer" }}>
                  {data?.type === "BID_CREATE" && (
                    <figure>
                      <img
                        src={data?.nftId?.coverImage}
                        alt=""
                        onClick={() => {
                          history.push({
                            pathname: "/marketplace-Detail",
                            search: data?.orderId?._id,
                          });
                        }}
                      />
                    </figure>
                  )}
                  {data?.type === "FOLLOW" && (
                    <figure>
                      <img
                        src={data?.userId?.profilePic}
                        alt=""
                        onClick={() => {
                          history.push({
                            pathname: "/author",
                            search: data?.followerId?._id,
                          });
                        }}
                      />
                    </figure>
                  )}
                  {data?.type === "ORDER_SELL" && (
                    <figure>
                      <img
                        src={data?.nftId?.coverImage}
                        alt=""
                        onClick={() => {
                          history.push({
                            pathname: "/marketplace-Detail",
                            search: data?.orderId?._id,
                          });
                        }}
                      />
                    </figure>
                  )}
                  {data?.type === "LIKE" && (
                    <figure>
                      <img
                        src={data?.nftId?.coverImage}
                        alt=""
                        onClick={() => {
                          history.push({
                            pathname: "/marketplace-Detail",
                            search: data?.orderId?._id,
                          });
                        }}
                      />
                    </figure>
                  )}
                  {data?.type === "DISLIKE" && (
                    <figure>
                      <img
                        src={data?.nftId?.coverImage}
                        alt=""
                        onClick={() => {
                          history.push({
                            pathname: "/marketplace-Detail",
                            search: data?.orderId?._id,
                          });
                        }}
                      />
                    </figure>
                  )}
                  {/* {data?.type === "CREATE_COLLECTION" && (
                  <figure>
                    <img
                      src={data?.collectionId?.collectionImage}
                      alt=""
                      onClick={() => {
                        history.push({
                          pathname: "/nft",
                          search: data?.orderId?._id,
                        });
                      }}
                    />
                  </figure>
                )} */}
                  {data?.type === "ORDER_CREATE" && (
                    <figure>
                      <img
                        src={data?.nftId?.coverImage}
                        alt=""
                        onClick={() => {
                          history.push({
                            pathname: "/marketplace-Detail",
                            search: data?.orderId?._id,
                          });
                        }}
                      />
                    </figure>
                  )}
                  {data?.type === "NFT_CREATE" && (
                    <figure>
                      <img
                        src={data?.nftId?.coverImage}
                        alt=""
                        onClick={() => {
                          history.push({
                            pathname: "/profile",
                            search: data?._id,
                          });
                        }}
                      />
                    </figure>
                  )}
                  {data?.type === "CREATE_COLLECTION" && (
                    <figure>
                      <img
                        src={data?.collectionId?.collectionImage}
                        alt=""
                        onClick={() => {
                          history.push({
                            pathname: "/nft-collection",
                            search: data?.collectionId?._id,
                          });
                        }}
                      />
                    </figure>
                  )}
                  {data?.type === "UNFOLLOW" && (
                    <figure>
                      <img
                        src={data?.userId?.profilePic}
                        alt=""
                        onClick={() => {
                          history.push({
                            pathname: "/author",
                            search: data?.followerId?._id,
                          });
                        }}
                      />
                    </figure>
                  )}
                  {/* <figure>
                  <img src={data?.userId?.profilePic} alt="" />
                </figure> */}
                </Box>
                <Box className={classes.textbox} ml={2}>
                  <Typography variant="h3" className={classes.pretext}>
                    {data?.nftId?.tokenName}
                  </Typography>
                  <Typography variant="h4">
                    {data?.type} by {data?.userId?.name}
                  </Typography>
                  <Typography
                    style={{ fontSize: "12px", fontStyle: " normal" }}
                  >
                    {moment(data?.updatedAt).format("LLL")}
                  </Typography>
                  {/* <Typography variant="h4">
                  {data?.orderId?.collectionId}
                </Typography>
                <Typography variant="h5">{data?.orderId?.updatedAt}</Typography> */}
                </Box>
              </Box>
            </Grid>
          );
        })}
    </>
  );
}

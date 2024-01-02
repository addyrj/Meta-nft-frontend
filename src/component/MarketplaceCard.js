import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  makeStyles,
  Paper,
  Typography,
  Box,
  Button,
  IconButton,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import {
  FaFacebookF,
  FaInstagramSquare,
  FaTelegramPlane,
  FaTwitter,
} from "react-icons/fa";
import { MdCancel, MdEmail } from "react-icons/md";
import GavelIcon from "@material-ui/icons/Gavel";
import { GiCancel } from "react-icons/gi";
import ShareSocialMedia from "src/component/ShareSocialMedia";
import GradeIcon from "@material-ui/icons/Grade";
import ShareIcon from "@material-ui/icons/Share";
import { toast } from "react-toastify";
import { UserContext } from "src/context/User";
import Apiconfig from "src/ApiConfig/ApiConfig";
import axios from "axios";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import AudiotrackIcon from "@material-ui/icons/Audiotrack";
const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    margin: "0 5px",
    background:
      "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
    border: "1px solid #A8CEDF",
    backdropFilter: "blur(42px)",
    borderRadius: "10px",
    overflow: "hidden",
    "&:hover": {
      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      filter: "drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.25))",
      background: "#fff",
    },
    "& .basecontent": {
      "& .databox": {
        borderBottom: "1px dashed rgba(0, 0, 0, 0.5)",
        paddingBottom: "16px",
      },
      "& .buttonbox": {
        paddingTop: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      },
    },
  },
  text: {
    whiteSpace: "pre",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "calc(100% - 5px)",
    color: "#000",
  },
  mainimg: {
    cursor: "pointer",
    width: "100%",
    height: "190px ",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "5px 5px 0px 0px",
    backgroundColor: "#ccc !important",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "& .topcontent": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      margin: "15px",
      "& .topleft": {
        display: "flex",
        alignItems: "center",
        background: "#FFFFFF",
        borderRadius: "10px",
        padding: "5px 8px",
        width: "fit-content",
        "& p": {
          marginLeft: "5px",
          color: "#F7722F",
          [theme.breakpoints.down("xs")]: {
            fontSize: "10px",
          },
          "& span": {
            color: "#fff",
          },
        },
        "& .Userbox": {
          display: "flex",
          alignItems: "center",
          "& figure": {
            margin: "0",
            marginLeft: "-10px",
            height: "30px",
            width: "30px",
            borderRadius: "50%",
            overflow: "hidden",
            backgroundColor: "#101010",
            position: "relative",
            transition: "0.3s",
            cursor: "pointer",
            "&:first-child": {
              marginLeft: "0px",
            },
            "&:hover": {
              zIndex: "2",
              transform: "scale(1.2)",
            },
            "& img": {
              width: "auto",
              maxWidth: "100%",
              maxHeight: "41px",
            },
          },
        },
      },
      "& .likes": {
        display: "flex",
        alignItems: "center",
        background: "#FFFFFF",
        borderRadius: "10px",
        width: "fit-content",
        padding: "5px 8px",
        "& p": {
          marginLeft: "5px",
          color: "#000",
        },
      },
    },
    "& .bottomcontent": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "10px",
      "& .timer": {
        display: "flex",
        alignItems: "center",
        width: "fit-content",
        background:
          "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
        border: "1px dashed #FFFFFF",
        filter: "drop-shadow(0px 0px 53px rgba(0, 0, 0, 0.25))",
        backdropFilter: "blur(42px)",
        borderRadius: "10px",
        padding: "5px 10px",
        "& h6": {
          color: "#FFFFFF",
        },
      },
    },
  },
  pricedata: {
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
    "& h6": {
      fontSize: "14px",
      color: "#000",
      display: "flex",
      alignItems: "center",
    },
  },
  customizedButton: {
    position: "absolute",
    top: "-42px",
    right: "-9px",
    color: "#fff",
  },
}));

function ExploreCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const { data, type, dataAllItem, callbackFun } = props;

  const user = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const updateDimensions = () => {
    var offsetWidth = document.getElementById(
      "imagecard" + data?._id
    ).offsetWidth;
    var newoofsetWidth = offsetWidth - 80;
    document.getElementById("imagecard" + data?._id).style.height =
      newoofsetWidth + "px";
  };
  const [favourite, setisfavourite] = useState([]);
  const favouriteNftHandler = async (id) => {
    if (user.isLogin && id) {
      try {
        const res = await axios.get(Apiconfig.favouriteUnFavouriteOrder + id, {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        });
        if (res.data.statusCode === 200) {
          toast.success(res.data.responseMessage);
          setisfavourite(res.data.result.favouriteUsers[0]);
          if (callbackFun) {
            callbackFun(id);
          }
        } else {
          toast.warn(res.data.responseMessage);
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.warn("Please connect your wallet");
    }
  };
  if (user.userData && data?.favouriteUsers) {
    var favouriteUsers = data?.favouriteUsers?.filter(
      (order) => order === user?.userData?._id
    );
    var isfavourite = favouriteUsers?.length >= 0;
  }
  useEffect(() => {
    updateDimensions();
  }, [data, data?._id]);
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <>
      <Paper className={classes.root}>
        <Box
          id={`imagecard${data?._id}`}
          className={classes.mainimg}
          style={
            data?.nftId?.coverImage
              ? { background: "url(" + data?.nftId?.coverImage + ")" }
              : { background: "url(" + "images/market_detail.png" + ")" }
          }
          onClick={() => {
            history.push({
              pathname: "/marketplace-Detail",
              search: data?._id,
              state: {
                data: data,
              },
            });
          }}
        >
          {data?.nftId?.mediaType === "video" && (
            <Box style={{ position: "absolute", right: "20px", top: "10px" }}>
              <PlayCircleOutlineIcon
                onClick={() => {
                  history.push({
                    pathname: "/nft",
                    search: data._id,
                  });
                }}
                style={{ cursor: "pointer", color: "white" }}
              />
            </Box>
          )}
          {data?.nftId?.mediaType === "audio" && (
            <Box style={{ position: "absolute", right: "20px", top: "10px" }}>
              <AudiotrackIcon
                onClick={() => {
                  history.push({
                    pathname: "/nft",
                    search: data._id,
                  });
                }}
                style={{ cursor: "pointer", color: "white" }}
              />
            </Box>
          )}
        </Box>
        <Box className="basecontent">
          <Box p={2}>
            <Box className="databox">
              <Grid container spacing={1}>
                <Grid item xs={6} sm={6} align="left">
                  <Typography variant="h6" className={classes.text}>
                    {data.tokenName ? data.tokenName : data?.nftId?.tokenName}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6} align="right">
                  <Typography variant="body1" className={classes.text}>
                    {data.stock}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={6} sm={6} align="left">
                  <Typography variant="body1" className={classes.text}>
                    <GavelIcon style={{ fontSize: "14px" }} />
                    &nbsp;
                    {data?.bidId[0]?.price ? data?.bidId[0]?.price : "0"}{" "}
                    {/* {data?.price ? data?.price : "0"}{" "} */}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6} align="right">
                  <Box className={classes.pricedata}>
                    {" "}
                    {/* <img src="images/bsc-bnb.svg" alt="Vector Image" /> */}
                    <Typography variant="h6">
                      <img
                        src="images/qi.png"
                        alt="Vector Image"
                        style={{ width: "15px" }}
                      />
                      &nbsp;&nbsp;
                      {data?.price}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box className="buttonbox">
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={() => {
                  history.push({
                    pathname: "/marketplace-Detail",
                    search: data?._id,
                    state: { data: data },
                  });
                }}
              >
                View Details
              </Button>
              <Box className="iconbuttons">
                <IconButton
                  size="small"
                  style={{
                    background: "rgba(0, 204, 179, 0.23)",
                    marginRight: "5px",
                  }}
                  onClick={() => setOpen(true)}
                >
                  <ShareIcon style={{ color: "#00CCB3" }} />
                </IconButton>
                {/* <IconButton
                  size="small"
                  style={{
                    background: "rgba(225, 169, 3, 0.23)",
                    marginLeft: "5px",
                  }}
                >
                  <GradeIcon
                    // style={
                    //   favourite
                    //     ? {
                    //         cursor: "pointer",
                    //         color: "#E1A903",
                    //         fontSize: "18px",
                    //       }
                    //     : {
                    //         cursor: "pointer",
                    //         color: "rgb(0 204 179)",
                    //         fontSize: "18px",
                    //       }
                    // }
                    style={
                      isfavourite
                        ? {
                            cursor: "pointer",
                            color: "#E1A903",
                            fontSize: "18px",
                          }
                        : {
                            cursor: "pointer",
                            color: "rgb(0 204 179)",
                            fontSize: "18px",
                          }
                    }
                    onClick={() => favouriteNftHandler(data._id)}
                  />
                </IconButton> */}
              </Box>
            </Box>
          </Box>
        </Box>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="xs"
          fullWidth
        >
          <DialogActions>
            <IconButton
              onClick={() => setOpen(false)}
              className={classes.customizedButton}
            >
              <GiCancel />
            </IconButton>
          </DialogActions>
          <DialogContent>
            <Box className={classes.sharemodal} mb={2} align="center" mt={3}>
              <ShareSocialMedia url={window.location} />
            </Box>
          </DialogContent>
        </Dialog>
      </Paper>
    </>
  );
}

export default ExploreCard;

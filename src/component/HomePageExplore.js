import React, { useContext, useEffect, useState } from "react";
import { makeStyles, Paper, Typography, Box, Button } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Link } from "react-router-dom";
import { red } from "@material-ui/core/colors";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { calculateTimeLeft } from "src/utils";
import { UserContext } from "src/context/User";
import moment from "moment";
import { toast } from "react-toastify";
import axios from "axios";
import apiConfig from "src/config";
import { FaEthereum } from "react-icons/fa";
import { RiAuctionLine } from "react-icons/ri";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { SiBinance } from "react-icons/si";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "rgba(0, 0, 0, 0.19)",
    borderRadius: "7px",
  },
  mainCard: {
    // width: "100%",
    display: "flex",
    padding: "4px",
    flexDirection: "column",
  },
  imgcard: {
    height: "calc(100% - 20px)",
    "& div": {
      margin: "auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "10px 0px",
      height: "calc(100% - 20px)",
    },
  },
  bodybox: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0px",
    "& h5": {
      fontFamily: "Cabin",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "18px",
      lineHeight: "22px",
      color: "#CECDCD",
      [theme.breakpoints.down("xs")]: {
        fontSize: "12px",
      },
    },
  },
  flexBetween: {
    width: "calc(100% - 10px)",
    margin: "0 auto",
    paddingBottom: "4px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

    "& h4": {
      fontWeight: "bold",
      fontSize: "17px",
      display: "flex",
      alignItems: "center",
      lineHeight: "20px",
      color: "#fff",
      [theme.breakpoints.down("sm")]: {
        fontSize: "15px",
        padding: "0px 0px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "7px",
        padding: "0px 0px",
      },
    },
    "& h5": {
      fontWeight: "bold",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      lineHeight: "20px",
      color: "#fff",
      whiteSpace: "nowrap",
      display: "block",
      textOverflow: "ellipsis",
      overflow: "hidden",
      "& svg": { marginRight: "7px" },
      [theme.breakpoints.down("sm")]: {
        fontSize: "13px",
        padding: "0px 0px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "12px",
        padding: "0px 0px",
      },
    },
    "& p": {
      fontWeight: "500",
      fontSize: "17px",
      lineHeight: "23px",
      color: "#19B9CB",
      display: "flex",
      alignItems: "center",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
      [theme.breakpoints.down("sm")]: {
        fontSize: "14px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "12px",
      },
    },
    "& h6": {
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "23px",
      color: "#19B9CB",
      display: "flex",
      alignItems: "center",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
      [theme.breakpoints.down("sm")]: {
        fontSize: "14px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "12px",
      },
    },
  },
  span: {
    fontFamily: "Cabin",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "13px",
    lineHeight: "16px",
    color: "#7A7A7A",
  },
  iconcolor: {
    color: "#fff",
    // "&:hover": {
    //   color: "#EB4D00",
    // },
  },
  ethBtn: {
    position: "absolute",
    backgroundColor: "#fff",
    top: "5px",
    [theme.breakpoints.down("xs")]: {
      padding: "2px 7px",
    },
    "&:hover": {
      "&::after": {
        borderTop: "solid 8px rgb(224 224 224)",
      },
    },
    "&::after": {
      position: " absolute",
      width: " 0px",
      height: "30px",
      borderTop: "solid 8px rgb(255 255 255)",
      borderLeft: "solid 8px transparent",
      borderRight: "solid 8px transparent",
      content: "''",
      left: "50%",
      transform: "translateX(-50%)",
      top: "100%",
    },
  },
  buybtn: {
    fontFamily: "Cabin",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "17px",
    color: "#fff",
    [theme.breakpoints.down("xs")]: {
      fontSize: "11px",
    },
  },

  imgboxdone: {
    "& img": {
      width: "100%",
      // height: "300px",
      "@media(max-width:520px)": {
        width: "100%",
        // height: "165px",
      },
    },
  },
  iconeheart: {
    color: "#cecdcd",
    height: "17px",
    width: "17px",
    marginRight: "4px",
    [theme.breakpoints.down("xs")]: {
      height: "15px",
      width: "15px",
    },
  },
  bgbtnn: {
    margin: "0 auto",
    position: "absolute",
    left: "50%",
    bottom: "4px",
    transform: "translateX(-50%)",
    transition: "all 0.2s ease, visibility 0s",
    padding: "5px 15px",
    borderRadius: "50px",
    border: "0px solid rgb(63, 118, 82)",
    background:
      " no-repeat padding-box border-box 50%/cover scroll url(./images/bluebtn.png), rgba(63, 118, 82, 0)",
    transition: "inherit",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: " 15px",
    minWidth: "25px",
    [theme.breakpoints.down("xs")]: {
      minWidth: "85px",
      fontSize: " 13px",
    },
    "&:hover": {
      background:
        " no-repeat padding-box border-box 50%/cover scroll url(./images/btnorange.png), rgba(63, 118, 82, 0)",
    },
  },
}));
function HomePageExplore({ data, callbackFun, index }) {
  const user = useContext(UserContext);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  const updateDimensions = () => {
    var offsetWidth = document.getElementById(
      "imagecard" + data?._id
    ).offsetWidth;
    document.getElementById("imagecard" + data?._id).style.height =
      offsetWidth + "px";
  };
  useEffect(() => {
    updateDimensions();
  }, [data]);
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const classes = useStyles();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (Number(data.endTime) > Number(moment().unix())) {
        setTimeLeft(calculateTimeLeft(new Date(parseInt(data.endTime) * 1000)));
      }
    }, 1000);
    return () => clearTimeout(timer);
  });

  if (user.userData && data?.likesUsers) {
    var likesUsers = data?.likesUsers?.filter(
      (order) => order === user.userData._id
    );
    var isLike = likesUsers?.length > 0;
  }
  const [isUpdating, setIsUpdating] = useState(false);

  const likeDislikeNftHandler = async (id) => {
    if (user.isLogin && id) {
      try {
        const res = await axios.get(apiConfig.likeDislikeOrder + id, {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        });
        if (res.data.statusCode === 200) {
          setIsUpdating(true);
          toast.success(res.data.responseMessage);
          if (callbackFun) {
            callbackFun();
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

  return (
    <div className={classes.root}>
      <Box className={classes.mainCard}>
        <Box className={classes.headbox}>
          <Link
            to={{
              pathname: "nft-detail",
              search: data?._id,
            }}
            style={{ textDecoration: "none" }}
          >
            <Paper
              className={`${classes.imgcard} sss `}
              id={`imagecard${data?._id}`}
              style={{
                backgroundImage: "url(./images/bgmap3.png)",
                borderRadius: "10px",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <Box style={{ position: "relative" }}>
                <Box className={classes.imgboxdone}>
                  <img src={data.nftId.coverImage} alt="image" />
                </Box>
              </Box>
            </Paper>
          </Link>
        </Box>

        <Box
          pt={2}
          pb={2}
          display="flex"
          justifyContant="space-between"
          className={classes.flexBetween}
        >
          <Typography variant="h5">{data?.nftId?.tokenName}</Typography>
        </Box>
        <Box
          display="flex"
          justifyContant="space-between"
          className={classes.flexBetween}
        >
          <Typography variant="h6">
            {" "}
            {timeLeft.days ? timeLeft.days && timeLeft.days : "0"}d:
            {timeLeft.hours ? timeLeft.hours && timeLeft.hours : "0"}h:
            {timeLeft.minutes ? timeLeft.minutes && timeLeft.minutes : "0"}m :
            {timeLeft.seconds ? timeLeft.seconds && timeLeft.seconds : "0"}s
          </Typography>

          <Box className={classes.bodyboxx}>
            <Typography variant="h6">
              <RiAuctionLine className={classes.iconeheart} />
              {data?.startingBid}
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContant="space-between"
          className={classes.flexBetween}
        >
          <Typography variant="body2">
            <FaEthereum className={classes.iconeheart} />
            {data?.price}
          </Typography>
          <Typography variant="body2" style={{ cursor: "pointer" }}>
            <FavoriteBorderIcon
              style={isLike ? { color: "#f30066" } : { color: "#a6adb1" }}
              className={classes.iconeheart}
              onClick={() => {
                likeDislikeNftHandler(data?._id);
              }}
            />
            {data?.likesUsers?.length}
          </Typography>
        </Box>
      </Box>
    </div>
  );
}
export default HomePageExplore;

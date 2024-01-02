import React, { useEffect } from "react";
import {
  Box,
  Typography,
  makeStyles,
  Container,
  Paper,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    width: "100%",
    borderRadius: "10px",
    overflow: "hidden",
    background:
      "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
    backdropFilter: " blur(42px)",
    textAlign: "center",
    cursor: "pointer",
    "& label": {
      backgroundColor: "#f0b514",
      color: "#000",
      position: "absolute",
      height: "20px",
      width: "150px",
      transform: "rotate(319deg)",
      left: "-39px",
      top: " 19px",
      fontSize: "11px",
    },
    "&:hover": {
      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      filter: "drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.25))",
      background: "#fff",
    },
    "& h6": {
      width: "100%",
      maxWidth: "70%",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      margin: "3px auto",
      color: "#fff",
      "& span": {
        fontSize: "14px",
        fontWeight: "400",
      },
    },
    "& figure": {
      width: "100%",
      maxWidth: "70px",
      height: "70px",
      borderRadius: "50%",
      // overflow: "hidden",
      margin: "0 auto",
      marginTop: "-40px",
      position: "relative",
      background:
        "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
      backdropFilter: " blur(42px)",
      border: "3px solid #161616",
      background: "rgb(42 123 135)",
      // "& img": {
      //   width: "100%",
      // },
      "& .vectorBox": {
        position: "absolute",
        top: "0px",
        right: "-2px",
        zIndex: "1",
      },
    },
  },
  mainimg: {
    width: "100%",
    height: "220px ",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "10px 10px 0px 0px",
    backgroundColor: "#ccc !important",
  },
  pricedata: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "8px",
    "& h6": {
      fontSize: "14px",
      color: "#000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
}));
export default function PawsomeCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const { data, type } = props;

  // const filterData = data?.filter((datatrue) => datatrue.isPromoted === false);

  // console.log("filterData", filterData);
  const updateDimensions = () => {
    var offsetWidth = document.getElementById(
      "imagecard" + data?._id
    ).offsetWidth;
    var newoofsetWidth = offsetWidth - 80;
    document.getElementById("imagecard" + data?._id).style.height =
      newoofsetWidth + "px";
  };
  useEffect(() => {
    updateDimensions();
  }, [data, data?._id]);
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <Paper className={classes.root}>
      {/* {data?.isPromoted && <label>Promoted</label>} */}
      <Box
        id={`imagecard${data?._id}`}
        className={classes.mainimg}
        style={
          data?.bannerImage
            ? { background: "url(" + data?.bannerImage + ")" }
            : { background: "url(" + "images/market_detail.png" + ")" }
        }
        // onClick={() => {
        //   history.push({
        //     pathname: "/collection-details",
        //     search: data?._id,
        //     state: {
        //       data: data,
        //     },
        //   });
        // }}
      ></Box>

      <figure>
        <Box className="vectorBox">
          {/* <img src="images/Check.png" alt="Vector Image" /> */}
        </Box>
        <Box
        //   onClick={() => {
        //     history.push({
        //       pathname: "/collection-details",
        //       search: data?._id,
        //       state: {
        //         data: data,
        //       },
        //     });
        //   }}
        >
          <img
            src={
              data?.collectionImage
                ? data?.collectionImage
                : "/images/avaterimg.png"
            }
            style={{ height: "70px", width: "70px", borderRadius: "50%" }}
            alt="user"
          />
        </Box>
      </figure>
      <Typography variant="h6" align="center">
        {" "}
        {data?.displayName}
        <span>{data?.comingtext}</span>
      </Typography>
      <Box className={classes.pricedata}>
        <Typography variant="h6">
          <img
            src="images/qi.png"
            alt="Vector Image"
            style={{ width: "14px" }}
          />
          &nbsp;&nbsp;
          {data?.price}
        </Typography>
      </Box>
    </Paper>
  );
}

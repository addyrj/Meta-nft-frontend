import React, { useContext } from "react";
import { Box, makeStyles, Avatar, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  mainbox: {
    padding: "0px 10px",
    cursor: "pointer",
    "& .cardbox": {
      position: "relative",
      display: "flex",
      zIndex: "1",
      justifyContent: "center",

      "& .MuiAvatar-root": {
        width: "100%",
        maxWidth: "400px",
        borderRadius: "10px",
        minHeight: "318px",
      },
      "&::before": {
        width: "100%",
        height: "100%",
        content: "''",
        zIndex: "1",
        position: "absolute",
        borderRadius: "10px",

        background:
          "linear-gradient(180deg, rgba(0, 0, 0, 0.025) 59.45%, rgb(0 0 0 / 73%) 100%)",
      },
    },
    "& img": {
      width: "auto",
      maxWidth: "100%",
    },
    "& .textbox": {
      position: "absolute",
      bottom: "20px",
      left: "15px",

      "& h6": {
        fontSize: "18px",
        color: "#fff",
        fontWeight: "600",
      },
    },
  },
}));
export default function SliderCard({ data }) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Box
      className={classes.mainbox}
      onClick={() =>
        history.push({
          pathname: "/category-view",
          state: data,
        })
      }
    >
      <Box className="cardbox">
        <Avatar src={data?.categoryIcon} alt="" />
        <Box
          className="textbox"
          style={{ position: "absolute", zIndex: "999" }}
        >
          <Typography variant="h6">{data?.categoryTitle}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

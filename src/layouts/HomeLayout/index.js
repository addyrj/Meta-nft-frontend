import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import Footer from "./Footer";
import TopBar from "./TopBar";
import { Box } from "@material-ui/core";
import Update from "./Update";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
  },
  MainLayout: {
    zIndex: "1",
    position: "relative",
    minHeight: "calc(100vh - 415px)",
    backgroundColor: "#2e3130",
  },
  shade: {
    top: "22%",
    left: "auto",
    right: "-5%",
    width: "600px",
    bottom: "auto",
    filter: "blur(100px)",
    height: "600px",
    opacity: "0.55",
    zIndex: "-1",
    position: "fixed",
    borderRadius: "1000px",
    backgroundImage:
      "radial-gradient(36.67% 9.68% at 67.26% 8.27%, rgb(113 248 141 / 74%) 0%, rgb(87 212 242 / 55%) 95.78%)",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    display: "none",
  },
  shade1: {
    top: "22%",
    right: "auto",
    left: "-5%",
    width: "600px",
    bottom: "auto",
    filter: "blur(100px)",
    height: "600px",
    opacity: "0.55",
    zIndex: "-1",
    position: "fixed",
    borderRadius: "1000px",
    backgroundImage:
      "radial-gradient(36.67% 9.68% at 67.26% 8.27%, rgb(113 248 141 / 74%) 0%, rgb(87 212 242 / 55%) 95.78%)",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));

const MainLayout = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <div className={classes.root}>
      <TopBar />
      <div
        style={
          history.location.pathname !== "/"
            ? { display: "block" }
            : { display: "none" }
        }
      ></div>

      <div className={classes.MainLayout}>
        {" "}
        <Box className={classes.shade}></Box>
        <Box className={classes.shade1}></Box>
        {children}
      </div>
      <Update />
      <Footer />
    </div>
  );
};

export default MainLayout;

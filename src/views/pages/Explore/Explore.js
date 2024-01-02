import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
  Box,
  makeStyles,
  Grid,
  Button,
  Container,
} from "@material-ui/core";
import {
  getWeb3Obj,
  getContract,
  balanceOfValue,
  swichNetworkHandler,
  getWeb3ContractObject,
  sortAddress,
} from "src/utils";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { FiMenu } from "react-icons/fi";
import ApiConfig from "src/ApiConfig/ApiConfig";

import axios from "axios";
import { toast } from "react-toastify";

import { Pagination } from "@material-ui/lab";
import MarketplaceIndex from "../Marketplace/Index";
import { UserContext } from "src/context/User";
import Tab from "./MyItemtabs/Tab";
import { CategoryButtons } from "src/constants/index";
// import Card from "src/component/Card";
// import { DataLoading } from "../../components/PageLoading/PageLoading";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "40px 0px",
    "& .heading": {
      "& h2": {
        color: "#fff",
      },
    },
  },
  contentItem: {
    filter: "drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.25))",
    padding: "30px 0px",
    background: "#fff",
    boxShadow: "rgb(99 99 99 / 0%) 0px 2px 8px 0px",
    marginTop: "25px",
    padding: "25px",
    borderRadius: "10px",
    backdropFilter: "blur(44px)",
    "& .content": {
      border: "1px solid rgb(229, 232, 235)",
      padding: "15px",
      maxHeight: "75px",
      // "@media(max-width:1280px)": {
      //   borderBottomLeftRadius: "0px",
      // },
      "& h3": {
        color: "#000",
        fontSize: "23px",
        textAlign: "center",
        fontWeight: "bold",
      },
      "& h6": {
        color: "#000",
        marginTop: "2px",
        fontSize: "15px",
        textAlign: "center",
      },
    },
  },
  contenttext: {
    marginTop: "30px",
    "& h6": {
      color: "#fff",
    },
  },
}));
export default function Dashboard(props) {
  const { data } = props;
  const classes = useStyles();
  const user = useContext(UserContext);

  const [dashboarddata, setDashboarddata] = useState("");
  const [dashboard, setDashboard] = useState("");
  const getDashboardData = async () => {
    try {
      const res = await axios.get(ApiConfig.dashboardCount);
      if (res.data.statusCode === 200) {
        if (res.data.result) {
          setDashboarddata(res.data.result);
        } else {
          toast.warn("something went wrong");
        }
      }
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  const getDashboardDatafloore = async () => {
    try {
      const res = await axios.get(ApiConfig.floorTradeCount);
      if (res.data.statusCode === 200) {
        if (res.data.result) {
          setDashboard(res.data.result);
        } else {
          toast.warn("something went wrong");
        }
      }
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  useEffect(() => {
    getDashboardData();
    getDashboardDatafloore();
  }, []);

  return (
    <>
      <Box className={classes.root}>
        <Container maxWidth="lg">
          {/* <Box className="heading">
            <Typography variant="h1">Explore</Typography>
          </Box> */}
          <Container maxWidth="md">
            <Box className={classes.contentItem}>
              <Grid container spacing={0}>
                <Grid item lg={3} md={6} sm={6} xs={6} align="center">
                  <Box
                    className="content"
                    style={{ borderRadius: "10px 0px 0px 10px" }}
                  >
                    <Typography variant="h3">
                      {dashboarddata?.order ? dashboarddata?.order : "0"}
                    </Typography>
                    <Typography variant="h6">Items</Typography>
                  </Box>
                </Grid>
                <Grid item lg={3} md={6} sm={6} xs={6} align="center">
                  <Box className="content">
                    <Typography variant="h3">
                      {dashboarddata?.user ? dashboarddata?.user : "0"}
                    </Typography>
                    <Typography variant="h6">Users</Typography>
                  </Box>
                </Grid>
                <Grid item lg={3} md={6} sm={6} xs={6} align="center">
                  <Box className="content">
                    <Typography variant="h3" textAlign="center">
                      {dashboard?.floorNFTRes?.price
                        ? dashboard?.floorNFTRes?.price
                        : "0"}
                    </Typography>
                    <Typography variant="h6">Floor price</Typography>
                  </Box>
                </Grid>
                <Grid item lg={3} md={6} sm={6} xs={6} align="center">
                  <Box
                    className="content"
                    style={{ borderRadius: "0px 10px 10px 0px" }}
                  >
                    {/* <img src="/images/eth.svg" alt="" /> */}
                    <Typography variant="h3" textAlign="center">
                      {dashboard?.volumeTradeNFTRes?.toFixed(5)}
                    </Typography>
                    <Typography variant="h6">Volume traded</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Container>
          <Box>
            <MarketplaceIndex />
          </Box>
        </Container>
      </Box>
    </>
  );
}

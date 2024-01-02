import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Menu,
  MenuItem,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

import SellersCard from "src/component/SellersCard";
import { BiChevronDown } from "react-icons/bi";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import { toast } from "react-toastify";
import Apiconfig from "src/ApiConfig/ApiConfig";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import DataNotFound from "src/component/DataNotFound";
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "25px",
    [theme.breakpoints.down("xs")]: {
      padding: "50px 0",
    },
    "& .heading": {
      display: "flex",
      alignItems: "center",
      "& h3": {
        marginLeft: "15px",
        "& span": {
          color: "#F7722F",
        },
      },
    },
  },
  sectionTitleHead: {
    paddingBottom: " 16px",
    marginLeft: "14px",
    "& h2": {
      [theme.breakpoints.down("xs")]: {
        fontSize: "20px",
      },
    },
  },
}));

function Sellers() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [filterName, setFilterName] = useState("Daily");
  const [userType, setUserType] = useState("Sellers");

  const [seller, setSeller] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pages, setpages] = useState(1);
  const [numpages, setNumpages] = useState(1);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorEl1(null);
  };
  const topSeller = async () => {
    try {
      const res = await axios.get(`${Apiconfig.topSellers}?page=${pages}`, {
        // headers: {
        //   token: window.sessionStorage.getItem("token"),
        // },
        params: {
          type: filterName,
        },
      });
      if (res.data.statusCode === 200) {
        setSeller(res.data.result.docs);
        setNumpages(res.data.result.pages);

        setIsLoading(false);
      }
    } catch (error) {
      console.log("ERRROR", error);
      setIsLoading(false);
    }
  };
  const topBuyers = async () => {
    try {
      const res = await axios.get(`${Apiconfig.topBuyers}?page=${pages}`, {
        // headers: {
        //   token: window.sessionStorage.getItem("token"),
        // },
        params: {
          type: filterName,
          // limit: 2,
        },
      });
      if (res.data.statusCode === 200) {
        setSeller(res.data.result.docs);
        setNumpages(res.data.result.pages);

        setIsLoading(false);
      }
    } catch (error) {
      console.log("ERRROR", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (
      userType === "Sellers" &&
      (filterName === "Daily" ||
        filterName === "Weekly" ||
        filterName === "Monthly")
    ) {
      topSeller();
    }
  }, [filterName]);
  useEffect(() => {
    if (
      userType === "Buyers" &&
      (filterName === "Daily" ||
        filterName === "Weekly" ||
        filterName === "Monthly")
    ) {
      topBuyers();
    }
  }, [userType, filterName]);

  useEffect(() => {
    if (userType === "Buyers") {
      topBuyers();
    }
  }, [userType]);
  useEffect(() => {
    setSeller();
  }, []);

  useEffect(() => {
    if (userType === "Sellers") {
      topSeller();
    }
  }, [userType === "Sellers"]);
  useEffect(() => {
    if (userType === "Buyers") {
      setSeller();
    }
  }, [userType === "Buyers"]);

  return (
    <>
      <Box className={classes.root}>
        <Container maxWidth="lg">
          <Box>
            <Box className="heading">
              <figure style={{ margin: "0" }}>
                <img src="images/Medal.png" alt="Medal Image" />
              </figure>
              <Box className={classes.sectionTitleHead}>
                <Typography variant="h2" className={classes.hed}>
                  Top{" "}
                  <span
                    onClick={handleClick1}
                    style={{ color: "#F7722F", cursor: "pointer" }}
                  >
                    {userType === "Sellers"
                      ? "Sellers"
                      : userType === "Buyers"
                      ? "Buyers"
                      : null}
                    <BiChevronDown
                      style={{
                        color: "#F7722F",
                        paddingTop: "10px",
                        cursor: "pointer",
                      }}
                    />
                  </span>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl1}
                    keepMounted
                    open={Boolean(anchorEl1)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={() => {
                        setUserType("Buyers");
                        handleClose();
                      }}
                    >
                      Buyers
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setUserType("Sellers");
                        handleClose();
                      }}
                    >
                      Sellers
                    </MenuItem>
                  </Menu>
                  in{" "}
                  <span
                    onClick={handleClick}
                    style={{ color: "#F7722F", cursor: "pointer" }}
                  >
                    {filterName === "Daily"
                      ? "1 day"
                      : filterName === "Weekly"
                      ? "7 day"
                      : "30 day"}{" "}
                    <BiChevronDown
                      style={{
                        color: "#F7722F",
                        paddingTop: "10px",
                        cursor: "pointer",
                      }}
                    />
                  </span>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={() => {
                        setFilterName("Daily");
                        handleClose();
                      }}
                    >
                      <span>Today</span>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        setFilterName("Weekly");
                      }}
                    >
                      <span>Weekly</span>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        setFilterName("Monthly");
                      }}
                    >
                      <span>Monthly</span>
                    </MenuItem>
                  </Menu>
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box mt={2} mb={2}>
            <Grid container spacing={3}>
              {isLoading ? (
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <ButtonCircularProgress />
                </Box>
              ) : (
                <>
                  {seller &&
                    seller.map((data, i) => {
                      return (
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                          <SellersCard type="card" data={data} key={i} />
                        </Grid>
                      );
                    })}
                </>
              )}
              {!isLoading && !seller && <DataNotFound />}
            </Grid>
            {seller && seller.length != 0 ? (
              <Box
                className={classes.tabBtn}
                pt={5}
                display="flex"
                justifyContent="end"
              >
                <Pagination
                  onChange={(e, v) => setpages(v)}
                  count={parseInt(numpages)}
                  color="secondary"
                />
              </Box>
            ) : (
              ""
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Sellers;

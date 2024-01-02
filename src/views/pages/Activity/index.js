import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState, useEffect, useContext } from "react";
import Filter from "./Filter";
import AllActivity from "./AllActivity";
import Following from "./Following";
import MyActivity from "./MyActivity";
import DataNotFound from "src/component/DataNotFound";
import DataLoadingStart from "src/component/DataLoadingStart";
import { UserContext } from "src/context/User";
import { Pagination } from "@material-ui/lab";
import axios from "axios";
import ApiConfig from "src/ApiConfig/ApiConfig";
import DataNotStart from "src/component/DataNotStart";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "50px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "35px 0",
    },
  },
  heading: {
    "& h3": {
      color: "#000",
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
      height: "90px",
      width: "90px",
      overflow: "hidden",
      borderRadius: "15px",
      "& img": {
        maxHeight: "100%",
        maxWidth: "100%",
        height: "auto",
        width: "auto",
        display: "block",
      },
    },
  },
  colorbox: {
    display: "flex",
    alignItems: "center",
    marginTop: "16px",
    width: "100%",
    height: "auto",
    borderRadius: "10px",
    padding: "10px",
    background:
      " linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
    border: "1px solid #A8CEDF",
    backdropFilter: "blur(42px)",
  },
  textbox: {
    "& h3": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "21px",
      color: "#D200A5",
    },
    "& h4": {
      marginTop: "3px",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "12px",
      lineHeight: "18px",
    },
    "& h5": {
      marginTop: "3px",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "12px",
      lineHeight: "18px",
      color: "#E4C3DE",
    },
  },
  tabBtn: {
    "& button": {
      borderRadius: "10px",
      fontWeight: "600",
      fontSize: "14px",
      marginRight: "4px",
      "&.active": {
        color: "#fff",
        boxShadow: "0px 4px 4px rgb(0 0 0 / 25%)",
        background:
          "linear-gradient(261.87deg, #62D3F0 13.12%, #35A5F5 83.57%)",
      },
    },
  },
  orer2: {
    [theme.breakpoints.down("sm")]: {
      order: "0",
    },
  },
  orer: {
    [theme.breakpoints.down("sm")]: {
      order: "1",
    },
  },
  hr: { border: "1px solid #a8cedf", marginTop: "8px" },
}));

const Activity = () => {
  const [tabview, setTabView] = useState("following");
  const [selectedFilter, setSelectedFilter] = useState(["FOLLOW", "UNFOLLOW"]);
  const classes = useStyles();
  const [noOfPages, setNoOfPages] = useState(1);
  const [page, setPage] = useState(1);
  const user = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [activityNFTList, setActivityNFTList] = useState([]);
  const getActivityData = async (userId) => {
    setActivityNFTList([]);
    setIsLoading(true);
    try {
      const res = await axios.post(ApiConfig.showActivity, {
        _id: userId,
        limit: 12,
        page: page,
        type: selectedFilter,
      });

      if (res.data.statusCode === 200) {
        if (res.data.result.docs) {
          setNoOfPages(res.data.result.pages);
          setActivityNFTList(res.data.result.docs);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log("ERROR", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const userId = user?.userData?._id;
    if (userId) {
      getActivityData(userId);
    }
  }, [user?.userData, page, selectedFilter]);
  return (
    <Box className={classes.root}>
      <Container>
        <Box className={classes.heading}>
          <Typography variant="h3">Activity</Typography>
        </Box>
        <Box mt={5} className={classes.tabBtn}>
          {/* <Button
            className={tabview === "all" ? "active" : ""}
            onClick={() => setTabView("all")}
          >
            All
          </Button> */}
          <Button
            className={tabview === "following" ? "active" : " "}
            onClick={() => {
              setTabView("following");
              setSelectedFilter(["FOLLOW", "UNFOLLOW"]);
            }}
          >
            Following
          </Button>
          <Button
            className={tabview === "myActivity" ? "active" : " "}
            onClick={() => {
              setTabView("myActivity");
              setSelectedFilter();
            }}
          >
            My Activity
          </Button>
        </Box>

        <hr className={classes.hr} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={7} sm={12} lg={7} className={classes.orer}>
            <Grid container spacing={2} style={{ paddingTop: "20px" }}>
              {!isLoading && activityNFTList && activityNFTList.length === 0 && (
                <Box style={{ marginTop: "-14px", marginLeft: " 10px" }}>
                  <DataNotStart />
                </Box>
              )}
              {isLoading ? (
                <DataLoadingStart />
              ) : (
                <>
                  {tabview === "all" ? (
                    <AllActivity activityNFTList={activityNFTList} />
                  ) : (
                    ""
                  )}
                  {tabview === "following" ? (
                    <Following activityNFTList={activityNFTList} />
                  ) : (
                    ""
                  )}
                  {tabview === "myActivity" ? (
                    <MyActivity activityNFTList={activityNFTList} />
                  ) : (
                    ""
                  )}
                </>
              )}
            </Grid>
            {activityNFTList && activityNFTList.length != 0 && (
              <Box mt={2} display="flex" justifyContent="center">
                <Pagination
                  count={noOfPages}
                  page={page}
                  onChange={(e, v) => setPage(v)}
                />
              </Box>
            )}
          </Grid>

          <Grid item xs={12} md={5} sm={12} lg={5} className={classes.orer2}>
            <Box>
              {tabview === "all" && (
                <Filter
                  selectedFilter={selectedFilter}
                  setSelectedFilter={(data) => setSelectedFilter(data)}
                />
              )}
              {tabview === "myActivity" && (
                <Filter
                  selectedFilter={selectedFilter}
                  setSelectedFilter={(data) => setSelectedFilter(data)}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Activity;

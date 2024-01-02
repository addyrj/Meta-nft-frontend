import React, { useState, useEffect, useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles, Box, Container, Grid, Button } from "@material-ui/core";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import { useWeb3React } from "@web3-react/core";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { CategoryButtons, exploreData } from "src/constants";
import ExploreCard from "src/component/ExploreCard";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import DataNotFound from "src/component/DataNotFound";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";

import Apiconfig from "src/ApiConfig/ApiConfig";
import Filter from "./Filter";
// import AllActivity from "./AllActivity";
import AllItem from "./AllItem";
import { toast } from "react-toastify";
import Arts from "./Arts";
import Slider from "@material-ui/core/Slider";
import { UserContext } from "src/context/User";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
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
  banner: {
    padding: "80px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "50px 0",
    },
    "& h3": {
      fontWeight: 700,
      fontSize: "30px",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",
      "& img": {
        marginRight: "20px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "20px",
      },
    },
  },
}));
// const iOSBoxShadow =
//   "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";
const marks = [
  {
    value: 0,
  },
  {
    value: 2500,
  },
  {
    value: 7500,
  },
  {
    value: 10000,
  },
];
const IOSSlider = withStyles({
  root: {
    color: "#35a5f5!important",
    height: 12,
    padding: "15px 0",
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: "#fff",
    // boxShadow: iOSBoxShadow,
    marginTop: -8,
    marginLeft: -14,
    "&:focus, &:hover, &$active": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        // boxShadow: iOSBoxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 12px)",
    top: -22,
    "& *": {
      background: "transparent",
      color: "#000",
    },
  },
  track: {
    height: 9,
  },
  rail: {
    height: 9,
    opacity: 0.5,
    backgroundColor: "#bfbfbf",
  },
  mark: {
    backgroundColor: "#bfbfbf",
    height: 20,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: "currentColor",
  },
})(Slider);

const Accordion = withStyles({
  root: {
    "&:not(:last-child)": {
      background: "#FFFFFF",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.12)",
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      border: " 1px solid #3d3d3d",
      background:
        "linear-gradient( 152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
      backdropFilter: "blur(42px)",
    },
  },
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    // borderRadius:"10px",
    color: "#000",
    // background: "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
    // border: "1px solid #A8CEDF",
    backdropFilter: "blur(42px)",

    "&$expanded": {
      minHeight: 50,
      borderBottom: "0",
      color: "#000",
    },
    "@media(max-width:605px)": {
      fontSize: "10px",
      minHeight: 50,
      "&$expanded": {
        minHeight: 40,
        borderBottom: "0",
        color: "#FFF",
      },
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {
    margin: "0",
  },
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    border: "1px solid #C2DFE8",
    boxSizing: "border-box",
    backdropFilter: "blur(4px)",
    marginTop: "10px",
    "& h6": {
      color: "#000",
      paddingBottom: "15px",
    },
    "& p": {
      color: "#000",
    },
  },
}))(MuiAccordionDetails);
export default function FaqData({ data, index }) {
  const { account, library, chainId } = useWeb3React();

  const [expanded, setExpanded] = React.useState("panel1");
  const user = useContext(UserContext);
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [listCategory, setlistCategory] = useState();
  const [selectedCategoryNames, setSelectedCategoryNames] = useState([]);
  const [selectedCollectionIds, setSelectedCollectionIds] = useState([]);
  const [collectionList, setCollectionList] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [orderList, setOrderList] = useState([]);
  const [statee, setStatee] = useState([]);
  const [isall, setAll] = useState(false);
  const [isLikeLoad, setLikeLoad] = useState(false);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [tabview, setTabView] = useState("allitem");
  const classes = useStyles();

  const userId = user?.userData?._id;
  const updateDatahandler = () => {
    if (user?.userData?._id) {
      const id = user?.userData._id;
      getOrderList(id);
    }
  };
  const getOrderList = async (cancelTokenSource) => {
    if (!isLikeLoad) {
      setIsLoading(true);
    }
    try {
      const res = await axios.post(
        Apiconfig.allListOrder,
        {
          limit: 12,
          page: page,
          min: 0,

          max: maxPrice > 0 ? maxPrice : null,
          collection:
            selectedCollectionIds.length > 0 ? selectedCollectionIds : statee,
          itemCategory:
            selectedCategoryNames.length > 0 ? selectedCategoryNames : null,
        },
        {
          cancelToken: cancelTokenSource && cancelTokenSource.token,
          headers: {
            token: sessionStorage.getItem("token"),
          },
        }
      );
      if (res.data.statusCode === 200) {
        setNoOfPages(res.data.result.pages);
        setOrderList(res.data.result.docs);
        // setWalletAddress(res.data.result.docs)
        setIsLoading(false);
      } else {
        setOrderList([]);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("ERROR", error);
    }
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    getOrderList(cancelTokenSource);
    return () => {
      cancelTokenSource.cancel();
    };
  }, [
    selectedCollectionIds,
    statee,
    selectedCategoryNames,
    page,
    maxPrice,
    account,
  ]);

  const listCategoryapi = async (page) => {
    try {
      const res = await axios({
        method: "Get",
        url: Apiconfig.listCategory,
        parms: {
          search: "",
        },
      });
      if (res.data.statusCode == 200) {
        if (res.data.result.docs) {
          setlistCategory(res.data.result.docs);
        }
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const getcollectionListHandler = async () => {
    try {
      const res = await axios.get(Apiconfig.collectionList, {
        params: {
          limit: 50,
        },
      });
      if (res.data.statusCode === 200) {
        if (res.data.result.docs) {
          setCollectionList(res.data.result.docs);

          const filterDataa = res.data.result.docs?.map((item) => {
            return item?._id;
          });
          setStatee(filterDataa);
        }
      }
    } catch (error) {
      console.log("ERRROR", error.message);
    }
  };

  useEffect(() => {
    listCategoryapi();
    getcollectionListHandler();
  }, []);

  const updateCategoryListHanler = (name) => {
    let catList = selectedCategoryNames;

    const status = catList.includes(name);
    if (status) {
      const index = catList.indexOf(name);
      if (index > -1) {
        setSelectedCategoryNames(
          selectedCategoryNames.filter((data) => data !== name)
        );
      }
    } else {
      setSelectedCategoryNames([...catList, name]);
    }
  };

  const updateCollectionListHanlder = (id) => {
    let colList = selectedCollectionIds;
    const status = colList.includes(id);
    if (status) {
      const index = colList.indexOf(id);
      if (index > -1) {
        setSelectedCollectionIds(
          selectedCollectionIds.filter((data) => data !== id)
        );
      }
    } else {
      setSelectedCollectionIds([...selectedCollectionIds, id]);
    }
  };
  const updateCollectionListHanlder1 = () => {
    setAll(!isall);
    let colList = statee;
    const status = colList.includes(statee);
    if (status) {
      const index = colList.indexOf(statee);
    } else {
      setStatee([...statee]);
    }
  };

  return (
    <div>
      <Box className={classes.banner}>
        <Container>
          <Typography variant="h3">Marketplace</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3} md={3}>
              <Box mb={1}>
                <Typography variant="body2">Price</Typography>
                <IOSSlider
                  aria-label="ios slider"
                  // valueLabelDisplay="on"
                  step={0.001}
                  onChange={(e, v) => setMaxPrice(v)}
                  min={0}
                  max={10000}
                />

                <Typography variant="body2">{maxPrice}</Typography>
              </Box>
              <Box>
                <Accordion
                  square
                  defaultExpanded={index == 0 ? true : false}
                  onChange={handleChange("panel1")}
                >
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    expandIcon={
                      <ExpandMoreIcon
                        style={{
                          fontSize: "23px",
                          fontWeight: "400",
                          color: "#000",
                        }}
                      />
                    }
                  >
                    <Typography variant="body2">Category</Typography>
                  </AccordionSummary>

                  <AccordionDetails
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    {listCategory?.map((data, i) => {
                      return (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name={data.categoryTitle}
                              onClick={() =>
                                updateCategoryListHanler(data.categoryTitle)
                              }
                            />
                          }
                          label={data.categoryTitle}
                        />
                      );
                    })}
                  </AccordionDetails>
                </Accordion>
              </Box>

              <Box mt={1}>
                <Accordion
                  square
                  defaultExpanded={index == 0 ? true : false}
                  onChange={handleChange("panel1")}
                >
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    expandIcon={
                      <ExpandMoreIcon
                        style={{
                          fontSize: "23px",
                          fontWeight: "400",
                          color: "#000",
                        }}
                      />
                    }
                  >
                    <Typography variant="body2">Collection</Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    {collectionList?.map((data, i) => {
                      if (data && data._id && data.displayName) {
                        return (
                          <FormControlLabel
                            control={
                              <Checkbox
                                defaultChecked={isall}
                                name={data._id}
                                onClick={() =>
                                  updateCollectionListHanlder(data._id)
                                }
                              />
                            }
                            label={data.displayName}
                          />
                        );
                      } else {
                        return null;
                      }
                    })}
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Grid>

            <Grid item xs={12} sm={9} md={9}>
              {/* <Box className={classes.tabBtn}>
                <Button
                  className={tabview === "allitem" ? "active" : ""}
                  onClick={() => setTabView("allitem")}
                >
                  All Items
                </Button>
              </Box> */}
              {/* <hr className={classes.hr} /> */}
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
                  <Grid container spacing={2}>
                    <Grid
                      item
                      xs={12}
                      md={12}
                      sm={12}
                      lg={12}
                      className={classes.orer}
                    >
                      {tabview === "allitem" ? (
                        <AllItem
                          nftList={orderList}
                          callbackFun={() => updateDatahandler()}
                          setLikeLoad={(data) => setLikeLoad(data)}
                        />
                      ) : (
                        ""
                      )}

                      {tabview === "arts" ? <Arts /> : ""}
                    </Grid>
                  </Grid>
                  {!isLoading && orderList.length === 0 && <DataNotFound />}
                </>
              )}
              {orderList.length != 0 ? (
                <Box
                  className={classes.tabBtn}
                  pt={5}
                  display="flex"
                  justifyContent="end"
                >
                  <Pagination
                    count={noOfPages}
                    page={page}
                    onChange={(e, v) => setPage(v)}
                  />
                </Box>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}

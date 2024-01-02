import React, { useState, useEffect } from "react";
import Menu from "@material-ui/core/Menu";
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import { exploreData, RankingButtons } from "src/constants";
import MarketplaceCard from "src/component/MarketplaceCard";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Apiconfig from "src/ApiConfig/ApiConfig";
import { UserContext } from "src/context/User";
import DataNotFound from "src/component/DataNotFound";
import ExploreCard from "src/component/ExploreCard";
import PhysicalNFTcard from "src/component/PhysicalNFTcard";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .leftcontent": {
      display: "flex",
      alignItems: "center",
      "& h3": {
        marginLeft: "15px",
        fontSize: "30px",
        fontWeight: "bold",
        [theme.breakpoints.down("xs")]: {
          fontSize: "20px",
        },
      },
    },
  },
  filterBtn: {
    // color: "#fff",
    background: "#FFFFFF",
    border: "2px solid #EEEEEE",
    boxSizing: "border-box",
    // backdropFilter: "blur(42px)",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "10px",
    fontWeight: "bold",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "20px",
    margin: "5px",
    "& img": {
      marginRight: "5px",
    },
  },
  buttonBox: {
    margin: "5px 10px",
  },
  buttonright: {
    color: "#f3ba2f",
    border: "1px solid #f3ba2f",
  },
}));
const CategoryButtons = [
  {
    name: "Prakah",
  },
];

function PhysicalNFT(props) {
  const { data } = props;
  const classes = useStyles();
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [anchorCol, setAnchorCol] = React.useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [allNftList, setAllNftList] = useState([]);
  const [listCategory, setlistCategory] = useState();
  const [collectionList, setCollectionList] = useState([]);
  const [selectedCategoryNames, setSelectedCategoryNames] = useState();
  const [selectedCollectionIds, setSelectedCollectionIds] = useState();

  const allNftListHandler = async (cancelTokenSource) => {
    try {
      const res = await axios.post(
        Apiconfig.allListOrder,
        {
          limit: 12,
          collection: selectedCollectionIds
            ? [selectedCollectionIds._id]
            : null,
          itemCategory: selectedCategoryNames ? [selectedCategoryNames] : null,
        },
        {
          cancelToken: cancelTokenSource && cancelTokenSource.token,
          headers: {
            token: sessionStorage.getItem("token"),
          },
        }
      );
      if (res.data.statusCode === 200) {
        const filerdata = res.data.result.docs.filter((data) => {
          return data?.nftId?.physicalType !== "NORMAL";
        });
        console.log("filerdata+++12", filerdata);
        setAllNftList(filerdata);
      } else {
        setAllNftList([]);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setAllNftList([]);
      console.log("ERRORRRR", error);
    }
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    allNftListHandler(cancelTokenSource);
    return () => {
      cancelTokenSource.cancel();
    };
  }, [selectedCategoryNames, selectedCollectionIds]);

  // const listCategoryapi = async (page) => {
  //   try {
  //     const res = await axios({
  //       method: "Get",
  //       url: Apiconfig.listCategory,
  //       parms: {
  //         search: "",
  //       },
  //     });
  //     if (res.data.statusCode == 200) {
  //       if (res.data.result.docs) {
  //         setlistCategory(res.data.result.docs);
  //       }
  //     }
  //   } catch (error) {
  //     console.log("ERROR", error);
  //   }
  // };

  // const getcollectionListHandler = async () => {
  //   try {
  //     const res = await axios.get(Apiconfig.collectionList, {
  //       params: {
  //         limit: 50,
  //       },
  //     });
  //     if (res.data.statusCode === 200) {
  //       if (res.data.result.docs) {
  //         setCollectionList(res.data.result.docs);
  //       }
  //     }
  //   } catch (error) {
  //     console.log("ERRROR", error.message);
  //   }
  // };

  // useEffect(() => {
  //   // getcollectionListHandler();
  // }, []);

  return (
    <>
      <Box className={classes.root}>
        <Container maxWidth="lg">
          <Box>
            <Grid container alignItems="center">
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Box className="leftcontent">
                  <figure style={{ margin: "0" }}>
                    <img src="images/search1.png" alt="Search Image" />
                  </figure>
                  <Typography variant="h3">Physical NFTs</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} align="right">
                <Box className="rightcontent">
                  <Box className={classes.sectionTitleHead}>
                    {/* COLLECTION */}
                    <Button
                      className={classes.filterBtn}
                      onClick={(event) => setAnchorCol(event.currentTarget)}
                      style={{ marginRight: "0px" }}
                    >
                      <FilterListIcon />
                      {selectedCollectionIds
                        ? selectedCollectionIds.displayName.toString()
                        : "Brand"}
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorCol}
                      keepMounted
                      open={Boolean(anchorCol)}
                      onClose={() => setAnchorCol(null)}
                    >
                      <MenuItem
                        onClick={() => {
                          setAnchorCol(null);
                          setSelectedCollectionIds();
                        }}
                      >
                        All
                      </MenuItem>
                      {/* {collectionList?.map((data, i) => {
                        return (
                          <MenuItem
                            onClick={() => {
                              setAnchorCol(null);
                              setSelectedCollectionIds(data);
                            }}
                            key={i}
                          >
                            {data.displayName}
                          </MenuItem>
                        );
                      })} */}
                    </Menu>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box mt={2}>
            <Grid container spacing={2}>
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
                  {allNftList &&
                    allNftList.slice(0, 4).map((data, i) => {
                      return (
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                          <Box mt={2}>
                            <PhysicalNFTcard
                              callbackFun={allNftListHandler}
                              type="card"
                              data={data}
                              key={i}
                            />
                          </Box>
                        </Grid>
                      );
                    })}
                </>
              )}
              {!isLoading && allNftList && allNftList?.length === 0 && (
                <DataNotFound />
              )}
            </Grid>
            <Box align="right" mt={3}>
              {allNftList && allNftList?.slice(0, 4).length >= 4 && (
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  component={Link}
                  to="/explore"
                  className={classes.buttonright}
                >
                  View More
                </Button>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default PhysicalNFT;

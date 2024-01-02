import React, { useState, useContext, useEffect } from "react";
import {
  makeStyles,
  Box,
  Container,
  Typography,
  Grid,
  InputBase,
  InputAdornment,
  FormControl,
} from "@material-ui/core";
import { collectionData } from "src/constants";
import CollectionCard from "src/component/CollectionCard";
import { toast } from "react-toastify";
import Apiconfig from "src/ApiConfig/ApiConfig";
import axios from "axios";
import { BiSearchAlt2 } from "react-icons/bi";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { CgSearch } from "react-icons/cg";

import { UserContext } from "../../../context/User";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import DataNotFound from "src/component/DataNotFound";
import Pagination from "@material-ui/lab/Pagination";
import BrandListcard from "src/component/BrandListcard";
// import CollectionCardCard from "src/component/CollectionCardCard";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "60px 0px",
    [theme.breakpoints.down("xs")]: {
      padding: "50px 0px",
    },
    "& .heading": {
      "& h2": {
        paddingBottom: "30px",
      },
    },
    "& .maincontent": {},
  },
  searcBox: {
    backgroundColor: "#e5cf58",
    // border: "1px solid #e5cf58",
    borderRadius: " 50px",
  },
  mediaclass: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "25px",
    "@media(max-width:560px)": {
      display: "flex",

      flexDirection: "column",
    },
  },
  mediaclassname: {
    marginTop: "-10px",
    "@media(max-width:560px)": {
      paddingBottom: "30px",
    },
  },
}));

function BrandList(props) {
  const classes = useStyles();
  const accessToken = window.sessionStorage.getItem("token");
  const [collectionList, setCollectionList] = useState([]);
  const [pages, setpages] = useState(1);
  const [numpages, setNumpages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const user = useContext(UserContext);
  const [isPromoted, setisPromoted] = useState(false);

  const [check, setcheck] = useState(false);
  const [hotdata, setHotdata] = useState([]);
  const [search, setSearch] = useState();
  const getBrandCollectionListHanlder = async (id) => {
    if (search != "") {
      setIsLoading(true);
      try {
        axios({
          method: "POST",
          url: Apiconfig.listAllApproveBrand,
          headers: {
            token: accessToken,
          },
          data: {
            page: pages,
            limit: 20,
            search: search,
          },
        }).then(async (res) => {
          if (res.data.statusCode === 200) {
            setIsLoading(false);
            if (res.data.result.docs) {
              setCollectionList(res.data.result.docs);
              setNumpages(res.data.result.pages);
              setIsLoading(false);
            } else {
              setIsLoading(false);
            }
          }
        });
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    } else {
      try {
        setIsLoading(true);

        axios({
          method: "POST",
          url: Apiconfig.listAllApproveBrand,
          headers: {
            token: accessToken,
          },
          data: {
            page: pages,
            limit: 20,
          },
        }).then(async (res) => {
          if (res.data.statusCode === 200) {
            setIsLoading(false);

            if (res.data.result.docs) {
              setCollectionList(res.data.result.docs);
              setIsLoading(false);
            } else {
              setIsLoading(false);
            }
          }
        });
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    getBrandCollectionListHanlder();
  }, [user.userData, pages, search]);
  // const getCollectionListHanlder = async (cancelTokenSource) => {
  //   setIsLoading(true);
  //   if (search != "") {
  //     axios({
  //       method: "GET",
  //       url: `${Apiconfig.collectionList}?page=${pages}`,
  //       cancelToken: cancelTokenSource && cancelTokenSource.token,

  //       params: {
  //         limit: 24,
  //         search: search,
  //         isPromoted: isPromoted,
  //       },
  //     })
  //       .then(async (res) => {
  //         if (res.data.statusCode === 200) {
  //           if (res.data.result.docs) {
  //             const result = res.data.result.docs.filter(
  //               (data) => data.contractAddress.length > 10
  //             );
  //             const filterData = res.data.result.docs.filter(
  //               (data) => data?.displayName.trim() != "GenerativeNFT"
  //             );
  //             setNumpages(res.data.result.pages);
  //             setCollectionList(res.data.result.docs);
  //             setIsLoading(false);
  //           } else {
  //             setCollectionList([]);
  //             setIsLoading(false);
  //           }
  //           user.getlistCollection();
  //           setIsLoading(false);
  //         }
  //       })
  //       .catch(() => {
  //         setIsLoading(false);
  //       });
  //   } else {
  //     axios({
  //       method: "GET",
  //       url: `${Apiconfig.collectionList}?page=${pages}`,
  //       cancelToken: cancelTokenSource && cancelTokenSource.token,

  //       params: {
  //         limit: 24,
  //         isPromoted: isPromoted,
  //       },
  //     })
  //       .then(async (res) => {
  //         if (res.data.statusCode === 200) {
  //           if (res.data.result.docs) {
  //             const result = res.data.result.docs.filter(
  //               (data) => data.contractAddress.length > 10
  //             );
  //             const filterData = res.data.result.docs.filter(
  //               (data) => data?.displayName != "GenerativeNFT "
  //             );
  //             setNumpages(res.data.result.pages);
  //             setCollectionList(filterData);
  //             setIsLoading(false);
  //           } else {
  //             setCollectionList([]);
  //             setIsLoading(false);
  //           }
  //           user.getlistCollection();
  //           setIsLoading(false);
  //         }
  //       })
  //       .catch(() => {
  //         setIsLoading(false);
  //       });
  //   }
  // };
  // useEffect(() => {
  //   const cancelTokenSource = axios.CancelToken.source();
  //   getCollectionListHanlder(cancelTokenSource);
  //   // getCollectionListHanlder();
  //   setCollectionList([]);
  //   return () => {
  //     cancelTokenSource.cancel();
  //   };
  // }, [pages, search, isPromoted]);

  return (
    <>
      <Box className={classes.root}>
        <Container maxWidth="lg">
          <Box className={classes.mediaclass}>
            <Box className={classes.mediaclassname}>
              <Typography variant="h2">Brand List</Typography>
            </Box>
            <Box
              style={{
                marginTop: "-25px",
              }}
            >
              <FormControl variant="outlined" className={classes.searcBox}>
                <InputBase
                  type="search"
                  style={{
                    height: "100%",
                    // borderRadius: "50px",
                    // border: "1px solid #e5cf58",
                    paddingLeft: "2px",
                    width: "240px",
                  }}
                  id="outlined-adornment-weight"
                  className="field"
                  placeholder="Brand name"
                  onChange={(e) => setSearch(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <CgSearch
                        style={{ fontSize: "25px", marginLeft: "10px" }}
                      />
                    </InputAdornment>
                  }
                  aria-describedby="outlined-weight-helper-text"
                />
              </FormControl>
            </Box>
            {/* <Box
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {" "}
              <Box style={{ marginTop: "-10px" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      // onChange={handleChange}
                      style={{ color: "#e5cf58" }}
                      name="checkedB"
                      color="primary"
                      checked={isPromoted}
                      onChange={(e) => {
                        setisPromoted(e.target.checked);
                        setcheck(false);
                      }}
                    />
                  }
                  label={`Promoted`}
                />
              </Box>
              <Box
                style={{
                  padding: "0rem 0rem 1rem 0rem",
                }}
              >
                <FormControl variant="outlined" className={classes.searcBox}>
                  <InputBase
                    type="text"
                    style={{
                      height: "100%",
                      // borderRadius: "50px",
                      // border: "1px solid #e5cf58",
                      paddingLeft: "2px",
                      width: "240px",
                    }}
                    id="outlined-adornment-weight"
                    className="field"
                    placeholder="Collection name"
                    onChange={(e) => setSearch(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <CgSearch
                          style={{ fontSize: "25px", marginLeft: "10px" }}
                        />
                      </InputAdornment>
                    }
                    aria-describedby="outlined-weight-helper-text"
                  />
                </FormControl>
              </Box>
            </Box> */}
          </Box>
          <Box className="maincontent">
            <Grid container spacing={3}>
              {isLoading ? (
                <Box
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <ButtonCircularProgress />
                </Box>
              ) : (
                <>
                  {" "}
                  {collectionList &&
                    collectionList?.map((data, i) => {
                      return (
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                          <BrandListcard type="Card" data={data} key={i} />
                        </Grid>
                      );
                    })}
                </>
              )}
              {!isLoading && !collectionList && (
                <Box
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <DataNotFound />
                </Box>
              )}
              {!isLoading && collectionList && collectionList.length === 0 && (
                <DataNotFound />
              )}
            </Grid>
            {collectionList.length != 0 ? (
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

export default BrandList;

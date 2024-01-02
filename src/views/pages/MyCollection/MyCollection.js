import React, { useState, useContext, useEffect } from "react";
import {
  makeStyles,
  Box,
  Container,
  Typography,
  Grid,
} from "@material-ui/core";
import { collectionData } from "src/constants";
import MyCollectionCard from "src/component/MyCollectionCard";
import { toast } from "react-toastify";
import Apiconfig from "src/ApiConfig/ApiConfig";
import axios from "axios";
import { UserContext } from "../../../context/User";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import DataNotFound from "src/component/DataNotFound";
import Pagination from "@material-ui/lab/Pagination";
// import CollectionCardCard from "src/component/CollectionCardCard";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "40px 0px",
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
}));

function MyCollections(props) {
  const classes = useStyles();
  const accessToken = window.sessionStorage.getItem("token");
  const [collectionList, setCollectionList] = useState([]);
  const [pages, setpages] = useState(1);
  const [numpages, setNumpages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const user = useContext(UserContext);

  //   const getCollectionListHanlder = async () => {
  //     setIsLoading(true);
  //     axios({
  //       method: "GET",
  //       url: Apiconfig.myCollectionList,
  //       // params: {
  //       //   page,
  //       // },
  //       // headers: {
  //       //   token: accessToken,
  //       // },
  //     })
  //       .then(async (res) => {
  //         if (res.data.statusCode === 200) {
  //           if (res.data.result.docs) {
  //             const result = res.data.result.docs.filter(
  //               (data) => data.contractAddress.length > 10
  //             );
  //             setNumpages(res.data.result.pages);
  //             setCollectionList(result);
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
  //   };
  //   useEffect(() => {
  //     getCollectionListHanlder();
  //     setCollectionList(pages);
  //   }, [pages]);

  //   const accessToken = window.sessionStorage.getItem("token");
  const getCollectionListHanlder = async () => {
    setIsLoading(true);
    try {
      axios({
        method: "GET",
        url: `${Apiconfig.myCollectionList}?page=${pages}`,
        //   url: Apiconfig.myCollectionList,
        headers: {
          token: accessToken,
        },
      }).then(async (res) => {
        if (res.data.statusCode === 200) {
          setIsLoading(false);

          if (res.data.result.docs) {
            const result = res.data.result.docs.filter(
              (data) => data.contractAddress.length > 10
            );
            const filterData = res.data.result.docs.filter(
              (data) => data?.displayName.trim() != "GenerativeNFT"
            );

            // if (isCreateOrder) {
            //   setSelectedCollection(result);
            // } else {
            //   setCollectionList(result);
            // }
            setCollectionList(filterData);
          } else {
            setCollectionList([]);
          }
          // user.getlistCollection();
        }
      });
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    getCollectionListHanlder(cancelTokenSource, pages);
    // if (image !== "") {
    //   extensionCheckFun();
    // }
    return () => {
      cancelTokenSource.cancel();
    };
  }, [pages]);

  return (
    <>
      <Box className={classes.root}>
        <Container maxWidth="lg">
          <Box className="heading">
            <Typography variant="h2">My Collections</Typography>
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
                    collectionList.map((data, i) => {
                      return (
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                          <MyCollectionCard type="Card" data={data} key={i} />
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

export default MyCollections;

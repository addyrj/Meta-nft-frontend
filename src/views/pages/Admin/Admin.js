import {
  Box,
  Container,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  InputBase,
  InputAdornment,
  FormControl,
} from "@material-ui/core";
import { BiSearchAlt2 } from "react-icons/bi";
import { CgSearch } from "react-icons/cg";

import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import BlockIcon from "@material-ui/icons/Block";
import { useHistory } from "react-router-dom";
import { Tooltip } from "@material-ui/core";
import { sortAddress } from "src/utils";
import Transaction from "./Transaction";
import OnBid from "./OnBid";
import TotalNft from "./TotalNft";
import SoldNft from "./SoldNft";
import ReportedNft from "./ReportedNft";
import axios from "axios";
import apiConfig from "src/ApiConfig/ApiConfig";
import { Pagination } from "@material-ui/lab";
import moment from "moment";
import ReportedNFTList from "./ReportedNFTList";
import { UserContext } from "src/context/User";
import DataNotFound from "src/component/DataNotFound";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { toast } from "react-toastify";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaRegCopy } from "react-icons/fa";
import ReportedUserList from "./ReportUserList";
import RecentTransation from "./RecentTransation";
import AllBlockList from "./AllBlockList";
import TotalNFTT from "./TotalNFTT";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "35px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "35px 0",
    },
  },
  searcBox: {
    backgroundColor: "#DAF4FF",
    // border: "1px solid #daf4ff",
    maxHeight: " 41px",
    borderRadius: " 50px",
  },
  btnbox1: {
    "& button": {
      borderRadius: "10px",
      fontWeight: "600",
      fontSize: "14px",
      marginRight: "4px",
      "@media(max-width:767px)": {
        marginTop: "1rem",
      },
      "&.active": {
        color: "#fff",
        boxShadow: "0px 4px 4px rgb(0 0 0 / 25%)",
        background:
          "linear-gradient(261.87deg, #62D3F0 13.12%, #35A5F5 83.57%)",
      },
    },
  },
  heading: {
    "& h4": {
      fontSize: "40px",
      fontWeight: "700",
      color: "#35A5F5",
      [theme.breakpoints.down("xs")]: {
        fontSize: "23px",
      },
    },
  },
  tablesection: {
    "& td": {
      color: "#52565c",
    },
  },
  colorbox: {
    // marginTop: "16px",
    width: "100%",
    height: "auto",
    background: "#2e3130",
    backdropFilter: "blur(44px)",
    borderRadius: "15px",
    // padding: "20px",
  },
}));
const TableHeading = [
  {
    id: "Sr.No",
    label: "Sr.No",
    align: "left",
    minWidth: "25px",
    maxWidth: "70px",
  },
  // { id: "ID", label: "User Id", align: "left", maxWidth: "160px" },
  { id: "Username", label: "User Name", align: "left", minWidth: "160px" },
  {
    id: "walletAddress",
    label: "Wallet Address",
    align: "left",
    maxWidth: "160px",
  },
  { id: "orderCount", label: "Order Count", align: "left", minWidth: "160px" },
  {
    id: "Total Earning",
    label: "Total Earning",
    align: "left",
    minWidth: "130px",
  },
  {
    id: "status",
    label: "Status",
    align: "left",
    minWidth: "130px",
  },
  {
    id: "Registration Date",
    label: " Registration Date",
    align: "left",
    minWidth: "160px",
  },
  { id: " Action", label: " Action", align: "left", minWidth: "160px" },
];
const AdminTableHeading = [
  {
    id: "Sr.No",
    label: "Sr.No",
    align: "left",
    minWidth: "25px",
    maxWidth: "70px",
  },
  // { id: "ID", label: "User Id", align: "left", maxWidth: "160px" },
  { id: "name", label: "Name", align: "left", minWidth: "160px" },
  {
    id: "Email",
    label: "Email",
    align: "left",
    maxWidth: "160px",
  },

  {
    id: "Mobileno",
    label: "Mobile No.",
    align: "left",
    minWidth: "130px",
  },

  {
    id: "role",
    label: "Role",
    align: "left",
    minWidth: "160px",
  },
  { id: " dob", label: " Date of Birth", align: "left", minWidth: "160px" },
];

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}));
function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}
export default function Admin() {
  const classes = useStyles();
  const user = useContext(UserContext);
  const history = useHistory();
  const [tabview, setTabView] = useState("totalNft");
  const [allNftList, setAllNftList] = useState([]);
  const [soldNftList, setSoldNftList] = useState([]);
  
  const [hotBidList, setHotBidList] = useState([]);
  const [userReport, setUserReport] = useState([]);


  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [noOfPages, setNoOfPages] = useState(1);
  const [search, setSearch] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (user.isAdmin) {
      history.push("/");
    }
  }, [user.isAdmin]);

  const allNftListHandler = async () => {
    try {
      const res = await axios.post(
        apiConfig.allListOrder,
        {
          limit: 12,
          page: page,
        },
        {
          headers: {
            token: window.sessionStorage.getItem("token"),
          },
        }
      );
      if (res.data.statusCode == 200) {
        if (res.data.result.docs) {
          setNoOfPages(res.data.result.pages);
          setAllNftList(res.data.result.docs);
        }
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const soldNftListHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: apiConfig.soldNftList,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode == 200) {
        const filterData = res.data.result.filter((data) => {
          return data.nftId.isPlace === false;
        });
        setSoldNftList(filterData);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const hotBidListHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: apiConfig.hotBid,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode == 200) {
        const filetrnftdata = res.data.result.filter((data) => {
          return data?.orderId !== null;
        });
        setHotBidList(filetrnftdata);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const ReportUserHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: apiConfig.listUserToUserReport,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode == 200) {
        setUserReport(res.data.result);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  useEffect(() => {
    allNftListHandler();
    soldNftListHandler();
    hotBidListHandler();
  }, []);

  const getuserListHandler = async (cancelTokenSource) => {
    setIsLoading(true);
    try {
      if (search != "") {
        const res = await axios.get(apiConfig.listUser, {
          cancelToken: cancelTokenSource && cancelTokenSource.token,
          params: {
            page: page,
            limit: 15,
            search: search,
          },

          headers: {
            token: sessionStorage.getItem("token"),
          },
        });
        if (res.data.statusCode === 200) {
          if (res.data.result.docs) {
            setNoOfPages(res.data.result.pages);
            setUserList(res.data.result.docs);
            setIsLoading(false);
          } else {
            setNoOfPages(1);
            setUserList([]);
            setIsLoading(false);
          }
        } else {
          setNoOfPages(1);
          setUserList([]);
        }
      } else {
        const res = await axios.get(apiConfig.listUser, {
          cancelToken: cancelTokenSource && cancelTokenSource.token,
          params: {
            page: page,
            limit: 15,
          },

          headers: {
            token: sessionStorage.getItem("token"),
          },
        });
        if (res.data.statusCode === 200) {
          if (res.data.result.docs) {
            setNoOfPages(res.data.result.pages);
            setUserList(res.data.result.docs);
            setIsLoading(false);
          } else {
            setNoOfPages(1);
            setUserList([]);
            setIsLoading(false);
          }
        } else {
          setNoOfPages(1);
          setUserList([]);
        }
      }
    } catch (error) {
      console.log("ERROR", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    getuserListHandler(cancelTokenSource);
    return () => {
      cancelTokenSource.cancel();
    };
  }, [page, search]);

  return (
    <Box className={classes.root}>
      <Container>
        {/* <Box className={classes.heading}>
          <Typography variant="h4">User Management</Typography>
        </Box> */}
        <UserList
          userList={userList}
          getuserListHandler={getuserListHandler}
          isLoading={isLoading}
          setSearch={setSearch}
          noOfPages={noOfPages}
        />
        {/* <Box className={classes.heading} mt={3}>
          <Typography variant="h4" style={{ color: "#35A5F5" }}>
            Admin Management
          </Typography>
        </Box>
        <AdminList /> */}
        <Box className={classes.btnbox1} mt={3}>
          <Button
            className={tabview === "totalNft" ? "active" : ""}
            onClick={() => setTabView("totalNft")}
          >
            <Typography variant="h6">Total Nft</Typography>
          </Button>
          <Button
            className={tabview === "soldNft" ? "active" : ""}
            onClick={() => setTabView("soldNft")}
          >
            <Typography variant="h6">Sold Nft</Typography>
          </Button>
          <Button
            className={tabview === "onBid" ? "active" : ""}
            onClick={() => setTabView("onBid")}
          >
            <Typography variant="h6">Auction</Typography>
          </Button>
          <Button
            className={tabview === "report" ? "active" : ""}
            onClick={() => setTabView("report")}
          >
            <Typography variant="h6">Reported Nft</Typography>
          </Button>
          <Button
            className={tabview === "reportUser" ? "active" : ""}
            onClick={() => setTabView("reportUser")}
          >
            <Typography variant="h6">Reported User List</Typography>
          </Button>
          {/* <Button
            className={tabview === "recentTransation" ? "active" : ""}
            onClick={() => setTabView("recentTransation")}
          >
            <Typography variant="h6">Recent Transation</Typography>
          </Button> */}
          <Button
            className={tabview === "request" ? "active" : ""}
            onClick={() => setTabView("request")}
          >
            <Typography variant="h6">All Requested Blocked List</Typography>
          </Button>
        </Box>
        <Box mt={3}>
          {tabview === "totalNft" ? (
            <TotalNft nftList={allNftList} callbackFun={allNftListHandler} />
          ) : (
            ""
          )}
        </Box>
        <Box mt={3}>
          {tabview === "soldNft" ? (
            <TotalNft nftList={soldNftList} callbackFun={allNftListHandler} />
          ) : (
            ""
          )}
        </Box>
        <Box mt={3}>
          {tabview === "onBid" ? (
            <TotalNFTT nftList={hotBidList} callbackFun={allNftListHandler} />
          ) : (
            ""
          )}
        </Box>
        <Box mt={3}>
          {tabview === "report" ? (
            <ReportedNFTList
              nftList={allNftList}
              callbackFun={allNftListHandler}
            />
          ) : (
            ""
          )}
        </Box>
        <Box mt={3}>
          {tabview === "reportUser" ? (
            <ReportedUserList
              nftList={userReport}
              callbackFun={allNftListHandler}
            />
          ) : (
            ""
          )}
        </Box>
        {/* <Box mt={3}>
          {tabview === "recentTransation" ? (
            <RecentTransation
              nftList={allNftList}
              callbackFun={allNftListHandler}
            />
          ) : (
            ""
          )}
        </Box> */}
        <Box mt={3}>
          {tabview === "request" ? (
            <AllBlockList getuserListHandler={getuserListHandler} />
          ) : (
            ""
          )}
        </Box>
        {allNftList.length != 0 ? (
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
      </Container>
    </Box>
  );
}

export function UserList(props) {
  const { userList, isLoading, noOfPages, setSearch, getuserListHandler } =
    props;
  const classes = useStyles();
  const history = useHistory();

  const [page, setPage] = useState(1);

  const blockUserHandler = async (id) => {
    try {
      const res = await axios({
        method: "PUT",
        url: apiConfig.blockUnblockUser,

        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          _id: id,
        },
      });

      if (res.data.statusCode === 200) {
        if (res.data.result.status === "ACTIVE") {
          toast.success("User have been unblocked by admin");
        } else {
          toast.success("User have been blocked by admin");
        }

        // toast.success("User have been blocked");
        getuserListHandler();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className={classes.colorbox} mt={2}>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0rem 0rem 1rem 0rem",
        }}
      >
        <Box className={classes.heading}>
          <Typography variant="h4">User Management</Typography>
        </Box>
        <FormControl variant="outlined" className={classes.searcBox}>
          <InputBase
            type="text"
            style={{
              height: "100%",
              // borderRadius: "50px",
              // border: "1px solid #35a5f5",
              paddingLeft: "2px",
              width: "240px",
            }}
            // ref={searchTextRef}
            id="outlined-adornment-weight"
            autoFocus={true}
            className="field"
            placeholder="Search by wallet address"
            onChange={(e) => setSearch(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <CgSearch style={{ fontSize: "25px", marginLeft: "10px" }} />
              </InputAdornment>
            }
            aria-describedby="outlined-weight-helper-text"
          />
        </FormControl>
      </Box>
      <Box style={{ border: "1px solid #35A5F5", borderRadius: "11px" }}>
        <TableContainer className="tableHead">
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {TableHeading.map((data) => (
                  <TableCell
                    style={{
                      backgroundColor: "#35A5F5",
                      color: "#fff",
                      boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                      textAlign: "center",
                    }}
                  >
                    {data.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {userList &&
                userList.map((row, index) => {
                  return (
                    <TableRow key={index} className={classes.tablesection}>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          textTransform: "capitalize",
                          color: "rgb(100 104 109)",
                        }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          textTransform: "capitalize",
                        }}
                      >
                        {row.name ? row.name : "N/A"}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          textTransform: "capitalize",
                        }}
                      >
                        {sortAddress(row.walletAddress)}{" "}
                        <CopyToClipboard text={row.walletAddress}>
                          <FaRegCopy
                            size={14}
                            style={{ cursor: "pointer" }}
                            onClick={() => toast.info("Copied")}
                          />
                        </CopyToClipboard>
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          textTransform: "capitalize",
                        }}
                      >
                        {row.orderCount}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          textTransform: "capitalize",
                        }}
                      >
                        {row.totalEarning}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                        }}
                      >
                        {row.status}
                      </TableCell>

                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          textTransform: "capitalize",
                        }}
                      >
                        {moment(row.createdAt).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 5,
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                        }}
                        align="right"
                      >
                        <Box
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <BootstrapTooltip title="View User Details">
                            <VisibilityIcon
                              onClick={() => {
                                history.push({
                                  pathname: "/author",
                                  search: row?._id,
                                });
                              }}
                              style={{
                                fontSize: "25px",
                                cursor: "pointer",
                                marginRight: "5px",
                              }}
                            />
                          </BootstrapTooltip>

                          <BootstrapTooltip
                            title={
                              row?.status === "BLOCK" ? "Unblock" : "Block"
                            }
                          >
                            {row?.userType !== "Admin" ? (
                              <BlockIcon
                                fontSize="small"
                                style={
                                  row?.status === "BLOCK"
                                    ? {
                                        color: "red",
                                        fontSize: "22px",
                                        cursor: "pointer",
                                        marginTop: "2px",
                                      }
                                    : {
                                        fontSize: "22px",
                                        cursor: "pointer",
                                        marginTop: "2px",
                                      }
                                }
                                onClick={() => blockUserHandler(row._id)}
                              />
                            ) : (
                              <></>
                            )}
                          </BootstrapTooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}

              {!isLoading && userList && userList.length === 0 && (
                <Box
                  style={{
                    dislay: "flex",
                    justifyContent: "center",
                    marginTop: "1rem",
                  }}
                >
                  <DataNotFound />
                </Box>
              )}
              {isLoading && (
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    // width: "100%",
                    position: "absolute",
                    marginTop: "10px",
                  }}
                >
                  <ButtonCircularProgress />
                </Box>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {userList && userList.length != 0 ? (
          <Box mt={5} mb={2} display="flex" justifyContent="center">
            <Pagination
              count={noOfPages}
              page={page}
              onChange={(e, v) => setPage(v)}
            />
          </Box>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
}

export function AdminList() {
  const classes = useStyles();
  const history = useHistory();
  const [adminList, setAdminList] = useState([]);
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [isLoading1, setIsLoading1] = useState(false);

  const getAdminListHandler = async (cancelTokenSource) => {
    setIsLoading1(true);
    try {
      const res = await axios.get(apiConfig.listSubAdmin, {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
        params: {
          page: page,
          limit: 15,
        },
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        setIsLoading1(false);

        if (res.data.result) {
          setNoOfPages(res.data.result.pages);
          setAdminList(res.data.result);
          setIsLoading1(false);
        } else {
          setNoOfPages(1);
          setAdminList([]);
          setIsLoading1(false);
        }
      } else {
        setNoOfPages(1);
        setAdminList([]);
        setIsLoading1(false);
      }
    } catch (error) {
      console.log("ERROR", error);
      setIsLoading1(false);
    }
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    getAdminListHandler(cancelTokenSource);
    return () => {
      cancelTokenSource.cancel();
    };
  }, [page]);

  return (
    <Box className={classes.colorbox} mt={2}>
      <Box style={{ border: "1px solid #35A5F5", borderRadius: "11px" }}>
        <TableContainer className="tableHead">
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {AdminTableHeading.map((data) => (
                  <TableCell
                    style={{
                      backgroundColor: "#35A5F5",
                      color: "#fff",
                      boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                      textAlign: "center",
                    }}
                  >
                    {data.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {adminList &&
                adminList.map((row, index) => {
                  return (
                    <TableRow key={index} className={classes.tablesection}>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          textTransform: "capitalize",
                          color: "#fff",
                        }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          textTransform: "capitalize",
                        }}
                      >
                        {row.firstName + row.lastName}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          textTransform: "capitalize",
                        }}
                      >
                        {row.email}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          textTransform: "capitalize",
                        }}
                      >
                        {row.mobileNumber}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          textTransform: "capitalize",
                        }}
                      >
                        {row.userType}
                      </TableCell>

                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          textTransform: "capitalize",
                        }}
                      >
                        {moment(row.createdAt).format("DD/MM/YYYY")}
                      </TableCell>
                      {/* <TableCell
                        style={{
                          width: 5,
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                        }}
                        align="right"
                      >
                        <Box
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <BootstrapTooltip title="View User Details">
                            <VisibilityIcon
                              onClick={() => {
                                history.push({
                                  pathname: "/author",
                                  search: row?._id,
                                });
                              }}
                              style={{
                                fontSize: "25px",
                                cursor: "pointer",
                                marginRight: "5px",
                              }}
                            />
                          </BootstrapTooltip>
                        </Box>
                      </TableCell> */}
                    </TableRow>
                  );
                })}
              {!isLoading1 && adminList && adminList.length === 0 && (
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    position: "absolute",
                    marginTop: "10px",
                  }}
                >
                  <DataNotFound />
                </Box>
              )}
              {isLoading1 && (
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    position: "absolute",
                    marginTop: "10px",
                  }}
                >
                  <ButtonCircularProgress />
                </Box>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box mt={2} mb={2} display="flex" justifyContent="end">
          <Pagination
            count={noOfPages}
            page={page}
            onChange={(e, v) => setPage(v)}
          />
        </Box>
      </Box>
    </Box>
  );
}

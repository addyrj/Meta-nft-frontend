import apiConfig from "src/ApiConfig/ApiConfig";
import DataNotFound from "src/component/DataNotFound";

import {
  makeStyles,
  Box,
  Typography,
  Container,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  Button,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import MoreIcon from "@material-ui/icons/More";
import BlockIcon from "@material-ui/icons/Block";
import { AiOutlineFundView } from "react-icons/ai";
import { Tooltip } from "@material-ui/core";
import { toast } from "react-toastify";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaRegCopy } from "react-icons/fa";
import { sortAddress } from "src/utils";
import moment from "moment";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Pagination } from "@material-ui/lab";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

import axios from "axios";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  tablesection: {
    "& td": {
      color: "#fff",
    },
  },
  heading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& h4": {
      fontSize: "40px",
      fontWeight: "700",
      color: theme.palette.secondary.main,
      [theme.breakpoints.down("xs")]: {
        fontSize: "23px",
      },
    },
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
  { id: "title", label: "Comment", align: "left", minWidth: "160px" },
  { id: "title", label: "Rating", align: "left", minWidth: "160px" },
  // { id: "type", label: "Type", align: "left", minWidth: "160px" },
  { id: "update", label: "Date", align: "left", minWidth: "160px" },

  // { id: " Action", label: " Action", align: "left", minWidth: "160px" },
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
export default function FeedbackList() {
  const history = useHistory();
  const classes = useStyles();
  const [allListData, setAllListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [noOfPages, setNoOfPages] = useState(1);
  const [page, setPage] = useState(1);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log("page", page);
  const listfeedbackHandler = async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: `${apiConfig.listfeedback}?page=${page}`,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });

      if (res.data.statusCode === 200) {
        setAllListData(res.data.result.docs);
        setNoOfPages(res.data.result.pages);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    listfeedbackHandler();
  }, []);

  // const blockUserHandler = async (id) => {
  //   try {
  //     const res = await axios({
  //       method: "PUT",
  //       url: apiConfig.blockUnblockUser,

  //       headers: {
  //         token: window.sessionStorage.getItem("token"),
  //       },
  //       data: {
  //         _id: id,
  //       },
  //     });

  //     if (res.data.statusCode === 200) {
  //       blockListHandler();
  //       toast.success(res.data.responseMessage);

  //       if (getuserListHandler) {
  //         getuserListHandler();
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const [comment, setComment] = React.useState([]);
  const OpenModal = (comment) => {
    setComment(comment);

    setOpen(true);
  };

  return (
    <>
      <Container>
        <Box className={classes.heading} pt={3} pb={3}>
          <Typography variant="h4" style={{ color: "#35A5F5" }}>
            Feedback
          </Typography>
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
                {allListData.map((data, index) => {
                  return (
                    <TableRow className={classes.tablesection}>
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
                          color: "#000",
                        }}
                      >
                        {data?.userId?.name ? data?.userId?.name : "N/A"}
                      </TableCell>

                      <TableCell
                        onClick={() => {
                          history.push({
                            pathname: "/author",
                            search: data?.userId?._id,
                          });
                        }}
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          color: "#000",
                          cursor: "pointer",
                        }}
                      >
                        {sortAddress(data?.userId?.walletAddress)}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          color: "#000",
                          display: " flex",
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "90px",
                          }}
                        >
                          {data?.comment}
                        </Typography>
                        <BootstrapTooltip title="View more">
                          <VisibilityIcon
                            onClick={() => {
                              OpenModal(data?.comment);
                            }}
                            // onClick={() => {
                            //   setOpen(true);
                            // }}
                            style={{
                              fontSize: "15px",
                              cursor: "pointer",
                              marginLeft: "30px",
                              color: "black",
                            }}
                          />
                        </BootstrapTooltip>{" "}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          color: "#000",
                        }}
                      >
                        {data?.rating}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          color: "#000",
                        }}
                      >
                        {moment(data?.createdAt).format("DD/MM/YYYY")}
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
                                search: data._id,
                              });
                            }}
                            style={{
                              fontSize: "25px",
                              cursor: "pointer",
                              marginRight: "5px",
                              color: "black",
                            }}
                          />
                        </BootstrapTooltip> */}

                      {/* <BootstrapTooltip
                          title={data?.status === "BLOCK" ? "Unblock" : "Block"}
                        >
                          {data?.userType !== "Admin" ? (
                            <BlockIcon
                              fontSize="small"
                              style={
                                data?.status === "BLOCK"
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
                              onClick={() => blockUserHandler(data?._id)}
                            />
                          ) : (
                            <></>
                          )}
                        </BootstrapTooltip> */}
                      {/* </Box> */}
                      {/* </TableCell> */}
                    </TableRow>
                  );
                })}
                {!isLoading && allListData && allListData.length === 0 && (
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

          <div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              {/* <DialogTitle id="alert-dialog-title">
              {"Use Google's location service?"}
            </DialogTitle> */}
              <DialogContent>
                <DialogContentText
                  id="alert-dialog-description"
                  style={{ whiteSpace: " break-spaces" }}
                >
                  {comment}
                </DialogContentText>
              </DialogContent>
            </Dialog>
          </div>
          {/*  */}
          {allListData && allListData.length != 0 ? (
            <Box mt={2} mb={2} display="flex" justifyContent="center">
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
      </Container>
    </>
  );
}

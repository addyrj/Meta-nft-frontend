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
  makeStyles,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import apiConfig from "src/ApiConfig/ApiConfig";
import { Pagination } from "@material-ui/lab";
import moment from "moment";
import { sortAddress } from "src/utils";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Tooltip } from "@material-ui/core";
import DataNotFound from "src/component/DataNotFound";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "70px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "35px 0",
    },
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
        backgroundColor: "#D200A5",
      },
    },
  },
  heading: {
    "& h4": {
      fontSize: "40px",
      fontWeight: "700",
      color: theme.palette.secondary.main,
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
    padding: "20px",
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
  { id: "artist", label: "Artist", align: "left", minWidth: "160px" },
  {
    id: "ReporterName",
    label: "Reporter Name",
    align: "left",
    maxWidth: "160px",
  },
  { id: "NFTName", label: "NFT Name", align: "left", minWidth: "160px" },
  {
    id: "NoBids",
    label: "No Of Bids",
    align: "left",
    minWidth: "130px",
  },

  {
    id: "Date",
    label: "Date",
    align: "left",
    minWidth: "160px",
  },
  { id: " Action", label: " Action", align: "left", minWidth: "160px" },
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

export default function ReportedNFTList({}) {
  const classes = useStyles();
  const history = useHistory();
  const [reportsList, setReportsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);

  const reportsListHandler = async () => {
    setIsLoading(true);

    try {
      const res = await axios({
        method: "POST",
        url: apiConfig.reportsList,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          page: page,
        },
      });
      if (res.data.statusCode == 200) {
        setIsLoading(false);

        if (res.data.result.docs) {
          const filetrnftdata = res.data.result.docs.filter((data) => {
            return data?.reportType != "USER_REPORT";
          });
          setReportsList(filetrnftdata);
          setNoOfPages(res.data.result.pages);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log("ERROR", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    reportsListHandler();
  }, [page]);

  return (
    <Box className={classes.colorbox} mt={2}>
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
              {reportsList &&
                reportsList.map((row, index) => {
                  return (
                    <TableRow key={index} className={classes.tablesection}>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          textTransform: "capitalize",
                          color: "#52565c",
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
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          history.push({
                            pathname: "/author",
                            search: row?.userId?._id,
                          });
                        }}
                      >
                        {row?.userId?.userName
                          ? row?.userId?.userName
                          : sortAddress(row?.userId?.walletAddress)}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          textTransform: "capitalize",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "90px",
                        }}
                      >
                        {row?.name}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          textTransform: "capitalize",
                          textTransform: "capitalize",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "90px",
                        }}
                      >
                        {row.orderId?.tokenName}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          textTransform: "capitalize",
                        }}
                      >
                        {row.orderId?.bidId?.length}
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
                                  pathname: "/nft-report",
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

                          {/* <BootstrapTooltip title='Block'>
                                  <BlockIcon
                                    fontSize='small'
                                    style={{
                                      fontSize: "22px",
                                      cursor: "pointer",
                                      marginTop: "2px",
                                    }}
                                  />
                                </BootstrapTooltip> */}
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {!isLoading && reportsList && reportsList.length === 0 && (
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
        {reportsList && reportsList.length != 0 ? (
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
    </Box>
  );
}

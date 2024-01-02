import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Slide,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { Tooltip } from "@material-ui/core";

import VisibilityIcon from "@material-ui/icons/Visibility";
import Paper from "@material-ui/core/Paper";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import Apiconfig from "src/ApiConfig/ApiConfig";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

function createData(title, description) {
  return { title, description };
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  mainBox: {
    paddingTop: "100px",
    margin: "0px 40px",
    "& .heading": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
  },
  table: {
    minWidth: 400,
  },
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#e0e0e0",
    },
  },

  button: {
    minWidth: "initial",
    padding: "6px",
    marginLeft: "7px",
  },
  btn: {
    color: "#FFFFFF",
    backgroundColor: "#252d47",
    height: "44px",
    "&:hover": {
      background:
        "linear-gradient(124deg, rgba(47, 89, 149, 0.81) 18.76%, rgba(21, 29, 42, 0.87) 43.13%, rgba(0, 88, 241, 0.65) 96.83%)",
    },
  },
  butm: {
    display: "flex",
    justifyContent: "center",
    // "&:hover": {
    //         background: "linear-gradient(124deg, rgba(47, 89, 149, 0.81) 18.76%, rgba(21, 29, 42, 0.87) 43.13%, rgba(0, 88, 241, 0.65) 96.83%)"

    // },
  },
  butm1: {
    backgroundColor: "#252d47",
    color: "#fff",
    "&:hover": {
      background:
        "linear-gradient(124deg, rgba(47, 89, 149, 0.81) 18.76%, rgba(21, 29, 42, 0.87) 43.13%, rgba(0, 88, 241, 0.65) 96.83%)",
    },
  },
  butm2: {
    backgroundColor: "#252d47",
    color: "#fff",
    "&:hover": {
      background:
        "linear-gradient(124deg, rgba(47, 89, 149, 0.81) 18.76%, rgba(21, 29, 42, 0.87) 43.13%, rgba(0, 88, 241, 0.65) 96.83%)",
    },
  },
}));

const userlistData = [
  {
    question: "kgjhkjhl",
    answer: "kgjhkjhl",
    status: "kgjhkjhl",
  },
  {
    question: "kgjhkjhl",
    answer: "kgjhkjhl",
    status: "kgjhkjhl",
  },
  {
    question: "kgjhkjhl",
    answer: "kgjhkjhl",
    status: "kgjhkjhl",
  },
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

export default function FAQ() {
  const classes = useStyles();
  const history = useHistory();
  const [userlist, setuserlist] = useState([]);

  //   const accessToken = window.localStorage.getItem("creatturAccessToken");
  const [idd1, setidd1] = React.useState([]);
  //   const [deletee, setDeleteData] = React.useState();
  //   console.log("=====idd1", idd1);
  const [isLoading, setIsLoading] = useState(false);

  const [open1, setOpen1] = React.useState(false);

  //   // const OpenModal = (id) => {
  //   //   setidd1(id);
  //   //   setOpen(true);
  //   // };

  const OpenModal1 = (id) => {
    setidd1(id);
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  //   console.log("userlist...................", userlist);
  const FaqdataApi = async () => {
    setuserlist([]);
    try {
      setIsLoading(true);
      await axios.get(Apiconfig.faqList).then(async (res) => {
        if (res.data.statusCode == 200) {
          setuserlist(res.data.result);
          setIsLoading(false);
          // setNumpages(res.data.result.pages);
          // setTotal(res.data.result);
        } else {
          setIsLoading(false);
        }
      });
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    FaqdataApi();
  }, []);

  const handledeleteFAQ = async (id1) => {
    try {
      const res = await axios({
        method: "DELETE",
        url: Apiconfig.deleteFAQ,
        headers: {
          token: sessionStorage.getItem("token"),
        },
        data: {
          _id: idd1._id,
        },
      }).then(async (res) => {
        if (res.data.statusCode === 200) {
          FaqdataApi();
          setOpen1(false);
          // setDeleteData(res.data.result);

          toast.success("Successfully deleted");
          // toast.success("Successfully deleted", {
          //   position: "top-right",
          //   theme: "colored",
          //   autoClose: 3000,
          //   hideProgressBar: true,
          // });
        }
        // setOpen1(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <Container> */}
      <Box className={classes.mainBox}>
        <Box className="heading">
          <Typography variant="h1" style={{ color: "#35A5F5" }}>
            {" "}
            Faq{" "}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            // className={classes.btn}
            onClick={() => history.push("/add-faqdata")}
          >
            Add New
          </Button>
        </Box>
        <Box mt={3}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{ color: "white", backgroundColor: "#51ACED" }}
                    align="left"
                  >
                    S.No
                  </TableCell>
                  <TableCell
                    style={{
                      color: "white",
                      backgroundColor: "#51ACED",
                      minWidth: "200px",
                    }}
                  >
                    Question
                  </TableCell>
                  <TableCell
                    style={{
                      color: "white",
                      backgroundColor: "#51ACED",
                      minWidth: "200px",
                    }}
                  >
                    Answer
                  </TableCell>
                  <TableCell
                    style={{ color: "white", backgroundColor: "#51ACED" }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    style={{ color: "white", backgroundColor: "#51ACED" }}
                    align="center"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              {isLoading ? (
                <Box display="flex" alignItems="center" ml={2}>
                  <h4 style={{ fontFamily: "Roboto" }}>Loading....</h4>{" "}
                  <ButtonCircularProgress />
                </Box>
              ) : (
                <TableBody>
                  {userlist.map((data, index) => (
                    <TableRow key={index} className={classes.root}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      {/* <TableCell align="left">{row.Id}</TableCell> */}
                      <TableCell align="left">{data.question}</TableCell>
                      <TableCell align="left">
                        <div
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "pre",
                            maxWidth: "200px",
                            lineHeight: "0px",
                          }}
                          dangerouslySetInnerHTML={{ __html: data.answer }}
                        />
                        {/* {data.answer} */}
                      </TableCell>
                      <TableCell align="left">{data.status}</TableCell>

                      <TableCell align="left">
                        <Box display="flex" justifyContent="center">
                          <>
                            <BootstrapTooltip title="Edit Faq">
                              <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                onClick={() =>
                                  history.push({
                                    pathname: "/editfaq-list",
                                    search: data._id,
                                  })
                                }
                              >
                                <EditIcon style={{ width: "25px" }} />{" "}
                              </Button>
                            </BootstrapTooltip>
                          </>
                          <>
                            <BootstrapTooltip title="View Faq">
                              <Button
                                onClick={() =>
                                  history.push({
                                    pathname: "/view-faqdata",
                                    state: { data },
                                  })
                                }
                                variant="contained"
                                color="primary"
                                className={classes.button}
                              >
                                <VisibilityIcon style={{ width: "25px" }} />
                              </Button>
                            </BootstrapTooltip>
                          </>
                          <>
                            <BootstrapTooltip title="Delete Faq">
                              <Button
                                // onClick={() => {
                                //   handleblock(userlist._id);
                                // }}
                                onClick={() => {
                                  OpenModal1(data);
                                }}
                                variant="contained"
                                color="primary"
                                className={classes.button}
                              >
                                <DeleteIcon
                                  style={{ width: "25px", color: "red" }}
                                />
                              </Button>
                            </BootstrapTooltip>
                          </>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
            {userlist.length === 0 && (
              <Box pt={1} align="center" pb={1}>
                <Typography>Data not found</Typography>
              </Box>
            )}
          </TableContainer>
        </Box>
      </Box>
      <Dialog
        open={open1}
        // TransitionComponent={Transition}
        keepMounted
        onClose={handleClose1}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            style={{ color: "#52565c", fontSize: "18px", fontWeight: "400" }}
          >
            Are you sure you want to delete
            {/* {`Are you sure you want to ${
              idd1.status === "BLOCK" ? "ACTIVE" : "BLOCK"
            } the user?`} */}
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.butm}>
          <Box mb={2}>
            <Button
              style={{ marginRight: "5px" }}
              className={classes.butm1}
              onClick={() => {
                handledeleteFAQ(idd1);
              }}
              variant="contained"
              color="primary"
            >
              Yes {}
            </Button>
            <Button
              style={{ marginLeft: "5px" }}
              onClick={handleClose1}
              className={classes.butm2}
              variant="contained"
              color="primary"
            >
              No
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      {/* </Container> */}
    </>
  );
}

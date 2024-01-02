import {
  Box,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Typography,
  DialogTitle,
  DialogContentText,
  IconButton,
  FormControl,
  InputAdornment,
  TextField,
  InputBase,
  Button,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import BlockIcon from "@material-ui/icons/Block";
import { toast } from "react-toastify";

import React, { useState, useEffect } from "react";
import { Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { sortAddress } from "src/utils";
import { useHistory } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import apiConfig from "src/ApiConfig/ApiConfig";
import { Pagination } from "@material-ui/lab";
import DataLoading from "src/component/DataLoading";
import DataNotFound from "src/component/DataNotFound";
import { Link } from "react-router-dom";
import { GiCancel, GiPaintBrush } from "react-icons/gi";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import moment from "moment";
import { Delete, Edit } from "@material-ui/icons";
import About from "./about/About";

const useStyles = makeStyles((theme) => ({
  root2: {
    display: "flex",
    justifyContent: "space-between",
    "@media(max-width:420px)": {
      display: "block",
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
    // width: "100%",
    height: "auto",
    // background: "rgba(59, 13, 96, 0.4)",
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
    maxWidth: "30px",
  },
  { id: "name", label: "Name", align: "left", minWidth: "160px" },

  {
    id: "categoryicon",
    label: "Icon",
    align: "left",
    minWidth: "160px",
  },
  {
    id: "date",
    label: "Date",
    align: "left",
    minWidth: "160px",
  },
  {
    id: "status",
    label: "Status",
    align: "left",
    minWidth: "100px",
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

export default function CreatorList() {
  const history = useHistory();
  const classes = useStyles();
  const [coverFileBase, setCoverFileBase] = useState("");

  const [search, setSearch] = useState();
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [categorylist, setCategorylist] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [bannerImage, setBannerImage] = useState("");
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [bannerImageBlob, setBannerImageBlob] = useState("");
  const [imgFile, setImgfile] = useState("");

  const [open1, setOpen1] = useState(false);
  const [aboutList, setAboutList] = useState([]);
  const [deleteLoader, setdeleteLoader] = useState(false);
  const [Id, setId] = useState();

  const [open5, setOpen5] = React.useState(false);

  const handleClickOpen = () => {
    setOpen5(true);
  };

  const handleClose = () => {
    setOpen5(false);
  };
  const [formValue, setFormValue] = useState({
    CategoryName: "",
  });
  const handleClickOpenDelete = (id) => {
    setOpen1(true);
    setId(id);
  };

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (err) {
      console.log("Error: ", err);
    };
  };
  const _onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const temp = { ...formValue, [name]: value };
    setFormValue(temp);
  };
  const listCategoryApi = async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.listCategory,
      });
      if (res.data.statusCode === 200) {
        setCategorylist(res.data.result.docs);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    try {
      setdeleteLoader(true);
      const res = await axios({
        method: "DELETE",
        url: Apiconfigs.deleteCategory,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          _id: id,
        },
      });
      if (res.data.statusCode === 200) {
        toast.success(res.data.responseMessage);

        listCategoryApi();
        setdeleteLoader(false);
        setOpen1(false);
      } else if (res.data.statusCode === 500) {
        toast.error(res.data.responseMessage);
        setdeleteLoader(false);
      } else {
        toast.error(res.data.responseMessage);
        setdeleteLoader(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
      setdeleteLoader(false);
    }
  };
  const handleSubmit = async (id) => {
    try {
      const res = await axios({
        method: "DELETE",
        url: Apiconfigs.deleteFAQ,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          _id: id,
        },
      });
      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
      } else if (res.data.responseCode === 500) {
        toast.error(res.data.responseMessage);
      } else {
        toast.error(res.data.responseMessage);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    listCategoryApi();
  }, []);

  const addcategoryHandler = async () => {
    setIsSubmit(true);

    if (formValue.displayName === undefined) {
      toast.warn("Please enter valid data");
      return;
    }
    try {
      setIsLoading1(true);
      const formData = new FormData();
      formData.append("categoryIcon", imgFile);
      formData.append(
        "categoryTitle",
        formValue.displayName.trim().toLowerCase()
      );

      const res = await axios({
        method: "POST",
        url: Apiconfigs.addCategory,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: formData,
      });
      if (res.data.statusCode === 200) {
        setIsLoading1(false);
        setOpen(false);
        listCategoryApi();
        toast.success(res.data.responseMessage);
      } else if (res.data.responseCode === 404) {
        setIsLoading1(false);
        toast.error(res.data.responseMessage);
      } else if (res.data.statusCode === 500) {
        setIsLoading1(false);
        toast.error(res.data.responseMessage);
      } else {
        toast.error(res.data.responseMessage);
        setIsLoading1(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading1(false);
      if (error.response) {
        toast.warn(error.response.data.responseMessage);
      } else {
        toast.error(error.message);
      }
    }
  };
  // const [imagedata, setImageData] = useState();
  // const imageData = (data) => {
  //   setOpen5(true);
  //   getBase64(data, (result) => {
  //     setImageData(result);

  //   });
  //   // setImageData(data);
  //   console.log("data++", imagedata);
  // };

  return (
    <>
      <Box>
        <Box className={classes.colorbox} mt={1}>
          <Box className={classes.root2}>
            <Box className={classes.heading}>
              <Typography variant="h4">Category</Typography>
            </Box>
            <Box className="d-flex" style={{ padding: "5px" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(true)}
              >
                Add Category
              </Button>
            </Box>
          </Box>
          <Box
            style={{ border: "1px solid #3b0d60", borderRadius: "11px" }}
            mt={2}
          >
            <TableContainer className="tableHead">
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {TableHeading.map((data) => (
                      <TableCell
                        style={{
                          backgroundColor: "rgb(53, 165, 245)",
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
                  {categorylist &&
                    categorylist?.map((data, index) => {
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
                            }}
                          >
                            {data?.categoryTitle}
                          </TableCell>

                          <TableCell
                            align="left"
                            style={{
                              boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                              textAlign: "center",
                              textTransform: "capitalize",
                            }}
                          >
                            {/* <BootstrapTooltip title="View image"> */}
                            <img
                              src={data?.categoryIcon}
                              // onClick={() => imageData(data.categoryIcon)}
                              style={{
                                // cursor: "pointer",
                                height: "30px",
                                width: "30px",
                                borderRadius: "50%",
                              }}
                            />
                            {/* </BootstrapTooltip> */}
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{
                              boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                              textAlign: "center",
                              textTransform: "capitalize",
                            }}
                          >
                            {moment(data?.updatedAt).format("DD/MM/YYYY")}
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{
                              boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                              textAlign: "center",
                              textTransform: "capitalize",
                            }}
                          >
                            {data?.status}
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
                              {/* <BootstrapTooltip title="View Faq Details">
                              <VisibilityIcon
                                onClick={() => {
                                  history.push({
                                    pathname: "/faqview",
                                    search: data?.userId?.toString(),
                                    hash: data?._id,
                                  });
                                }}
                                style={{
                                  fontSize: "25px",
                                  cursor: "pointer",
                                  marginRight: "5px",
                                }}
                              />
                            </BootstrapTooltip> */}

                              <BootstrapTooltip title="Delete Category">
                                <Delete
                                  fontSize="small"
                                  style={{
                                    fontSize: "22px",
                                    cursor: "pointer",
                                    marginTop: "2px",
                                  }}
                                  onClick={() =>
                                    handleClickOpenDelete(data._id)
                                  }
                                />
                              </BootstrapTooltip>
                              <BootstrapTooltip title="Edit this category">
                                <Edit
                                  fontSize="small"
                                  style={{
                                    fontSize: "22px",
                                    cursor: "pointer",
                                    marginTop: "2px",
                                  }}
                                  onClick={() => {
                                    history.push({
                                      pathname: "/edit-category",
                                      search: data?.userId?.toString(),
                                      hash: data?._id,
                                      state: { data },
                                    });
                                  }}
                                />
                              </BootstrapTooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {!isLoading && categorylist && categorylist.length === 0 && (
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
          </Box>
        </Box>
      </Box>

      {/* <Dialog
        open={open5}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
       
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {imagedata}
          </DialogContentText>
        </DialogContent>
      </Dialog> */}

      <Dialog
        open={open}
        className={classes.createbox}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.paper }}
      >
        <DialogActions>
          <IconButton
            onClick={() => setOpen(false)}
            className={classes.customizedButton}
          >
            <GiCancel />
          </IconButton>
        </DialogActions>
        <DialogContent className={classes.dialogBox}>
          <Box className={classes.NftBreed}>
            <Box className="modal_text">
              <Typography
                variant="h5"
                align="center"
                style={{ color: " #039be3" }}
              >
                Add Category
              </Typography>
              <Box
                className={classes.createCollection}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box
                  style={{
                    border: "1px solid #52565c",
                    height: "100px",
                    width: "100px",
                    borderRadius: "50%",
                  }}
                >
                  {imgFile !== "" ? (
                    <img
                      src={coverFileBase}
                      alt=""
                      width="100"
                      height="100"
                      style={{ borderRadius: "50%" }}
                    />
                  ) : (
                    <figure></figure>
                  )}
                </Box>
                <Box pl={2}>
                  <Typography variant="body2">
                    We recommend an image of at least 400x400.
                  </Typography>
                  <Typography variant="body2" style={{ color: "#000" }}>
                    Select Category Image
                  </Typography>
                  <Box>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="raised-button-file-banner"
                      type="file"
                      name="collectionIMG"
                      // onChange={(e) => {
                      //   setImgfile(e.target.files[0]);
                      // }}
                      onChange={(e) => {
                        // setCoverBlob(URL.createObjectURL(e.target.files[0]));
                        setImgfile(e.target.files[0]);
                        getBase64(e.target.files[0], (result) => {
                          setCoverFileBase(result);
                        });
                      }}
                    />
                    <label htmlFor="raised-button-file-banner">
                      <Button
                        variant="contained"
                        color="secondary"
                        component="span"
                      >
                        Choose File
                      </Button>
                    </label>
                    {isSubmit && imgFile === "" && (
                      <Typography style={{ color: "#ff7d68" }} variant="body2">
                        Please select banner image
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>

              <Box mt={2} className={classes.textfiledlabel}>
                <Box mt={2}>
                  <label>
                    Category name<span style={{ color: "#ff7d68" }}>*</span>
                  </label>
                  <FormControl fullWidth className={classes.margin}>
                    <TextField
                      id
                      inputProps={{ maxLength: 20 }}
                      placeholder="Enter token name"
                      name="displayName"
                      value={formValue.displayName}
                      onChange={(e) => _onInputChange(e)}
                      error={isSubmit && formValue.displayName === ""}
                      helperText={
                        isSubmit &&
                        formValue.displayName === undefined &&
                        "Please select category name"
                      }
                    />
                    {isSubmit && formValue.displayName === undefined && (
                      <Typography style={{ color: "#ff7d68" }} variant="body2">
                        Please select category name
                      </Typography>
                    )}
                  </FormControl>
                </Box>
              </Box>
              <Box mt={3} mb={4} textAlign="Center">
                <Button
                  variant="contained"
                  size="large"
                  onClick={addcategoryHandler}
                  color="primary"
                  disabled={isLoading1}
                >
                  Add Category {isLoading1 && <ButtonCircularProgress />}
                </Button>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog
        open={open1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography style={{ color: " #039be3", fontSize: "17px" }}>
            {"Delete Category?"}
          </Typography>
        </DialogTitle>
        <DialogContent style={{ marginTop: "-8px" }}>
          <DialogContentText
            id="alert-dialog-description"
            style={{ fontSize: "16px" }}
          >
            Are you sure you want to Delete this Category ?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ marginTop: "-16px", fontSize: "16px" }}>
          <Button onClick={() => setOpen1(false)}>No</Button>
          <Button onClick={() => deleteCategory(Id)} autoFocus>
            Yes{" "}
            {deleteLoader && (
              <ButtonCircularProgress
                style={{ height: "25px", width: "25px", marginLeft: "5px" }}
              />
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

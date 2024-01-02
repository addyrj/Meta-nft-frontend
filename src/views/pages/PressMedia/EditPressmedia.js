import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ApiConfig from "src/ApiConfig/ApiConfig";
import * as yep from "yup";
import { Formik, ErrorMessage, Form } from "formik";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Container,
  makeStyles,
} from "@material-ui/core";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  mainbox: {
    paddingTop: "60px",
    paddingBottom: "50px",
    "& h2": {
      color: "#fff",
    },
    "& label": {
      color: "#000",
      padding: "0",
      fontSize: "14px",
      lineHeight: "33px",

      transition:
        "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    },
    "& p": {
      // paddingTop: "15px",
      color: "#000",
      //   marginTop:"30px"
    },
  },
  maintext: {
    padding: "30px",
    marginTop: "10px",
    bordeRadius: "10px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    // border: "1px solid #52b6f1",
  },
}));

const EditPressmedia = (props) => {
  const classes = useStyles();
  const [imgFile, setImgFile] = useState("");

  const [isSubmit, setisSubmit] = useState(false);
  const history = useHistory();

  const [confirmation, setConfirmation] = useState(false);
  const [coverFileBase, setCoverFileBase] = useState("");
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
  const [isUpdating, setIsUpdating] = useState(false);
  return (
    <Box className={classes.mainbox}>
      <Container maxWidth="lg">
        <Box mb={5} textAlign="center">
          <Container maxWidth="sm">
            <Typography variant="h2" style={{ color: "rgb(53, 165, 245)" }}>
              Add Press Media
            </Typography>
            <Typography variant="body2">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form,
            </Typography>
          </Container>
        </Box>

        <Formik
          initialValues={{
            image: "",
            title: "",
            description: "",
            type: "Image",
            url: "",
          }}
          validationSchema={yep.object().shape({
            // image: yep.string().email().required("Please Enter email"),
            title: yep.string().required("Please enter first name"),
            description: yep.string().required("Please enter message field"),
            url: yep
              .string("Please enter valid  url")
              .matches(
                /((http|https):\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
                "Enter correct url!"
              ),
          })}
          onSubmit={async ({ image, title, description, type, url }) => {
            setIsUpdating(true);

            try {
              setisSubmit(true);
              // if (userType === "USER") {
              axios
                .post(ApiConfig.addPressMediaContent, {
                  image: coverFileBase,
                  title: title,
                  description: description,
                  type: type,
                  url: url,
                })
                .then(async (response) => {
                  if (response.data.statusCode === 200) {
                    toast.success(response.data.responseMessage);
                    history.push("/media-list");
                    // toast.success("You have successfully registered");
                    setIsUpdating(false);
                  } else if (response.status === 401) {
                    toast.success(response.data.responseMessage);
                    setIsUpdating(false);
                  } else {
                    setIsUpdating(false);
                    toast.success(response.data.responseMessage);
                    setConfirmation(true);
                  }
                })
                .catch((err) => {
                  console.log(err.message);
                  setIsUpdating(false);
                });
              // }
            } catch (err) {
              console.log("submitted");
              console.error(err.response);
              //  setIsLoading(false);
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box className={classes.maintext}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Box
                      className={classes.createCollection}
                      display="flex"
                      // justifyContent="space-between"
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
                              setImgFile(e.target.files[0]);
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
                            <Typography
                              style={{ color: "#ff7d68" }}
                              variant="body2"
                            >
                              Please select banner image
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <Box>
                      <label>*Title</label>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        error={Boolean(touched.title && errors.title)}
                        fullWidth
                        helperText={touched.title && errors.title}
                        name="title"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.title}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={12}>
                    <Box>
                      <label>*Url</label>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        error={Boolean(touched.url && errors.url)}
                        fullWidth
                        helperText={touched.url && errors.url}
                        name="url"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.url}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Box mt={2}>
                  <Box>
                    <label>*Description</label>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      error={Boolean(touched.description && errors.description)}
                      fullWidth
                      helperText={touched.description && errors.description}
                      name="description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.description}
                      multiline
                      rowsMax={10}
                      rows={10}
                    />
                  </Box>
                </Box>
                <Box
                  mt={4}
                  display="flex"
                  justifyContent="start"
                  alignItem="cenetr"
                >
                  <Button
                    color="primary"
                    // disabled={isSubmitting}
                    size="large"
                    type="submit"
                    variant="contained"
                    disabled={isUpdating}
                  >
                    Submit {isUpdating && <ButtonCircularProgress />}
                  </Button>
                  <Box pl={2}>
                    <Link to="/media-list" style={{ textDecoration: "none" }}>
                      <Button
                        color="primary"
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        Cancel
                      </Button>
                    </Link>
                  </Box>
                </Box>
              </Box>
            </form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default EditPressmedia;

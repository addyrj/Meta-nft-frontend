import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  Link,
  Button,
  FormControl,
  Input,
  makeStyles,
  InputAdornment,
  FormHelperText,
} from "@material-ui/core";
import { BiLockOpen } from "react-icons/bi";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yep from "yup";
import ApiConfig from "src/ApiConfig/ApiConfig";
// import ApiConfig from "src/connectors/config/ApiConfig";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "src/context/User";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

const useStyles = makeStyles((theme) => ({
  Box: {
    background: theme.palette.primary.main,
    border: "1px solid #898989",
    height: "200px",
    width: "200px",
    borderRadius: "25px",
  },

  FAQ: {
    padding: "50px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "35px 0",
    },
  },
  PageHeading: {
    paddingBottom: "20px",
  },
  editsection: {
    "& h2": {
      color: "#fff",
      display: "flex",
      fontSize: "30px",
      alignItems: "center",
      fontWeight: " 700",
      paddingBottom: "25px",
    },
    "& h3": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#fff",
    },
  },
  inputfield: {
    "& label": {
      color: "#000",
      marginTop: "22px",
      fontSize: "14px",
    },
  },
  imagefiled: {
    "& label": {
      color: "#000",
    },
    "& small": {},
  },
  inputsection: {
    color: "#52565c",
    cursor: "text",
    position: "relative",
    fontSize: "1rem",
    boxSizing: "border-box",
    fontWeight: "400",
    lineHeight: "1.1876em",
    "& input": {
      color: "#443f3f",
      width: "100%",
      border: "0",
      height: "1.1876em",
      margin: "0",
      display: "block",
      padding: "6px 0 7px",
      fontSize: "14px",
      minWidth: "0",
      background: "none",
      boxSizing: "content-box",
      animationName: "mui-auto-fill-cancel",
      letterSpacing: "inherit",
      animationDuration: "10ms",
      WebkitTapHighlightColor: "transparent",
    },
  },
  message: { color: theme.palette.primary.main },
  colorbox: {
    padding: "20px",
    background: "#FFFFFF",
    boxShadow: "rgb(99 99 99 / 20%) 0px 2px 8px 0px",
    borderRadius: "10px",
    "& h3": {
      color: "#000",
      fontSize: "14px",
      fontFamily: "'Poppins', sans-serif",
      fontWeight: "400",
      lineHeight: "1.43",
      "& img": {
        marginRight: "20px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "20px",
      },
    },
  },
  coverImg: {
    overflow: "hidden",
    // background: 'rgba(0,0,0,0.7)',
    position: "relative",
    backgroundPosition: "center !important",
    backgroundRepeat: " no-repeat !important",
    backgroundSize: "100% !important",
    height: "86px",
    borderRadius: "10px",
    width: "300px",

    "& img": {
      // minHeight: '100%',
      // minWidth: '100%',
      height: "auto",
      width: "100%",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  },
  box1: {
    background: theme.palette.primary.main,
    border: "1px solid #898989",
    height: "86px",
    borderRadius: "25px",
    width: "300px",
    overflow: "hidden",
  },
  imgsecbox: {
    "@media(min-width:960px)": {
      display: "none",
    },
  },
  imgsecbox1: {
    "@media(max-width:960px)": {
      display: "none",
    },
  },
}));
export const getBase64 = (file, cb) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (err) {
    console.log("Error: ", err);
  };
};

export default function Editprofile() {
  const classes = useStyles();
  const user = useContext(UserContext);

  const [coverImage, setCoverImage] = useState("");
  const [coverImage64, setCoverImage64] = useState(
    user?.userData?.coverPic ? user?.userData?.coverPic : ""
  );
  const accessToken = window.sessionStorage.getItem("token");

  const [errMessage, setImgError] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [profileImage64, setProfileImage64] = useState(
    user?.userData?.profilePic ? user?.userData?.profilePic : ""
  );

  const history = useHistory();

  const [loader1, setLoader1] = useState(false);

  const formValidationSchema = yep.object().shape({
    name: yep
      .string("Enter valid name")
      .required("Name is  required  ")
      .strict(true)
      .nullable()
      .trim("Please remove space")
      .min(4, "Your name should be atleast 4 characters long")
      .max(30, "Your name should not be more than 30 characters"),

    bio: yep
      .string("Enter valid bio")
      .required("Bio is  required  ")
      .strict(true)
      .nullable()
      .trim("Please remove space")
      .min(10, "Your bio should be atleast 10 characters long")
      .max(300, "Your bio should not be more than 300 characters"),
    customUrl: yep
      .string("Enter valid twitter url")
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Enter correct url!"
      )
      .trim("Please remove space"),

    twitter: yep
      .string("Enter valid twitter url")
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Enter correct url"
      )
      .trim("Please remove space"),
    facebook: yep
      .string("Enter valid facebook url")
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Enter correct url"
      )
      .trim("Please remove space"),
    personalSite: yep
      .string("Enter valid personalSite url")
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Enter correct url"
      )
      .trim("Please remove space"),
    email: yep
      .string()
      .email("You have entered an invalid email address.")
      .required("Email address is required")
      .matches("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"),
  });

  return (
    <>
      <Box className={classes.FAQ}>
        {user?.userData && (
          <Box mb={2}>
            <Container maxWidth="lg">
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  className={classes.editsection}
                >
                  <Formik
                    initialValues={{
                      name: user?.userData?.name ? user?.userData?.name : "",

                      coverPic: user?.userData?.coverPic
                        ? user?.userData?.coverPic
                        : "",
                      profilePic: user?.userData?.profilePic
                        ? user?.userData?.profilePic
                        : "",
                      bio: user?.userData?.bio ? user?.userData?.bio : "",
                      facebook: user?.userData?.facebook
                        ? user?.userData?.facebook
                        : "",
                      customUrl: user.userData?.customUrl,
                      personalSite: user.userData?.personalSite,
                      email: user.userData?.email,
                      twitter: user?.userData?.twitter
                        ? user?.userData?.twitter
                        : "",
                    }}
                    initialStatus={{
                      success: false,
                      successMsg: "",
                    }}
                    validationSchema={formValidationSchema}
                    onSubmit={async ({
                      name,
                      bio,
                      email,
                      facebook,
                      twitter,
                      customUrl,
                      personalSite,
                    }) => {
                      try {
                        setLoader1(true);
                        const response = await axios({
                          method: "PUT",
                          url: ApiConfig.updateProfile,
                          headers: {
                            token: window.sessionStorage.getItem("token"),
                          },
                          data: {
                            name: name,
                            customUrl: customUrl,
                            bio: bio,
                            coverPic: coverImage64,
                            profilePic: profileImage64,
                            twitterUsername: twitter,
                            facebook: facebook,
                            personalSite: personalSite,
                            email: email,
                          },
                          headers: {
                            token: accessToken,
                          },
                        });

                        if (response.data.statusCode === 200) {
                          toast.success(response.data.responseMessage);
                          history.push("/profile");
                          user.getProfileHandler(
                            window.sessionStorage.getItem("token")
                          );
                        } else {
                          toast.success(response.data.response_message);
                        }
                        setLoader1(false);
                      } catch (err) {
                        toast.error(err.response.data.responseMessage);
                        console.error(err.response);
                        setLoader1(false);
                      }
                    }}
                  >
                    {({
                      errors,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                      touched,
                      values,
                      setFieldValue,
                    }) => (
                      <Form onSubmit={handleSubmit}>
                        <Box className={classes.colorbox}>
                          <Typography
                            variant="h2"
                            className={classes.PageHeading}
                          >
                            Edit Profile
                          </Typography>
                          <Typography variant="h3">
                            You can set preferred display name, create your
                            branded profile URL and manage other personal
                            settings
                          </Typography>
                          <Box mt={2} className={classes.inputfield}>
                            <label>
                              Display name{" "}
                              <span style={{ color: "#ff7d68" }}>*</span>
                            </label>
                            <FormControl
                              fullWidth
                              className={classes.inputsection}
                            >
                              <TextField
                                name="name"
                                value={values.name}
                                placeholder="Enter your display name"
                                error={Boolean(touched.name && errors.name)}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                              <FormHelperText
                                error
                                style={{ paddingBottom: "15px" }}
                              >
                                {touched.name && errors.name}
                              </FormHelperText>
                            </FormControl>

                            <label>
                              Bio <span style={{ color: "#ff7d68" }}>*</span>
                            </label>
                            <FormControl
                              fullWidth
                              className={classes.inputsection}
                            >
                              <Input
                                placeholder="Tell about yourself in a few words"
                                name="bio"
                                value={values.bio}
                                error={Boolean(touched.bio && errors.bio)}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{
                                  maxLength: 255,
                                }}
                              />
                              <FormHelperText
                                error
                                style={{ paddingBottom: "15px" }}
                              >
                                {touched.bio && errors.bio}
                              </FormHelperText>
                            </FormControl>
                            <label>Twitter URL </label>
                            <FormControl
                              fullWidth
                              className={classes.inputsection}
                            >
                              <Input
                                id="standard-adornment-amount"
                                placeholder="https://"
                                name="twitter"
                                value={values.twitter}
                                error={Boolean(
                                  touched.twitter && errors.twitter
                                )}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                // endAdornment={
                                //   <InputAdornment position="end">
                                //     Link
                                //   </InputAdornment>
                                // }
                              />
                              <FormHelperText
                                error
                                style={{ paddingBottom: "15px" }}
                              >
                                {touched.twitter && errors.twitter}
                              </FormHelperText>
                            </FormControl>
                            <label> Facebook URL</label>
                            <FormControl
                              fullWidth
                              className={classes.inputsection}
                            >
                              <Input
                                placeholder="https://"
                                name="facebook"
                                value={values.facebook}
                                error={Boolean(
                                  touched.facebook && errors.facebook
                                )}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                              <FormHelperText
                                error
                                style={{ paddingBottom: "15px" }}
                              >
                                {touched.facebook && errors.facebook}
                              </FormHelperText>
                            </FormControl>
                            <label>Personal site or portfolio</label>
                            <FormControl
                              fullWidth
                              className={classes.inputsection}
                            >
                              <Input
                                id="standard-adornment-amount"
                                placeholder="Personal site"
                                name="personalSite"
                                value={values.personalSite}
                                error={Boolean(
                                  touched.personalSite && errors.personalSite
                                )}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                              <FormHelperText
                                error
                                style={{ paddingBottom: "15px" }}
                              >
                                {touched.personalSite && errors.personalSite}
                              </FormHelperText>
                            </FormControl>

                            <label>
                              {" "}
                              Email <span style={{ color: "#ff7d68" }}>*</span>
                            </label>
                            <FormControl
                              fullWidth
                              className={classes.inputsection}
                            >
                              {user?.userData?.userType === "Admin" ? (
                                <Input
                                  readOnly
                                  id="standard-adornment-amount"
                                  placeholder="hovr@gmail.com"
                                  name="email"
                                  value={values.email}
                                  error={Boolean(touched.email && errors.email)}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                />
                              ) : (
                                <Input
                                  id="standard-adornment-amount"
                                  placeholder="hovr@gmail.com"
                                  name="email"
                                  value={values.email}
                                  error={Boolean(touched.email && errors.email)}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                />
                              )}

                              <FormHelperText
                                error
                                style={{ paddingBottom: "15px" }}
                              >
                                {touched.email && errors.email}
                              </FormHelperText>
                            </FormControl>
                            <Box className={classes.imgsecbox}>
                              <Box className={classes.colorbox}>
                                <label>Add profile Image</label>
                                <Box className={classes.Box}>
                                  {profileImage64 && (
                                    <img
                                      className={classes.Box}
                                      src={profileImage64}
                                      alt=""
                                    />
                                  )}
                                </Box>

                                <small style={{ whiteSpace: "break-spaces" }}>
                                  We recommend a square image of at least
                                  400x400 - Gifs work too.
                                </small>
                                {/* {profileImage64 ? (
                                  <Box align="left" mt={1} mb={4}>
                                    {" "}
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      component="span"
                                      onClick={() => setProfileImage64(null)}
                                    >
                                      Remove
                                    </Button>
                                  </Box>
                                ) : ( */}
                                <Box align="left" mt={1} mb={4}>
                                  <input
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    id="raised-button-file-profile"
                                    multiple
                                    name="profilePic"
                                    // value={profileImage64}
                                    type="file"
                                    onChange={(e) => {
                                      setProfileImage(
                                        URL.createObjectURL(e.target.files[0])
                                      );
                                      getBase64(e.target.files[0], (result) => {
                                        setProfileImage64(result);
                                      });
                                    }}
                                  />
                                  <label htmlFor="raised-button-file-profile">
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      component="span"
                                    >
                                      CHOOSE FILE
                                    </Button>
                                  </label>
                                </Box>
                                {/* )} */}
                              </Box>
                              <Box className={classes.colorbox} mt={2}>
                                <label>Add Cover Image</label>
                                <Box className={classes.Box}>
                                  {coverImage64 && (
                                    <img
                                      className={classes.Box}
                                      src={coverImage64}
                                      alt=""
                                    />
                                  )}
                                </Box>

                                <small style={{ whiteSpace: "break-spaces" }}>
                                  We recommend an image of at least 400x400.
                                  Gifs work too.
                                </small>
                                {/* {coverImage64 ? (
                                  <Box align="left" mt={1} mb={4}>
                                    {" "}
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      component="span"
                                      onClick={() => setCoverImage64(null)}
                                    >
                                      Remove
                                    </Button>
                                  </Box>
                                ) : ( */}
                                <Box align="left" mt={1} mb={4}>
                                  <input
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    id="raised-button-file-cover"
                                    multiple
                                    name="coverPic"
                                    // value={values.profilePic}
                                    type="file"
                                    onChange={(e) => {
                                      setCoverImage(
                                        URL.createObjectURL(e.target.files[0])
                                      );
                                      getBase64(e.target.files[0], (result) => {
                                        setCoverImage64(result);
                                      });
                                    }}
                                    // onChange={onBannerImageChange}
                                  />
                                  <label htmlFor="raised-button-file-cover">
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      component="span"
                                    >
                                      CHOOSE FILE
                                    </Button>
                                  </label>
                                  {errMessage && (
                                    <FormHelperText style={{ color: "red" }}>
                                      Height and Width must be 400*400
                                    </FormHelperText>
                                  )}
                                </Box>
                                {/* )} */}
                              </Box>
                            </Box>
                            <Box align="left" mt={2}>
                              <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                type="submit"
                                disabled={loader1}
                              >
                                UPDATE PROFILE
                                {loader1 && <ButtonCircularProgress />}
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </Form>
                    )}
                  </Formik>
                </Grid>
                <Grid item xs={12} sm={12} md={1}></Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={5}
                  className={classes.imagefiled}
                >
                  <Box className={classes.imgsecbox1}>
                    <Box className={classes.colorbox}>
                      <label>Add profile Image</label>
                      <Box className={classes.Box}>
                        {profileImage64 && (
                          <img
                            className={classes.Box}
                            src={profileImage64}
                            alt=""
                          />
                        )}
                      </Box>

                      <small style={{ whiteSpace: "break-spaces" }}>
                        We recommend a square image of at least 400x400 - Gifs
                        work too.
                      </small>
                      {/* {profileImage64 ? (
                        <Box align="left" mt={1} mb={4}>
                          {" "}
                          <Button
                            variant="contained"
                            color="primary"
                            component="span"
                            onClick={() => setProfileImage64(null)}
                          >
                            Remove
                          </Button>
                        </Box>
                      ) : ( */}
                      <Box align="left" mt={1} mb={4}>
                        <input
                          accept="image/*"
                          style={{ display: "none" }}
                          id="raised-button-file-profile"
                          multiple
                          name="profilePic"
                          // value={profileImage64}
                          type="file"
                          onChange={(e) => {
                            setProfileImage(
                              URL.createObjectURL(e.target.files[0])
                            );
                            getBase64(e.target.files[0], (result) => {
                              setProfileImage64(result);
                            });
                          }}
                        />
                        <label htmlFor="raised-button-file-profile">
                          <Button
                            variant="contained"
                            color="primary"
                            component="span"
                          >
                            CHOOSE FILE
                          </Button>
                        </label>
                      </Box>
                      {/* )} */}
                    </Box>
                    <Box className={classes.colorbox} mt={2}>
                      <label>Add Cover Image</label>
                      <Box className={classes.Box}>
                        {coverImage64 && (
                          <img
                            className={classes.Box}
                            src={coverImage64}
                            alt=""
                          />
                        )}
                      </Box>

                      <small style={{ whiteSpace: "break-spaces" }}>
                        We recommend an image of at least 400x400. Gifs work
                        too.
                      </small>
                      {/* {coverImage64 ? (
                        <Box align="left" mt={1} mb={4}>
                          {" "}
                          <Button
                            variant="contained"
                            color="primary"
                            component="span"
                            onClick={() => setCoverImage64(null)}
                          >
                            Remove
                          </Button>
                        </Box>
                      ) : ( */}
                      <Box align="left" mt={1} mb={4}>
                        <input
                          accept="image/*"
                          style={{ display: "none" }}
                          id="raised-button-file-cover"
                          multiple
                          name="coverPic"
                          // value={values.profilePic}
                          type="file"
                          onChange={(e) => {
                            setCoverImage(
                              URL.createObjectURL(e.target.files[0])
                            );
                            getBase64(e.target.files[0], (result) => {
                              setCoverImage64(result);
                            });
                          }}
                          // onChange={onBannerImageChange}
                        />
                        <label htmlFor="raised-button-file-cover">
                          <Button
                            variant="contained"
                            color="primary"
                            component="span"
                          >
                            CHOOSE FILE
                          </Button>
                        </label>
                        {errMessage && (
                          <FormHelperText style={{ color: "red" }}>
                            Height and Width must be 400*400
                          </FormHelperText>
                        )}
                      </Box>
                      {/* )} */}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
        )}
      </Box>
    </>
  );
}

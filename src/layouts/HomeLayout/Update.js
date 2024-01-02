import React, { useState } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  TextField,
  FormControl,
  FormHelperText,
  Button,
  InputAdornment,
} from "@material-ui/core";
import axios from "axios";
import { toast } from "react-toastify";

import ApiConfig from "src/ApiConfig/ApiConfig";
import * as yep from "yup";
import { Formik, ErrorMessage, Form } from "formik";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
const useStyles = makeStyles((theme) => ({
  updateSection: {
    padding: "50px 0",
    background: "#F7722F",
    position: "relative",
    overflow: "hidden",
    [theme.breakpoints.down("xs")]: {
      //   padding: "50px 0",
    },
    "& .shape": {
      position: "absolute",
      top: "20px",
      left: "100px",
    },
    "& .shape1": {
      position: "absolute",
      top: "20px",
      left: "180px",
    },
    "& .shape2": {
      position: "absolute",
      bottom: "-25px",
      left: "44%",
    },
    "& .shape3": {
      right: "0px",
      bottom: 0,
      position: "absolute",
      width: "65px",
    },
    "& .shape4": {
      position: "absolute",
      right: "15%",
      top: "25px",
    },
    "& .shape5": {
      position: "absolute",
      right: "8%",
      bottom: "25px",
    },
    "& .emailBox": {
      position: "relative",
      "& button": {
        background:
          "linear-gradient(91.94deg, #35A5F5 31.32%, #62D3F0 117.28%)",
        borderRadius: "44px 0px 0px 44px",
        color: "#fff",
        minWidth: "100px",
        height: "40px",
        top: "5px",
        right: "5px",
        position: "absolute",
      },
    },
    "& input": {
      backgroundColor: "#fff",
      borderRadius: "5px",
      border: " none",
      height: "50px",
      padding: "0 15px",
    },
    "& h3": {
      fontWeight: 700,
      fontSize: "22px",
      color: "#fff",
      "& img": {
        marginRight: "20px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "20px",
      },
    },
  },
}));

export default function BestSeller(props) {
  const classes = useStyles();
  const [confirmation, setConfirmation] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);
  const [emailUpdatedata, setEmailUpdatedata] = useState("");

  // const formInitialSchema = {
  //   email: "",
  // };
  // const formValidationSchema = yup.object().shape({
  //   email: yup
  //     .string()
  //     .email("You have entered an invalid email address. Please try again")
  //     // .required("Email address is required")
  //     .matches("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"),
  // });
  return (
    <Box className={classes.updateSection}>
      <img src="images/shape/shape-7.png" className="shape moveTop" />
      <img src="images/shape/shape-8.png" className="shape1 rotate" />
      <img src="images/shape/shape-9.png" className="shape2 rotate" />
      <img src="images/shape/shape-9.png" className="shape4 rotate" />
      <img src="images/shape/shape-10.png" className="shape3 moveTop" />
      <img src="images/shape/shape-8.png" className="shape5 moveLeft" />
      <Container maxWidth="md">
        <Grid
          container
          spacing={2}
          alignItems="center"
          style={{ zIndex: "1111" }}
        >
          <Grid item xs={12} sm={6} align="center">
            <Typography variant="h3">GET THE LATEST UPDATES</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box className="emailBox">
              <Formik
                initialValues={{
                  email: "",
                  link: "",
                }}
                initialStatus={{
                  success: false,
                  successMsg: "",
                }}
                validationSchema={yep.object().shape({
                  email: yep
                    .string()
                    .required("Email Address is Required Field.")
                    .matches(
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      "Please enter a valid Email address"
                    ),
                })}
                onSubmit={async ({ email }) => {
                  setIsUpdating(true);

                  try {
                    // if (userType === "USER") {
                    // axios
                    //   .put(ApiConfig.userSubscribe, {
                    //     params: {
                    //       email,
                    //       link: "http://localhost:3000/subscribehovr",
                    //     },
                    //   })
                    //   .then(async (response) => {
                    axios({
                      method: "PUT",
                      url: ApiConfig.userSubscribe,

                      params: {
                        email,
                        // link: "http://localhost:3000/subscribehovr",
                        link: "https://hovr.site/subscribehovr",
                        // link: "http://full-blockchain.mobiloitte.org/subscribehovr",
                      },
                    })
                      .then(async (response) => {
                        if (response.data.statusCode === 200) {
                          setEmailUpdatedata(response.data.result);

                          //   toast.warn(response.data.response_message);
                          toast.success("We have sent an email. please verify");
                          setIsUpdating(false);
                        } else if (response.statusCode === 409) {
                          toast.success(response.data.responseMessage);
                          setIsUpdating(false);
                        } else {
                          setIsUpdating(false);
                          toast.success("We have sent email please verify");
                          setConfirmation(true);
                        }
                      })
                      .catch((error) => {
                        console.log(error.message);
                        if (error.response) {
                          toast.error(error.response.data.responseMessage);
                        }
                        setIsUpdating(false);
                      });
                    // }
                  } catch (err) {
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
                  touched,
                  values,
                  setFieldValue,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <FormControl fullWidth>
                      <TextField
                        variant="outlined"
                        name="email"
                        value={values.email}
                        error={Boolean(touched.email && errors.email)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        id="outlined-basic"
                        placeholder="Enter your email"
                        fullWidth
                      />
                      <FormHelperText error>
                        {touched.email && errors.email}
                      </FormHelperText>
                    </FormControl>
                    <Button
                      type="submit"
                      className="searchBtn"
                      disabled={isUpdating}
                    >
                      I’m In {isUpdating && <ButtonCircularProgress />}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

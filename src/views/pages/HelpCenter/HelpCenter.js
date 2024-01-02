import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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

const useStyles = makeStyles((theme) => ({
  mainbox: {
    paddingTop: "50px",
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

const Contact = (props) => {
  const classes = useStyles();
  const [confirmation, setConfirmation] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);
  return (
    <Box className={classes.mainbox}>
      <Container maxWidth="lg">
        <Box mb={5} textAlign="center">
          <Container maxWidth="sm">
            <Typography variant="h2">Do you have a question ?</Typography>
            <Typography variant="body2">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form,
            </Typography>
          </Container>
        </Box>

        <Formik
          initialValues={{
            name: "",
            subject: "",
            email: "",
            message: "",
          }}
          validationSchema={yep.object().shape({
            email: yep.string().email().required("Please enter email"),
            name: yep.string().required("Please enter first name"),
            // number: Yup.string()
            //   .required("Please Enter Phone Number")
            //   .min(10, "Please enter valid mobile number")
            //   .max(10, "Please enter valid mobile number"),
            subject: yep.string().required("Please enter subject"),
            message: yep.string().required("Please enter message field"),
          })}
          onSubmit={async ({ name, message, subject, email }) => {
            setIsUpdating(true);

            try {
              // if (userType === "USER") {
              axios
                .post(ApiConfig.contactUs, {
                  name,
                  email,
                  subject,
                  message,
                })
                .then(async (response) => {
                  if (response.data.statusCode === 200) {
                    toast.success(response.data.responseMessage);
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
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <label>*First Name</label>
                      <TextField
                        error={Boolean(touched.name && errors.name)}
                        fullWidth
                        helperText={touched.name && errors.name}
                        id="outlined-basic"
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name}
                        type="name"
                        name="name"
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <label>*Email</label>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        error={Boolean(touched.email && errors.email)}
                        fullWidth
                        helperText={touched.email && errors.email}
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="email"
                        value={values.email}
                      />
                    </Box>
                  </Grid>
                  {/* <Grid item xs={12} sm={6}>
                    <Box>
                      <label>*Phone Number</label>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        error={Boolean(touched.number && errors.number)}
                        fullWidth
                        helperText={touched.number && errors.number}
                        name="number"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="number"
                        value={values.number}
                      />
                    </Box>
                  </Grid> */}
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <label>*Subject</label>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        error={Boolean(touched.subject && errors.subject)}
                        fullWidth
                        helperText={touched.subject && errors.subject}
                        name="subject"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.subject}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Box mt={2}>
                  <Box>
                    <label>*Message</label>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      error={Boolean(touched.message && errors.message)}
                      fullWidth
                      helperText={touched.message && errors.message}
                      name="message"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.message}
                      multiline
                      rowsMax={10}
                      rows={10}
                    />
                  </Box>
                </Box>
                <Box mt={4}>
                  <Button
                    color="primary"
                    // disabled={isSubmitting}
                    size="large"
                    type="submit"
                    variant="contained"
                    disabled={isUpdating}
                  >
                    Send message {isUpdating && <ButtonCircularProgress />}
                  </Button>
                </Box>
              </Box>
            </form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default Contact;

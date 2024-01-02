import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import Rating from "@material-ui/lab/Rating";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Container,
  makeStyles,
} from "@material-ui/core";
import axios from "axios";
import * as yup from "yup";
import { toast } from "react-toastify";
import Apiconfig from "src/ApiConfig/ApiConfig";
import { useHistory, useLocation } from "react-router-dom";

import ButtonCircularProgress from "src/component/ButtonCircularProgress";

const useStyles = makeStyles((theme) => ({
  mainbox: {
    paddingTop: "60px",
    paddingBottom: "50px",
    "& h2": {
      color: "#9b41a1",
    },
    "& label": {
      color: "#FFA701",
      padding: "0",
      fontSize: "50px",
      marginTop: "11px",
      lineHeight: "33px",
      transition:
        "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      [theme.breakpoints.down("xs")]: {
        fontSize: "30px",
      },
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
  },
}));

const Contact = (props) => {
  const [value, setValue] = React.useState();

  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  const [isUpdating, setIsUpdating] = useState(false);
  const accessToken = window.sessionStorage.getItem("token");

  const formInitialSchema = {
    comment: "",
    rating: "",
    orderId: "",
  };
  const formValidationSchema = yup
    .object()
    .shape({ comment: Yup.string().required("Please enter message field") });

  const handleFormSubmit = async (values) => {
    setIsUpdating(true);
    axios({
      method: "POST",
      url: Apiconfig.feedBack,
      headers: {
        token: window.sessionStorage.getItem("token"),
      },
      data: {
        comment: values.comment,
        // orderId: idd,
        rating: value,
      },
    })
      .then(async (res) => {
        setIsUpdating(false);
        if (res.data.statusCode === 200) {
          history.push("/");

          toast.success("Your feedback submited successfully");
          setIsUpdating(false);
        } else {
          toast.error(res.data.responseMessage);
          setIsUpdating(false);
        }
      })
      .catch(() => {
        setIsUpdating(false);
      });
  };

  return (
    <Box className={classes.mainbox}>
      <Container maxWidth="sm">
        <Formik
          initialValues={formInitialSchema}
          initialStatus={{
            success: false,
            successMsg: "",
          }}
          validationSchema={formValidationSchema}
          onSubmit={(values) => handleFormSubmit(values)}
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
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Box
                      component="fieldset"
                      borderColor="transparent"
                      align="center"
                    >
                      <Typography variant="h4">
                        Please Rate Your Experience
                      </Typography>
                      <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Box style={{ marginTop: "-34px" }}>
                      <label style={{ fontSize: "14px", color: "#000" }}>
                        *Message
                      </label>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        error={Boolean(touched.comment && errors.comment)}
                        fullWidth
                        helperText={touched.comment && errors.comment}
                        name="comment"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.comment}
                        multiline
                        rowsMax={10}
                        rows={10}
                      />
                    </Box>
                  </Grid>

                  <Box mt={2}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Submit{isUpdating && <ButtonCircularProgress />}
                    </Button>
                  </Box>
                </Grid>
              </Box>
            </form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default Contact;

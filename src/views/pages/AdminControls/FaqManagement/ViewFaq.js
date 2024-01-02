import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  Container,
  makeStyles,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Apiconfig from "src/ApiConfig/ApiConfig";
import { Link, useLocation } from "react-router-dom";

const useStyles = makeStyles({
  mainBox: {
    paddingTop: "32px",
    "& .termsAndConditions": {
      border: "1px solid #f1e7e7",
      padding: "25px",
      background: "#ffffff",
      borderRadius: "10px",
      filter: "drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.25))",
      boxShadow: "rgb(99 99 99 / 20%) 0px 2px 8px 0px",
      marginTop: "50px",
      backdropFilter: "blur(44px)",
    },
  },
  btn: {
    backgroundColor: "#313b48",
    color: "#FFFFFF",
    borderRadius: "40px",
    width: "150px",
    "&:hover": {
      background:
        "linear-gradient(124deg, rgba(47, 89, 149, 0.81) 18.76%, rgba(21, 29, 42, 0.87) 43.13%, rgba(0, 88, 241, 0.65) 96.83%)",
    },
  },
  imgbox: {
    width: "500px",
    // display: "flex",
    // margin: "0 auto",
    // justifyContent: "center",
  },
});

const ViewFaq = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const { data } = props;

  const location = useLocation();
  const faqdata = location.state.data;

  const accessToken = window.localStorage.getItem("creatturAccessToken");
  const [showdata, setshowdata] = React.useState([]);

  // console.log("mydatatdata", showdata);

  // const showFaqData = async (id) => {
  //   console.log("mydataid", id);
  //   await axios.get(`${Apiconfig.viewFAQ}/${id}`).then(async (res) => {
  //     if (res.data.statusCode === 200) {
  //       setshowdata(res.data.result);
  //       console.log("%%%44554%%%", res.data.result);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   if (location.search.substring(1, location.search.length)) {
  //     const id = location.search.substring(1, location.search.length);
  //     showFaqData(id);
  //   }
  // }, [location]);

  return (
    <>
      <Container maxWidth="md">
        <Box className={classes.mainBox}>
          <Box className="termsAndConditions">
            <Box>
              <Typography variant="h3"> View Faq </Typography>
            </Box>
            <Grid container direction={"column"} spacing={3}>
              <Grid item xs={12}>
                <Box pt={3}>
                  <Grid container spacing={1}>
                    <Grid item lg={3} md={3} sm={3} xs={12}>
                      <Box>
                        <Typography variant="h5"> Question : </Typography>
                      </Box>
                    </Grid>

                    <Grid item lg={9} md={9} sm={9} xs={12}>
                      <Typography variant="h6">{faqdata.question}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12} style={{ marginTop: "-25px" }}>
                <Box>
                  <Grid container spacing={1}>
                    <Grid item lg={3} md={3} sm={3} xs={12}>
                      <Typography variant="h5">Answer :</Typography>
                    </Grid>
                    <Grid item lg={9} md={9} sm={9} xs={12}>
                      <Typography
                        variant="h6"
                        style={{ wordBreak: "break-all", marginTop: "-17px" }}
                      >
                        <div
                          dangerouslySetInnerHTML={{ __html: faqdata.answer }}
                        />
                        {/* {faqdata.answer}  */}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12} style={{ marginTop: "-25px" }}>
                <Box>
                  <Grid container spacing={1}>
                    <Grid item lg={3} md={3} sm={3} xs={12}>
                      <Typography variant="h5">Link :</Typography>
                    </Grid>
                    <Grid item lg={9} md={9} sm={9} xs={12}>
                      {faqdata.url == "" && (
                        <Typography
                          variant="h6"
                          style={{ wordBreak: "break-all", marginTop: "-2px" }}
                        >
                          N/A
                          {/* {faqdata.url} */}
                        </Typography>
                      )}
                      {faqdata.url !== "" && (
                        <Typography
                          variant="h6"
                          style={{ wordBreak: "break-all", marginTop: "-2px" }}
                        >
                          <a
                            href={faqdata.url}
                            target="_blank"
                            style={{ color: "#3db0f3" }}
                          >
                            Click here to know more
                          </a>{" "}
                          {/* {faqdata.url} */}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12} style={{ marginTop: "-25px" }}>
                <Box>
                  <Grid container spacing={1}>
                    <Grid item lg={3} md={3} sm={3} xs={12}>
                      <Typography variant="h5">Image / PDF :</Typography>
                    </Grid>
                    <Grid item lg={9} md={9} sm={9} xs={12}>
                      <Box className={classes.imgbox}>
                        <img
                          src={faqdata.image ? faqdata.image : "N/A"}
                          alt=""
                          width="100%"
                        />
                        {/* {faqdata.image} */}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            {/* <Box pt={3}>
              <Typography variant="h5" style={{ color: "#51ACED" }}>
                Question :{" "}
              </Typography>
              <Typography variant="h6">{faqdata.question}</Typography>
            </Box> */}
            <Box pt={2}>
              <Grid container direction={"column"} spacing={2}>
                {/* <Grid item xs={12}>
                  <Typography variant="h5" style={{ color: "#51ACED" }}>
                    Answer :{" "}
                  </Typography>
                  <Typography variant="h6">
                    <div
                      dangerouslySetInnerHTML={{ __html: showdata.description }}
                    />
                    {faqdata.answer}
                  </Typography>
                </Grid> */}
                <Grid item xs={12} align="center">
                  <Box pb={2} pt={1}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={() => history.push("/faq-list")}
                    >
                      Back
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ViewFaq;

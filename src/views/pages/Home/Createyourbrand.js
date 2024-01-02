import React from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  bannerBox: {
    position: "relative",
    padding: "40px 30px 100px",
    overflow: "hidden",
    [theme.breakpoints.down("md")]: {
      height: "auto",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "40px 0px 100px",
    },
  },
  background: {
    background: "linear-gradient(102.89deg, #333 -0.69%, #f3ba2f 100%)",
    borderRadius: "10px",
    // height:"100vh",
  },

  gridflex: {
    display: "flex",
    alignItems: "center",
  },

  textbox: {
    padding: "50px",
    [theme.breakpoints.down("sm")]: {
      padding: "30px",
    },
    "& h1": {
      fontSize: "50px",
      fontWeight: "600",
      color: "#fff",
      [theme.breakpoints.down("md")]: {
        fontSize: "40px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "28px",
      },
    },
    "& p": {
      fontSize: "20px",
      fontFamily: "'Lato', sans-serif",
      marginTop: "15px",
      color: "rgba(255, 255, 255, 0.6)",
      fontWeight: "300",
      [theme.breakpoints.down("xs")]: {
        fontSize: "18px",
      },
    },
  },

  btn: {
    background: "linear-gradient(261.87deg, #e5cf58 13.12%, #e5cf58 83.57%)",
    borderRadius: "10px",
    color: "#fff",
  },
  Imagebox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

export default function Createyourbrand() {
  const classes = useStyles();

  return (
    <Box className={classes.bannerBox}>
      <Container>
        <Box className={classes.background}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={6}
              lg={6}
              sm={12}
              className={classes.gridflex}
            >
              <Box className={classes.textbox}>
                <Typography variant="h1">
                  Create your NFTs with Optimism
                </Typography>
                <Typography variant="body1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit
                  adipiscing nibh sed dolor. Vulputate neque facilisi tortor
                  ipsum sit.
                </Typography>

                <Box padding="30px 0px 0px">
                  <Link to="/add-brand" style={{ textDecoration: "none" }}>
                    <Button
                      type="submit"
                      variant="outlined"
                      color="secondary"
                      size="large"
                      className={classes.btn}
                    >
                      Add Your Brand
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              lg={6}
              sm={12}
              className={classes.Imagebox}
            >
              <Box>
                <img src="/images/addyoubrandimg.png" alt="Add Your Brand" />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

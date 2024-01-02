import React, { useState, useRef, useContext, useEffect } from "react";

import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "src/context/User";
import { useWeb3React } from "@web3-react/core";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  bannerBox: {
    position: "relative",
    padding: "150px 0px 150px",
    overflow: "hidden",
    zIndex: "1",
    [theme.breakpoints.down("xs")]: {
      padding: "150px 0px 50px",
    },
    "& .shade": {
      top: "22%",
      left: "auto",
      right: "-5%",
      width: "600px",
      bottom: "auto",
      filter: "blur(100px)",
      height: "600px",
      opacity: "0.55",
      zIndex: "-1",
      position: "absolute",
      borderRadius: "1000px",
      backgroundImage:
        "radial-gradient(36.67% 9.68% at 67.26% 8.27%, rgb(113 248 141 / 74%) 0%, rgb(87 212 242 / 55%) 95.78%)",
    },
    "& .shape7": {
      position: "absolute",
      left: "-110px",
      top: "150px",
    },
  },
  textbox: {
    "& h1": {
      fontSize: "50px ",
      fontWeight: "600 ",
      color: "#fff ",
      textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      [theme.breakpoints.down("md")]: {
        fontSize: "40px ",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "30px",
      },
    },
    "& p": {
      fontSize: "16px",
      marginTop: "20px",
    },
  },
  buttonright: {
    marginLeft: "10px !important",
    minWidth: "150px",
  },
  bannerImg: {
    display: "flex",
    position: "relative",
    // overflow: " hidden",
    "& .shape1": {
      position: "absolute",
      top: "-90px",
      left: "-90px",
    },
    "& .shape2": {
      position: "absolute",
      top: "-73px",
      left: "140px",
    },
    "& .shape3": {
      position: "absolute",
      bottom: "-90px",
      right: "100px",
    },
    "& .shape4": {
      position: "absolute",
      bottom: "20px",
      right: "40px",
    },
    "& .shape5": {
      position: "absolute",
      bottom: "100px",
      left: "-90px",
    },
    "& .shape6": {
      position: "absolute",
      top: "-20px",
      right: "-15px",
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    "& figure": {
      margin: "0",
      width: "100%",
      overflow: "hidden",
      marginBottom: "15px",
      borderRadius: "10px",
      height: "auto",
      "&:hover": {
        "& img": {
          transform: "scale(1.3)",
        },
      },
      "& img": {
        width: "100%",
        height: "100%",
        margin: "0",
        transform: "scale(1.1)",
        transition: "0.5s",
      },
    },
  },
  artwork: {
    marginTop: "50px",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "50px",
    },
    "& .artworkmaingrid": {
      "& .artworkgrid": {
        "&:last-child": {
          "& .artworkbox": {
            "&::after": {
              display: "none",
            },
          },
        },
      },
    },
    "& .artworkbox": {
      position: "relative",
      padding: "10px 0",
      "&::after": {
        position: "absolute",
        top: 0,
        right: 0,
        height: "100%",
        content: "''",
        width: "1px",
        backgroundColor: "#484848",
      },
    },
    "& h2": {
      fontWeight: 700,
      fontSize: "30px",
      color: "#fff",
      [theme.breakpoints.down("xs")]: {
        fontSize: "20px",
      },
    },
    "& p": {
      fontWeight: 400,
      fontSize: "18px",
      marginTop: "10px",
      color: "rgba(0, 0, 0, 0.5)",
      [theme.breakpoints.down("xs")]: {
        fontSize: "14px",
      },
    },
  },
}));
const artworkCard = [
  {
    number: "37k+",
    heading: "Artworks",
  },
  {
    number: "20k+",
    heading: "Artists",
  },
  {
    number: "99k+",
    heading: "Auctions",
  },
];
export default function BestSeller(props) {
  const classes = useStyles();
  const { data } = props;

  const user = useContext(UserContext);
  const { account, library, chainId } = useWeb3React();
  const toastmsg = () => {
    toast.warn("Please connect your wallet");
  };

  // const user = useContext(UserContext);

  return (
    <Box className={classes.bannerBox}>
      <img src="images/shape/shape-1.png" className="shape7 moveTop" />
      {/* <Box className="shade"></Box> */}
      <Container maxWidth="lg">
        <Grid container spacing={0} alignItems="center">
          <Grid item xs={12} md={5}>
            <Box className={classes.textbox}>
              <Typography variant="h1" className={classes.minth1}>
                Create, Sell and Discover Exclusive
                <span style={{ color: "#F7722F" }}> {""} Digital Items </span>
              </Typography>

              <Typography variant="body1" style={{color:"#fff"}}>
                {/* Own your web 3.0 domain, sell unique gaming NFTs items, create
                your digital avatar for your metaverse identity, create your own
                letter of wishes for loved ones and much more.... */}
                Low transaction fee NFT marketplace with real NFT use cases
              </Typography>
              <Box mt={3}>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  component={Link}
                  to="/explore"
                >
                  Explore Now
                </Button>
                {user?.walletdata === "BLOCK" ? (
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    component={Link}
                    to="/request-message"
                    className={classes.buttonright}
                  >
                    Unblock Request
                  </Button>
                ) : (
                  <>
                    {account &&
                      user?.ownerAccount &&
                      user?.ownerAccount === account && (
                        <>
                          <Button
                            variant="contained"
                            size="large"
                            color="secondary"
                            component={Link}
                            to="/mint"
                            className={classes.buttonright}
                          >
                            Mint
                          </Button>
                        </>
                      )}
                  </>
                )}
              </Box>
            </Box>
            <Box className={classes.artwork}>
              <Grid container spacing={1} className="artworkmaingrid">
                {/* {artworkCard.map((data, i) => { */}
                {/* return ( */}
                <Grid item xs={4} sm={4} className="artworkgrid">
                  <Box className="artworkbox">
                    {" "}
                    <Typography variant="h2" style={{color:"#fff"}}>{data?.collection}</Typography>
                    <Typography variant="body2" style={{color:"#fff"}}>Collections</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4} sm={4} className="artworkgrid">
                  <Box className="artworkbox">
                    {" "}
                    <Typography variant="h2"  style={{color:"#fff"}}>{data?.user}</Typography>
                    <Typography variant="body2" style={{color:"#fff"}}>Artists</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4} sm={4} className="artworkgrid">
                  <Box className="artworkbox">
                    {" "}
                    <Typography variant="h2" style={{color:"#fff"}}>{data?.bid}</Typography>
                    <Typography variant="body2" style={{color:"#fff"}}>Auctions</Typography>
                  </Box>
                </Grid>
                {/* );
                })} */}
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={1}></Grid>
          <Grid item xs={12} md={6}>
            <Box className={classes.bannerImg}>
              <img src="images/shape/shape-1.png" className="shape1 moveTop" />
              <img src="images/shape/shape-1.png" className="shape3 moveLeft" />
              <img src="images/shape/shape-3.png" className="shape2 moveLeft" />
              <img src="images/shape/shape-5.png" className="shape4 moveTop" />
              <img src="images/shape/shape-4.png" className="shape5 rotate" />
              <img src="images/shape/shape-6.png" className="shape6 rotate" />
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={4} sm={4}>
                  <Box className="boxLeft">
                    <figure>
                      <img src="images/banner/banner-img1.png" alt="images" />
                    </figure>
                    <figure>
                      <img src="images/banner/banner-img2.png" alt="images" />
                    </figure>
                    <figure>
                      <img src="images/banner/banner-img3.png" alt="images" />
                    </figure>
                  </Box>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Box className="boxCenter">
                    <figure>
                      <img src="images/banner/banner-img4.png" alt="images" />
                    </figure>
                    <figure>
                      <img src="images/banner/banner-img5.png" alt="images" />
                    </figure>
                    <figure>
                      <img src="images/banner/banner-img6.png" alt="images" />
                    </figure>
                  </Box>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Box className="boxRight">
                    <figure>
                      <img src="images/banner/banner-img7.png" alt="images" />
                    </figure>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

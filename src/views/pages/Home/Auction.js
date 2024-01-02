import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import Slider from "react-slick";
import ExploreCard from "src/component/ExploreCard";
import Apiconfig from "src/ApiConfig/ApiConfig";
import axios from "axios";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import DataNotFound from "src/component/DataNotFound";
import AuctionCard from "src/component/AuctionCard";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "40px",
    [theme.breakpoints.down("xs")]: {
      padding: "50px 0",
    },
    "& h3": {
      fontWeight: 700,
      fontSize: "30px",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      "& img": {
        marginRight: "20px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "20px",
      },
    },
  },
}));

const auctionData = [
  {
    user: "@Alex",
    likes: "152",
    time: "8h : 15m : 25s left",
    stock: "4 in stock",
    text3: "From 1.35 ETH 11/Bid 1.1 w",
    image: "images/Explore/Explore1.png",
    name: "Skyblue Creator",
    price: "0.004 ETH",
  },
  {
    user: "@Alex",
    likes: "152",
    time: "8h : 15m : 25s left",
    stock: "4 in stock",
    text3: "From 1.35 ETH 11/Bid 1.1 w",
    image: "images/Explore/Explore2.png",
    name: "Skyblue Creator",
    price: "0.004 ETH",
  },
  {
    user: "@Alex",
    likes: "152",
    time: "8h : 15m : 25s left",
    stock: "4 in stock",
    text3: "From 1.35 ETH 11/Bid 1.1 w",
    image: "images/Explore/Explore3.png",
    name: "Skyblue Creator",
    price: "0.004 ETH",
  },
  {
    user: "@Alex",
    likes: "152",
    time: "8h : 15m : 25s left",
    stock: "4 in stock",
    text3: "From 1.35 ETH 11/Bid 1.1 w",
    image: "images/Explore/Explore4.png",
    name: "Skyblue Creator",
    price: "0.004 ETH",
  },
  {
    user: "@Alex",
    likes: "152",
    time: "8h : 15m : 25s left",
    stock: "4 in stock",
    text3: "From 1.35 ETH 11/Bid 1.1 w",
    image: "images/Explore/Explore3.png",
    name: "Skyblue Creator",
    price: "0.004 ETH",
  },
  {
    user: "@Alex",
    likes: "152",
    time: "8h : 15m : 25s left",
    stock: "4 in stock",
    text3: "From 1.35 ETH 11/Bid 1.1 w",
    image: "images/Explore/Explore4.png",
    name: "Skyblue Creator",
    price: "0.004 ETH",
  },
];

function Auction() {
  const classes = useStyles();
  const [auctionList, setAuctionList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const settings = {
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false,
    centerPadding: "0px",
    arrows: true,
    className: "recomended",
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: false,
    // prevArrow: <AiOutlineLeftSquare />,
    // nextArrow: <NavButton />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          centerMode: false,
          centerPadding: "20px",
          autoplay: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          centerMode: false,
          centerPadding: "20px",
          autoplay: false,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          centerPadding: "20px",
          autoplay: false,
        },
      },
    ],
  };
  const getAuctionListHandler = async () => {
    try {
      const res = await axios.get(Apiconfig.hotBid);
      if (res.data.statusCode == 200) {
        const filetrnftdata = res.data.result.filter((data) => {
          return data?.orderId !== null && data?.orderId?.sellStatus !== "SOLD";
        });
        setAuctionList(filetrnftdata);

        setIsLoading(false);
      }
    } catch (error) {
      console.log("ERROR", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAuctionListHandler();
  }, []);
  return (
    <>
      <Box className={classes.root}>
        <Container maxWidth="lg">
          <Typography variant="h3">
            <img src="images/Hammer.png" />
            Hot &nbsp; <span style={{ color: "#F7722F" }}>Bids</span>
          </Typography>
          <Box>
            {isLoading && <ButtonCircularProgress />}
            {!isLoading && auctionList && auctionList.length === 0 && (
              <DataNotFound />
            )}
          </Box>
          <Box mt={5}>
            <Slider {...settings}>
              {auctionList &&
                auctionList.map((data, index) => {
                  return (
                    <AuctionCard
                      data={data}
                      index={index}
                      type="auction"
                      callbackFun={getAuctionListHandler}
                    />
                  );
                })}
            </Slider>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Auction;

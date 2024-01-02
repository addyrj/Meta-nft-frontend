import React, { useState, useEffect } from "react";

import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import DataNotFound from "src/component/DataNotFound";

import Apiconfig from "src/ApiConfig/ApiConfig";
import axios from "axios";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

import { Link } from "react-router-dom";
import MediaCard from "src/component/MediaCard";
import Slider from "react-slick";
const PriceCard = [
  {
    details: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
    time: "2d ago",
    image: "images/Explore/Explore1.png",
    name: "Skyblue Creator",
  },
  {
    details: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
    time: "2d ago",
    image: "images/Explore/Explore2.png",
    name: "Skyblue Creator",
  },
  {
    details: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
    time: "2d ago",
    image: "images/Explore/Explore3.png",
    name: "Skyblue Creator",
  },
  {
    details: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
    time: "2d ago",
    image: "images/Explore/Explore4.png",
    name: "Skyblue Creator",
  },
  {
    details: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
    time: "2d ago",
    image: "images/Explore/Explore1.png",
    name: "Skyblue Creator",
  },
];
const useStyles = makeStyles((theme) => ({
  mediaSection: {
    paddingTop: "50px 0",
    [theme.breakpoints.down("xs")]: {
      paddingTop: "50px",
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

export default function BestSeller(props) {
  const classes = useStyles();
  const [mediaList, setMediaList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data } = props;
  const settings = {
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false,
    centerPadding: "0px",
    arrows: true,
    className: "recomended",
    autoplay: true,
    autoplaySpeed: 3000,
    // infinite: true,
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

  const getMedaListHandler = async () => {
    try {
      const res = await axios.get(Apiconfig.pressMediaList);
      if (res.data.statusCode == 200) {
        setMediaList(res.data.result);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("ERROR", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMedaListHandler();
  }, []);
  return (
    <Box className={classes.mediaSection}>
      <Container maxWidth="lg">
        <Typography variant="h3">
          <img src="images/news.png" />
          Press & Media
        </Typography>
        <Box>
          {isLoading && <ButtonCircularProgress />}
          {!isLoading && mediaList && mediaList.length === 0 && (
            <DataNotFound />
          )}
        </Box>
        <Box mt={5}>
          <Slider {...settings} style={{ width: "100%" }}>
            {mediaList &&
              mediaList.map((data, index) => {
                return (
                  <Box key={index}>
                    <MediaCard data={data} index={index} type="timing" />
                  </Box>
                );
              })}
          </Slider>
        </Box>
      </Container>
    </Box>
  );
}

import { Box, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { useHistory } from "react-router-dom";
import { sortAddress } from "src/utils";
const useStyles = makeStyles((theme) => ({
  heading: {
    "& h3": {
      color: theme.palette.secondary.main,
      fontSize: "40px",
      fontWeight: "700",
      [theme.breakpoints.down("xs")]: {
        fontSize: "23px",
      },
    },
  },
  nftimg: {
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "50px",
      width: "50px",
      backgroundColor: "#fafefd",
      overflow: "hidden",
      borderRadius: "10px",
      margin: "0",
      "& img": {
        maxHeight: "100%",
        maxWidth: "100%",
        height: "auto",
        width: "100%",
        display: "block",
      },
    },
  },
  colorbox: {
    display: "flex",
    alignItems: "center",
    marginTop: "16px",
    height: "auto",
    borderRadius: "10px",
    padding: "10px",
    background: "#FFFFFF",
    boxShadow: " rgb(99 99 99 / 20%) 0px 2px 8px 0px",
  },
  textbox: {
    "& h3": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "0.875rem",
      lineHeight: "13px",
      color: "#35a5f5",
    },
    "& h4": {
      marginTop: "3px",
      fontStyle: "normal",
      color: "#454545",
      fontWeight: "500",
      fontSize: "12px",
      lineHeight: "13px",
    },
    "& h5": {
      marginTop: "3px",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "11px",
      lineHeight: "13px",
      color: "#828282",
    },
  },
}));
const act1 = [
  {
    image: "/images/Explore/Explore1.png",
    name: "GRAFFITI 'thanks for the wall",
    edition: "1 edition transferred from Rarebit to Bunny Parton",
    time: "6/29/2021, 7:53 PM",
  },
  {
    image: "/images/Explore/Explore2.png",
    name: "GRAFFITI 'thanks for the wall",
    edition: "1 edition transferred from Rarebit to Bunny Parton",
    time: "6/29/2021, 9:53 PM",
  },
  {
    image: "/images/Explore/Explore3.png",
    name: "GRAFFITI 'thanks for the wall",
    edition: "1 edition transferred from Rarebit to Bunny Parton",
    time: "6/29/2021, 3:53 PM",
  },
  {
    image: "/images/Explore/Explore4.png",
    name: "GRAFFITI 'thanks for the wall",
    edition: "1 edition transferred from Rarebit to Bunny Parton",
    time: "6/29/2021, 5:53 PM",
  },
];
export default function Following(props) {
  const { type, data, activityNFTList } = props;
  const history = useHistory();
  const classes = useStyles();
  return (
    <>
      {activityNFTList &&
        activityNFTList.map((data, index) => {
          return (
            <Grid item xs={12} md={6} sm={12} lg={6} className={classes.orer}>
              <Box className={classes.colorbox}>
                <Box
                  className={classes.nftimg}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    history.push({
                      pathname: "/author",
                      search: data?.followerId?._id,
                    });
                  }}
                >
                  <figure>
                    <img
                      src={
                        data?.followerId?.profilePic
                          ? data?.followerId?.profilePic
                          : " /images/Explore/Explore1.png"
                      }
                      alt=""
                    />
                  </figure>
                </Box>
                <Box className={classes.textbox} ml={2}>
                  <Typography variant="h3">
                    {" "}
                    {data?.followerId?.name
                      ? data?.followerId?.name
                      : sortAddress(data?.followerId?.walletAddress)}
                  </Typography>
                  <Typography variant="h4">
                    {" "}
                    {data.type === "FOLLOW" ? "Followed by" : "Unfollowed by"}
                  </Typography>
                  <Typography variant="h5">
                    {" "}
                    {data?.userId?.name
                      ? data?.userId?.name
                      : sortAddress(data?.userId?.walletAddress)}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          );
        })}
    </>
  );
}

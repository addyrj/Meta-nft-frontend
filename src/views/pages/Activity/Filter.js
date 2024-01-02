import { Box, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
const useStyles = makeStyles((theme) => ({
  btnbox: {
    width: "auto",
    height: "auto",
    borderRadius: "10px",
    padding: "15px",
    background: "#FFFFFF",
    boxShadow: " rgb(99 99 99 / 20%) 0px 2px 8px 0px",
    "& h1": {
      color: "#000",
      fontSize: "25px",
      fontWeight: "700",
    },
    "& button": {
      borderRadius: "10px",
      marginBottom: "5px !important",
      marginRight: "4px",
    },
  },
}));
export default function Filter(props) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const { type, data, setSelectedFilter } = props;
  return (
    <Box>
      <Box className={classes.btnbox} mt={2}>
        <Typography variant="h1">Filters</Typography>
        <Box mt={1}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() => setSelectedFilter()}
          >
            All
          </Button>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() =>
              setSelectedFilter([
                "NFT_CREATE",
                "CREATE_COLLECTION",
                "ORDER_CREATE",
              ])
            }
          >
            Listing
          </Button>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() =>
              setSelectedFilter(["SEND_NFT", "SEND_ORDER", "ORDER_SELL"])
            }
          >
            Purchases
          </Button>
          {/* <Button variant="contained" size="large" color="primary">
            Sales
          </Button> */}
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() => setSelectedFilter(["TRANSFER"])}
          >
            Transfers
          </Button>
          {/* <Button variant="contained" size="large" color="primary">
            Burns
          </Button> */}
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() => setSelectedFilter(["BID_CREATE"])}
          >
            Bids
          </Button>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() => setSelectedFilter(["LIKE", "DISLIKE"])}
          >
            Likes
          </Button>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() => setSelectedFilter(["FOLLOW", "UNFOLLOW"])}
          >
            Followings
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

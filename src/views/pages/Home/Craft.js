import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  TextField,
  Button,
  InputAdornment,
} from "@material-ui/core";

import { Link, useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  bannerSection: {
    padding: "50px 0",
  },
  updateSection: {
    padding: "50px 0",
    background:"#F7722F",
    position: "relative",
    backgroundRepeat: "no-repeat",
    position: "relative",
    overflow: "hidden",
    [theme.breakpoints.down("xs")]: {
      //   padding: "50px 0",
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
      color: "#fff",
      display: "flex",
      fontSize: "30px",
      alignItems: "center",
      fontWeight: "700",
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
  const history = useHistory();
  const [datacraft, setDatacraft] = useState();

  useEffect(() => {
    setDatacraft("craft");
  });

  return (
    <Box className={classes.bannerSection}>
      <Box className={classes.updateSection}>
        <Container maxWidth="md">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4} align="center"></Grid>
            <Grid item xs={12} sm={12} lg={8}>
              <Box>
                <Typography variant="h3">Join Optimism referral program</Typography>
                <Box mt={1}>
                  <Typography variant="body2" style={{ color: "#313030" }}>
                    Share in the fees of hovr by introducing good content
                    providers in any of the nft categories. Read more in FAQ.
                  </Typography>
                </Box>

                <Box mt={2}>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={() => {
                      window.open(`https://referral.hovr.site/`);
                    }}
                  >
                    Join Now
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

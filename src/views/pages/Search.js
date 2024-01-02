import React, { useEffect } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  // Link,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import axios from "axios";

import MarketplaceCard from "src/component/MarketplaceCard";

import CancelIcon from "@material-ui/icons/Cancel";
import ApiConfig from "src/ApiConfig/ApiConfig";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  MarketPlace: {
    minHeight: "390px",
    background: "#fff",
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(20),
      paddingBottom: theme.spacing(8),
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(14),
      paddingBottom: theme.spacing(8),
    },
  },
  filtermenu: {
    display: "flex",
    justifyContent: "center",
    width: 120,
    height: 40,
    borderWidth: 3,
    backgroundColor: "grey",
    borderRadius: 30,
    alignItems: "center",
  },
  colorblack: {
    color: "#000",
  },
  imagebox: {
    display: "flex",
    justifyContent: "center",
    marginTop: "-18px",
    "@media(max-width:540px)": {
      marginTop: "0px",
    },
    "@media(max-width:414px)": {
      marginTop: "0px",
    },
    "& figure": {
      width: "36%",
      "& img": {
        width: "100%",
      },
    },
  },
}));

export default function Search() {
  const classes = useStyles();
  const [select, setSelect] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [isHide, setIsHide] = React.useState(true);
  const [listAllCreatedNft, setlistAllCreatedNft] = React.useState([]);
  const [listAllCreatedNft1, setlistAllCreatedNft1] = React.useState(false);
  const location = useLocation();
  // const handleChange = (event) => {
  //   setSelect(event.target.value);
  // };
  const filterData = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Victor Wayne" },
    { id: 3, name: "Jane Doe" },
  ];
  const filterData1 = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Victor Wayne" },
    { id: 3, name: "Jane Doe" },
    { id: 1, name: "John Doe" },
    { id: 2, name: "Victor Wayne" },
    { id: 3, name: "Jane Doe" },
    { id: 1, name: "John Doe" },
    { id: 2, name: "Victor Wayne" },
    { id: 3, name: "Jane Doe" },
  ];
  const [value, setValue] = React.useState();

  const placeorderlistapi = async (id) => {
    axios
      .request({
        method: "GET",
        url: `${ApiConfig.dashboardSearch}?search=${id}`,
        // data: {
        //   search: id,
        // },
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          setlistAllCreatedNft(res.data.result.orderResult);

          setlistAllCreatedNft1(true);
        } else {
          setlistAllCreatedNft1(false);
        }
      });
    // }
  };

  useEffect(() => {
    if (location.search.substring(1, location.search.length)) {
      const id = location.search.substring(1, location.search.length);
      placeorderlistapi(id);
      setSearch(id);
      // handleClickOpen(id)
    }
    const handleChanges = (event) => {
      setValue(event.value);
      if (!value) {
        setValue(event.value);
      }
    };
  }, [location, search]);
  // useEffect(() => {
  //   placeorderlistapi();
  // }, []);

  return (
    <>
      <Box className={classes.MarketPlace}>
        <Container maxWidth="lg">
          <Grid container spacing={2} className="sectionHeading">
            <Grid item xs={12}>
              <Box style={{ textAlign: "left" }}>
                <Typography
                  style={{
                    fontSize: "26px",
                    color: "#898989",
                    fontWeight: "600",
                  }}
                >
                  Search results for &nbsp;&nbsp;
                  <span
                    style={{
                      color: "#000",
                      wordBreak: "break-all",
                    }}
                  >
                    {search}
                  </span>
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box mt={2} mb={2}>
            {listAllCreatedNft1 && listAllCreatedNft.length === 0 ? (
              <>
                <Box className={classes.imagebox}>
                  <figure>
                    <img src="images/noresult.webp" />
                  </figure>
                </Box>
                <Box
                  pl={2}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Link to="/marketplace" style={{ textDecoration: "none" }}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="outlined"
                      color="secondary"
                      size="large"
                    >
                      Go Back
                    </Button>
                  </Link>
                </Box>
              </>
            ) : (
              <Grid container spacing={2}>
                {listAllCreatedNft?.map((data, i) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={3}
                      lg={3}
                      key={i}
                      className="walletSet p-0"
                    >
                      <MarketplaceCard data={data} index={i} />
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}

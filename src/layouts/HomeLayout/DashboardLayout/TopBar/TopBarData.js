import {
  AppBar,
  Toolbar,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  InputBase,
  Grid,
  MenuItem,
  Box,
  Container,
  Menu,
  Typography,
  DialogContent,
  OutlinedInput,
  InputAdornment,
  Dialog,
  DialogActions,
  TextField,
  FormControl,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState, useEffect, useRef, useContext } from "react";
import { BsFillCaretDownFill } from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";
import Logo from "src/component/Logo";
import { UserContext } from "src/context/User";
// import ConnectWallet from "src/component/ConnectWallet";
import ConnectWallet from "src/views/pages/Connect/ConnectWallet";
import { sortAddress } from "src/utils";
// import EnterName from "src/component/EnterName";
import { CgSearch } from "react-icons/cg";
import { toast } from "react-toastify";
import SearchBox from "../SearchBox";
import { GiCancel } from "react-icons/gi";
import { useWeb3React } from "@web3-react/core";
import { useLocation } from "react-router-dom";
import ApiConfig from "src/ApiConfig/ApiConfig";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: "600",
    borderRadius: 0,
    minWidth: "auto",
    color: theme.palette.secondary.main,
    height: "31px",
    padding: "0px 7px",
    letterSpacing: "1px",
    marginLeft: "15px",
    "@media (max-width: 900px)": {
      color: "#FFF",
      padding: "15px !important",
      height: "51px",
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    "&:active": {
      color: theme.palette.secondary.dark,
    },
    "&:hover": {
      color: theme.palette.secondary.dark,
    },
  },
  menuButton1: {
    width: "100%",
  },
  toolbar: {
    display: "flex",
    padding: "10px 0",
    justifyContent: "space-between",
    height: "100%",

    "@media (max-width: 900px)": {
      paddingLeft: "75px",
      paddingRight: "20px",
      height: "100%",
    },
  },
  maindrawer: {
    height: "100%",
    background: "#0c0731",
    width: "260px",
  },
  logoDrawer: {
    paddingLeft: "10px",
    width: "140px",
    marginBottom: "30px",
  },
  drawerContainer: {
    padding: "20px 0px ",
    height: "100%",
    background: "#000",
    width: "260px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  drawericon: {
    color: "#000",
    position: "absolute",
    top: "0px",
    right: "0px",
    fontSize: "25px",
  },
  logoImg: {
    width: "75px",
    // height: '44.5px',
    margin: " 14px 15px 11px 0px",
    objectFit: "contain",
    "@media (max-width: 500px)": {
      margin: " 11px 1px 3px 0px",
      width: "52px",
    },
  },
  flexButton: {
    display: "flex",
    justifyContent: "flex-between",
    alignItems: "center",
  },
  menuMobile: {
    fontSize: "16px",
    fontWeight: "400",
    fontStyle: "normal",
    letterSpacing: "-0.6px",
    lineHeight: "1.75",
    color: "#fff",
    borderBottom: "1px solid #3e3e3e",
    padding: "16px",
    "@media (max-width: 500px)": {
      padding: "7px 0",
      width: "100%",
    },
  },
  paper1: {
    background: "black",
    color: "white",
  },
  containerHeight: {
    height: "100%",
  },
  mainHeader: {
    justifyContent: "space-between",
    padding: "0px",
  },
  search: {
    height: "35px",
    position: "relative",
    background: " rgba(255, 255, 255, 0.2)",
    boxShadow: "0px 6px 9px rgba(110, 0, 149, 0.15)",
    borderRadius: "40px",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
    marginLeft: 10,
    marginRight: 10,
    width: "150px",
    maxWidth: "150px",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "204px",
      maxWidth: "204px",
      height: "42px",
    },
  },
  searchIcon: {
    fontSize: "16px",
    padding: theme.spacing(0, 1),
    color: "#fff",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "#fff",
    fontSize: "12px",
    width: "100%",
  },
  wallet: {
    fontSize: "14px",
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: "21px",
    color: "#fff",
    border: "1px solid #ec0066",
    padding: "0 15px",
    background: "#ec0066",
    borderRadius: "50px",
    height: "31px",
    "&:hover": {
      background: "#fff",
      color: "#ec0066",
    },
    "@media (max-width: 900px)": {
      marginLeft: "12px",
      marginTop: "12px",
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    fontSize: "13px",
    color: "#fff",
    paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
    transition: theme.transitions.create("width"),
    width: "100px",
    height: "20px",
    [theme.breakpoints.up("sm")]: {
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      width: "100%",
      height: "25px",
      "&:focus": {
        width: "100%",
      },
    },
  },
  submenu: {
    borderTop: "3px solid #300760",
    top: "25px !important",
  },

  menuMobile1: {
    marginLeft: "10px",
    
    borderRadius: "40px",
    "& h4": {
      fontSize: "14px",
      lineHeight: " 17px",
      color: "#000",
      margin: "0 5px",
      "@media (max-width:767px)": {
        display: "none",
      },
    },
    "& svg": {
      "@media (max-width:767px)": {
        display: "none",
      },
    },
    "&:hover": {
      backgroundColor: " #FCF2FA",
      borderRadius: "40px",
    },
    "& figure": {
      margin: 0,
      width: 40,
      height: 40,
      borderRadius: "50px",
      overflow: "hidden",
      display: "flex",
      justifyContent: " center",
      alignItems: "center",
      "& img": {
        width: "auto",
        height: "auto",
        maxWidth: "100%",
        // maxHeight: "100%",
      },
    },
  },
  customizedButton: {
    fontSize: "20px",
    padding: "5px 10px 10px 0px",
  },
  dailogOpen: {
    borderRadius: "25px",
    padding: "10px",
    "& h5": {
      color: "#3B0D60",
      fontSize: "17px",
    },
  },
  customizedButton1: {
    display: "flex !important",
    justifyContent: "end",
    "& div": {
      display: "flex !important",
    },
  },
  paper: {
    overflowY: "unset",
  },
  dialogBox: {
    padding: "20px !important",
    "& h5": {
      color: "#3B0D60",
      fontSize: "20px",
    },
  },
  searcBox: {
    backgroundColor: "#DAF4FF",
    // border: "1px solid #daf4ff",
    borderRadius: " 50px",
  },
}));

export default function Header() {
  const user = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [walletPopup, setWalletPopup] = useState(false);
  const [isWrongNetwork, setIsWrongNetwork] = useState(false);
  const { account, chainId } = useWeb3React();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClose1 = () => {
    setAnchorEl(null);
  };
  const {
    menuMobile,
    menuButton,
    menuButton1,
    paper,
    dialogBox,
    divstake,
    toolbar,
    search,
    searchIcon,
    flexButton,
    inputInput,
    drawerContainer,
    drawericon,
    inputRoot,
    logoDrawer,
    containerHeight,
    mainHeader,
    searcBox,
    wallet,
    menuMobile1,
    submenu,
    customizedButton,
    dailogOpen,
    customizedButton1,
  } = useStyles();
  const history = useHistory();

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const { mobileView, drawerOpen } = state;
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl1(null);
  };

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 1220
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  const [open1, setOpen1] = useState({ community: false, user: false });
  const anchorRef = { community: useRef(null), user: useRef(null) };
  const [updateMinSatkeOpen, setUpdateMinSatkeOpen] = useState(false);
  const [updateName, setUpdateName] = useState(false);
  const searchTextRef = React.useRef(null);
  const location = useLocation();
  const [searchResult, setSearchResult] = useState();

  const handleClose2 = (event, name) => {
    if (
      anchorRef[name].current &&
      anchorRef[name].current.contains(event.target)
    ) {
      return;
    }

    setOpen1({ ...open1, [name]: false });
  };

  function handleListKeyDown(event, name) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen1({ ...open1, [name]: false });
    }
  }
  const [searchInput, setSearchInput] = useState("");

  const onKeyDown = (event) => {
    // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
    if (event.key === "Enter") {
      if (searchInput !== "") {
        history.push({
          pathname: "/searchprofile",
          search: searchInput,
        });
        // alert(searchInput);
      } else {
        setSearchInput("");
        history.push({
          pathname: "/searchprofile",
          search: searchInput,
        });
        // alert("empty");
        // window.location.href = "/search";
      }
    }
  };

  const StyledMenu = withStyles({
    paper: {
      marginTop: "2px",
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      {...props}
    />
  ));

  const placeorderlistapi = async (id) => {
    axios
      .request({
        method: "GET",
        url: `${ApiConfig.dashboardSearch}?search=${id}`,

        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          setSearchResult(res.data.result.orderResult);
        } else {
          setSearchResult();
        }
      });
    // }
  };

  useEffect(() => {
    if (searchInput) {
    } else {
      setSearchResult();
    }
    return () => {};
  }, [searchInput]);

  useEffect(() => {
    searchTextRef.current.focus();
    if (
      location.pathname === "/searchprofile" &&
      location.search &&
      location.search.slice(1, location.search.length)
    ) {
      let text = location.search.slice(1, location.search.length);
      setSearchInput(text);
    }
  }, [location]);

  const displayDesktop = () => {
    return (
      <Container maxWidth="lg">
        <Toolbar className={toolbar}>
          {femmecubatorLogo}
          <Grid
            container
            item
            direction="row"
            justify="flex-end"
            alignItems="center"
            style={{ paddingLeft: "0px" }}
          >
            {/* <div>{getMenuButtons()}</div> */}
            <div className={flexButton}>
              <FormControl variant="outlined" className={searcBox}>
                <InputBase
                  placeholder="Search"
                  ref={searchTextRef}
                  autoFocus={true}
                  type="search"
                  onKeyDown={onKeyDown}
                  onChange={(e) => setSearchInput(e.target.value)}
                  id="outlined-adornment-weight"
                  startAdornment={
                    <InputAdornment position="start">
                      <CgSearch
                        style={{ fontSize: "25px", marginLeft: "10px" }}
                      />
                    </InputAdornment>
                  }
                  aria-describedby="outlined-weight-helper-text"
                />
              </FormControl>
              {/* {user?.isLogin && (
                <>
                  {user?.kycStatusRes?.kycStatus == "APPROVE" ||
                  user?.isAdmin ? (
                    <Button
                      variant="outlined"
                      color="primary"
                      component={Link}
                      to="/create-nft"
                    >
                      New NFT
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        setWalletPopup(true);
                        // toast.warn(
                        //   "We are required by law to verify content creators in our platform due to the nature of our business. Please verify below in order to become a creator"
                        // );
                      }}
                    >
                      New NFT
                    </Button>
                  )}
                </>
              )}{" "} */}
              &nbsp;
              {user?.isLogin && (
                <>
                  {(user?.kycStatusRes?.kycStatus == "APPROVE" ||
                    user?.isAdmin) && (
                    <Button
                      variant="outlined"
                      color="primary"
                      component={Link}
                      to="/import-nft"
                    >
                      Import NFT
                    </Button>
                  )}
                </>
              )}
              {stackmenu}
            </div>
          </Grid>
        </Toolbar>
      </Container>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar className={mainHeader}>
        <Drawer
          {...{
            anchor: "right",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={drawerContainer}>
            <img className={logoDrawer} src="images/footerlogo.png" alt="" />
            {/* {getDrawerChoices()} */}
            {/* <Button
              className={wallet}
              aria-controls="simple-menu"
              aria-haspopup="true"
              to="/wallet"
              component={Link}
            >
              Connect wallet
            </Button> */}
            {stackmenu}
          </div>
        </Drawer>

        <div style={{ marginLeft: "20px" }}>{femmecubatorLogo}</div>
        <Grid container>
          <Grid item xs={10}>
            <Box display="flex">
              <FormControl
                variant="outlined"
                className={searcBox}
                // style={{ marginLeft: "20px" }}
              >
                <InputBase
                  placeholder="Search"
                  type="search"
                  id="outlined-adornment-weight"
                  startAdornment={
                    <InputAdornment position="start">
                      <CgSearch
                        style={{ fontSize: "25px", marginLeft: "10px" }}
                      />
                    </InputAdornment>
                  }
                  aria-describedby="outlined-weight-helper-text"
                />
              </FormControl>
            </Box>
          </Grid>
          {/* <Grid item xs={2}>
            <IconButton
              className={drawericon}
              {...{
                edge: "start",
                color: "inherit",
                "aria-label": "menu",
                "aria-haspopup": "true",
                onClick: handleDrawerOpen,
              }}
            >
              <MenuIcon
                width="60px"
                height="60px"
                style={{ color: "#197ab3", fontSize: "30px" }}
              />
            </IconButton>
          </Grid> */}
        </Grid>
      </Toolbar>
    );
  };

  const femmecubatorLogo = (
    <Box>
      <Link to="/">
        <Logo className="logoImg" />
      </Link>
    </Box>
  );
  const stackmenu = (
    <div>
      {user?.isLogin ? (
        <IconButton
          aria-label="delete"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick1}
          className={menuMobile1}
          size="small"
        >
          <figure>
            <img
              src={
                user?.userData?.profilePic
                  ? user?.userData?.profilePic
                  : "/images/idicon.svg"
              }
              alt=""
            />
          </figure>
          <Typography
            variant="h4"
            title={
              user?.userData?.name
                ? user?.userData?.name
                : user?.userData?.walletAddress
            }
          >
            {" "}
            {user?.userData?.name
              ? user?.userData?.name.slice(0, 5) + ".."
              : sortAddress(user?.userData?.walletAddress)}
          </Typography>
          <BsFillCaretDownFill style={{ color: "#000", fontSize: "16px" }} />
        </IconButton>
      ) : (
        <IconButton
          aria-label="delete"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={() => setUpdateMinSatkeOpen(true)}
          className={menuMobile1}
          size="small"
        >
          {/* <figure>
            <img
              src={
                user?.userData?.profilePic
                  ? user?.userData?.profilePic
                  : "/images/Profile.png"
              }
              alt=""
            />
          </figure> */}
          <Button
            variant="contained"
            size="large"
            color="primary"
            to="/conect-wallet"
            component={Link}
          >
            Connect
          </Button>
        </IconButton>
      )}

      <Box className={divstake}>
        <StyledMenu
          id="simple-menu"
          disableScrollLock={true}
          anchorEl={anchorEl1}
          keepMounted
          open={Boolean(anchorEl1)}
          onClose={handleClose4}
        >
          {user?.kycStatusRes?.kycStatus !== "APPROVE" && user?.isAdmin && (
            <MenuItem
              onClick={() => {
                history.push("/become-creator");
              }}
            >
              Become a creator
            </MenuItem>
          )}
          <MenuItem
            onClick={() => {
              history.push("/profile");
            }}
          >
            Profile
          </MenuItem>
          {/* {!user?.userData?.name && (
            <MenuItem onClick={() => setUpdateName(true)}>Edit Name</MenuItem>
          )} */}
          <MenuItem
            onClick={() => {
              history.push("/create");
            }}
          >
            Create
          </MenuItem>
          <MenuItem
            onClick={() => {
              user.logoutHandler();
              setAnchorEl1();
            }}
          >
            Disconnect
          </MenuItem>
        </StyledMenu>
      </Box>
    </div>
  );

  return (
    <>
      {updateName && (
        <Dialog
          open={updateName}
          onClose={() => {
            setUpdateName(false);
          }}
          maxWidth="sm"
        >
          {/* <DialogContent>
            <EnterName
              user={user}
              onClose={() => {
                setUpdateName(false);
              }}
            />
          </DialogContent> */}
        </Dialog>
      )}

      {updateMinSatkeOpen && (
        <Dialog
          open={updateMinSatkeOpen}
          onClose={() => {
            setUpdateMinSatkeOpen(false);
          }}
          maxWidth="sm"
        >
          <DialogContent>
            <ConnectWallet
              onClose={() => {
                setUpdateMinSatkeOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      )}

      <AppBar
        position={history.location.pathname !== "/" ? "relative" : "absolute"}
        elevation={0}
        style={{ background: "#2e3130", border: "none" }}
      >
        <Box
          maxWidth={history.location.pathname !== "/" ? "lg" : "fixed"}
          className={containerHeight}
        >
          {mobileView ? displayMobile() : displayDesktop()}
        </Box>
      </AppBar>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose1}
      >
        <MenuItem>
          <Link to="/profile">My Profile</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/user">My Nft</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/resell-nft">Resell Nft</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/create-nft">Create NFT</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/notification">Notification</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/search">Search</Link>
        </MenuItem>
      </Menu>
      <Box>
        {walletPopup && (
          <Dialog
            open={walletPopup}
            onClose={() => setWalletPopup(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="lg"
            className={dailogOpen}
            style={{ borderRadius: "25px", padding: "10px" }}
          >
            <DialogContent
              style={{
                width: "500px",
                background: "#fff",
                borderRadius: "25px",
                padding: "10px !important",
              }}
            >
              <Box
                className={customizedButton1}
                style={{ display: "flex !important" }}
              >
                <IconButton
                  onClick={() => setWalletPopup(false)}
                  className={customizedButton}
                >
                  <GiCancel />
                </IconButton>
              </Box>
              <Box mb={2}>
                <Typography variant="h5">
                  We are required by law to verify content creators in our
                  platform due to the nature of our business. Please verify
                  below in order to become a creator.
                </Typography>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => history.push("/become-creator")}
                >
                  Verify
                </Button>
              </Box>
            </DialogContent>
          </Dialog>
        )}
      </Box>
    </>
  );
}

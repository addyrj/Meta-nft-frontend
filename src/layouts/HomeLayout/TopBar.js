import {
  AppBar,
  Toolbar,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  Grid,
  MenuItem,
  Box,
  Container,
  FormControl,
  Typography,
  OutlinedInput,
  InputAdornment,
  Menu,
  InputBase,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import MenuIcon from "@material-ui/icons/Menu";
import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Logo from "./../../component/Logo";
import { CgSearch } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import { ACTIVE_NETWORK, getNetworkDetails } from "src/constants";
import { UserContext } from "src/context/User";
import { useWeb3React } from "@web3-react/core";
import { sortAddress } from "src/utils";
import SearchBox from "src/layouts/HomeLayout/DashboardLayout/SearchBox";

import { BsFillCaretDownFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { getWeb3Obj, getContract, swichNetworkHandler } from "src/utils";
import { FaRegCopy } from "react-icons/fa";
// import { toast } from "react-toastify";
import CopyToClipboard from "react-copy-to-clipboard";
const headersData = [
  {
    label: "Marketplace",
    href: "/explore",
  },
  {
    label: "Collections",
    href: "/collections",
  },
  // {
  //   label: "Feature",
  //   href: "/roadmap",
  // },
];

const useStyles = makeStyles((theme) => ({
  menuButton: {
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: "500",
    borderRadius: 0,
    minWidth: "auto",
    color: "#fff",
    height: "31px",
    padding: "0px 7px",
    letterSpacing: "1px",
    // marginLeft: "15px",
    textDecoration: " none",
    "@media (max-width: 900px)": {
      fontStyle: "normal",
      letterSpacing: "-0.6px",
      lineHeight: "24px",
      color: "#FFF",
      padding: "15px !important",
      height: "51px",
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    "&.active": {
      color: "#51ACED",
    },
    "&:hover": {
      color: "#51ACED",
    },
  },
  toolbar: {
    // display: "flex",
    // padding: "10px 0",
    // justifyContent: "space-between",
    // height: "100%",
    // "@media (max-width: 900px)": {
    //   paddingLeft: "75px",
    //   paddingRight: "20px",
    //   height: "100%",
    // },
    padding: "0px",
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
    padding: "20px 0px 20px 20px",
    height: "100%",
    background: "#fff",
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
    right: "-10px",
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
  menuMobile: {
    fontSize: "16px",
    fontWeight: "400",
    fontStyle: "normal",
    letterSpacing: "-0.6px",
    lineHeight: "1.75",
    color: "#000",
    paddingLeft: 0,
    // borderBottom: "1px solid #3e3e3e",
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
    height: "40px",
    position: "relative",
    color: "#ABABAB",
    borderRadius: "100px",
    // backgroundColor: "#DAF4FF",
    border: "1px solid #fff",

    marginLeft: 20,
    width: "100%",

    // [theme.breakpoints.up("sm")]: {
    //   marginLeft: theme.spacing(1),
    //   width: "180px",
    // },
  },
  searchIcon: {
    fontSize: "16px",
    padding: theme.spacing(0, 2),
    color: "#fff",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    fontSize: "16px",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    fontSize: "13px",
    marginTop: "-2px",
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      "&:focus": {
        width: "100%",
      },
    },
  },
  menuButton1: {
    paddingLeft: "0",
  },
  searcBox: {
    backgroundColor: "#DAF4FF",
    // border: "1px solid #daf4ff",
    borderRadius: " 50px",
  },
  menuMobile1: {
    // marginLeft: "10px",
    borderRadius: "40px",
    "& h4": {
      fontSize: "14px",
      lineHeight: " 17px",
      color: "#fff",
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
      // backgroundColor: " #FCF2FA",
      borderRadius: "40px",
    // border: "1px solid #F7722F",

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
}));

export default function Header() {
  const { account, chainId } = useWeb3React();
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const user = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [updateName, setUpdateName] = useState(false);
  // const searchTextRef = React.useRef(null);
  const location = useLocation();
  const [networkDetails, setNetworkDetails] = React.useState([]);

  const handleClose4 = () => {
    setAnchorEl1(null);
  };

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl(null);
  };
  const {
    menuMobile,
    menuButton,
    menuButton1,
    divstake,
    toolbar,
    drawerContainer,
    menuMobile1,
    drawericon,
    logoDrawer,
    containerHeight,
    mainHeader,
    search,
    inputInput,
    searchIcon,

    inputRoot,
    searcBox,
    marginbtn,
  } = useStyles();
  const history = useHistory();

  const [updateMinSatkeOpen, setUpdateMinSatkeOpen] = useState(false);
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

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

  // const handleToggle = (name) => {
  //   setOpen1({ ...open1, [name]: !open1[name] });
  // };

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

  // return focus to the button when we transitioned from !open -> open
  // const prevOpen = React.useRef(open1);
  // React.useEffect(() => {
  //   if (prevOpen.current === true && open1 === false) {
  //     anchorRef.current.focus();
  //   }

  //   prevOpen.current = open1;
  // }, [open1]);

  const displayDesktop = () => {
    return (
      // <Container maxWidth="lg" className="p-0">
      <Toolbar className={toolbar}>
        <Grid container alignItems="center">
          <Grid item xs={3}>
            {femmecubatorLogo}
          </Grid>
          <Grid item xs={3}>
            {SearchBoxx}
          </Grid>
          <Grid item xs={6} align="right">
            {getMenuButtons()}

            {/* {account && user.isLogin ? (
              <>
                <Button
                  style={{ marginLeft: "15px" }}
                  // className={wallet}
                  variant="contained"
                  size="large"
                  color="primary"
                  // to="/conect-wallet"
                  // component={Link}
                  onClick={() => user?.dicconectWalletFun()}
                >
                  Disconnect
                </Button>
                <Button
                  style={{ marginLeft: "15px" }}
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={() => {
                    history.push("/profile");
                  }}
                >
                  My Account
                </Button>
              </>
            ) : (
              <>
                <Button
                  style={{ marginLeft: "15px" }}
                  // className={wallet}
                  variant="contained"
                  size="large"
                  color="primary"
                  to="/conect-wallet"
                  component={Link}
                  // onClick={user.connectWallet}
                >
                  Connect wallet
                </Button>
              </>
            )} */}
          </Grid>
        </Grid>
        {/* {femmecubatorLogo}
          {SearchBox}
          <Grid
            container
            item
            direction="row"
            justify="flex-end"
            alignItems="center"
            style={{ paddingLeft: "0px" }}
          >
            {getMenuButtons()}
            <Button
              style={{ marginLeft: "15px" }}
              // className={wallet}
              variant="contained"
              size="large"
              color="primary"
              to="/wallet"
              component={Link}
            >
              Connect wallet
            </Button>
          </Grid> */}
        <div>
          {user?.isLogin ? (
            <IconButton
              aria-label="delete"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick1}
              className={menuMobile1}
              style={{ marginLeft: "10px" }}
              size="small"
            >
              <figure
                style={
                  user?.isLogin
                    ? { height: "40px", width: "40px" }
                    : { width: "0px" }
                }
              >
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
              <BsFillCaretDownFill
                style={{ color: "#000", fontSize: "16px" }}
              />
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
              <figure
                style={
                  user?.isLogin
                    ? { height: "40px", width: "40px" }
                    : { width: "0px" }
                }
              >
                <img
                  src={
                    user?.userData?.profilePic
                      ? user?.userData?.profilePic
                      : "/images/idicon.svg"
                  }
                  alt=""
                />
              </figure>
              <Button
                variant="contained"
                size="large"
                color="primary"
                to="/conect-wallet"
                component={Link}
                style={{ marginLeft: "15px", whiteSpace: "pre" }}
              >
                Connect Wallet
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
              <MenuItem
                onClick={() => {
                  history.push("/create");
                }}
              >
                Create
              </MenuItem>
              {/* {!user?.userData?.name && (
                <MenuItem onClick={() => setUpdateName(true)}>
                  Edit Name
                </MenuItem>
              )} */}
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
      </Toolbar>
      // {/* </Container> */}
    );
  };

  const [searchInput, setSearchInput] = useState("");
  const searchTextRef = React.useRef(null);

  // const onKeyDown = (event) => {
  //   // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
  //   if (event.key === "Enter") {
  //     if (searchInput !== "") {
  //       history.push({
  //         pathname: "/search",
  //         search: searchInput,
  //       });
  //       // alert(searchInput);
  //     } else {
  //       setSearchInput("");
  //       history.push({
  //         pathname: "/search",
  //         search: searchInput,
  //       });
  //       // alert("empty");
  //       // window.location.href = "/search";
  //     }
  //   }
  // };
  // useEffect(() => {
  //   if (searchInput) {
  //     // onKeyDown();
  //   }
  // }, [searchInput]);
  // useEffect(() => {
  //   searchTextRef.current.focus();
  //   if (
  //     location.pathname === "/search" &&
  //     location.search &&
  //     location.search.slice(1, location.search.length)
  //   ) {
  //     let text = location.search.slice(1, location.search.length);
  //     setSearchInput(text);
  //   }
  // }, [location]);

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

            {getDrawerChoices()}
            {/* {account && user.isLogin ? (
              <>
                <Button
                  style={{ marginTop: "24px" }}
                  // className={wallet}
                  variant="contained"
                  size="large"
                  color="primary"
                  // to="/conect-wallet"
                  // component={Link}
                  onClick={() => user?.dicconectWalletFun()}
                >
                  Disconnect
                </Button>
                <Button
                  style={{ marginTop: "24px" }}
                  // className={wallet}
                  variant="contained"
                  size="large"
                  color="primary"
                  // to="/conect-wallet"
                  // component={Link}
                  onClick={() => user?.dicconectWalletFun()}
                >
                  Dashboard
                </Button>
              </>
            ) : (
              <>
                <Button
                  style={{ marginTop: "24px" }}
                  // className={wallet}
                  variant="contained"
                  size="large"
                  color="primary"
                  to="/conect-wallet"
                  component={Link}
                  // onClick={user.connectWallet}
                >
                  Connect wallet
                </Button>
              </>
            )} */}
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
                  <figure
                    style={
                      user?.isLogin
                        ? { height: "40px", width: "40px" }
                        : { width: "0px" }
                    }
                  >
                    <img
                      src={
                        user?.userData?.profilePic
                          ? user?.userData?.profilePic
                          : "/images/Profile.png"
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
                  <BsFillCaretDownFill
                    style={{ color: "#000", fontSize: "16px" }}
                  />
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
                  <figure
                    style={
                      user?.isLogin
                        ? { height: "40px", width: "40px" }
                        : { width: "0px" }
                    }
                  >
                    <img
                      src={
                        user?.userData?.profilePic
                          ? user?.userData?.profilePic
                          : "/images/Profile.png"
                      }
                      alt=""
                    />
                  </figure>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    to="/conect-wallet"
                    component={Link}
                    style={{ whiteSpace: "pre" }}
                  >
                    Connect Wallet
                  </Button>
                </IconButton>
              )}

              <Box className={divstake}>
                <Menu
                  id="simple-menu"
                  disableScrollLock={true}
                  anchorEl={anchorEl1}
                  keepMounted
                  open={Boolean(anchorEl1)}
                  onClose={handleClose4}
                >
                  {user?.kycStatusRes?.kycStatus !== "APPROVE" &&
                    user?.isAdmin && (
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
                  <MenuItem
                    onClick={() => {
                      history.push("/create");
                    }}
                  >
                    Create
                  </MenuItem>
                  {/* {!user?.userData?.name && (
                    <MenuItem onClick={() => setUpdateName(true)}>
                      Edit Name
                    </MenuItem>
                  )} */}
                  <MenuItem
                    onClick={() => {
                      user.logoutHandler();
                      setAnchorEl1();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            </div>
            {/* <Box mt={3}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                to="/conect-wallet"
                component={Link}
              >
                Connect wallet
              </Button>
            </Box> */}
          </div>
        </Drawer>
        {/* QIE wallet */}
        {/* <Box>
          <Dialog
            open={user.walletError}
            // onClose={user.setwalletError}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Box>
                  <Typography
                    style={{
                      fontSize: "20px",
                      color: "rgb(34, 167, 240)",
                      fontWeight: " 600",
                    }}
                  >
                    Please add QIE chain network in your Metamask
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    style={{
                      fontSize: " 16px",
                      fontWeight: " 500",
                      color: "#000",
                    }}
                  >
                    {" "}
                    Below are the details :
                  </Typography>
                </Box>
                <Box>
                  <Typography style={{ color: "#fff" }}>
                    Blockchain Name : {networkDetails?.chainName}
                  </Typography>
                  <Typography style={{ color: "#fff" }}>
                    Chain Id : 1732
                  </Typography>
                  <Typography style={{ color: "#fff" }}>
                    RPC URL : {networkDetails?.rpcUrls}{" "}
                    <CopyToClipboard text={networkDetails?.rpcUrls}>
                      <FaRegCopy
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => toast.info("Copied")}
                      />
                    </CopyToClipboard>
                  </Typography>
                  <Typography style={{ color: "#fff" }}>
                    Symbol : {networkDetails?.nativeCurrency?.symbol}
                  </Typography>
                  <Typography style={{ color: "#fff" }}>
                    Explorer : {networkDetails?.blockExplorerUrls}{" "}
                    <CopyToClipboard text={networkDetails?.blockExplorerUrls}>
                      <FaRegCopy
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => toast.info("Copied")}
                      />
                    </CopyToClipboard>
                  </Typography>
                </Box>
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </Box> */}

        <Grid container alignItems="center">
          <Grid item xs={5}>
            <Box>{femmecubatorLogo}</Box>
          </Grid>
          <Grid item xs={5}>
            {SearchBoxx}
          </Grid>
          <Grid item xs={2}>
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
          </Grid>
        </Grid>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return headersData.map(({ label, href }) => {
      return (
        <>
          <Button
            {...{
              key: label,
              color: "inherit",
              to: href,
              component: Link,
              className: menuButton1,
            }}
          >
            <MenuItem className={menuMobile}>{label}</MenuItem>
          </Button>
        </>
      );
    });
  };

  const femmecubatorLogo = (
    <Box>
      <Link to="/">
        <Logo className="logoImg" />
      </Link>
    </Box>
  );

  const SearchBoxx = (
    <SearchBox
      search={search}
      inputRoot={inputRoot}
      inputInput={inputInput}
      searchIcon={searchIcon}
    />
  );

  const getMenuButtons = (activeClassName) => {
    return headersData.map(({ label, href }) => {
      return (
        <>
          {/* <Button
            {...{
              key: label,
              color: "inherit",
              to: href,
              component: Link,
              className: menuButton,
            }}
          >
            {label}
          </Button> */}
          <NavLink
            exact
            // to={`${href}`}
            {...{
              key: label,
              color: "inherit",
              to: href,
              // component: Link,
              className: menuButton,
              activeClassName: "active",
            }}
          >
            {" "}
            {label}
          </NavLink>
        </>
      );
    });
  };

  return (
    <>
      <AppBar
        position={history.location.pathname !== "/" ? "relative" : "absolute"}
        elevation={0}
        style={{ backgroundColor: "#2e3130", border: "none" }}
      >
        <Container
          maxWidth={history.location.pathname !== "/" ? "lg" : "lg"}
          className={containerHeight}
        >
          {mobileView ? displayMobile() : displayDesktop()}
        </Container>
      </AppBar>
    </>
  );
}

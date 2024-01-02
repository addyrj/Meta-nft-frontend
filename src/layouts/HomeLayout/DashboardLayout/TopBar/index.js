import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  makeStyles,
  IconButton,
  Hidden,
  SvgIcon,
} from "@material-ui/core";

import { Menu as MenuIcon } from "react-feather";
import TopBarData from "./TopBarData";

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.secondary.main,
  },
  toolbar: {
    height: 70,
    padding: "0 10px",
    float: "right",
    width: "calc(100% - 256px)",
    right: 0,
    position: "absolute",
    top: -2,
    padding: 0,
    background: "#2e3130",
    // backgroundImage:
    //   "url(/images/line.png), linear-gradient(105deg, #feeefd 1.25%, #4606b9 99.18%)",
    // backgroundRepeat: "no-repeat",
    // backgroundPosition: "top",
    // background: "rgba(204, 204, 204, 0)",
    "@media (max-width: 1279px)": {
      width: "100%",
    },
  },
  logo: {
    marginRight: theme.spacing(2),
  },
  link: {
    fontWeight: theme.typography.fontWeightMedium,
    "& + &": {
      marginLeft: theme.spacing(2),
    },
  },
  divider: {
    width: 1,
    height: 32,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  drawericon: {
    color: "#000",
    // position: "absolute",
    top: "0px",
    // right: "-10px",
    left: "15px",
    fontSize: "25px",
  },
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  const { drawericon } = useStyles();
  return (
    <AppBar
      elevation={0}
      className={clsx(classes.root, className)}
      color="inherit"
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
        <Hidden lgUp>
          {/* <IconButton
            color="#000"
            onClick={onMobileNavOpen}
            style={{ marginRight: 10, padding: "5px" }}
            className={drawericon}
          >
            <SvgIcon fontSize="small">
              <MenuIcon
                width="60px"
                height="60px"
                style={{ color: "#197ab3", fontSize: "30px" }}
              />
            </SvgIcon>
          </IconButton> */}
          <IconButton
            className={drawericon}
            {...{
              edge: "start",
              color: "inherit",
              "aria-label": "menu",
              "aria-haspopup": "true",
              onClick: onMobileNavOpen,
            }}
          >
            <MenuIcon
              width="25px"
              height="25px"
              style={{ color: "#197ab3", fontSize: "30px" }}
            />
          </IconButton>
        </Hidden>
        <TopBarData />
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
};
TopBar.defaultProps = {
  onMobileNavOpen: () => {},
};

export default TopBar;

/* eslint-disable no-use-before-define */
import React, { useContext, useEffect } from "react";
import { useLocation, matchPath, useHistory } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { DiHtml5Multimedia } from "react-icons/di";
import PropTypes from "prop-types";
import {
  Box,
  Drawer,
  Hidden,
  List,
  ListSubheader,
  makeStyles,
} from "@material-ui/core";
import { VscFeedback } from "react-icons/vsc";

import {
  FaTachometerAlt,
  FaClipboardCheck,
  FaQuestionCircle,
} from "react-icons/fa";
import { GiToken } from "react-icons/gi";
import NavItem from "./NavItem";
import PeopleIcon from "@material-ui/icons/People";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { AiOutlineControl } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { UserContext } from "src/context/User";
import { RiAdminLine } from "react-icons/ri";
import { Category } from "@material-ui/icons";
import { BsCardList, BsCollectionFill } from "react-icons/bs";
const sections = [
  {
    items: [
      {
        title: "Marketplace",
        icon: BsCardList,
        href: "/explore",
      },
      {
        title: "Collections",
        icon: BsCollectionFill,
        href: "/collections",
      },
      {
        title: "Creators",
        icon: FaTachometerAlt,
        href: "/creators-list",
      },
      {
        title: "My Collection",
        icon: FaTachometerAlt,
        href: "/my-collections",
      },
    ],
  },
];

const sectionsAfterLogin = [
  {
    items: [
      {
        title: "My Activity",
        icon: DashboardIcon,
        href: "/activity",
      },
    ],
  },
];

const sectionsAdmin = [
  {
    items: [
      {
        title: "Admin",
        icon: RiAdminLine,
        href: "/admin",
      },
      {
        title: "Control",
        icon: AiOutlineControl,
        href: "/control",
      },
      {
        title: "Category",
        icon: Category,
        href: "/category",
      },
      {
        title: "Feedback",
        icon: VscFeedback,
        href: "/feedback-list",
      },
      {
        title: "Media",
        icon: DiHtml5Multimedia,
        href: "media-list",
      },
      {
        title: "Faq Management",
        icon: FaQuestionCircle,
        href: "faq-list",
      },
    ],
  },
];

const sectionsBelow = [
  {
    items: [
      {
        // title: "Logout",
        icon: ExitToAppIcon,
        href: "/terms-and-condition",
      },
      // {
      //   title: "Privacy Policy",
      //   //icon: PieChartIcon,
      //   href: "/privacy-policy",
      // },
    ],
  },
];

function renderNavItems({ items, pathname, depth = 0 }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, pathname, depth }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({ acc, pathname, item, depth }) {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false,
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items,
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        info={item.info}
        key={key}
        title={item.title}
      />
    );
  }

  return acc;
}

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 256,
    background: "#2e3130",
    backdropFilter: "blur(44px)",
  },
  desktopDrawer: {
    width: 256,
    top: 0,
    height: "100%",
    background: "#2e3130",
    backdropFilter: "blur(44px)",
    boxShadow: "rgb(90 114 123 / 11%) 0px 7px 30px 0px",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
  socialIcon: {
    cursor: "pointer",
    marginRight: 5,
  },
  logoicon: {
    display: "flex",
    marginTop: "16px",
    alignItems: "center",
    marginLeft: "30px",
  },
  logoutbutton: {
    justifyContent: "space-between",
    paddingLeft: 10,
    borderRadius: 0,
    width: "60px",
    textAlign: "center",
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const user = useContext(UserContext);
  const classes = useStyles();
  const location = useLocation();
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Box pt={4}>
          {sections.map((section, i) => (
            <List
              key={`menu${i}`}
              subheader={
                <ListSubheader disableGutters disableSticky>
                  {section.subheader}
                </ListSubheader>
              }
            >
              {renderNavItems({
                items: section.items,
                pathname: location.pathname,
              })}
            </List>
          ))}

          {user?.isLogin &&
            sectionsAfterLogin.map((section, i) => (
              <List
                key={`menu${i}`}
                subheader={
                  <ListSubheader disableGutters disableSticky>
                    {section.subheader}
                  </ListSubheader>
                }
              >
                {renderNavItems({
                  items: section.items,
                  pathname: location.pathname,
                })}
              </List>
            ))}

          {user?.isLogin &&
            user?.userData?.userType == "Admin" &&
            sectionsAdmin.map((section, i) => (
              <List
                key={`menu${i}`}
                subheader={
                  <ListSubheader disableGutters disableSticky>
                    {section.subheader}
                  </ListSubheader>
                }
              >
                {renderNavItems({
                  items: section.items,
                  pathname: location.pathname,
                })}
              </List>
            ))}
        </Box>
        <Box className="side_nev_Bottom">
          {sectionsBelow.map((section, i) => (
            <List
              key={`menu${i}`}
              subheader={
                <ListSubheader disableGutters disableSticky>
                  {section.subheader}
                </ListSubheader>
              }
            ></List>
          ))}
        </Box>
      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default NavBar;

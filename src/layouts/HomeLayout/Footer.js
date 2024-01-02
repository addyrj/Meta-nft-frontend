import React, { useState, useRef, useContext, useEffect } from "react";

import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
  ListItem,
  List,
  Link,
  IconButton,
} from "@material-ui/core";
import { UserContext } from "src/context/User";
import { useHistory, Link as RouterLink } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import { FaFacebookF, FaInstagram, FaMediumM } from "react-icons/fa";
import { FiSend, FiTwitter, FiYoutube } from "react-icons/fi";
import { AiOutlineReddit, AiFillYoutube } from "react-icons/ai";
import { FcReddit } from "react-icons/fc";
import Scroll from "react-scroll";
import { useWeb3React } from "@web3-react/core";
import { toast } from "react-toastify";

import Profile from "../../views/pages/Profile/Profile";
const ScrollLink = Scroll.Link;

const useStyles = makeStyles((theme) => ({
  footerSection: {
    background: "#F7722F",
    position: "relative",
    padding: "50px 0px 0",
    zIndex: "2",
    overflow: " hidden",
    "& .copy": {
      borderTop: "1px solid #D0D0D0",
      padding: "10px 0",
      textAlign: "center",
      fontWeight: 300,
      fontSize: "12px",
      color: "#fff",
    },
    "& .shape": {
      position: "absolute",
      right: "20px",
      top: "50px",
      [theme.breakpoints.down("xs")]: {
        top: "50%",
      },
    },
    "& .shape2": {
      position: "absolute",
      left: "80px",
      top: "55px",
    },
    "& .shape3": {
      position: "absolute",
      left: "40px",
      top: "75px",
    },
    "& .shape4": {
      position: "absolute",
      left: "200px",
      bottom: "50px",
    },
    "& ul": {
      paddingLeft: "0",
      [theme.breakpoints.down("sm")]: {
        marginBottom: "30px",
      },
      [theme.breakpoints.down("xs")]: {
        marginBottom: "0px",
      },
      "& li": {
        paddingLeft: "0",
        alignItems: "center",
        color: " #1D1D1D",
        fontSize: "14px",
        "& svg": {
          marginRight: "10px",
          color: "#408FAC",
          fontSize: "15px",
        },
      },
    },
    "& svg": {
      color: "#408FAC",
      fontSize: "15px",
    },
    "& p": {
      color: "#fff",
    },
    "& h6": {
      [theme.breakpoints.down("sm")]: {
        marginTop: "30px",
      },
      [theme.breakpoints.down("xs")]: {
        marginTop: "20px",
      },
    },
    "& a": {
      color: "#fff",
      fontWeight: 400,
      textDecoration: "none",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      "&:hover": {
        color: "#35a5f5",
        textDecoration: "none",
      },
    },
  },
  title:{
    color:'#fff',
  }
}));

export default function Liquidity() {
  const classes = useStyles();
  const history = useHistory();
  const user = useContext(UserContext);

  const { account, library, chainId } = useWeb3React();

  const toastmsg = () => {
    toast.warn("Please connect your wallet");
  };
  const toastmsgcreate = () => {
    toast.warn("Please connect your wallet");
  };
  return (
    <>
      <Box className={classes.footerSection}>
        <img src="images/shape/shape-1.png" className="shape moveTop" />
        <img src="images/shape/shape-3.png" className="shape2 rotate" />
        <img src="images/shape/shape-2.png" className="shape3 moveLeft" />
        <img src="images/shape/shape-4.png" className="shape4 rotate" />
        <Container maxWidth="lg">
          <Grid container>
            <Grid item xs={12} sm={12} md={3}>
              <Box mr={8}>
                <Box mb={2}>
                  {" "}
                  <RouterLink to="/">
                    <img src="images/optimismLogo.png" style={{height:"108px"}}/> <br />
                  </RouterLink>
                </Box>
                <Typography variant="body1" component="small" style={{color:"#fff"}}>
                  NFT marketplace with the lowest transaction fees in the world.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={7}>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Typography variant="h6" className={classes.title}>Web Link</Typography>
                  <List>
                    <ListItem to="/collections" component={RouterLink}>
                      Collections
                    </ListItem>

                    {/* <ListItem to="/ranking" component={RouterLink}>
                      Ranking
                    </ListItem> */}
                    {account ? (
                      <ListItem to="/activity" component={RouterLink}>
                        My Activity
                      </ListItem>
                    ) : (
                      <ListItem
                        onClick={() => {
                          history.push({
                            pathname: "conect-wallet",
                            search: "myactivity",
                          });
                        }}
                        style={{ cursor: "pointer", color: "#fff" }}
                      >
                        My Activity
                      </ListItem>
                    )}
                    <ListItem style={{ cursor: "pointer" }}>
                      <Link
                        onClick={() =>
                          window.open("https://referral.hovr.site/")
                        }
                      >
                        Referral Program
                      </Link>
                    </ListItem>
                    <ListItem to="/support-tickets" component={RouterLink}>
                      Support-Ticket
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="h6" className={classes.title}>My Account</Typography>
                  <List>
                    {account && user?.userData?.userType === "Admin" ? (
                      <ListItem to="my-mints" component={RouterLink}>
                        My Mint
                      </ListItem>
                    ) : (
                      <ListItem
                        onClick={() => {
                          history.push({
                            pathname: "conect-wallet",
                            search: "mymints",
                          });
                        }}
                        style={{ cursor: "pointer", color: "#fff" }}
                      >
                        My Mint
                      </ListItem>
                    )}

                    {account ? (
                      <ListItem to="create" component={RouterLink}>
                        Create Items
                      </ListItem>
                    ) : (
                      <ListItem
                        onClick={() => {
                          history.push({
                            pathname: "conect-wallet",
                            search: "mycreate",
                          });
                        }}
                        style={{ cursor: "pointer", color: "#fff" }}
                      >
                        Create Items
                      </ListItem>
                    )}
                    {account ? (
                      <ListItem to="profile" component={RouterLink}>
                        My Account
                      </ListItem>
                    ) : (
                      <ListItem
                        // to="conect-wallet"
                        // component={RouterLink}
                        onClick={() => {
                          history.push({
                            pathname: "conect-wallet",
                            search: "myaccount",
                          });
                        }}
                        style={{ cursor: "pointer", color: "#fff" }}
                        // onClick={toastmsg}
                      >
                        My Account
                      </ListItem>
                    )}
                  </List>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="h6" className={classes.title}>Support</Typography>
                  <List>
                    {/* <ListItem>
                      {history.location.pathname !== "/" ? (
                        <List>
                          <ListItem>
                            <Link
                              to="/"
                              style={{
                                textDecoration: "none",
                                color: "#aeaeae",
                              }}
                            >
                              FAQs{" "}
                            </Link>
                          </ListItem>
                        </List>
                      ) : (
                        <List>
                          <ListItem>
                            <ScrollLink
                              smooth={true}
                              duration={500}
                              style={{
                                textDecoration: "none ",
                                cursor: "pointer",
                              }}
                              to="section1"
                            >
                              FAQs{" "}
                            </ScrollLink>
                          </ListItem>
                        </List>
                      )}
                    </ListItem> */}
                    <ListItem to="/faqs" component={RouterLink}>
                      FAQs
                    </ListItem>
                    <ListItem to="/help-center" component={RouterLink}>
                      Help Center
                    </ListItem>
                    <ListItem to="/feedback" component={RouterLink}>
                      Feedback
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="h6" className={classes.title}>Other</Typography>
                  <List>
                    <ListItem to="/about" component={RouterLink}>
                      About Us
                    </ListItem>
                    <ListItem to="/terms-conditions" component={RouterLink}>
                      Terms & Conditions
                    </ListItem>
                    <ListItem to="/privacy-policy" component={RouterLink}>
                      Privacy Policy
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={2}>
              <Typography variant="h6" className={classes.title}>Contact Us</Typography>
              <List>
                <ListItem>
                  <Link href="mailto:info@hovr.site">
                    <AiOutlineMail />
                    {/* {user?.userData?.userType === "Admin" ? (
                      <> {user?.userData?.email}</>
                    ) : (
                      <>support@HOVR.com</>
                    )} */}
                    info@hovr.site
                  </Link>
                </ListItem>
              </List>
              <Box>
                <IconButton>
                  <Link
                    target="_blank"
                    href="https://www.facebook.com/hovr.site/"
                  >
                    <FaFacebookF />
                  </Link>
                </IconButton>
                <IconButton>
                  <Link
                    target="_blank"
                    href="https://www.youtube.com/watch?v=CMqRqd97rQg"
                  >
                    <FiYoutube />
                  </Link>
                </IconButton>
                <IconButton>
                  <Link
                    target="_blank"
                    href="https://www.instagram.com/hovr.site/?igshid=YmMyMTA2M2Y%3D"
                  >
                    <FaInstagram />
                  </Link>
                </IconButton>
                <IconButton>
                  <Link target="_blank" href="https://twitter.com/HovrSite">
                    <FiTwitter />
                  </Link>
                </IconButton>
                <IconButton>
                  <Link
                    target="_blank"
                    href="https://www.reddit.com/r/hovrNFT/"
                  >
                    <AiOutlineReddit style={{ fontSize: "20px" }} />
                  </Link>
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Container>
        <Box className="copy" mt={1}>
          © 2022 All Rights Reserved
        </Box>
      </Box>
    </>
  );
}

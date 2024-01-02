import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  TextField,
  IconButton,
  FormControl,
  FormHelperText,
  Input,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
  bannerBox: {
    padding: "40px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "50px 0",
    },
  },
  code: {
    "& .barcode": {
      border: "1px solid rgba(0, 0, 0, 0.4)",
      padding: "45px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "10px",
      width: "100%",
      "@media(max-width:459px)": {
        width: "auto",
      },
    },
    "& .qrcode": {
      width: "100%",
      border: "1px solid rgba(0, 0, 0, 0.4)",
      display: "flex",
      padding: "45px",
      alignItems: "center",
      borderRadius: "10px",
      justifyContent: "center",
      margin: "0px 0px 0px 12px",
      "@media(max-width:459px)": {
        width: "auto",
        margin: "16px 0px",
      },
    },
    "& h6": {
      color: "rgba(0, 0, 0, 0.25)",
      fontSize: "16px",
      textAlign: "left",
    },
    "& h5": {
      color: "#fff",
      fontSize: "16px",
      fontWeight: "300",
      marginTop: "30px",
    },
  },
  fontSixeText: {
    fontSize: "16px",
    fontWeight: "300",
  },
  paper: {
    overflowY: "unset",
  },
  root: {
    padding: "50px 30px",
    boxShadow: "rgb(99 99 99 / 20%) 0px 2px 8px 0px",
    boxSizing: "border-box",
    borderRadius: "10px",
    backdropFilter: "blur(44px)",
    backgroundColor: "#FFFFFF",
    "& h1": {
      color: "#fff",
      fontSize: "40px",
      fontWeight: "600",
      textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      [theme.breakpoints.down("xs")]: {
        fontSize: "20px",
      },
    },
  },
  title: {
    borderBottom: "1px solid #eaeaea",
  },
  imgbox: {
    width: "100%",
    minHeight: "150px",
    border: "1px solid rgba(0, 0, 0, 0.4)",
    borderRadius: "10px",
    marginTop: "10px",
    // padding: "8px",
  },
  linktext1: {
    fontSize: "20px",
    fontWeight: "500",
    color: "#fff",
  },
  formcontrolbox: {
    "& .MuiInputBase-root": {
      width: "100%",
      maxWidth: "65%",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        maxWidth: "100%",
      },
    },
  },
  qrcodeflex: {
    display: "flex",
    alignItems: "center",
    "@media(max-width:459px)": {
      display: "block",
    },
  },
}));

export default function BrandDummy(props) {
  const classes = useStyles();
  const location = useLocation();

  return (
    <>
      <Box className={classes.bannerBox}>
        <Container maxWidth="md">
          <Box className={classes.root}>
            <Box className={classes.heading}>
              <Typography variant="h1">
                Add Your {""}
                <span style={{ color: "#e5cf58" }}>Brand</span>
              </Typography>
            </Box>

            <Box>
              <Box mt={3}>
                <label className={classes.fontSixeText}>
                  Brand Name <span style={{ color: "#ff7d68" }}>*</span>
                </label>
                <FormControl fullWidth>
                  <TextField
                    inputProps={{ maxLength: 30 }}
                    placeholder="Pk Brand"
                  />
                </FormControl>
              </Box>
              <Box mt={3}>
                <label className={classes.fontSixeText}>
                  Enter Bio<span style={{ color: "#ff7d68" }}>*</span>
                </label>
                <FormControl fullWidth>
                  <TextField
                    inputProps={{ maxLength: 30 }}
                    placeholder="Something about your brand..."
                  />
                </FormControl>
              </Box>
              <Box mt={3}>
                <Grid container spacing={2}>
                  <Grid
                    item
                    lg={7}
                    md={7}
                    sm={7}
                    xs={12}
                    className={classes.gridbox1}
                  >
                    <Grid item xs={12} md={12}>
                      <Box className="cardCreate">
                        <label className={classes.fontSixeText}>
                          Upload Brand Logo{" "}
                          <span style={{ color: "#ff7d68" }}>*</span>
                        </label>

                        <Box className="uploadBox" mt={1}>
                          <Typography
                            variant="body2"
                            style={{
                              color: "rgba(0, 0, 0, 0.25)",
                              fontSize: " 16px",
                            }}
                          >
                            JPG, PNG, GIF, WEBP, MP4 or MP3. Max 10mb.
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{
                              color: "rgba(0, 0, 0, 0.25)",
                              fontSize: " 16px",
                            }}
                          >
                            (620 x 620 recommended)
                          </Typography>
                          <Box mt={2}>
                            <input
                              style={{ display: "none" }}
                              id="raised-button-file-img"
                              accept="image/*,.mp4,.webp,.mp3"
                              multiple
                              type="file"
                            />

                            <label htmlFor="raised-button-file-img">
                              <Button
                                variant="contained"
                                color="primary"
                                component="span"
                              >
                                Choose File
                              </Button>
                            </label>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    lg={5}
                    md={5}
                    sm={5}
                    xs={12}
                    className={classes.gridbox}
                    order="0"
                  >
                    <Box className={classes.imgbox}></Box>
                  </Grid>
                  <Grid
                    item
                    lg={7}
                    md={7}
                    sm={7}
                    xs={12}
                    className={classes.gridbox1}
                  >
                    <Grid item xs={12} md={12}>
                      <Box className="cardCreate">
                        <label className={classes.fontSixeText}>
                          Upload Cover Photo{" "}
                          <span style={{ color: "#ff7d68" }}>*</span>
                        </label>

                        <Box className="uploadBox" mt={1}>
                          <Typography
                            variant="body2"
                            style={{
                              color: "rgba(0, 0, 0, 0.25)",
                              fontSize: " 16px",
                            }}
                          >
                            JPG, PNG, GIF, WEBP, MP4 or MP3. Max 10mb.
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{
                              color: "rgba(0, 0, 0, 0.25)",
                              fontSize: " 16px",
                            }}
                          >
                            (620 x 620 recommended)
                          </Typography>
                          <Box mt={2}>
                            <input
                              style={{ display: "none" }}
                              id="raised-button-file-img"
                              accept="image/*,.mp4,.webp,.mp3"
                              multiple
                              type="file"
                            />

                            <label htmlFor="raised-button-file-img">
                              <Button
                                variant="contained"
                                color="primary"
                                component="span"
                              >
                                Choose File
                              </Button>
                            </label>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    lg={5}
                    md={5}
                    sm={5}
                    xs={12}
                    className={classes.gridbox}
                    order="0"
                  >
                    <Box className={classes.imgbox}></Box>
                  </Grid>
                  <Box mt={2} width="100%">
                    <Typography variant="h4">Create Barcode</Typography>
                    <Box className={classes.code}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                          <Typography variant="h5" align="left">
                            Code type
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={8} lg={8}>
                          <Box className={classes.qrcodeflex}>
                            <Box className="barcode">
                              <img src="/images/Bar_code.png" />
                            </Box>

                            <Box className="qrcode">
                              <img src="/images/QRcodesmall.png" />
                            </Box>
                          </Box>
                          <Typography variant="h6" align="center">
                            Codde the code type to be generated in your NFTs
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                  <Grid item xs={12} md={12}>
                    <Box className="cardCreate" mt={7}>
                      <Box>
                        <label className={classes.linktext1}>
                          External Links{" "}
                          <span style={{ color: "#ff7d68" }}>*</span>
                        </label>
                        <Box mt={2}>
                          <Box>
                            <Box mt={3}>
                              <label className={classes.fontSixeText}>
                                Facebook URL :
                              </label>
                              <FormControl fullWidth>
                                <TextField
                                  className={classes.formcontrolbox}
                                  inputProps={{ maxLength: 80 }}
                                  placeholder="Paste your link here..."
                                />
                              </FormControl>
                            </Box>
                            <Box mt={3}>
                              <label className={classes.fontSixeText}>
                                Instragram URL :{" "}
                              </label>
                              <FormControl fullWidth multiline rows={4}>
                                <TextField
                                  className={classes.formcontrolbox}
                                  inputProps={{ maxLength: 50 }}
                                  multiline
                                  placeholder="Paste your link here..."
                                />
                              </FormControl>
                            </Box>
                            <Box mt={3}>
                              <label className={classes.fontSixeText}>
                                Twitter URL :{" "}
                              </label>
                              <FormControl fullWidth multiline rows={4}>
                                <TextField
                                  inputProps={{ maxLength: 1500 }}
                                  className={classes.formcontrolbox}
                                  multiline
                                  placeholder="Paste your link here..."
                                />
                              </FormControl>
                            </Box>
                            <Box mt={3}>
                              <label className={classes.fontSixeText}>
                                Telegram URL :{" "}
                              </label>
                              <FormControl fullWidth multiline rows={4}>
                                <TextField
                                  inputProps={{ maxLength: 1500 }}
                                  multiline
                                  className={classes.formcontrolbox}
                                  placeholder="Paste your link here..."
                                />
                              </FormControl>
                            </Box>
                          </Box>
                        </Box>
                      </Box>

                      <Box
                        mt={3}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Button
                          variant="contained"
                          size="large"
                          color="primary"
                        >
                          Submit
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

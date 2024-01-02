import React, { useRef, useEffect, useState } from "react";
import {
  Typography,
  Box,
  Container,
  Grid,
  Button,
  Paper,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Apiconfig from "src/ApiConfig/ApiConfig";
import { useLocation } from "react-router-dom";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

const useStyles = makeStyles({
  mainBox: {
    paddingTop: "100px",
    "& .EditContentBox": {
      border: "1px solid #f1e7e7",
      padding: "25px",
      background: "#ffffff",
      borderRadius: "10px",
      filter: "drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.25))",
      boxShadow: "rgb(99 99 99 / 20%) 0px 2px 8px 0px",
      backdropFilter: "blur(44px)",
    },
  },
  btn: {
    background:
      "linear-gradient(124deg, rgba(47, 89, 149, 0.81) 18.76%, rgba(21, 29, 42, 0.87) 43.13%, rgba(0, 88, 241, 0.65) 96.83%)",
    color: "#FFFFFF",
    borderRadius: "40px",
    width: "130px",
    height: "6vh",
    "&:hover": {
      background: "#313b48",
    },
  },
  btn2: {
    background: "#313b48",
    color: "#FFFFFF",
    borderRadius: "40px",
    width: "130px",
    height: "6vh",
    "&:hover": {
      background:
        "linear-gradient(124deg, rgba(47, 89, 149, 0.81) 18.76%, rgba(21, 29, 42, 0.87) 43.13%, rgba(0, 88, 241, 0.65) 96.83%)",
    },
  },
});

const EditFaq = () => {
  const classes = useStyles();
  const editorRef = useRef(null);
  const history = useHistory();
  const [amo, setamo] = useState("");
  const [answer, setAnswer] = useState("");
  const [imagepdfswer, setImagepdf] = useState("");
  const [question, setQuestion] = useState("");
  const [linkurl, setLinkurl] = useState("");

  //

  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };
  const [Type, setType] = useState("");
  //   const location = useLocation();
  //   const [idds, setIdd] = useState("");
  const [description, setDescription] = useState("");
  const [loader, setLoader] = useState(false);
  const [idds, setIdd] = useState("");
  const [imgFile, setImgFile] = useState("");
  const [imgFileBase, setImgFileBase] = useState("");

  const [showdata, setshowdata] = React.useState([]);
  const location = useLocation();
  const accessToken = window.localStorage.getItem("creatturAccessToken");

  // console.log("mydatatdata", showdata);

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (err) {
      console.log("Error: ", err);
    };
  };

  const addEditStaticContent = async (idd) => {
    try {
      setLoader(true);

      if (idd !== "") {
        await axios
          .put(Apiconfig.editFAQ, {
            question: question,
            answer: answer,
            image: imgFileBase,
            url: linkurl,
            _id: idds,
          })
          .then(async (res) => {
            if (res.data.statusCode == 200) {
              setamo(res.data.result);
              toast.success("Updated successfully");
              history.push("/faq-list");
              setLoader(false);
            } else {
              toast.error(res.data.responseMessage);
            }
          });
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
      if (error.response) {
        toast.error(error.response.data.responseMessage);
      } else {
        toast.error(error.message);
      }
    }
  };

  const showviewFAQapi = async (id) => {
    console.log("mydataid", id);
    await axios.get(`${Apiconfig.viewFAQ}${id}`).then(async (res) => {
      if (res.data.statusCode === 200) {
        setshowdata(res.data.result);
      }
    });
  };

  useEffect(() => {
    if (location.search.substring(1, location.search.length)) {
      const id = location.search.substring(1, location.search.length);
      setIdd(id);
      showviewFAQapi(id);
    }
    if (showdata) {
      setQuestion(showdata?.question ? showdata?.question : "");
      setAnswer(showdata?.answer ? showdata?.answer : "");
      setLinkurl(showdata?.url ? showdata?.url : "");
    }
  }, [location, showdata?.question]);

  return (
    <>
      <Container maxWidth="md">
        <Box className={classes.mainBox}>
          <Box className="EditContentBox">
            <Box>
              <Typography variant="h2">Edit Faq </Typography>
            </Box>
            <Box mt={3}>
              <Grid container direction={"column"} spacing={3}>
                <Grid item xs={12}>
                  <Box>
                    <Grid container spacing={1}>
                      <Grid item lg={3} md={3} sm={3} xs={12}>
                        <Box>
                          <Typography variant="h5"> Question </Typography>
                        </Box>
                      </Grid>

                      <Grid item lg={9} md={9} sm={9} xs={12}>
                        <TextField
                          onChange={(e) => setQuestion(e.target.value)}
                          id="outlined-basic"
                          placeholder="Question "
                          size="medium"
                          variant="outlined"
                          value={question}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Grid container spacing={1}>
                      <Grid item lg={3} md={3} sm={3} xs={12}>
                        <Typography variant="h5">Answer</Typography>
                      </Grid>
                      <Grid item lg={9} md={9} sm={9} xs={12}>
                        {/* <TextField
                          multiline
                          rows={5}
                          onChange={(e) => setAnswer(e.target.value)}
                          id="outlined-basic"
                          placeholder="Answer"
                          value={answer}
                          fullWidth
                          variant="outlined"
                        /> */}
                        <JoditEditor
                          ref={editor}
                          value={answer}
                          config={config}
                          tabIndex={1} // tabIndex of textarea
                          onBlur={(e) => setAnswer(e)} // preferred to use only this option to update the content for performance reasons
                          onChange={(newContent) => {}}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Grid container spacing={1}>
                      <Grid item lg={3} md={3} sm={3} xs={12}>
                        <Typography variant="h5">Link</Typography>
                      </Grid>
                      <Grid item lg={9} md={9} sm={9} xs={12}>
                        <TextField
                          onChange={(e) => setLinkurl(e.target.value)}
                          id="outlined-basic"
                          placeholder="Url "
                          fullWidth
                          variant="outlined"
                          value={linkurl}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Grid container spacing={1}>
                      <Grid item lg={3} md={3} sm={3} xs={12}>
                        <Typography variant="h5">Image / PDF</Typography>
                      </Grid>
                      <Grid item lg={9} md={9} sm={9} xs={12}>
                        <TextField
                          variant="outlined"
                          accept="image/*"
                          // id="raised-button-file-banner"
                          type="file"
                          onChange={(e) => {
                            if (e.target.files[0]) {
                              setImgFile(e.target.files[0]);
                              getBase64(e.target.files[0], (result) => {
                                setImgFileBase(result);
                              });
                            }
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
              <Box align="center" pt={4} pb={1}>
                <Button
                  style={{ marginRight: "8px" }}
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={addEditStaticContent}
                >
                  Submit {loader && <ButtonCircularProgress />}
                </Button>
                <Button
                  style={{ marginLeft: "8px" }}
                  variant="contained"
                  color="primary"
                  onClick={() => history.push("/faq-list")}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default EditFaq;

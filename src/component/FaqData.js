import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Box } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
const Accordion = withStyles({
  root: {
    "&:not(:last-child)": {
      background: "#FFFFFF",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.12)",
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      border: " 1px solid #3d3d3d",
      background:
        "linear-gradient( 152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
      backdropFilter: "blur(42px)",
    },
  },
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    background: "#35A5F5",
    border: "1px solid #35A5F5",
    boxSizing: "border-box",
    backdropFilter: "blur(4px)",
    color: "#FFF",
    "&$expanded": {
      minHeight: 50,
      borderBottom: "0",
      color: "#FFF",
    },
    "@media(max-width:605px)": {
      fontSize: "10px",
      minHeight: 50,
      "&$expanded": {
        minHeight: 40,
        borderBottom: "0",
        color: "#FFF",
      },
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {
    margin: "0",
  },
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    border: "1px solid #C2DFE8",
    boxSizing: "border-box",
    backdropFilter: "blur(4px)",
    marginTop: "10px",
    "& h6": {
      color: "#000",
      paddingBottom: "15px",
    },
    "& p": {
      color: "#000",
    },
  },
  imgbox: {
    width: "100%",
    height: "190px",
    display: "flex",
    overflow: "hidden",
    borderRadius: "5px 5px 0px 0px",
    flexDirection: "column",
    backgroundSize: "cover !important",
    justifyContent: "space-between",
    backgroundColor: "#ccc !important",
    backgroundRepeat: "no-repeat !important",
    backgroundPosition: "center !important",
  },
}))(MuiAccordionDetails);
export default function FaqData({ data, index }) {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        square
        defaultExpanded={index == 0 ? true : false}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          aria-controls="panel1d-content"
          expandIcon={
            <ExpandMoreIcon
              style={{ fontSize: "23px", fontWeight: "400", color: "#fff" }}
            />
          }
        >
          <Typography variant="h6">{data.question}</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ display: "flex", flexDirection: "column" }}>
          {/* <Typography variant='h6'>{data.heading}</Typography> */}
          <Typography variant="body2">
            <div dangerouslySetInnerHTML={{ __html: data.answer }} />
            {/* {data.answer} */}

            {data.url !== "" && (
              <Typography
                variant="h6"
                style={{ wordBreak: "break-all", marginTop: "-2px" }}
              >
                <a href={data.url} target="_blank" style={{ color: "#3db0f3" }}>
                  Click here to know more
                </a>{" "}
                {/* {faqdata.url} */}
              </Typography>
            )}
            {data.image !== "" && (
              <Box
                style={{
                  width: "500px",
                  display: "flex",
                  margin: "0 auto",
                  justifyContent: "center",
                }}
              >
                <img src={data.image} alt="img" width="100%" />
              </Box>
            )}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

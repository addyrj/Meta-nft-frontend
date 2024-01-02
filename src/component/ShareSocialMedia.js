import React from "react";
import {
  FacebookShareButton,
  TelegramShareButton,
  EmailShareButton,
  TwitterShareButton,
} from "react-share";
import { ListItemText, Box, Button } from "@material-ui/core";
import List from "@material-ui/core/List";
import { FaFacebookF, FaInstagramSquare } from "react-icons/fa";

import { FaTwitter } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { MdEmail } from "react-icons/md";

const useStyles = makeStyles(() => ({}));
export default function ShareSocialMedia({ url }) {
  const classes = useStyles();
  return (
    <List>
      <Button>
        <Box>
          <FacebookShareButton url={url} target="_blank">
            <FaFacebookF style={{ fontSize: "30px" }} /> <br />
            Facebook
          </FacebookShareButton>
        </Box>
      </Button>
      <Button>
        <Box>
          <EmailShareButton
            url={url}
            email="info@hovr.site"
            subject="Check out this item on Hovr"
            className="Demo_some-network__share-button"
          >
            <MdEmail style={{ fontSize: "30px" }} /> <br />
            E-mail
          </EmailShareButton>
        </Box>
      </Button>
      <Button>
        <Box>
          <TelegramShareButton url={url} title={"Check out this item on Hovr"}>
            <FaTelegramPlane style={{ fontSize: "30px" }} /> <br />
            Telegram
          </TelegramShareButton>
        </Box>
      </Button>
      <Button>
        <Box>
          <TwitterShareButton
            url={url}
            title={`Check out this item on Hovr`}
            // hashtag="#camperstribe"
          >
            <FaTwitter style={{ fontSize: "30px" }} /> <br />
            Twitter
          </TwitterShareButton>{" "}
        </Box>
      </Button>
    </List>
  );
}

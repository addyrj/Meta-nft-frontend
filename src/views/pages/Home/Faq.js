import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Box,
  Container,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import FaqData from "src/component/FaqData";
import { Link } from "react-router-dom";
import axios from "axios";
import Apiconfig from "src/ApiConfig/ApiConfig";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import DataNotFound from "src/component/DataNotFound";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "50px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "50px 0",
    },
    "& h3": {
      fontWeight: 700,
      fontSize: "30px",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      "& img": {
        marginRight: "20px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "20px",
      },
    },
  },
}));

const FaqDataList = [
  {
    head: "What is an NFT? ",
    // heading: "Why do I need a will or letter of wishes?",
    summary: [
      <div>
        <p>
          {" "}
          An NFT is a digital certificate of ownership. It’s a token that lives
          on the blockchain it is completely transparent and cannot be tampered
          with. Creating an NFT is called ‘minting’ during this process we
          fingerprint and store the digital asset on an open source blockchain
          called IPFS (InterPlanetary file system - cool right?) - this means
          that the file will never be edited or deleted.
        </p>
        <p>
          A NFT can be viewed as a title deed to a property or a certificate of
          authentication ensuring it is the real asset. By owning the Rolex
          watch NFT it demonstrates you are the real owner and the watch is not
          fake! Hovr to intends to not only assure real value being added to the
          NFT space but also focus on becoming the world`s first cross-game
          in-gaming marketplace for items to be used and rented out to other
          players! Think if there was only 5000 Drow players in Dota and only
          the owners can play with them in-game or a sniper(item) in
          Counterstrike can only be used by the NFT holders. Gamers can earn
          money by renting out these items when they are not playing!
        </p>
      </div>,
    ],
  },
  {
    head: "What is an NFT profile picture?",
    // heading: "Why do I need a will or letter of wishes?",
    summary: [
      <div>
        <p>
          NFT profile pictures are a way to show off the NFTs you own on your
          Twitter profile. Adding your NFT to your Twitter profile requires a
          temporary connection to your{" "}
          <a
            href="https://support.opensea.io/hc/en-us/articles/1500008812861"
            target="_blank"
            style={{ color: "#3db0f3" }}
          >
            crypto wallet.
          </a>{" "}
        </p>
        <h4> How do I use this feature?</h4>

        <p>
          This feature is currently available for{" "}
          <a
            href="https://help.twitter.com/en/using-twitter/twitter-blue"
            target="_blank"
            style={{ color: "#3db0f3" }}
          >
            Twitter Blue subscribers
          </a>{" "}
          on iOS (iPhone) only.
        </p>

        <p>
          You will need a mobile crypto wallet app to connect to Twitter. For
          this tutorial, we are using the MetaMask mobile crypto wallet. To add
          your NFT profile picture, please follow the instructions below.
        </p>
        <ul>
          <li>Sign into Twitter on iOS.</li>
          <li>Go to your profile.</li>
          <li>
            Press Edit profile, then tap on the profile picture icon and select
            Choose NFT.
          </li>
          <li>Select your crypto wallet from a list of supported wallets.</li>
          <li>
            Twitter will generate a verification request message to your wallet
            address. You'll be asked to confirm that you hold the private keys
            of your crypto wallet by signing a transaction. This can be done
            within your crypto wallet app or by scanning the QR code on the
            screen.
          </li>
        </ul>
      </div>,
    ],
  },
  {
    head: "Why do I need a will or letter of wishes? ",
    summary: [
      <div>
        <p>
          If a person dies without a will, it could lead to severe
          administrative, tax and legal problems and possibly to financial
          losses.
        </p>
        <p>
          {" "}
          In your will, you determine how your assets should be divided, and
          nominate an executor and trustee to take care of the division of the
          estate's assets and to handle the administration of any trust assets.
        </p>
        <p>
          {" "}
          You have the right to name heirs as you wish in your will. If you
          don't, your assets will be divided according to the Intestate
          Succession Act, No 81 of 1987, after your death. This could mean that
          persons you would have preferred not inherit from you, could inherit.
        </p>
        <p>
          Your will therefore determines the future of everything that you've
          built up through the years – and your heirs can be directly
          disadvantaged if you don't plan correctly. Estate duty, income tax,
          VAT and capital gains tax (CGT) can take a big chunk out of your
          estate if your planning is wrong.
        </p>
      </div>,
    ],
  },
];

function Faq() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [userlist, setuserlist] = useState([]);
  const FaqdataApi = async () => {
    try {
      setIsLoading(true);
      await axios.get(Apiconfig.faqList).then(async (res) => {
        if (res.data.statusCode == 200) {
          setuserlist(res.data.result);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      });
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    FaqdataApi();
  }, []);
  return (
    <>
      <Box className={classes.root}>
        <Container maxWidth="lg">
          <Typography variant="h3">
            <img src="images/Faq.png" />
            FAQs
          </Typography>
          <Box mt={5} mb={2}>
            <Grid container spacing={1}>
              {isLoading ? (
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <ButtonCircularProgress />
                </Box>
              ) : (
                <>
                  {userlist.slice(0, 4).map((data, i) => {
                    return (
                      <Grid item xs={12} sm={12} md={12} key={i}>
                        <FaqData data={data} index={i} />
                      </Grid>
                    );
                  })}
                </>
              )}
              {!isLoading && userlist && userlist?.length === 0 && (
                <DataNotFound />
              )}
            </Grid>
          </Box>
          <Box align="right">
            {userlist && userlist?.slice(0, 4).length >= 4 && (
              <Button
                variant="contained"
                size="large"
                color="primary"
                component={Link}
                to="/faqs"
                className={classes.buttonright}
              >
                View More
              </Button>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}
export default Faq;

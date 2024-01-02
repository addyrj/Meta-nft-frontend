import { Box, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Apiconfigs from "src/ApiConfig/ApiConfig";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "70px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "35px 0",
    },
    "& p": {
      color: "#fff",
      marginBottom: "10px",
    },
    "& h5": {
      marginBottom: "10px",
      marginTop: "20px",
      color: "#fff",
    },
    "& li": {
      color: "#fff",
      marginBottom: "10px",
      fontSize: "14px",
    },
  },
  heading: {
    textAlign: "start",
    "& h1": {
      color: "#fff",
      fontSize: "40px",
      fontWeight: "700",
      [theme.breakpoints.down("xs")]: {
        fontSize: "23px",
      },
    },
  },
  details: {
    "& h4": {
      fontSize: "15px",
      lineHeight: "25px",
    },
  },
  colorbox: {
    width: "100%",
    height: "auto",
    borderRadius: "10px",
    padding: "10px",
    background:
      " linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
    border: "1px solid #A8CEDF",
    backdropFilter: "blur(42px)",
  },
}));
const Privacy = () => {
  const classes = useStyles();
  const [aboutuslist, setaboutuslist] = useState();
  const [aboutUs, setaboutUs] = useState();
  const aboutuslistApi = async () => {
    try {
      const res = await axios.get(Apiconfigs.staticContentList, {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        if (res.data.result.docs) {
          setaboutuslist(res.data.result.docs);

          const result = res.data.result.docs.filter(
            (data) => data.type === "aboutUs "
          );

          setaboutUs(result[0]?._id);
        } else {
          setaboutuslist(res.data.result.docs);
        }
      }
    } catch (error) {
      console.error("ERROR", error);
    }
  };
  useEffect(() => {
    aboutuslistApi();
  }, []);

  return (
    <Box className={classes.root}>
      <Container maxWidth="lg">
        <Box className={classes.heading}>
          <Typography variant="h1">About</Typography>
        </Box>
        <Box className={classes.details} mt={2}>
          <Typography variant="body2">
            Ranging from play-to-earn games to decentralized three-dimensional
            worlds, cross- platform events and experiences, digital avatars and
            identities and a whole lot more, the metaverse could be poised to
            reinvent the way we go about our daily lives.
          </Typography>
          <Typography variant="body2">
            Minting/Creating NFT`s is a unique way to certify authentication of
            collectibles in the form of art or real world assets. An NFT
            exchange is a place where non fungible tokens can be created,
            auctioned, traded and sold over the internet. There is speculation
            that NFT exchanges will surpass Crypto exchanges in terms of volume
            and popularity over the coming years as real world assets are being
            sold on the blockchain. Hovr is an NFT exchange build on a prestige
            blockchain to lower minting (creating) costs of NFT`s and ensuring
            lowering trading fees to maximize profits for all parties involved.
            NFT`s is a great way for people to make additional income on several
            ways.
          </Typography>
          <Typography variant="body2">
            A NFT can be viewed as a title deed to a property or a certificate
            of authentication ensuring it is the real asset. By owning the Rolex
            watch NFT it demonstrates you are the real owner and the watch is
            not fake! Hovr to intends to not only assure real value being added
            to the NFT space but also focus on becoming the world`s first
            cross-game in-gaming marketplace for items to be used and rented out
            to other players! Think if there was only 5000 Drow players in Dota
            and only the owners can play with them in-game or a sniper(item) in
            Counterstrike can only be used by the NFT holders. Gamers can earn
            money by renting out these items when they are not playing!
          </Typography>
          <Typography variant="body2">
            Hovr will be built on the currency of the virtual world
            (metaverse/nft/web 3.0 etc.) called QIE. Hovr will mint only 10,000
            NFT`s which each represent a different unique city called the Hovr
            Hooligans collection and share in the trading fees of the NFT
            exchange. Each person around the world have the opportunity to own
            his city and be limited to buying only 20 cities each initially. QIE
            will be the native currency of the NFT exchange and also solving the
            problem of high transaction fees of Ethereum. You need to own at
            least 20 cities to declare war on another city in this metaverse
            game. Each month the cities that was attacked the most will be
            destroyed and the owner of last remaining city will receive
            1,000,000 QIE Coins as reward that was mined by founders of Hovr. By
            destroying the city the NFT will effectively be burned. The 10,000
            NFT`s share 100% in the proceeds of Hovr NFT exchange 2.5% trading
            fees for every transaction on ALL transactions thus including all
            other NFT’s minted. Hovr will build the mobile app where these NFT`s
            can be used in-game to dominate the world. There can only be one!
            The game will start after the last Hovr Hooligan(collection name)
            Nft is sold. Get in fast as there will be price increases for these
            NFT`s after every 250 sold…Will you be the one to conquer the new
            world order?
          </Typography>

          <Typography variant="h5">
            Now consider all the future possibilities?{" "}
          </Typography>

          <ul>
            <li>Will there be in-game medical aid in the future?</li>
            <li>Will you require repairs?</li>
            <li>
              Will you require funding to finance your NFT`s over x amount of
              periods payable with interest?
            </li>
            <li>Understand and analyse how you use our website?</li>
            <li>
              Will you be able to get a mortgage for your metaverse property?
            </li>
            <li>In-game advertising?</li>
          </ul>
        </Box>
      </Container>
    </Box>
  );
};

export default Privacy;

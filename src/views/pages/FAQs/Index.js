import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Box,
  Container,
  Typography,
  Grid,
} from "@material-ui/core";
import axios from "axios";
import Apiconfig from "src/ApiConfig/ApiConfig";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import DataNotFound from "src/component/DataNotFound";
import FaqData from "src/component/FaqData";
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
          fake! Optimism.site to intends to not only assure real value being added
          to the NFT space but also focus on becoming the world`s first
          cross-game in-gaming marketplace for items to be used and rented out
          to other players! Think if there was only 5000 Drow players in Dota
          and only the owners can play with them in-game or a sniper(item) in
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
          <strong>on iOS (iPhone) only.</strong>
        </p>

        <p>
          You will need a mobile crypto wallet app to connect to Twitter. For
          this tutorial, we are using the <strong>MetaMask mobile</strong>{" "}
          crypto wallet. To add your NFT profile picture, please follow the
          instructions below.
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
    head: "On which blockchain does HovR.site operate? ",
    // heading: "Why do I need a will or letter of wishes?",
    summary: [
      <div>
        <p>
          {" "}
            Optimism.site is built on the most advance blockchain in the world called
          QIE. QIE is able to handle 300 times more transactions per second than
          Bitcoin and 10 times more than SWIFT hence the transaction fees for
          creating NFT`s on HovR.site is the lowest in the world. Also so second
          layer application is used making everything less complex.
        </p>
      </div>,
    ],
  },

  {
    head: "Why would creators want to sell NFT`s?",
    // heading: "Why do I need a will or letter of wishes?",
    summary: [
      <div>
        <p>There are so many reasons why a creator might want to sell NFTs:</p>
        <ul>
          <li>
            <strong>Format:</strong> {""}NFTs are an exciting new format for
            content. It can be 3 dimensional, it can be flat, it can contain
            audio, or it can just be data (like a file, or a document or …
            anything!)
          </li>
          <li>
            <strong>Copyright:</strong> {""}NFTs have the potential to solve
            problems of copyright and ownership: copyright has been a pain for
            creators since the dawn of the internet. For the first time in
            history we have a solution that can manage and validate ownership
            claims completely autonomously and reliably at a cost that is far
            more efficient than using an agency or law firm.
          </li>
          <li>
            <strong>Royalties:</strong> {""}Royalty management has historically
            been a cumbersome, expensive and unreliable activity. NFTs can
            programmatically set rules for royalties and disburse them
            automatically forever!
          </li>
          <li>
            <strong>Diversification:</strong> {""}Creators like musicians, in
            large make most of their real revenues in live performance. In a
            post-covid world where events and performances are far and few
            between, and with current copyright infrastructure, digital
            consumption is largely unpaid. NFTs are not only a new way to
            express creativity, but also a new way to earn a living from that
            creative expression.
          </li>
        </ul>
      </div>,
    ],
  },
  {
    head: "Where can NFT`s be used?",
    // heading: "Why do I need a will or letter of wishes?",
    summary: [
      <div>
        <p>
          NFT`s can be viewed as flight seats – there can only be one 3B seat in
          economy class compared to Bitcoin or USD where one dollar equals one
          dollar.
        </p>
        <p>
          Other than the current digital art NFT`s can be used as in-gaming
          items, ownership of web 3.0 websites via companies like unstoppable
          domains, digital avatars for metaverse, voting and ticketing systems.
          All data that can`t be altered and should be unique. Wills on the
          blockchain is a great use case but in most jurisdictions require wet
          signatures (original document) hence until regulations changes we are
          making provision for letter of wishes which is very similar although
          less binding. Endless new possibilities in the NFT space!
        </p>
      </div>,
    ],
  },
  {
    head: "How do I create a NFT?",
    // heading: "Why do I need a will or letter of wishes?",
    summary: [
      <div>
        <Box align="center">
          <img
            src="images/create_nft1.png"
            alt="image"
            width="100%"
            style={{ maxWidth: "700px" }}
          />
        </Box>
        <Box align="center">
          <img
            src="images/create_nft2.png"
            alt="image"
            width="100%"
            style={{ maxWidth: "700px" }}
          />
        </Box>
        <Box align="center">
          <img
            src="images/create_nft3.png"
            alt="image"
            width="100%"
            style={{ maxWidth: "700px" }}
          />
        </Box>
        {/* <p>Upload your <strong>Profile File</strong> (formatted as JPEG, PNG, GIF, WEBP, MP4 or MP3).
        </p>
        <p>Upload your <strong>Cover File</strong> (formatted as JPEG, PNG, GIF, WEBP, MP4 or MP3).
        </p> */}
        <ul>
          <li>
            Choose NFT <strong>Profile File</strong> file format - JPG, PNG,
            GIF, WEBP, MP4 or MP3 with Max Limit of 100mb and (620 x 620
            recommended).
          </li>
          <li>
            Choose File for Uploading <strong>Cover File</strong> with format -
            JPG, PNG, GIF, WEBP, MP4 or MP3. Max 100mb.
          </li>
          <li>Choose Item Category from the Given Categories.</li>
          <li>Choose between Fixed Price & Timely Auction.</li>
          <li>
            Reserve for specific buyer if you want to by inputting any specific
            Address.
          </li>
          <li>Input the price which you want to set for NFT's</li>
          <li>
            Choose or Create Collection in which you want to include the NFT
            you're creating.
          </li>
          <li>Input the Title for NFT</li>
          <li>Input Description for NFT</li>
          <li>Input Values for Royalties</li>
          <li>
            Input Address for Recipient Wallet Address.
            <ul type="i">
              <li>Properties(Optional)</li>
              <li>Alternative text for NFT(Optional)</li>
            </ul>
          </li>
          <li>
            Use Create NFT Button after filling all mandatory fields to Create
            Your NFT
          </li>
        </ul>
      </div>,
    ],
  },

  {
    head: "How do I link my metamask wallet to store my NFT`s?",
    // heading: "Why do I need a will or letter of wishes?",
    summary: [
      <div>
        <Box align="center">
          <img
            src="images/metamask.png"
            alt="image"
            width="100%"
            style={{ maxWidth: "700px" }}
          />
        </Box>
        {/*       
        <p>Upload your <strong>Profile File</strong> (formatted as JPEG, PNG, GIF, WEBP, MP4 or MP3).
        </p>

        <p>Upload your <strong>Cover File</strong> (formatted as JPEG, PNG, GIF, WEBP, MP4 or MP3).
        </p> */}
        <div>
          <ul>
            <li>
              Click on the <strong>Connect Wallet</strong> Button in the Mint
              Page.
            </li>
            <br />
            <li>
              Connect through <strong>Metamask</strong> or{" "}
              <strong>Wallet Connect</strong> to see the Minted NFT's in your
              Profile.
            </li>
          </ul>
        </div>
      </div>,
    ],
  },
  {
    head: "How do I market my NFT`s?",

    summary: [
      <div>
        <p>
          {" "}
          <a
            href="https://www.youtube.com/watch?v=RZ21UuQWsuQ"
            target="_blank"
            style={{ color: "#3db0f3" }}
          >
            https://www.youtube.com/watch?v=RZ21UuQWsuQ
          </a>{" "}
        </p>
      </div>,
    ],
  },

  {
    head: "How do I sell an NFT?",
    // heading: "Why do I need a will or letter of wishes?",
    summary: [
      <div>
        <p>
          {" "}
          From hovr.site/, select your profile image in the top right and then
          click Profile.
        </p>
        <p>
          {" "}
          Select the NFT you would like to sell from your wallet. If you don't
          have an NFT available to sell, check our create an NFT tutorial to get
          started.
        </p>
        <p> Select Sell on the top right to be taken to the listing page. </p>
        <p>
          You'll be taken to the listing page, where you can choose the price
          and type of sale.
        </p>
        <p>
          A Fixed Price sale is one where the price stays fixed. In the
          screenshot below, the price is fixed at 1 ETH.
        </p>
        <p>
          You can also set a duration for the sale. The default options are{" "}
          <strong>1 day, 3 days, or 1 week</strong> - but you can also set a
          custom duration using the calendar.
        </p>
        <p>
          You can also include the item in a bundle (grouping NFTs from
          different collections)*.
        </p>
        <p>
          Lastly, you can also reserve the item for a specific buyer. To do so,
          simply paste their address into the field below
          <strong>Reserve for a specific buyer.</strong>{" "}
        </p>
        <p>
          In all those options, you'll see the potential fees from the sale
          listed at the bottom. In this case, this sale includes {""}
          <strong>Service Fee</strong> of 2.5% and a{" "}
          <strong>Creator Earnings</strong> of 10%, for a total of 12.5%. This
          is the highest percentage that can be deducted from an NFT sale on
          OpenSea.
        </p>
        <h4>Completing your sale</h4>
        <p>
          You'll then be asked to confirm your sale by signing a transaction.
        </p>
        <p>
          Once your listing is complete, you will get a pop-up confirmation like
          below. Make sure to share your listing on social media!
        </p>
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
  {
    head: "Difference between Create Order and Create NFT ? ",
    summary: [
      <div>
        <p>
          In Create Order, NFTs gets created firstly and then directly gets
          published on Marketplace for selling.
        </p>
        <p>
          {" "}
          In Create NFT, it only creates a NFT for buying. And once, user buys
          it, after that he lists the NFT on Marketplace for selling.
        </p>
      </div>,
    ],
  },
  {
    head: "Why we recommend letter of wishes rather than a will in NFT? ",
    summary: [
      <div>
        <p>
          Currently in most jurisdictions a wet signature is required for a will
          but not for a letter of wishes.
        </p>
      </div>,
    ],
  },
  {
    head: "What is a letter of wishes? ",
    summary: [
      <div>
        <p>
          A letter of wishes is a way for you to inform others of matters to be
          taken into account after your death. It may, for example, contain
          guidance to the guardians of minor children detailing how you might
          want your children brought up in terms of education, religion or
          residence.
        </p>
        <p>
          A letter of wishes is a separate document to your will, but it
          accompanies your will. It is not legally binding but can guide your
          executors and trustees to ensure that your personal wishes are carried
          out. You should take care that a letter of wishes does not contain
          anything that could conflict with your will.
        </p>
        <p>
          {" "}
          A letter of wishes should be written in plain English, signed and
          dated, but not witnessed, so as to avoid any claim that it has become
          a legal will or codicil (an addition or supplement that explains,
          modifies, or revokes a will or part of one).{" "}
        </p>
        <p>
          There is an ongoing debate as to the role of a letter of wishes and
          whether a letter of wishes should be seen as part of the trust deed. A
          letter of wishes is not legally binding on the trustees, but could be
          taken into account by them.{" "}
        </p>
        <p>
          {" "}
          Where trustees have been given wide discretion in a trust deed, it is
          important for them to have an understanding of what the founder had in
          mind when he/she created the trust, and exercise their discretion
          accordingly. The trustees should certainly be influenced by the letter
          of wishes.
        </p>
      </div>,
    ],
  },
  {
    head: "Template for a letter of wishes? ",
    summary: [
      <div>
        {/* <Box align="center">
          <img
            src="images/metamask.png"
            alt="image"
            width="100%"
            style={{ maxWidth: "700px" }}
          />
        </Box> */}
        <a
          href="letterdocs/Letter of wishes template.docx"
          style={{ color: "#3db0f3" }}
        >
          Download Template
        </a>{" "}
        <p>
          Any secret document can be used to create an NFT in HovR which
          contains confidential information. How is it used? Other than ordinary
          NFT`s the secret documents in HovR allows the creator of the NFT to
          specify a beneficiary wallet which is the only wallet able to purchase
          the NFT. We would suggest to insert the executor`s wallet address here
          in the case of a letter of wishes and inform your executor or lawyer.
        </p>
      </div>,
    ],
  },
  {
    head: "The only file formats NFTs supports are: ",
    summary: [
      <div>
        <p>
          1 .JPG <br /> 2 .PNG <br /> 3 .GIF <br /> 4 .MP4 <br />
          5 .WAV
          <br /> 6 .MP3 <br />
          7 .WEBM <br />
          8 .OGG <br />
          9 .CLB
          <br /> 10 .GLTF <br /> 11 .FVG
        </p>
      </div>,
    ],
  },
  {
    head: "What is the private documents section?",
    summary: [
      <div>
        <p>
          This section is for documents like “letter of wishes” and hopefully
          wills in future as regulations allows digital signatures. Currently
          most jurisdictions require wet signatures. Any document meant solely
          for one person like the executor or lawyer fall under this category
          which have a beneficiary wallet only that have only access to this
          document.
        </p>
      </div>,
    ],
  },
  {
    head: "Why is my QIE wallet not working?",
    summary: [
      <div>
        <p>
          Kindly note that Metamask and QIE wallet can`t be used together. The
          user needs to use only one of the two for a browser to connect
          successfully to HovR Marketplace.
        </p>
      </div>,
    ],
  },
  {
    head: "What is the QIE network details to connect metamask?",
    summary: [
      <div>
        <p>
          Name: QIE-blockchain <br /> RPC URL:
          https://rpc-main.qiblockchain.online <br />
          Chain ID: 9732 <br /> Symbol: QIE
        </p>
      </div>,
    ],
  },
  {
    head: "How do I view transactions on the QIE blockchain?",
    summary: [
      <div>
        <p>
          QIE explorer :{" "}
          <a
            href="https://testnet.qiblockchain.online/explorer/explorer"
            target="_blank"
            style={{ color: "#3db0f3" }}
          >
            https://testnet.qiblockchain.online/explorer/explorer
          </a>{" "}
        </p>
      </div>,
    ],
  },
  {
    head: " Can I rename my collection name once it has been created?",
    summary: [
      <div>
        <p>Yes</p>
      </div>,
    ],
  },
  {
    head: " How does royalties work?",
    summary: [
      <div>
        <p>
          The original content creator will receive between 0-10% in ongoing
          sales fees from all future sales of this NFT. The “%” sign doesn`t
          need to be inserted when creating this NFT, only the number in that
          range.
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
          <Box mt={5} mb={5}>
            <Grid container spacing={1}>
              {userlist.map((data, i) => {
                return (
                  <Grid item xs={12} sm={12} md={12} key={i}>
                    <FaqData data={data} index={i} />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}
export default Faq;

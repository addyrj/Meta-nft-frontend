import React, { useEffect, useRef, useState } from "react";
import { Box } from "@material-ui/core";
import Page from "src/component/Page";
import Auction from "./Auction";
import Banner from "./Banner";
import Collection from "./Collection";
import Explore from "./Explore";
import Sellers from "./Sellers";
import Media from "./Media";
import Craft from "./Craft";
import ExploreCards from "src/component/Explorecards";
import Apiconfig from "src/ApiConfig/ApiConfig";
import axios from "axios";
// import Update from "./Update";
import Faq from "./Faq";
import Hotgame from "./Hotgame";
function Home(props) {
  const [dashboarddata, setDashboarddata] = useState("");
  const getDashboardData = async () => {
    try {
      const res = await axios.get(Apiconfig.dashboardCount);
      if (res.data.statusCode === 200) {
        if (res.data.result) {
          setDashboarddata(res.data.result);
        } else {
          setDashboarddata(res.data.result.docs);
        }
      }
    } catch (error) {
      console.error("ERROR", error);
    }
  };
  useEffect(() => {
    getDashboardData();
  }, []);
  return (
    <Page title="Marketplace | Optimism">
      <Box>
        <Banner data={dashboarddata} />
        <ExploreCards />
        <Explore />
        <Sellers />
        <Collection />
        <Auction />
        <Hotgame />
        <Craft />
        <Media />
        <div id="section1">
          <Faq />
        </div>
        {/* <Update /> */}
      </Box>
    </Page>
  );
}

export default Home;

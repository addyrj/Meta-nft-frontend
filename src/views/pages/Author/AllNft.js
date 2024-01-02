import { Box, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import ExploreCard from "src/component/ExploreCard";

import DataNotFound from "src/component/DataNotFound";
import AllNftCard from "src/component/AllNftCard";
const AllNft = ({ nftList, callbackFun, setIsLoading, isLoading }) => {
  return (
    <>
      <Grid container spacing={2}>
        {nftList &&
          nftList.map((data, index, type) => {
            return (
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <AllNftCard
                  data={data}
                  type="creator"
                  index={index}
                  callbackFun={callbackFun}
                />
              </Grid>
            );
          })}
        {/* {nftList && nftList.length === 0 && <>hjkhj</>} */}

        {nftList && nftList.length === 0 && <DataNotFound />}
      </Grid>
    </>
  );
};

export default AllNft;

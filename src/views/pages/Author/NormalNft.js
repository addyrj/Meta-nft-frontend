import DataNotFound from "src/component/DataNotFound";
import { Box, Grid } from "@material-ui/core";
import React, { useState } from "react";
import NFTCard from "src/component/NFTCard";
import NormalNftCards from "src/component/NormalNftCards";

const ProfileNft = ({
  nftList,
  callbackFun,
  isLoading,
  setIsLoading,
  account,
}) => {
  return (
    <>
      <Grid container spacing={2}>
        {nftList &&
          nftList.map((data, index, type) => {
            return (
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <NormalNftCards
                  data={data}
                  type="creator"
                  index={index}
                  callbackFun={callbackFun}
                  account={account}
                />
              </Grid>
            );
          })}

        {nftList && nftList.length === 0 && <DataNotFound />}
      </Grid>
    </>
  );
};

export default ProfileNft;

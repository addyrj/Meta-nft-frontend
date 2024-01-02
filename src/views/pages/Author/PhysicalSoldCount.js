import DataNotFound from "src/component/DataNotFound";
import { Box, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
// import NFTCard from "src/component/NFTCard";
import PhysicalSoldCard from "src/component/PhysicalSoldCard";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
const PhysicalSoldCount = ({ nftList, callbackFun }) => {
  return (
    <>
      <Grid container spacing={2}>
        {nftList &&
          nftList.map((data, index, type) => {
            return (
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <PhysicalSoldCard
                  data={data}
                  type="creator"
                  index={index}
                  callbackFun={callbackFun}
                />
              </Grid>
            );
          })}

        {nftList && nftList.length === 0 && <DataNotFound />}
      </Grid>
    </>
  );
};

export default PhysicalSoldCount;

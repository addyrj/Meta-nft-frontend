import React from "react";
import { Box, Grid } from "@material-ui/core";
import { exploreData } from "src/constants";
import ExploreCard from "src/component/ExploreCard";
import DataNotFound from "src/component/DataNotFound";

const OnSale = (props) => {
  const { onSaleList } = props;

  return (
    <Box>
      <Grid container spacing={2}>
        {onSaleList &&
          onSaleList.map((data, index, type) => {
            return (
              <Grid item lg={3} md={4} sm={6} xs={12}>
                <ExploreCard data={data} type="creator" index={index} />
              </Grid>
            );
          })}
        {onSaleList && onSaleList.length === 0 && <DataNotFound />}
      </Grid>
    </Box>
  );
};

export default OnSale;

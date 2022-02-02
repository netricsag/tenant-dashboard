import { Button, CircularProgress, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CardComponent from "../../CardComponent";
import PaidIcon from "@mui/icons-material/Paid";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext, TenantContext } from "../../../../App";

interface ITotalCost {
  totalCost: number;
  costsLoaded: boolean;
}

export default function TotalCostCardComponent(props: ITotalCost) {
  return (
    <CardComponent
      title={"Aktuelle Kosten"}
      titleIcon={<PaidIcon fontSize="medium" />}
      contentSpacing={2}
    >
      {props.costsLoaded ? (
        <>
          <Typography variant="h4">Total</Typography>
          <Typography variant="h4">
            CHF {(Math.round(props.totalCost * 100) / 100).toFixed(2)}
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            am 01.03.2023
          </Typography>
          <div>
            <Button>Details</Button>
          </div>
        </>
      ) : (
        <CircularProgress color="primary" />
      )}
    </CardComponent>
  );
}

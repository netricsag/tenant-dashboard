import { CircularProgress, Typography } from "@mui/material";
import CardComponent from "../../CardComponent";
import PaidIcon from "@mui/icons-material/Paid";

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
          <Typography variant="h5">
            CHF {(Math.round(props.totalCost * 100) / 100).toFixed(2)}
          </Typography>
        </>
      ) : (
        <CircularProgress color="primary" />
      )}
    </CardComponent>
  );
}

import { Typography } from "@mui/material";
import CostItem from "./Items/CostItem";

export default function Cost() {
  return (
    <>
      <Typography variant="h2" component="div" gutterBottom>
        Kosten
      </Typography>
      <CostItem />
    </>
  );
}

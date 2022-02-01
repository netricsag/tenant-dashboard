import { Grid, Typography } from "@mui/material";
import Navbar from "./Navbar";
import TotalCostCardComponent from "./Items/CardComponents/TotalCostCardComponent";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Cost() {
  return (
    <>
      <Navbar />
      <Grid container spacing={3}>
        <Grid item>
          <Typography variant="h2" component="div" gutterBottom>
            Kosten
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item>
          <TotalCostCardComponent />
        </Grid>
      </Grid>
    </>
  );
}

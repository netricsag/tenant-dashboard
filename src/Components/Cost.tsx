import { Grid, Typography } from "@mui/material";
import CardComponent from "./Items/CardComponent";
import CostItem from "./Items/CostItem";
import Link from "@mui/material/Link";
import PaidIcon from "@mui/icons-material/Paid";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Cost() {
  return (
    <>
      <Typography variant="h2" component="div" gutterBottom>
        Kosten
      </Typography>
      <Grid container spacing={3}>
        <Grid item>
          <CardComponent
            title={"Aktuelle Kosten"}
            titleIcon={<PaidIcon fontSize="medium" />}
            contentSpacing={2}
          >
            <Typography variant="h4">Total</Typography>
            <Typography variant="h4">$3,024.00</Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              am 01.03.2022
            </Typography>
            <div>
              <Link color="primary" href="#" onClick={preventDefault}>
                Details
              </Link>
            </div>
          </CardComponent>
        </Grid>
      </Grid>
    </>
  );
}

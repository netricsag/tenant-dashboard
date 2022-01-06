import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Paper, Grid } from "@mui/material";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function CostItem() {
  return (
    <React.Fragment>
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          elevation={3}
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
            width: "auto",
            borderRadius: 2,
          }}
        >
          <Typography component="p" variant="h4">
            $3,024.00
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            on 15 March, 2019
          </Typography>
          <div>
            <Link color="primary" href="#" onClick={preventDefault}>
              View balance
            </Link>
          </div>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}

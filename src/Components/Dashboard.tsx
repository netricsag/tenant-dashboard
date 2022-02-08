import { Grid, Typography } from "@mui/material";
import Navbar from "./Navbar";
import RessourceCardComponent from "./Items/CardComponents/Dashboard/RessourceCardComponent";
import PodCardComponent from "./Items/CardComponents/Dashboard/PodCardComponent";
import StorageCardComponent from "./Items/CardComponents/Dashboard/StorageCardComponent";
import RepositoryCardComponent from "./Items/CardComponents/Dashboard/RepositoryCardComponent";
import IngressCardComponent from "./Items/CardComponents/Dashboard/IngressCardComponent";
import FloatingTenantChange from "./Items/FloatingTenantChange";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <Grid container spacing={3}>
        <Grid item>
          <Typography variant="h2" component="div" gutterBottom>
            Dashboard
          </Typography>
        </Grid>
        <Grid item></Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item>
          <StorageCardComponent />
        </Grid>
        <Grid item>
          <RessourceCardComponent />
        </Grid>
        <Grid item>
          <PodCardComponent />
        </Grid>
        <Grid item>
          <IngressCardComponent />
        </Grid>
        <Grid item>
          <RepositoryCardComponent />
        </Grid>
      </Grid>
      <FloatingTenantChange />
    </>
  );
}

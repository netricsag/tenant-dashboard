import { Grid, Typography } from "@mui/material";
import Navbar from "./Navbar";
import RessourceCardComponent from "./Items/CardComponents/RessourceCardComponent";
import NamespaceCardComponent from "./Items/CardComponents/NamespaceCardComponent";
import PodCardComponent from "./Items/CardComponents/PodCardComponent";
import ServiceAccountCardComponent from "./Items/CardComponents/ServiceAccountCardComponent";
import StorageCardComponent from "./Items/CardComponents/StorageCardComponent";
import RepositoryCardComponent from "./Items/CardComponents/RepositoryCardComponent";
import IngressCardComponent from "./Items/CardComponents/IngressCardComponent";

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
          <NamespaceCardComponent />
        </Grid>
        <Grid item>
          <PodCardComponent />
        </Grid>
        <Grid item>
          <IngressCardComponent />
        </Grid>
        <Grid item>
          <ServiceAccountCardComponent />
        </Grid>
        <Grid item>
          <RepositoryCardComponent />
        </Grid>
      </Grid>
    </>
  );
}

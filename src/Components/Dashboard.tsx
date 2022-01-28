import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

import { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { AuthenticationContext, TenantContext } from "../App";
import RessourceCardComponent from "./Items/CardComponents/RessourceCardComponent";
import NamespaceCardComponent from "./Items/CardComponents/NamespaceCardComponent";
import PodCardComponent from "./Items/CardComponents/PodCardComponent";
import ServiceAccountCardComponent from "./Items/CardComponents/ServiceAccountCardComponent";
import StorageCardComponent from "./Items/CardComponents/StorageCardComponent";
import RepositoryCardComponent from "./Items/CardComponents/RepositoryCardComponent";
import IngressCardComponent from "./Items/CardComponents/IngressCardComponent";
import TenantDropdown from "./Items/TenantDropdown";

export default function Dashboard() {
  const tenantContext = useContext(TenantContext);

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
          <StorageCardComponent tenant={tenantContext.selectedTenant} />
        </Grid>
        <Grid item>
          <RessourceCardComponent tenant={tenantContext.selectedTenant} />
        </Grid>
        <Grid item>
          <NamespaceCardComponent tenant={tenantContext.selectedTenant} />
        </Grid>
        <Grid item>
          <PodCardComponent tenant={tenantContext.selectedTenant} />
        </Grid>
        <Grid item>
          <IngressCardComponent tenant={tenantContext.selectedTenant} />
        </Grid>
        <Grid item>
          <ServiceAccountCardComponent tenant={tenantContext.selectedTenant} />
        </Grid>
        <Grid item>
          <RepositoryCardComponent tenant={tenantContext.selectedTenant} />
        </Grid>
      </Grid>
    </>
  );
}

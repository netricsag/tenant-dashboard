import {
  Box,
  Button,
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
import { AuthenticationContext } from "../App";
import RessourceCardComponent from "./Items/CardComponents/RessourceCardComponent";
import NamespaceCardComponent from "./Items/CardComponents/NamespaceCardComponent";
import PodCardComponent from "./Items/CardComponents/PodCardComponent";
import ServiceAccountCardComponent from "./Items/CardComponents/ServiceAccountCardComponent";
import StorageCardComponent from "./Items/CardComponents/StorageCardComponent";
import RepositoryCardComponent from "./Items/CardComponents/RepositoryCardComponent";

export default function Dashboard() {
  const [tenants, setTenants] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState("");

  const authToken = useContext(AuthenticationContext);

  const handleTenantChange = (event: SelectChangeEvent) => {
    setSelectedTenant(event.target.value as string);
  };

  const DropDownItems = tenants.map((tenantName, index) => {
    return (
      <MenuItem value={tenantName as string} key={index}>
        {tenantName}
      </MenuItem>
    );
  });

  useEffect(() => {
    if (tenants[0]) {
      setSelectedTenant(tenants[0] as string);
    }
  }, [tenants]);

  useEffect(() => {
    fetch("https://api.natron.io/api/v1/tenants", {
      method: "get",
      headers: new Headers({
        Authorization: `Bearer ${authToken.authenticationToken}`,
      }),
    }).then((res) => {
      res.json().then((jsonObj) => {
        setTenants(jsonObj);
      });
    });
  }, []);

  return (
    <>
      <Navbar />
      <Grid container spacing={3}>
        <Grid item>
          <Typography variant="h2" component="div" gutterBottom>
            Dashboard
          </Typography>
        </Grid>
        <Grid item>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel>Tenant</InputLabel>
              <Select
                label="Tenant"
                value={selectedTenant}
                onChange={handleTenantChange}
                style={{ minWidth: 50 }}
              >
                {DropDownItems}
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item>
          <StorageCardComponent tenant={selectedTenant} />
        </Grid>
        <Grid item>
          <RessourceCardComponent tenant={selectedTenant} />
        </Grid>
        <Grid item>
          <NamespaceCardComponent tenant={selectedTenant} />
        </Grid>

        <Grid item>
          <PodCardComponent tenant={selectedTenant} />
        </Grid>

        <Grid item>
          <ServiceAccountCardComponent tenant={selectedTenant} />
        </Grid>
        <Grid item>
          <RepositoryCardComponent tenant={selectedTenant} />
        </Grid>
      </Grid>
    </>
  );
}

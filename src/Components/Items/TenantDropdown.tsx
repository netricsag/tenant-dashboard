import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../App";
import { TenantContext } from "../../App";

export default function TenantDropdown() {
  const [tenants, setTenants] = useState([]);

  const tenantContext = useContext(TenantContext);
  const authToken = useContext(AuthenticationContext);

  const DropDownItems = tenants.map((tenantName, index) => {
    return (
      <MenuItem value={tenantName as string} key={index}>
        {tenantName}
      </MenuItem>
    );
  });

  useEffect(() => {
    setTenants(tenantContext.tenantList);
  }, [tenantContext.tenantList]);

  useEffect(() => {
    if (!tenantContext.selectedTenant) {
      fetch("https://api.natron.io/api/v1/tenants", {
        method: "get",
        headers: new Headers({
          Authorization: `Bearer ${authToken.authenticationToken}`,
        }),
      }).then((res) => {
        res.json().then((jsonObj) => {
          tenantContext.updateTeanantList(jsonObj);
        });
      });
    } else {
      tenantContext.updateSelectedTenant(tenantContext.selectedTenant);
    }
  }, []);

  useEffect(() => {
    if (tenantContext.tenantList[0] && tenantContext.selectedTenant === "") {
      tenantContext.updateSelectedTenant(tenantContext.tenantList[0] as string);
    }
  }, [tenantContext.tenantList]);

  return (
    <Box
      sx={{
        minWidth: 120,
      }}
    >
      <FormControl fullWidth>
        <Select
          value={tenantContext.selectedTenant}
          onChange={(ev: SelectChangeEvent) => {
            tenantContext.updateSelectedTenant(ev.target.value as string);
          }}
          style={{ minWidth: 50, color: "white" }}
        >
          {DropDownItems}
        </Select>
      </FormControl>
    </Box>
  );
}

import { Stack, Typography, CircularProgress, useTheme } from "@mui/material";
import DynamicFormTwoToneIcon from "@mui/icons-material/DynamicFormTwoTone";
import CardComponent from "../../CardComponent";
import CpuIcon from "../../Icons/CpuIcon";
import RamIcon from "../../Icons/RAMIcon";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext, TenantContext } from "../../../../App";

export default function RessourceCardComponent() {
  const [cpuCount, setCpuCount] = useState(0);
  const [ramByteCount, setRamByteCount] = useState(0);
  const [ramMetric, setRamMetric] = useState("MB");
  const [cpuMetric, setCpuMetric] = useState("mCPU");

  const [ramQuotaMetric, setRamQuotaMetric] = useState("MB");
  const [cpuQuotaMetric, setCpuQuotaMetric] = useState("mCPU");

  const [cpuQuota, setCpuQuota] = useState(0);
  const [memoryQuota, setMemoryQuota] = useState(0);

  const [cpuLoaded, setCpuLoaded] = useState(false);
  const [ramLoaded, setRamLoaded] = useState(false);

  const authToken = useContext(AuthenticationContext);
  const tenantContext = useContext(TenantContext);

  const theme = useTheme();

  useEffect(() => {
    setRamLoaded(false);
    setCpuLoaded(false);
  }, [tenantContext.selectedTenant]);

  useEffect(() => {
    if (tenantContext.selectedTenant) {
      fetch(
        `https://api.natron.io/api/v1/${tenantContext.selectedTenant}/requests/cpu`,
        {
          method: "get",
          headers: new Headers({
            Authorization: `Bearer ${authToken.authenticationToken}`,
          }),
        }
      ).then((res) => {
        if (res.status === 200) {
          res.json().then((jsonObj) => {
            setCpuCount(jsonObj / 1000);
            setCpuMetric("Cores");

            setCpuLoaded(true);
          });
        } else if (res.status === 401) {
          localStorage.removeItem("tenant-api-token");
          authToken.updateAuthenticationToken("");
          authToken.updateAuthenticated(false);
        }
      });

      fetch(
        `https://api.natron.io/api/v1/${tenantContext.selectedTenant}/requests/memory`,
        {
          method: "get",
          headers: new Headers({
            Authorization: `Bearer ${authToken.authenticationToken}`,
          }),
        }
      ).then((res) => {
        if (res.status === 200) {
          res.json().then((jsonObj) => {
            jsonObj = jsonObj / 1024 / 1024 / 1024;

            setRamMetric("GB");

            setRamByteCount(jsonObj);
            setRamLoaded(true);
          });
        } else if (res.status === 401) {
          localStorage.removeItem("tenant-api-token");
          authToken.updateAuthenticationToken("");
          authToken.updateAuthenticated(false);
        }
      });

      fetch(
        `https://api.natron.io/api/v1/${tenantContext.selectedTenant}/quotas/cpu`,
        {
          method: "get",
          headers: new Headers({
            Authorization: `Bearer ${authToken.authenticationToken}`,
          }),
        }
      ).then((res) => {
        if (res.status === 200) {
          res.json().then((jsonObj) => {
            if (jsonObj) {
              setCpuQuota(jsonObj / 1000);
              setCpuQuotaMetric("Cores");
            }
          });
        } else if (res.status === 401) {
          localStorage.removeItem("tenant-api-token");
          authToken.updateAuthenticationToken("");
          authToken.updateAuthenticated(false);
        }
      });

      fetch(
        `https://api.natron.io/api/v1/${tenantContext.selectedTenant}/quotas/memory`,
        {
          method: "get",
          headers: new Headers({
            Authorization: `Bearer ${authToken.authenticationToken}`,
          }),
        }
      ).then((res) => {
        if (res.status === 200) {
          res.json().then((jsonObj) => {
            if (jsonObj) {
              jsonObj = jsonObj / 1024 / 1024 / 1024;
              setMemoryQuota(jsonObj);
            }
          });
        } else if (res.status === 401) {
          localStorage.removeItem("tenant-api-token");
          authToken.updateAuthenticationToken("");
          authToken.updateAuthenticated(false);
        }
      });
    }
  }, [tenantContext.selectedTenant]);

  return (
    <CardComponent
      title="Ressourcen"
      titleIcon={<DynamicFormTwoToneIcon fontSize="medium" />}
      stackDirection="column"
    >
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          variant="h4"
          component="div"
          color={theme.palette.primary.main}
        >
          <CpuIcon />
        </Typography>
        {cpuLoaded ? (
          <Typography variant="h5" component="div" noWrap>
            {`${cpuCount % 1 === 0 ? cpuCount : cpuCount.toFixed(2)} / ${
              cpuQuota % 1 === 0 ? cpuQuota : cpuQuota.toFixed(2)
            } ${cpuQuotaMetric}`}
          </Typography>
        ) : (
          <CircularProgress color="primary" />
        )}
      </Stack>

      <Stack
        direction="column"
        justifyContent="space-around"
        alignItems="center"
      >
        <Typography
          variant="h4"
          component="div"
          color={theme.palette.secondary.main}
        >
          <RamIcon />
        </Typography>
        {ramLoaded ? (
          <Typography variant="h5" component="div" noWrap>
            {`${
              ramByteCount % 1 === 0 ? ramByteCount : ramByteCount.toFixed(2)
            } / ${
              memoryQuota % 1 === 0 ? memoryQuota : memoryQuota.toFixed(2)
            } GB`}
          </Typography>
        ) : (
          <CircularProgress color="secondary" />
        )}
      </Stack>
    </CardComponent>
  );
}

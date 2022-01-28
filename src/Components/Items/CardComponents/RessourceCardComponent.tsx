import { Stack, Typography, CircularProgress, useTheme } from "@mui/material";
import DynamicFormTwoToneIcon from "@mui/icons-material/DynamicFormTwoTone";
import CardComponent from "../CardComponent";
import CpuIcon from "../CpuIcon";
import RamIcon from "../RAMIcon";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../../App";

interface IRessourceCardComponent {
  tenant: string;
}

export default function RessourceCardComponent(props: IRessourceCardComponent) {
  const [cpuCount, setCpuCount] = useState(0);
  const [ramByteCount, setRamByteCount] = useState(0);
  const [ramMetric, setRamMetric] = useState("MB");
  const [selectedTenant, setSelectedTenant] = useState("");

  const [cpuLoaded, setCpuLoaded] = useState(false);
  const [ramLoaded, setRamLoaded] = useState(false);

  const authToken = useContext(AuthenticationContext);

  const theme = useTheme();

  useEffect(() => {
    setSelectedTenant(props.tenant);
    setRamLoaded(false);
    setCpuLoaded(false);
  }, [props.tenant]);

  useEffect(() => {
    if (selectedTenant) {
      fetch(`https://api.natron.io/api/v1/${selectedTenant}/requests/cpu`, {
        method: "get",
        headers: new Headers({
          Authorization: `Bearer ${authToken.authenticationToken}`,
        }),
      }).then((res) => {
        res.json().then((jsonObj) => {
          setCpuCount(jsonObj);
          setCpuLoaded(true);
        });
      });

      fetch(`https://api.natron.io/api/v1/${selectedTenant}/requests/memory`, {
        method: "get",
        headers: new Headers({
          Authorization: `Bearer ${authToken.authenticationToken}`,
        }),
      }).then((res) => {
        res.json().then((jsonObj) => {
          jsonObj = jsonObj / 1024 / 1024;
          if (jsonObj >= 10000) {
            jsonObj = jsonObj / 1024;
            setRamMetric("GB");
          }
          setRamByteCount(jsonObj);
          setRamLoaded(true);
        });
      });
    }
  }, [selectedTenant]);

  return (
    <CardComponent
      title="Ressourcen"
      titleIcon={<DynamicFormTwoToneIcon fontSize="medium" />}
      stackDirection="row"
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
          <Typography variant="h5" component="div">
            {cpuCount} mCPU
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
          <Typography variant="h5" component="div">
            {ramByteCount} {ramMetric}
          </Typography>
        ) : (
          <CircularProgress color="secondary" />
        )}
      </Stack>
    </CardComponent>
  );
}

import StorageTwoToneIcon from "@mui/icons-material/StorageTwoTone";
import DynamicFormTwoToneIcon from "@mui/icons-material/DynamicFormTwoTone";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import DonutChart from "./Items/DonutChart";
import RamIcon from "./Items/RAMIcon";
import CpuIcon from "./Items/CpuIcon";
import CardComponent from "./Items/CardComponent";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GitHubIcon from "@mui/icons-material/GitHub";
import ViewInAr from "@mui/icons-material/ViewInAr";
import { CubeTransparentIcon } from "@heroicons/react/outline";
import { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { AuthenticationContext } from "../App";

export default function Dashboard() {
  const [cpuCount, setCpuCount] = useState(0);
  const [ramByteCount, setRamByteCount] = useState(0);
  const [ramMetric, setRamMetric] = useState("MB");
  //const [hddAllocated, setHddAllocated] = useState(0);
  //const [ssdAllocated, setSsdAllocated] = useState(0);
  const [tenants, setTenants] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState("");
  const [namespaceCount, setNameSpaceCount] = useState(0);
  const [namespaces, setNameSpaces] = useState([]);
  const [serviceAccounts, setServiceAccounts] = useState();
  const [serviceAccountCount, setServiceAccountCount] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState("");
  const [storage, setStorage] = useState<string[]>([]);
  const [storageObject, SetStorageObject] = useState<any>();
  const [pods, setPods] = useState([]);
  const [podCount, setPodCount] = useState(0);

  // Loading states
  const [cpuLoaded, setCpuLoaded] = useState(false);
  const [ramLoaded, setRamLoaded] = useState(false);
  const [nameSpacesLoaded, setNameSpacesLoaded] = useState(false);
  const [serviceAccountsLoaded, setServiceAccountsLoaded] = useState(false);
  const [storageLoaded, setStorageLoaded] = useState(false);
  const [podsLoaded, setPodsLoaded] = useState(false);

  //const [cpuLoading, setCpuLoading] = useState(true);

  const diskFree = 20;
  const diskUsed = 80;

  const SSDFree = 45;
  const SSDUsed = 55;

  const theme = useTheme();
  const authToken = useContext(AuthenticationContext);

  const handleTenantChange = (event: SelectChangeEvent) => {
    setSelectedTenant(event.target.value as string);
  };
  const handleStorageChange = (event: SelectChangeEvent) => {
    setSelectedStorage(event.target.value as string);
  };

  const DropDownItems = tenants.map((tenantName, index) => {
    return (
      <MenuItem value={tenantName as string} key={index}>
        {tenantName}
      </MenuItem>
    );
  });

  const StorageDropDownItems = storage.map((storageName, index) => {
    return (
      <MenuItem value={storageName as string} key={index}>
        {storageName}
      </MenuItem>
    );
  });

  useEffect(() => {
    setRamLoaded(false);
    setCpuLoaded(false);
    setNameSpacesLoaded(false);
    setServiceAccountsLoaded(false);
    setStorageLoaded(false);
    setPodsLoaded(false);
  }, [selectedTenant]);

  useEffect(() => {
    if (tenants[0]) {
      setSelectedTenant(tenants[0] as string);
    }
  }, [tenants]);

  useEffect(() => {
    if (storage[0]) {
      setSelectedStorage(storage[0] as string);
    }
  }, [storage]);

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

      fetch(`https://api.natron.io/api/v1/${selectedTenant}/requests/storage`, {
        method: "get",
        headers: new Headers({
          Authorization: `Bearer ${authToken.authenticationToken}`,
        }),
      }).then((res) => {
        res.json().then((jsonObj) => {
          console.log(jsonObj);
          if (jsonObj != null) {
            //console.log(storageArray);
            SetStorageObject(jsonObj);
            setStorage(Object.keys(jsonObj));
            setStorageLoaded(true);
          } else {
            SetStorageObject("");
            setStorage([]);
            setStorageLoaded(true);
          }
        });
      });

      fetch(`https://api.natron.io/api/v1/${selectedTenant}/namespaces`, {
        method: "get",
        headers: new Headers({
          Authorization: `Bearer ${authToken.authenticationToken}`,
        }),
      }).then((res) => {
        res.json().then((jsonObj) => {
          //console.log(jsonObj);
          if (jsonObj === null) {
            setNameSpaceCount(0);
            setNameSpaces([]);
            setNameSpacesLoaded(true);
          } else {
            setNameSpaceCount(jsonObj.length);
            setNameSpaces(jsonObj);
            setNameSpacesLoaded(true);
          }
        });
      });

      fetch(`https://api.natron.io/api/v1/${selectedTenant}/serviceaccounts`, {
        method: "get",
        headers: new Headers({
          Authorization: `Bearer ${authToken.authenticationToken}`,
        }),
      }).then((res) => {
        res.json().then((jsonObj) => {
          let counter = 0;
          for (let sa in jsonObj) {
            counter++;
          }
          setServiceAccountCount(counter);
          setServiceAccounts(jsonObj);
          setServiceAccountsLoaded(true);
        });
      });

      fetch(`https://api.natron.io/api/v1/${selectedTenant}/pods`, {
        method: "get",
        headers: new Headers({
          Authorization: `Bearer ${authToken.authenticationToken}`,
        }),
      }).then((res) => {
        res.json().then((jsonObj) => {
          //console.log(jsonObj);
          if (jsonObj) {
            setPods(jsonObj);
            setPodCount(jsonObj.length);
            setPodsLoaded(true);
          } else {
            setPods([]);
            setPodCount(0);
            setPodsLoaded(true);
          }
        });
      });
    }
  }, [selectedTenant]);

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
          <CardComponent
            title={"Speicher"}
            titleIcon={<StorageTwoToneIcon fontSize="medium" />}
            //stackDirection="column"
            contentSpacing={2}
          >
            {storageLoaded ? (
              <>
                {storageObject ? (
                  <Grid item>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel>Storage</InputLabel>
                        <Select
                          label="Storage"
                          value={selectedStorage}
                          onChange={handleStorageChange}
                          style={{ minWidth: 50 }}
                        >
                          {StorageDropDownItems}
                        </Select>
                      </FormControl>
                    </Box>

                    <Grid item>
                      <Stack
                        direction="column"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <DonutChart
                          primaryValue={
                            storageObject[selectedStorage] / 1024 / 1024 / 1024
                          }
                          secondaryValue={diskFree}
                          innerText={diskFree + "% Frei"}
                        />
                        <Typography variant="h6" component="div">
                          Alloziert:
                        </Typography>
                        <Typography variant="body1" component="div">
                          {storageObject[selectedStorage] / 1024 / 1024 / 1024}{" "}
                          GB / 20 GB
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                ) : (
                  <>Kein Storage zugewiesen</>
                )}
              </>
            ) : (
              <CircularProgress color="primary" />
            )}
          </CardComponent>
        </Grid>

        <Grid item>
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
        </Grid>
        <Grid item>
          <CardComponent
            title="Anzahl Namespaces"
            titleIcon={<CubeTransparentIcon width={"3vh"} />}
            contentSpacing={1}
          >
            {nameSpacesLoaded ? (
              <>
                <Typography component="p" variant="h4">
                  {namespaceCount}
                </Typography>
                {namespaceCount > 0 ? (
                  <div>
                    <Link
                      color="primary"
                      href="#"
                      onClick={() => alert("Add Namespace Modal!")}
                    >
                      Details
                    </Link>
                  </div>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <CircularProgress color="primary" />
            )}
          </CardComponent>
        </Grid>

        <Grid item>
          <CardComponent
            title="Anzahl Pods"
            titleIcon={<ViewInAr />}
            contentSpacing={1}
          >
            {podsLoaded ? (
              <>
                <Typography component="p" variant="h4">
                  {podCount}
                </Typography>
                {podCount > 0 ? (
                  <div>
                    <Link
                      color="primary"
                      href="#"
                      onClick={() => alert("Add Service Account Modal!")}
                    >
                      Details
                    </Link>
                  </div>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <CircularProgress color="primary" />
            )}
          </CardComponent>
        </Grid>

        <Grid item>
          <CardComponent
            title="Anzahl Service Accounts"
            titleIcon={<AccountCircleIcon />}
            contentSpacing={1}
          >
            {serviceAccountsLoaded ? (
              <>
                <Typography component="p" variant="h4">
                  {serviceAccountCount}
                </Typography>
                {serviceAccountCount > 0 ? (
                  <div>
                    <Link
                      color="primary"
                      href="#"
                      onClick={() => alert("Add Service Account Modal!")}
                    >
                      Details
                    </Link>
                  </div>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <CircularProgress color="primary" />
            )}
          </CardComponent>
        </Grid>
        <Grid item>
          <CardComponent
            title="Git Repository"
            titleIcon={<GitHubIcon />}
            contentSpacing={1}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<GitHubIcon />}
              onClick={() => {
                alert("Add Git Repo Link!");
              }}
            >
              Open Repository
            </Button>
          </CardComponent>
        </Grid>
      </Grid>
    </>
  );
}

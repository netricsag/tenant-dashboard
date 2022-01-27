import StorageTwoToneIcon from "@mui/icons-material/StorageTwoTone";
import DynamicFormTwoToneIcon from "@mui/icons-material/DynamicFormTwoTone";
import { Button, Grid, Link, Stack, Typography, useTheme } from "@mui/material";
import DonutChart from "./Items/DonutChart";
import RamIcon from "./Items/RAMIcon";
import CpuIcon from "./Items/CpuIcon";
import CardComponent from "./Items/CardComponent";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GitHubIcon from "@mui/icons-material/GitHub";
import { CubeTransparentIcon } from "@heroicons/react/outline";
import { useContext, useEffect } from "react";
import Navbar from "./Navbar";
import { AuthenticationContext } from "../App";

export default function Dashboard() {
  const diskFree = 20;
  const diskUsed = 80;

  const SSDFree = 45;
  const SSDUsed = 55;

  const theme = useTheme();
  const authToken = useContext(AuthenticationContext);

  useEffect(() => {
    // fetch data
    fetch("https://api.natron.io/api/v1/requests/cpu", {
      method: "get",
      headers: new Headers({
        Authorization: `Bearer ${authToken.authenticationToken}`,
      }),
    }).then((res) => {
      res.json().then((jsonObj) => {
        console.log(jsonObj);
      });
    });
  }, []);

  return (
    <>
      <Navbar />
      <Typography variant="h2" component="div" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item>
          <CardComponent
            title={"Speicher"}
            titleIcon={<StorageTwoToneIcon fontSize="medium" />}
            stackDirection="row"
            contentSpacing={1}
          >
            <Grid container spacing={1}>
              <Grid item>
                <Stack
                  direction="column"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6" component="div">
                    FC Disk
                  </Typography>
                  <DonutChart
                    primaryValue={diskUsed}
                    secondaryValue={diskFree}
                    innerText={diskFree + "% Frei"}
                  />
                  <Typography variant="h6" component="div">
                    Frei:
                  </Typography>
                  <Typography variant="body1" component="div">
                    4 GB / 20 GB
                  </Typography>
                </Stack>
              </Grid>
              <Grid item>
                <Stack
                  direction="column"
                  justifyContent="space-around"
                  alignItems="center"
                >
                  <Typography variant="h6" component="div">
                    SSD
                  </Typography>
                  <DonutChart
                    primaryValue={SSDUsed}
                    secondaryValue={SSDFree}
                    innerText={SSDFree + "% Frei"}
                  />
                  <Typography variant="h6" component="div">
                    Frei:
                  </Typography>
                  <Typography variant="body1" component="div">
                    20.25 GB / 40 GB
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
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
              <Typography variant="h5" component="div">
                769 mCPU
              </Typography>
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
              <Typography variant="h5" component="div">
                1337 MB
              </Typography>
            </Stack>
          </CardComponent>
        </Grid>
        <Grid item>
          <CardComponent
            title="Anzahl Namespaces"
            titleIcon={<CubeTransparentIcon width={"3vh"} />}
            contentSpacing={1}
          >
            <Typography component="p" variant="h4">
              69
            </Typography>

            <div>
              <Link
                color="primary"
                href="#"
                onClick={() => alert("Add Namespace Modal!")}
              >
                Details
              </Link>
            </div>
          </CardComponent>
        </Grid>
        <Grid item>
          <CardComponent
            title="Anzahl Service Accounts"
            titleIcon={<AccountCircleIcon />}
            contentSpacing={1}
          >
            <Typography component="p" variant="h4">
              12
            </Typography>

            <div>
              <Link
                color="primary"
                href="#"
                onClick={() => alert("Add Service Account Modal!")}
              >
                Details
              </Link>
            </div>
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

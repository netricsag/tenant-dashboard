import StorageTwoToneIcon from "@mui/icons-material/StorageTwoTone";
import DynamicFormTwoToneIcon from "@mui/icons-material/DynamicFormTwoTone";
import {
  Box,
  Divider,
  Grid,
  List,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import DonutChart from "./Items/DonutChart";
import RamIcon from "./Items/RAMIcon";
import CpuIcon from "./Items/CpuIcon";
import CardComponent from "./Items/CardComponent";

export default function Dashboard() {
  const diskFree = 20;
  const diskUsed = 80;

  const SSDFree = 45;
  const SSDUsed = 55;

  const theme = useTheme();

  return (
    <>
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
      </Grid>
    </>
  );
}

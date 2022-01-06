import StorageTwoToneIcon from "@mui/icons-material/StorageTwoTone";
import DynamicFormTwoToneIcon from "@mui/icons-material/DynamicFormTwoTone";
import {
  Box,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import DonutChart from "./Items/DonutChart";
import RamIcon from "./Items/RAMIcon";
import CpuIcon from "./Items/CpuIcon";

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
          <Box sx={{ display: "flex" }}>
            <Paper elevation={3} sx={{ borderRadius: 2 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                padding={2}
              >
                <Typography variant="h5" component="div">
                  Speicher
                </Typography>

                <StorageTwoToneIcon fontSize="medium" />
              </Stack>
              <Divider variant="middle" />
              <Stack
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                style={{ paddingTop: 10 }}
              >
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
              </Stack>
            </Paper>
          </Box>
        </Grid>

        <Grid item>
          <Box sx={{ display: "flex" }}>
            <Paper elevation={3} sx={{ borderRadius: 2 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                padding={2}
              >
                <Typography variant="h5" component="div">
                  Ressourcen
                </Typography>
                <DynamicFormTwoToneIcon fontSize="medium" />
              </Stack>
              <Divider variant="middle" />
              <Stack
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                style={{ paddingTop: 10 }}
                spacing={5}
                padding={1}
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
              </Stack>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

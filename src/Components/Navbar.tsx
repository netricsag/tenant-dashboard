import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import SettingsIcon from "@mui/icons-material/Settings";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import BarChartIcon from "@mui/icons-material/BarChart";
import { Link } from "react-router-dom";
import NatronIcon from "./Items/Icons/NatronIcon";
import NatronIconWhite from "./Items/Icons/NatronIconWhite";
import drawerContext from "./Items/DrawerContext";
import { useContext } from "react";
import TenantDropdown from "./Items/TenantDropdown";
import { Grid, Stack } from "@mui/material";
import { AuthenticationContext, TenantContext } from "../App";
import LogoutIcon from "@mui/icons-material/Logout";
import LogoutButton from "./Logout";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Navbar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const tenantContext = useContext(TenantContext);

  const { updateDrawerOpen } = useContext(drawerContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    updateDrawerOpen(open);
  }, [open]);

  const authContext = useContext(AuthenticationContext);

  const Logout = () => {
    authContext.updateAuthenticated(false);
  };

  const titleBarText = "Natron Tenant";

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
            style={{
              height: "5vh",
              width: "5vh",
            }}
            size="large"
          >
            <NatronIconWhite />
          </IconButton>
          <Grid
            container
            justifyContent="space-between"
            direction="row"
            alignItems="center"
          >
            <Stack spacing={3} direction="row" alignItems="center">
              <Grid
                item
                sx={{
                  visibility: {
                    xs: "hidden",
                    sm: "hidden",
                    md: "visible",
                    lg: "visible",
                    xl: "visible",
                  },
                  display: {
                    xs: "none",
                    sm: "none",
                    md: "flex",
                    lg: "flex",
                    xl: "flex",
                  },
                }}
              >
                <Typography variant="h4" noWrap component="div">
                  {titleBarText}
                </Typography>
              </Grid>

              <Grid
                item
                sx={{
                  visibility: {
                    xs: "visible",
                    sm: "visible",
                    md: "hidden",
                    lg: "hidden",
                    xl: "hidden",
                  },
                  display: {
                    xs: "flex",
                    sm: "flex",
                    md: "none",
                    lg: "none",
                    xl: "none",
                  },
                }}
              >
                <Typography variant="h4" noWrap component="div">
                  {tenantContext.selectedTenant}
                </Typography>
              </Grid>

              <Grid
                item
                sx={{
                  visibility: {
                    xs: "hidden",
                    sm: "hidden",
                    md: "visible",
                    lg: "visible",
                    xl: "visible",
                  },
                  display: {
                    xs: "none",
                    sm: "none",
                    md: "grid",
                    lg: "grid",
                    xl: "grid",
                  },
                }}
              >
                <TenantDropdown />
              </Grid>
            </Stack>
            <Stack
              sx={{
                visibility: {
                  xs: "hidden",
                  sm: "hidden",
                  md: "visible",
                  lg: "visible",
                  xl: "visible",
                },
                display: {
                  xs: "none",
                  sm: "none",
                  md: "flex",
                  lg: "flex",
                  xl: "flex",
                },
              }}
            >
              <LogoutButton />
            </Stack>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          visibility: {
            xs: open ? "visible" : "hidden",
            sm: open ? "visible" : "hidden",
            md: "visible",
            lg: "visible",
            xl: "visible",
          },
          display: {
            xs: open ? "flex" : "none",
            sm: open ? "flex" : "none",
            md: "flex",
            lg: "flex",
            xl: "flex",
          },
        }}
      >
        <DrawerHeader>
          <IconButton
            onClick={handleDrawerClose}
            style={{
              marginRight: "auto",
              height: "5vh",
              width: "5vh",
            }}
            size="large"
          >
            <NatronIcon />
          </IconButton>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem button key={"Dashboard"} component={Link} to={"/dashboard"}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItem>
          <ListItem button key={"Kosten"} component={Link} to={"/cost"}>
            <ListItemIcon>
              <MonetizationOnIcon />
            </ListItemIcon>
            <ListItemText primary={"Kosten"} />
          </ListItem>
          <ListItem
            button
            key={"Mitteilungen"}
            component={Link}
            to={"/notifications"}
          >
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={"Benachrichtigungen"} />
          </ListItem>
        </List>

        <List style={{ marginTop: "auto" }}>
          <ListItem button key={"Logout"} onClick={Logout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
          <Divider />
          <ListItem button key={"Settings"} component={Link} to={"/settings"}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={"Einstellungen"} />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}

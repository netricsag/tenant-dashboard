import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Cost from "./Components/Cost";
import Notifications from "./Components/Notifications";
import Settings from "./Components/Settings";
import { createContext, useEffect, useState } from "react";
import drawerContext from "./Components/Items/DrawerContext";
import Login from "./Components/Login";
import NatronBackground from "./Assets/blob-scatter-haikei.svg";

export const AuthenticationContext = createContext({
  isAuthenticated: false,
  authenticationToken: "",
  updateAuthenticationToken: (token: string) => {},
  updateAuthenticated: (auth: boolean) => {},
});

export const TenantContext = createContext({
  selectedTenant: "",
  tenantList: [],
  updateSelectedTenant: (tenant: string) => {},
  updateTeanantList: (tenantList: []) => {},
  lastSelectedTenant: "",
  updateLastSelectedTenant: (tenant: string) => {},
});

function App() {
  const [drawerOpenState, setDrawerOpenState] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [authenticationToken, setAuthenticationToken] = useState("");
  const [currentTenant, setCurrentTenant] = useState("");
  const [currentTenantList, setCurrentTenantList] = useState([]);
  const [lastSelectedTenant, setLastSelectedTenant] = useState("");

  useEffect(() => {
    if (localStorage.getItem("tenant-api-token")) {
      const authToken = localStorage.getItem("tenant-api-token");
      setAuthenticated(true);
      setAuthenticationToken(authToken as string);
    }
    if (localStorage.getItem("lastSelectedTenant")) {
      const tmpLastSelectedTenant = localStorage.getItem("lastSelectedTenant");
      setLastSelectedTenant(tmpLastSelectedTenant as string);
    }
  }, []);

  useEffect(() => {
    if (currentTenantList.length > 0) {
      const tmpLastSelectedTenant = localStorage.getItem("lastSelectedTenant");
      setCurrentTenant(tmpLastSelectedTenant as string);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("tenant-api-token") !== authenticationToken) {
      const newToken = localStorage.getItem("tenant-api-token");
      setAuthenticationToken(newToken as string);
    }
  }, [localStorage.getItem("tenant-api-token")]);

  useEffect(() => {
    if (currentTenant !== "") {
      setLastSelectedTenant(currentTenant);
      localStorage.setItem("lastSelectedTenant", currentTenant);
    }
  }, [currentTenant]);

  const Theme = createTheme({
    palette: {
      mode: "light",
      primary: { main: "#5864ff" },
      secondary: { main: "#62EE35" },
      background: { default: "#f5f5f5" },
    },
  });

  const LoginTheme = createTheme({
    palette: {
      mode: "light",
      primary: { main: "#5864ff" },
      secondary: { main: "#62EE35" },
      background: { default: "#5864ff" },
    },
  });

  var drawerPadding = { xs: 4, sm: 4, md: 12, lg: 12, xl: 12 };

  if (drawerOpenState) {
    drawerPadding = { xs: 4, sm: 4, md: 36, lg: 36, xl: 36 };
  } else {
    drawerPadding = { xs: 4, sm: 4, md: 12, lg: 12, xl: 12 };
  }

  return (
    <>
      <AuthenticationContext.Provider
        value={{
          isAuthenticated: authenticated,
          authenticationToken: authenticationToken,
          updateAuthenticationToken: setAuthenticationToken,
          updateAuthenticated: setAuthenticated,
        }}
      >
        <TenantContext.Provider
          value={{
            selectedTenant: currentTenant,
            updateSelectedTenant: setCurrentTenant,
            tenantList: currentTenantList,
            updateTeanantList: setCurrentTenantList,
            lastSelectedTenant: lastSelectedTenant,
            updateLastSelectedTenant: setLastSelectedTenant,
          }}
        >
          <ThemeProvider theme={authenticated ? Theme : LoginTheme}>
            <CssBaseline />
            <drawerContext.Provider
              value={{
                drawerOpen: drawerOpenState,
                updateDrawerOpen: setDrawerOpenState,
              }}
            >
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  pt: authenticated ? 12 : 0,
                  pr: authenticated
                    ? { xs: 4, sm: 4, md: 12, lg: 12, xl: 12 }
                    : 0,
                  pb: authenticated ? 12 : 0,
                  marginLeft: authenticated ? drawerPadding : 0,
                  overflow: "auto",
                  transition:
                    "margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)",

                  backgroundImage:
                    authenticated === false ? `url(${NatronBackground})` : "",
                  backgroundRepeat: authenticated === false ? "no-repeat" : "",
                  backgroundPosition: authenticated === false ? "center" : "",
                  backgroundSize: authenticated === false ? "cover" : "",
                }}
              >
                <Routes>
                  <Route
                    path="/"
                    element={
                      authenticated ? (
                        <Navigate to="dashboard" />
                      ) : (
                        <Navigate to="login" />
                      )
                    }
                  />

                  <Route
                    path="dashboard"
                    element={
                      authenticated ? <Dashboard /> : <Navigate to="/login" />
                    }
                  />
                  <Route
                    path="cost"
                    element={
                      authenticated ? <Cost /> : <Navigate to="/login" />
                    }
                  />
                  <Route
                    path="notifications"
                    element={
                      authenticated ? (
                        <Notifications />
                      ) : (
                        <Navigate to="/login" />
                      )
                    }
                  />
                  <Route
                    path="settings"
                    element={
                      authenticated ? <Settings /> : <Navigate to="/login" />
                    }
                  />
                  <Route
                    path="/login"
                    element={
                      authenticated ? <Navigate to="/dashboard" /> : <Login />
                    }
                  />
                </Routes>
              </Box>
            </drawerContext.Provider>
          </ThemeProvider>
        </TenantContext.Provider>
      </AuthenticationContext.Provider>
    </>
  );
}

export default App;

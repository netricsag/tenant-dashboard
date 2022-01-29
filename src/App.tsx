import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Cost from "./Components/Cost";
import Notifications from "./Components/Notifications";
import Settings from "./Components/Settings";
import { createContext, useEffect, useState } from "react";
import drawerContext from "./Components/Items/DrawerContext";
import Login from "./Components/Login";

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
});

function App() {
  const [drawerOpenState, setDrawerOpenState] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [authenticationToken, setAuthenticationToken] = useState("");
  const [currentTenant, setCurrentTenant] = useState("");
  const [currentTenantList, setCurrentTenantList] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("tenant-api-token")) {
      const authToken = localStorage.getItem("tenant-api-token");
      setAuthenticated(true);
      setAuthenticationToken(authToken as string);
    }
  }, []);

  const Theme = createTheme({
    palette: {
      mode: "light",
      primary: { main: "#5864ff" },
      secondary: { main: "#62EE35" },
      background: { default: "#f5f5f5" },
    },
  });
  var drawerPadding = 12;

  if (drawerOpenState) {
    drawerPadding = 36;
  } else {
    drawerPadding = 12;
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
          }}
        >
          <ThemeProvider theme={Theme}>
            <drawerContext.Provider
              value={{
                drawerOpen: drawerOpenState,
                updateDrawerOpen: setDrawerOpenState,
              }}
            >
              <CssBaseline />

              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  pt: 12,
                  pr: 12,
                  pb: 12,
                  marginLeft: drawerPadding,
                  overflow: "auto",
                  transition:
                    "margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)",
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
                    path="login"
                    element={
                      authenticated ? <Navigate to="/dashboard" /> : <Login />
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

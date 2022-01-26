import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Cost from "./Components/Cost";
import Notifications from "./Components/Notifications";
import Settings from "./Components/Settings";
import { useState } from "react";
import drawerContext from "./Components/Items/DrawerContext";

function App() {
  const [drawerOpenState, setDrawerOpenState] = useState<boolean>(false);

  const darkTheme = createTheme({
    palette: {
      mode: "light",
      primary: { main: "#5864ff" },
      secondary: { main: "#4DFF83" },
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
      <drawerContext.Provider
        value={{
          drawerOpen: drawerOpenState,
          updateDrawerOpen: setDrawerOpenState,
        }}
      >
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Navbar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              pt: 12,
              pr: 12,
              pb: 12,
              marginLeft: drawerPadding,
              overflow: "auto",
              transition: "margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="cost" element={<Cost />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="settings" element={<Settings />} />
            </Routes>
          </Box>
        </ThemeProvider>
      </drawerContext.Provider>
    </>
  );
}

export default App;

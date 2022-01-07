import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Cost from "./Components/Cost";
import Notifications from "./Components/Notifications";
import Settings from "./Components/Settings";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "light",
      primary: { main: "#5864ff" },
      secondary: { main: "#4DFF83" },
      background: { default: "#f5f5f5" },
    },
  });
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 12 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="cost" element={<Cost />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;

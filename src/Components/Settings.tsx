import { Typography } from "@mui/material";
import Navbar from "./Navbar";

export default function Settings() {
  return (
    <>
      <Navbar />
      <Typography variant="h2" component="div" gutterBottom>
        Einstellungen
      </Typography>
    </>
  );
}

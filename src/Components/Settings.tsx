import { Typography } from "@mui/material";
import FloatingTenantChange from "./Items/FloatingTenantChange";
import Navbar from "./Navbar";

export default function Settings() {
  return (
    <>
      <Navbar />
      <Typography variant="h2" component="div" gutterBottom>
        Einstellungen
      </Typography>
      <FloatingTenantChange />
    </>
  );
}

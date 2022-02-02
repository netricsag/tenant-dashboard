import { Typography } from "@mui/material";
import FloatingTenantChange from "./Items/FloatingTenantChange";
import Navbar from "./Navbar";

export default function Notifications() {
  return (
    <>
      <Navbar />
      <Typography variant="h2" component="div" gutterBottom>
        Benachrichtigungen
      </Typography>
      <FloatingTenantChange />
    </>
  );
}

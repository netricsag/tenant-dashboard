import { Typography } from "@mui/material";
import Navbar from "./Navbar";

export default function Notifications() {
  return (
    <>
      <Navbar />
      <Typography variant="h2" component="div" gutterBottom>
        Benachrichtigungen
      </Typography>
    </>
  );
}

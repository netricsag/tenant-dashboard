import { Button, Typography } from "@mui/material";

import { DrawerHeader } from "./Navbar";

export default function Dashboard() {
  return (
    <>
      <Typography variant="h2" component="div">
        Dashboard
      </Typography>
      <Button color="primary" variant="contained">
        Primary
      </Button>
      <Button color="secondary" variant="contained">
        Secondary
      </Button>
    </>
  );
}

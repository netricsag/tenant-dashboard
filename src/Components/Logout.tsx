import { Button } from "@mui/material";
import { useContext } from "react";
import { AuthenticationContext } from "../App";

export function Logout() {
  const authContext = useContext(AuthenticationContext);
  localStorage.removeItem("tenant-api-token");
  authContext.updateAuthenticationToken("");
  authContext.updateAuthenticated(false);
}

export default function LogoutButton() {
  const authContext = useContext(AuthenticationContext);

  const Logout = () => {
    localStorage.removeItem("tenant-api-token");
    authContext.updateAuthenticationToken("");
    authContext.updateAuthenticated(false);
  };

  return (
    <Button variant="outlined" color="secondary" onClick={Logout}>
      Logout
    </Button>
  );
}

import { Typography } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { AuthenticationContext } from "../App";
import FloatingTenantChange from "./Items/FloatingTenantChange";
import Navbar from "./Navbar";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const authToken = useContext(AuthenticationContext);

  useEffect(() => {
    fetch(`https://api.natron.io/api/v1/notifications`, {
      method: "get",
      headers: new Headers({
        Authorization: `Bearer ${authToken.authenticationToken}`,
      }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((jsonObj) => {
          console.log(jsonObj);
          if (jsonObj) {
            setNotifications(jsonObj);
          } else {
            setNotifications([]);
          }
        });
      } else if (res.status === 401) {
        authToken.updateAuthenticated(false);
      }
    });
  }, []);

  return (
    <>
      <Navbar />
      <Typography variant="h2" component="div" gutterBottom>
        Benachrichtigungen
      </Typography>
      <div>
        {notifications.map((notification, index) => (
          <p key={index}>{notification}</p>
        ))}
      </div>
      <FloatingTenantChange />
    </>
  );
}

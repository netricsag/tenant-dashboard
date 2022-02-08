import { Stack, Typography } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { AuthenticationContext } from "../App";
import FloatingTenantChange from "./Items/FloatingTenantChange";
import Navbar from "./Navbar";
import MessageCard from "./Items/CardComponents/Notifications/MessageCard";

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
          //console.log(jsonObj);
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
      <Stack
        direction="column"
        spacing={5}
        justifyContent="center"
        alignItems="center"
      >
        {notifications
          ? notifications.map((message: any, index) => (
              <MessageCard
                key={message.client_msg_id}
                message={message.message}
                messageLink={message.link_to_message}
                timestamp={message.unix_timestamp}
                userAvatarUrl={message.user_avatar_url}
                userRealName={message.user_real_name}
              />
            ))
          : "NO MESSAGES"}
      </Stack>
    </>
  );
}

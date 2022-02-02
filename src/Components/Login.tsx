import GitHubIcon from "@mui/icons-material/GitHub";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { AuthenticationContext } from "../App";

import NatronIconWhite from "./Items/Icons/NatronIconWhite";

declare global {
  interface Window {
    _env_: any;
  }
}

export default function Login() {
  const { updateAuthenticated, updateAuthenticationToken } = useContext(
    AuthenticationContext
  );

  const apiUrl = window._env_.REACT_APP_API_OAUTH_URI;

  const getGithubLogin = () => {
    window.open(
      `https://github.com/login/oauth/authorize?scope=user&client_id=${window._env_.REACT_APP_CLIENT_ID}&redirect_uri=${window._env_.REACT_APP_REDIRECT_URI}`,
      "_self"
    );
  };

  useEffect(() => {
    const url = window.location.href;
    const hasCode = url.includes("?code=");

    if (hasCode) {
      const ghCode = url.split("?code=")[1];
      fetch(apiUrl as string, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          github_code: ghCode,
        }),
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((jsonObj) => {
            const apiToken = jsonObj.token;
            localStorage.setItem("tenant-api-token", apiToken);
            updateAuthenticationToken(apiToken);
            updateAuthenticated(true);
          });
        }
      });
    }
  }, []);

  return (
    <>
      <Stack
        justifyContent="center"
        alignItems="center"
        direction="column"
        style={{
          width: "95vw",
          height: "95vh",
        }}
        spacing={4}
      >
        <Stack direction="row" spacing={3}>
          <Typography variant="h1">
            <NatronIconWhite />
          </Typography>
          <Typography variant="h1" style={{ color: "white" }}>
            natron
          </Typography>
        </Stack>
        <Typography variant="h3" style={{ color: "white" }} gutterBottom>
          Dashboard
        </Typography>
        <Paper
          elevation={3}
          sx={{
            borderRadius: 2,
            minWidth: "30em",
            maxWidth: "30em",
            height: "15em",
            padding: 5,
          }}
        >
          <Stack
            spacing={4}
            direction="column"
            justifyContent="space-around"
            alignItems="center"
          >
            <Typography variant="h3" gutterBottom>
              Login
            </Typography>

            <Button
              variant="contained"
              color="primary"
              startIcon={<GitHubIcon />}
              onClick={getGithubLogin}
            >
              Login with GitHub
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </>
  );
}

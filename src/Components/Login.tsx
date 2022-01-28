import { Login as LoginIcon } from "@mui/icons-material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Button, Grid, Paper } from "@mui/material";

import { useContext, useEffect } from "react";
import { AuthenticationContext } from "../App";

export default function Login() {
  const { updateAuthenticated } = useContext(AuthenticationContext);

  const apiUrl = process.env.REACT_APP_API_OAUTH_URI;

  const getGithubLogin = () => {
    window.open(
      `https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`,
      "_self"
    );
  };

  useEffect(() => {
    const url = window.location.href;
    const hasCode = url.includes("?code=");
    //console.log(process.env.REACT_APP_API_OAUTH_URI);

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
          updateAuthenticated(true);
          res.json().then((jsonObj) => {
            const apiToken = jsonObj.token;
            localStorage.setItem("tenant-api-token", apiToken);
            //document.cookie = `tenant-api-token=${apiToken}; path=/`;
          });
        }
      });
    }
  }, []);

  return (
    <Grid
      justifyContent="center"
      alignItems="center"
      container
      direction="column"
    >
      <Paper
        elevation={3}
        sx={{
          borderRadius: 2,
          minWidth: "30vw",
          height: "30vh",
        }}
      >
        <Grid
          justifyContent="center"
          alignItems="center"
          container
          direction="column"
        >
          <Grid item>
            <h1>natron.io Login</h1>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              startIcon={<GitHubIcon />}
              onClick={getGithubLogin}
            >
              Login with GitHub
            </Button>
          </Grid>
          <Grid container item>
            <></>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

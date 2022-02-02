import { Button } from "@mui/material";
import CardComponent from "../../CardComponent";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext, TenantContext } from "../../../../App";

export default function RepositoryCardComponent() {
  const [repositoryLoaded, setRepositoryLoaded] = useState(false);

  const authToken = useContext(AuthenticationContext);
  const tenantContext = useContext(TenantContext);

  useEffect(() => {
    setRepositoryLoaded(false);
  }, [tenantContext.selectedTenant]);

  useEffect(() => {
    if (tenantContext.selectedTenant) {
      /*fetch(`https://api.natron.io/api/v1/${tenantContext.selectedTenant}/namespaces`, {
        method: "get",
        headers: new Headers({
          Authorization: `Bearer ${authToken.authenticationToken}`,
        }),
      }).then((res) => {
        res.json().then((jsonObj) => {
          console.log("Repo loaded")
        });
      });*/
    }
  }, [tenantContext.selectedTenant]);

  return (
    <CardComponent
      title="Git Repository"
      titleIcon={<GitHubIcon />}
      contentSpacing={1}
    >
      <Button
        variant="contained"
        color="primary"
        startIcon={<GitHubIcon />}
        onClick={() => {
          alert("Add Git Repo Link!");
        }}
      >
        Open Repository
      </Button>
    </CardComponent>
  );
}

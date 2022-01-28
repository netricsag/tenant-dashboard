import { Button } from "@mui/material";
import CardComponent from "../CardComponent";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../../App";

interface IRessourceCardComponent {
  tenant: string;
}

export default function RepositoryCardComponent(
  props: IRessourceCardComponent
) {
  const [selectedTenant, setSelectedTenant] = useState("");
  const [repositoryLoaded, setRepositoryLoaded] = useState(false);

  const authToken = useContext(AuthenticationContext);

  useEffect(() => {
    setSelectedTenant(props.tenant);
    setRepositoryLoaded(false);
  }, [props.tenant]);

  useEffect(() => {
    if (selectedTenant) {
      /*fetch(`https://api.natron.io/api/v1/${selectedTenant}/namespaces`, {
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
  }, [selectedTenant]);

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

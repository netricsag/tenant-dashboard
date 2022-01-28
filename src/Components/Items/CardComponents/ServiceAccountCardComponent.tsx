import { Typography, CircularProgress, Link } from "@mui/material";
import CardComponent from "../CardComponent";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../../App";

interface IRessourceCardComponent {
  tenant: string;
}

export default function ServiceAccountCardComponent(
  props: IRessourceCardComponent
) {
  const [serviceAccounts, setServiceAccounts] = useState();
  const [serviceAccountCount, setServiceAccountCount] = useState(0);
  const [selectedTenant, setSelectedTenant] = useState("");

  const [serviceAccountsLoaded, setServiceAccountsLoaded] = useState(false);

  const authToken = useContext(AuthenticationContext);

  useEffect(() => {
    setSelectedTenant(props.tenant);
    setServiceAccountsLoaded(false);
  }, [props.tenant]);

  useEffect(() => {
    if (props.tenant) {
      fetch(`https://api.natron.io/api/v1/${selectedTenant}/serviceaccounts`, {
        method: "get",
        headers: new Headers({
          Authorization: `Bearer ${authToken.authenticationToken}`,
        }),
      }).then((res) => {
        res.json().then((jsonObj) => {
          let counter = 0;
          for (let sa in jsonObj) {
            counter++;
          }
          setServiceAccountCount(counter);
          setServiceAccounts(jsonObj);
          setServiceAccountsLoaded(true);
        });
      });
    }
  }, [selectedTenant]);

  return (
    <CardComponent
      title="Anzahl Service Accounts"
      titleIcon={<AccountCircleIcon />}
      contentSpacing={1}
    >
      {serviceAccountsLoaded ? (
        <>
          <Typography component="p" variant="h4">
            {serviceAccountCount}
          </Typography>
          {serviceAccountCount > 0 ? (
            <div>
              <Link
                color="primary"
                href="#"
                onClick={() => alert("Add Service Account Modal!")}
              >
                Details
              </Link>
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <CircularProgress color="primary" />
      )}
    </CardComponent>
  );
}

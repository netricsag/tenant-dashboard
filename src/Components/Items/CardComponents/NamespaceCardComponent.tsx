import { Typography, CircularProgress, Link } from "@mui/material";
import CardComponent from "../CardComponent";
import { CubeTransparentIcon } from "@heroicons/react/outline";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext, TenantContext } from "../../../App";

export default function NamespaceCardComponent() {
  const [namespaceCount, setNameSpaceCount] = useState(0);
  const [namespaces, setNameSpaces] = useState([]);
  const [nameSpacesLoaded, setNameSpacesLoaded] = useState(false);

  const tenantContext = useContext(TenantContext);
  const authToken = useContext(AuthenticationContext);

  useEffect(() => {
    setNameSpacesLoaded(false);
  }, [tenantContext.selectedTenant]);

  useEffect(() => {
    if (tenantContext.selectedTenant) {
      fetch(
        `https://api.natron.io/api/v1/${tenantContext.selectedTenant}/namespaces`,
        {
          method: "get",
          headers: new Headers({
            Authorization: `Bearer ${authToken.authenticationToken}`,
          }),
        }
      ).then((res) => {
        res.json().then((jsonObj) => {
          if (jsonObj === null) {
            setNameSpaceCount(0);
            setNameSpaces([]);
            setNameSpacesLoaded(true);
          } else {
            setNameSpaceCount(jsonObj.length);
            setNameSpaces(jsonObj);
            setNameSpacesLoaded(true);
          }
        });
      });
    }
  }, [tenantContext.selectedTenant]);

  return (
    <CardComponent
      title="Anzahl Namespaces"
      titleIcon={<CubeTransparentIcon width={"3vh"} />}
      contentSpacing={1}
    >
      {nameSpacesLoaded ? (
        <>
          <Typography component="p" variant="h4">
            {namespaceCount}
          </Typography>
          {namespaceCount > 0 ? (
            <div>
              <Link
                color="primary"
                href="#"
                onClick={() => alert("Add Namespace Modal!")}
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

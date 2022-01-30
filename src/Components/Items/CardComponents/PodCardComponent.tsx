import { Typography, CircularProgress, Link } from "@mui/material";
import CardComponent from "../CardComponent";
import ViewInAr from "@mui/icons-material/ViewInAr";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext, TenantContext } from "../../../App";

export default function PodCardComponent() {
  const [pods, setPods] = useState([]);
  const [podCount, setPodCount] = useState(0);
  const [podsLoaded, setPodsLoaded] = useState(false);

  const authToken = useContext(AuthenticationContext);
  const tenantContext = useContext(TenantContext);

  useEffect(() => {
    setPodsLoaded(false);
  }, [tenantContext.selectedTenant]);

  useEffect(() => {
    if (tenantContext.selectedTenant) {
      fetch(
        `https://api.natron.io/api/v1/${tenantContext.selectedTenant}/pods`,
        {
          method: "get",
          headers: new Headers({
            Authorization: `Bearer ${authToken.authenticationToken}`,
          }),
        }
      ).then((res) => {
        res.json().then((jsonObj) => {
          if (jsonObj) {
            setPods(jsonObj);
            setPodCount(jsonObj.length);
            setPodsLoaded(true);
          } else {
            setPods([]);
            setPodCount(0);
            setPodsLoaded(true);
          }
        });
      });
    }
  }, [tenantContext.selectedTenant]);

  return (
    <CardComponent
      title="Anzahl Pods"
      titleIcon={<ViewInAr />}
      contentSpacing={1}
    >
      {podsLoaded ? (
        <>
          <Typography component="p" variant="h4">
            {podCount}
          </Typography>
          {podCount > 0 ? (
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

import { Typography, CircularProgress, Link } from "@mui/material";
import CardComponent from "../CardComponent";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext, TenantContext } from "../../../App";

export default function IngressCardComponent() {
  const [ingress, setIngress] = useState([]);
  const [ingressCount, setIngressCount] = useState(0);
  const [ingressLoaded, setIngressLoaded] = useState(false);

  const authToken = useContext(AuthenticationContext);
  const tenantContext = useContext(TenantContext);

  useEffect(() => {
    setIngressLoaded(false);
  }, [tenantContext.selectedTenant]);

  useEffect(() => {
    if (tenantContext.selectedTenant) {
      fetch(
        `https://api.natron.io/api/v1/${tenantContext.selectedTenant}/requests/ingress`,
        {
          method: "get",
          headers: new Headers({
            Authorization: `Bearer ${authToken.authenticationToken}`,
          }),
        }
      ).then((res) => {
        res.json().then((jsonObj) => {
          if (jsonObj) {
            setIngress(jsonObj);
            setIngressCount(jsonObj.length);
            setIngressLoaded(true);
          } else {
            setIngress([]);
            setIngressCount(0);
            setIngressLoaded(true);
          }
        });
      });
    }
  }, [tenantContext.selectedTenant]);

  return (
    <CardComponent
      title="Anzahl Ingresses"
      titleIcon={<SettingsEthernetIcon />}
      contentSpacing={1}
    >
      {ingressLoaded ? (
        <>
          <Typography component="p" variant="h4">
            {ingressCount}
          </Typography>
          {ingressCount > 0 ? (
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

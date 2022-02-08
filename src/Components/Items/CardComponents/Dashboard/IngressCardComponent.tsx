import {
  Typography,
  CircularProgress,
  TableRow,
  Stack,
  Table,
  TableBody,
  TableCell,
} from "@mui/material";
import CardComponent from "../../CardComponent";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext, TenantContext } from "../../../../App";
import DetailsModal from "../../DetailsModal";

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
        if (res.status === 200) {
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
        } else if (res.status === 401) {
          authToken.updateAuthenticated(false);
        }
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
            <DetailsModal title="Ingresses">
              <Stack>
                <Table aria-label="simple table">
                  <TableBody>
                    {ingress.map((row) => (
                      <TableRow
                        key={row}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">
                          <SettingsEthernetIcon />
                        </TableCell>
                        <TableCell align="center">{row}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Stack>
            </DetailsModal>
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

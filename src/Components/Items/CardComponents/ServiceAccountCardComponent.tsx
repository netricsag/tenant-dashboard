import {
  Typography,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import CardComponent from "../CardComponent";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext, TenantContext } from "../../../App";
import DetailsModal from "../DetailsModal";

export default function ServiceAccountCardComponent() {
  const [serviceAccounts, setServiceAccounts] = useState([]);
  const [serviceAccountCount, setServiceAccountCount] = useState(0);

  const [serviceAccountsLoaded, setServiceAccountsLoaded] = useState(false);

  const authToken = useContext(AuthenticationContext);
  const tenantContext = useContext(TenantContext);

  useEffect(() => {
    setServiceAccountsLoaded(false);
  }, [tenantContext.selectedTenant]);

  useEffect(() => {
    if (tenantContext.selectedTenant) {
      fetch(
        `https://api.natron.io/api/v1/${tenantContext.selectedTenant}/serviceaccounts`,
        {
          method: "get",
          headers: new Headers({
            Authorization: `Bearer ${authToken.authenticationToken}`,
          }),
        }
      ).then((res) => {
        res.json().then((jsonObj) => {
          if (jsonObj) {
            let servAccs = [];
            for (let sa in jsonObj) {
              servAccs.push(sa);
            }
            setServiceAccountCount(servAccs.length);
            setServiceAccounts(servAccs as []);
            setServiceAccountsLoaded(true);
          } else {
            setServiceAccounts([]);
            setServiceAccountCount(0);
            setServiceAccountsLoaded(true);
          }
        });
      });
    }
  }, [tenantContext.selectedTenant]);

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
            <DetailsModal title="Service Accounts">
              <Stack>
                <Table aria-label="simple table">
                  <TableBody>
                    {serviceAccounts.map((row) => (
                      <TableRow
                        key={row}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
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

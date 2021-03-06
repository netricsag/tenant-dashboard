import {
  Typography,
  CircularProgress,
  TableBody,
  TableRow,
  TableCell,
  Stack,
  Table,
} from "@mui/material";
import CardComponent from "../../CardComponent";
import { CubeTransparentIcon } from "@heroicons/react/outline";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext, TenantContext } from "../../../../App";
import DetailsModal from "../../DetailsModal";

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
        if (res.status === 200) {
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
        } else if (res.status === 401) {
          localStorage.removeItem("tenant-api-token");
          authToken.updateAuthenticationToken("");
          authToken.updateAuthenticated(false);
        }
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
            <DetailsModal title="Namespaces">
              <Stack>
                <Table aria-label="simple table">
                  <TableBody>
                    {namespaces.map((row) => (
                      <TableRow
                        key={row}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">
                          <CubeTransparentIcon width={"2.5vh"} />
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

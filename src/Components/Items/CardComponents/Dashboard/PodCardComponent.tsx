import {
  Typography,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import CardComponent from "../../CardComponent";
import ViewInAr from "@mui/icons-material/ViewInAr";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext, TenantContext } from "../../../../App";
import DetailsModal from "../../DetailsModal";

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
        if (res.status === 200) {
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
        } else if (res.status === 401) {
          authToken.updateAuthenticated(false);
        }
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
            <DetailsModal title="Pods">
              <Stack>
                <Table aria-label="simple table">
                  <TableBody>
                    {pods.map((row) => (
                      <TableRow
                        key={row}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">
                          <ViewInAr />
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

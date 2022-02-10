import {
  Stack,
  Typography,
  CircularProgress,
  FormControl,
  Grid,
  Box,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import CardComponent from "../../CardComponent";
import StorageTwoToneIcon from "@mui/icons-material/StorageTwoTone";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext, TenantContext } from "../../../../App";
import DonutChart from "../../DonutChart";
import DetailsModal from "../../DetailsModal";

export default function StorageCardComponent() {
  const [selectedStorage, setSelectedStorage] = useState("");
  const [storageSelectionItems, setStorageSelectionItems] = useState<string[]>(
    []
  );
  const [storage, setStorage] = useState<string[]>([]);
  const [pvc, setPvc] = useState<any>();
  const [pvcList, setPvcList] = useState<string[]>([]);
  const [storageObject, SetStorageObject] = useState<any>();
  const [storageQuotaObject, setStorageQuotaObject] = useState<any>();

  const [storageLoaded, setStorageLoaded] = useState(false);

  const authToken = useContext(AuthenticationContext);
  const tenantContext = useContext(TenantContext);

  const handleStorageChange = (event: SelectChangeEvent) => {
    setSelectedStorage(event.target.value as string);
  };

  const StorageDropDownItems = storage.map((storageName, index) => {
    if (storageQuotaObject[storageName] !== 0) {
      if (storageSelectionItems.includes(storageName) === false) {
        setStorageSelectionItems([storageName, ...storageSelectionItems]);
      }
      return (
        <MenuItem value={storageName as string} key={index}>
          {storageName}
        </MenuItem>
      );
    }
  });

  useEffect(() => {
    setStorageLoaded(false);
  }, [tenantContext.selectedTenant]);

  useEffect(() => {
    if (storageSelectionItems[0]) {
      setSelectedStorage(storageSelectionItems[0] as string);
    }
  }, [storageSelectionItems]);

  /*useEffect(() => {
    if (selectedStorage) {
      if (pvc[selectedStorage]) {
        setPvcList(pvc[selectedStorage]);
      } else {
        setPvcList([]);
      }
    }
  }, [selectedStorage]);*/

  useEffect(() => {
    if (tenantContext.selectedTenant) {
      setStorageLoaded(false);
      fetch(
        `https://api.natron.io/api/v1/${tenantContext.selectedTenant}/requests/storage`,
        {
          method: "get",
          headers: new Headers({
            Authorization: `Bearer ${authToken.authenticationToken}`,
          }),
        }
      ).then((res) => {
        if (res.status === 200) {
          res.json().then((jsonObj) => {
            if (jsonObj != null) {
              SetStorageObject(jsonObj);
              setStorageLoaded(true);
            } else {
              SetStorageObject("");
              setStorageLoaded(true);
            }
          });
        } else if (res.status === 401) {
          localStorage.removeItem("tenant-api-token");
          authToken.updateAuthenticationToken("");
          authToken.updateAuthenticated(false);
        }
      });

      fetch(
        `https://api.natron.io/api/v1/${tenantContext.selectedTenant}/quotas/storage`,
        {
          method: "get",
          headers: new Headers({
            Authorization: `Bearer ${authToken.authenticationToken}`,
          }),
        }
      ).then((res) => {
        if (res.status === 200) {
          res.json().then((jsonObj) => {
            if (jsonObj != null) {
              setStorageQuotaObject(jsonObj);
              setStorage(Object.keys(jsonObj));
            } else {
              setStorageQuotaObject({});
              setStorage([]);
            }
          });
        } else if (res.status === 401) {
          localStorage.removeItem("tenant-api-token");
          authToken.updateAuthenticationToken("");
          authToken.updateAuthenticated(false);
        }
      });

      fetch(
        `https://api.natron.io/api/v1/${tenantContext.selectedTenant}/pvcs`,
        {
          method: "get",
          headers: new Headers({
            Authorization: `Bearer ${authToken.authenticationToken}`,
          }),
        }
      ).then((res) => {
        if (res.status === 200) {
          res.json().then((jsonObj) => {
            if (jsonObj != null) {
              setPvc(jsonObj);
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
      title={"Speicher"}
      titleIcon={<StorageTwoToneIcon fontSize="medium" />}
      contentSpacing={2}
    >
      {storageLoaded ? (
        <>
          {storageObject && storageQuotaObject ? (
            <Grid item>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel>Storage</InputLabel>
                  <Select
                    label="Storage"
                    value={selectedStorage}
                    onChange={handleStorageChange}
                    style={{ minWidth: 50 }}
                  >
                    {StorageDropDownItems}
                  </Select>
                </FormControl>
              </Box>

              <Grid item>
                <Stack
                  direction="column"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <DonutChart
                    primaryValue={
                      storageObject[selectedStorage]
                        ? storageObject[selectedStorage] / 1024 / 1024 / 1024
                        : 0
                    }
                    secondaryValue={
                      storageQuotaObject[selectedStorage]
                        ? storageQuotaObject[selectedStorage] /
                          1024 /
                          1024 /
                          1024
                        : 1
                    }
                    innerText={`
                      ${
                        storageObject[selectedStorage]
                          ? 100 -
                            (100 / storageQuotaObject[selectedStorage]) *
                              storageObject[selectedStorage]
                          : 100
                      }
                      % Frei
                    `}
                  />
                  <Typography variant="h6" component="div">
                    Belegt:
                  </Typography>
                  <Typography variant="body1" component="div" gutterBottom>
                    {`${
                      storageObject[selectedStorage]
                        ? storageObject[selectedStorage] / 1024 / 1024 / 1024
                        : 0
                    } GB / ${
                      storageQuotaObject[selectedStorage] / 1024 / 1024 / 1024
                    } GB`}
                  </Typography>
                  {pvc ? (
                    <>
                      {pvc[selectedStorage] ? (
                        <DetailsModal
                          title="PVCs"
                          overrideButtonText="PVC Details"
                        >
                          <Stack>
                            <Table aria-label="simple table">
                              <TableBody>
                                {pvc[selectedStorage].map((row: any) => (
                                  <TableRow
                                    key={row}
                                    sx={{
                                      "&:last-child td, &:last-child th": {
                                        border: 0,
                                      },
                                    }}
                                  >
                                    <TableCell align="center">
                                      <StorageTwoToneIcon fontSize="medium" />
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
                    <></>
                  )}
                </Stack>
              </Grid>
            </Grid>
          ) : (
            <>Kein Storage zugewiesen</>
          )}
        </>
      ) : (
        <CircularProgress color="primary" />
      )}
    </CardComponent>
  );
}

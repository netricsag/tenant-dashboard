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
} from "@mui/material";
import CardComponent from "../CardComponent";
import StorageTwoToneIcon from "@mui/icons-material/StorageTwoTone";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../../App";
import DonutChart from "../DonutChart";

interface IRessourceCardComponent {
  tenant: string;
}

export default function StorageCardComponent(props: IRessourceCardComponent) {
  const [selectedStorage, setSelectedStorage] = useState("");
  const [storage, setStorage] = useState<string[]>([]);
  const [storageObject, SetStorageObject] = useState<any>();
  const [selectedTenant, setSelectedTenant] = useState("");

  const [storageLoaded, setStorageLoaded] = useState(false);

  const authToken = useContext(AuthenticationContext);

  const diskFree = 20;

  const handleStorageChange = (event: SelectChangeEvent) => {
    setSelectedStorage(event.target.value as string);
  };

  const StorageDropDownItems = storage.map((storageName, index) => {
    return (
      <MenuItem value={storageName as string} key={index}>
        {storageName}
      </MenuItem>
    );
  });

  useEffect(() => {
    setSelectedTenant(props.tenant);
    setStorageLoaded(false);
  }, [props.tenant]);

  useEffect(() => {
    if (storage[0]) {
      setSelectedStorage(storage[0] as string);
    }
  }, [storage]);

  useEffect(() => {
    if (props.tenant) {
      fetch(`https://api.natron.io/api/v1/${selectedTenant}/requests/storage`, {
        method: "get",
        headers: new Headers({
          Authorization: `Bearer ${authToken.authenticationToken}`,
        }),
      }).then((res) => {
        res.json().then((jsonObj) => {
          if (jsonObj != null) {
            SetStorageObject(jsonObj);
            setStorage(Object.keys(jsonObj));
            setStorageLoaded(true);
          } else {
            SetStorageObject("");
            setStorage([]);
            setStorageLoaded(true);
          }
        });
      });
    }
  }, [selectedTenant]);

  return (
    <CardComponent
      title={"Speicher"}
      titleIcon={<StorageTwoToneIcon fontSize="medium" />}
      //stackDirection="column"
      contentSpacing={2}
    >
      {storageLoaded ? (
        <>
          {storageObject ? (
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
                      storageObject[selectedStorage] / 1024 / 1024 / 1024
                    }
                    secondaryValue={diskFree}
                    innerText={diskFree + "% Frei"}
                  />
                  <Typography variant="h6" component="div">
                    Belegt:
                  </Typography>
                  <Typography variant="body1" component="div">
                    {storageObject[selectedStorage] / 1024 / 1024 / 1024} GB /
                    20 GB
                  </Typography>
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

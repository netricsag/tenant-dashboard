import { Grid, Typography } from "@mui/material";
import Navbar from "./Navbar";
import TotalCostCardComponent from "./Items/CardComponents/Cost/TotalCostCardComponent";
import CostTable from "./Items/CostTable";
import { useState, useContext, useEffect } from "react";
import { AuthenticationContext, TenantContext } from "../App";

export default function Cost() {
  const [totalCost, setTotalCost] = useState(0);
  const [cpuCost, setCpuCost] = useState(0);
  const [memoryCost, setMemoryCost] = useState(0);
  const [storageCost, setStorageCost] = useState(0);
  const [storageObject, setStorageObject] = useState<any>();
  const [ingressCost, setIngressCost] = useState(0);
  const [costLoaded, setCostLoaded] = useState(false);

  const authToken = useContext(AuthenticationContext);
  const tenantContext = useContext(TenantContext);

  useEffect(() => {
    setCostLoaded(false);
    if (tenantContext.selectedTenant) {
      fetch(
        `https://api.natron.io/api/v1/${tenantContext.selectedTenant}/costs/cpu`,
        {
          method: "get",
          headers: new Headers({
            Authorization: `Bearer ${authToken.authenticationToken}`,
          }),
        }
      ).then((res) => {
        res.json().then((jsonObj) => {
          if (jsonObj) {
            setCpuCost(jsonObj);
          } else {
            setCpuCost(0);
          }
        });
      });

      fetch(
        `https://api.natron.io/api/v1/${tenantContext.selectedTenant}/costs/memory`,
        {
          method: "get",
          headers: new Headers({
            Authorization: `Bearer ${authToken.authenticationToken}`,
          }),
        }
      ).then((res) => {
        res.json().then((jsonObj) => {
          if (jsonObj) {
            setMemoryCost(jsonObj);
          } else {
            setMemoryCost(0);
          }
        });
      });
      fetch(
        `https://api.natron.io/api/v1/${tenantContext.selectedTenant}/costs/storage`,
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
              let storageCostTemp = 0;
              for (let o in jsonObj) {
                storageCostTemp += jsonObj[o];
              }
              setStorageCost(storageCostTemp);
              setStorageObject(jsonObj);
            } else {
              setStorageCost(0);
              setStorageObject(null);
            }
          });
        } else {
          setStorageCost(0);
          setStorageObject(null);
        }
      });
      fetch(
        `https://api.natron.io/api/v1/${tenantContext.selectedTenant}/costs/ingress`,
        {
          method: "get",
          headers: new Headers({
            Authorization: `Bearer ${authToken.authenticationToken}`,
          }),
        }
      ).then((res) => {
        res.json().then((jsonObj) => {
          if (jsonObj) {
            setIngressCost(jsonObj);
          } else {
            setIngressCost(0);
          }
        });
      });
    }
  }, [tenantContext.selectedTenant]);

  useEffect(() => {
    setCostLoaded(false);
    let totalCosts = 0;
    totalCosts += cpuCost;
    totalCosts += memoryCost;
    totalCosts += storageCost;
    totalCosts += ingressCost;
    setTotalCost(totalCosts);
    setCostLoaded(true);
  }, [
    cpuCost,
    memoryCost,
    storageCost,
    ingressCost,
    tenantContext.selectedTenant,
  ]);

  return (
    <>
      <Navbar />
      <Grid container spacing={3}>
        <Grid item>
          <Typography variant="h2" component="div" gutterBottom>
            Kosten
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={8}>
        <Grid container item spacing={3}>
          <Grid item>
            <TotalCostCardComponent
              costsLoaded={costLoaded}
              totalCost={totalCost}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={3} justifyContent="center">
          <Grid item>
            <CostTable
              cpuCost={cpuCost}
              memoryCost={memoryCost}
              storageCost={storageCost}
              ingressCost={ingressCost}
              totalCost={totalCost}
              storageObject={storageObject}
              costLoaded={costLoaded}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

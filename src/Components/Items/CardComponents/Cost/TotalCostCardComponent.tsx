import { Button, CircularProgress, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CardComponent from "../../CardComponent";
import PaidIcon from "@mui/icons-material/Paid";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext, TenantContext } from "../../../../App";

interface ICost {
  cpuCostInterface: number;
  memoryCostInterface: number;
  storageCostInterface: number;
  ingressCostInterface: number;
}

export default function TotalCostCardComponent() {
  const [cost, setCost] = useState<ICost>({
    cpuCostInterface: 0,
    memoryCostInterface: 0,
    storageCostInterface: 0,
    ingressCostInterface: 0,
  });
  const [totalCost, setTotalCost] = useState(0);
  const [cpuCost, setCpuCost] = useState(0);
  const [memoryCost, setMemoryCost] = useState(0);
  const [storageCost, setStorageCost] = useState(0);
  const [ingressCost, setIngressCost] = useState(0);
  const [costLoaded, setCostLoaded] = useState(false);

  const authToken = useContext(AuthenticationContext);
  const tenantContext = useContext(TenantContext);

  useEffect(() => {
    setCostLoaded(false);
    setTotalCost(0);
    setCpuCost(0);
    setMemoryCost(0);
    setStorageCost(0);
    setIngressCost(0);
  }, [tenantContext.selectedTenant]);

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
            console.log(jsonObj);
            if (jsonObj) {
              let storageCostTemp = 0;
              for (let o in jsonObj) {
                storageCostTemp += jsonObj[o];
              }
              setStorageCost(storageCostTemp);
            } else {
              setStorageCost(0);
            }
          });
        } else {
          setStorageCost(0);
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
            /*setPods([]);
            setPodCount(0);
            setPodsLoaded(true);*/
          }
        });
      });
    }
  }, [tenantContext.selectedTenant]);

  useEffect(() => {
    let totalCosts = 0;
    totalCosts += cpuCost;
    totalCosts += memoryCost;
    totalCosts += storageCost;
    totalCosts += ingressCost;
    setTotalCost(totalCosts);
    setCost({
      cpuCostInterface: cpuCost,
      memoryCostInterface: memoryCost,
      storageCostInterface: storageCost,
      ingressCostInterface: ingressCost,
    });
    setCostLoaded(true);
  }, [cpuCost, memoryCost, storageCost, ingressCost]);

  return (
    <CardComponent
      title={"Aktuelle Kosten"}
      titleIcon={<PaidIcon fontSize="medium" />}
      contentSpacing={2}
    >
      {costLoaded ? (
        <>
          <Typography variant="h4">Total</Typography>
          <Typography variant="h4">
            CHF {(Math.round(totalCost * 100) / 100).toFixed(2)}
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            am 01.03.2023
          </Typography>
          <div>
            <Button>Details</Button>
          </div>
        </>
      ) : (
        <CircularProgress color="primary" />
      )}
    </CardComponent>
  );
}

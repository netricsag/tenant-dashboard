import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CommentsDisabledOutlined } from "@mui/icons-material";
import { CircularProgress, Typography } from "@mui/material";

interface ICostTable {
  cpuCost: number;
  memoryCost: number;
  storageCost: number;
  storageObject?: any;
  ingressCost: number;
  totalCost: number;
  costLoaded: boolean;
}

export default function CostTable(props: ICostTable) {
  return (
    <>
      <Typography component="p" variant="h4" gutterBottom>
        Übersicht der Kosten
      </Typography>
      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
        {props.costLoaded ? (
          <Table sx={{ minWidth: "auto" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Ressource</TableCell>
                <TableCell align="center">Kosten (CHF)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key="cpu"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  CPU
                </TableCell>
                <TableCell align="right">{props.cpuCost}</TableCell>
              </TableRow>
              <TableRow
                key="memory"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Memory
                </TableCell>
                <TableCell align="right">{props.memoryCost}</TableCell>
              </TableRow>
              <TableRow
                key="ingress"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Ingress
                </TableCell>
                <TableCell align="right">{props.ingressCost}</TableCell>
              </TableRow>

              {props.storageObject ? (
                Object.entries(props.storageObject).map(
                  (storageObject: any, index) => {
                    return (
                      <TableRow
                        key={storageObject[0]}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {storageObject[0] as string}
                        </TableCell>
                        <TableCell align="right">
                          {(Math.round(storageObject[1] * 100) / 100).toFixed(
                            2
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  }
                )
              ) : (
                <></>
              )}

              <TableRow
                key="total"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" variant="head">
                  Total
                </TableCell>
                <TableCell align="right" variant="head">
                  {(Math.round(props.totalCost * 100) / 100).toFixed(2)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ) : (
          <CircularProgress color="primary" />
        )}
      </TableContainer>
    </>
  );
}

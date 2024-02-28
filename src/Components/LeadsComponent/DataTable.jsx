import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const DataTable = ({ data }) => {
  return (
    <TableContainer
      component={Paper}
      style={{ width: "40%", border: "1px solid black", margin: "auto" }}
    >
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Location</TableCell>
            <TableCell>Today</TableCell>
            <TableCell>Week</TableCell>
            <TableCell>Month</TableCell>
            <TableCell>Year</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(data).map(([location, stats]) => (
            <TableRow key={location}>
              <TableCell>{location}</TableCell>
              <TableCell>{stats.Today}</TableCell>
              <TableCell>{stats.Week}</TableCell>
              <TableCell>{stats.Month}</TableCell>
              <TableCell>{stats.Year}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;

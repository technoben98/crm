import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TableSortLabel,
  TextField,
  MenuItem,
  Select,
  Box,
  Autocomplete,
} from "@mui/material";
import "./Table.css";
import { Link } from "react-router-dom";

const TableComponent = ({ data, columns, selectColumns, selectOptions }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  // Select's state
  const [selectedValues, setSelectedValues] = useState([]);
  // Filter's states
  const [filterContactOwner, setFilterContactOwner] = useState("");
  const [filterCreationUpdateDate, setFilterCreationUpdateDate] = useState("");
  const [filterLeadStatus, setFilterLeadStatus] = useState("");
  const [filterCampus, setFilterCampus] = useState("");

  useEffect(() => {
    const defaultValues = data.map((item) => {
      const defaultRowValues = {};
      selectColumns.forEach((column) => {
        if (selectOptions[column] && selectOptions[column].length > 0) {
          defaultRowValues[column] = item[column] || "";
        }
      });
      return { id: item.id, ...defaultRowValues };
    });

    setSelectedValues(defaultValues);
  }, [data, selectColumns, selectOptions]);

  const handleSelectChange = (objectId, column, event) => {
    setSelectedValues((prevValues) => {
      const updatedValues = { ...prevValues };

      const columnValues = {
        ...updatedValues[objectId],
        [column]: event.target.value,
      };

      updatedValues[objectId] = columnValues;

      return updatedValues;
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSort = (column) => {
    const isAsc = orderBy === column && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(column);
  };

  const filteredData = data.filter((item) => {
    const searchFields = columns.map((column) => item[column]);
    return (
      searchFields.join(" ").toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterContactOwner === "" ||
        item["Contact Owner"] === filterContactOwner) &&
      (filterCreationUpdateDate === "" ||
        item["Creation/Update Date"] === filterCreationUpdateDate) &&
      (filterLeadStatus === "" || item["Lead Status"] === filterLeadStatus) &&
      (filterCampus === "" || item["Campus"] === filterCampus)
    );
  });

  const sortedData = filteredData.sort((a, b) => {
    const orderMultiplier = order === "asc" ? 1 : -1;
    return orderMultiplier * (a[orderBy] < b[orderBy] ? -1 : 1);
  });

  const handleContactOwnerFilterChange = (event, newValue) => {
    if (newValue) {
      setFilterContactOwner(newValue);
      console.log(filterContactOwner);
    } else {
      setFilterContactOwner("");
      console.log(filterContactOwner);
    }
  };

  const handleLeadStatusFilterChange = (event, newValue) => {
    if (newValue) {
      setFilterLeadStatus(newValue);
    } else {
      setFilterLeadStatus("");
    }
  };

  const handleCampusFilterChange = (event, newValue) => {
    if (newValue) {
      setFilterCampus(newValue);
      console.log(filterContactOwner);
    } else {
      setFilterCampus("");
      console.log(filterContactOwner);
    }
  };
  return (
    <div style={{ width: "95%", margin: "auto" }}>
      <TextField
        size="small"
        label="Search name, date, status, source, form"
        variant="outlined"
        margin="normal"
        fullWidth
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <TableContainer component={Paper}>
        <Box display={"flex"} flexDirection={"row"}>
          <Autocomplete
            style={{ width: "200px", margin: "10px" }}
            size="small"
            value={filterContactOwner}
            onChange={handleContactOwnerFilterChange}
            options={selectOptions["Contact Owner"]}
            renderInput={(params) => (
              <TextField {...params} label={"Contact Owner"} />
            )}
          />

          <Autocomplete
            style={{ width: "200px", margin: "10px" }}
            size="small"
            value={filterLeadStatus}
            onChange={handleLeadStatusFilterChange}
            options={selectOptions["Lead Status"]}
            renderInput={(params) => (
              <TextField {...params} label={"Lead Status"} />
            )}
          />

          <Autocomplete
            style={{ width: "200px", margin: "10px" }}
            size="small"
            value={filterCampus}
            onChange={handleCampusFilterChange}
            options={selectOptions["Campus"]}
            renderInput={(params) => <TextField {...params} label={"Campus"} />}
          />
        </Box>
        <Table size="small">
          <TableHead>
            <TableRow style={{ width: "15%" }}>
              {columns.map((column) => (
                <TableCell
                  key={column}
                  style={{ textAlign: "center", fontWeight: "bold" }}
                >
                  <TableSortLabel
                    active={orderBy === column}
                    direction={orderBy === column ? order : "asc"}
                    onClick={() => handleSort(column)}
                  >
                    {column}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData &&
              columns &&
              sortedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index}>
                    {columns.map((column) => (
                      <TableCell
                        key={column}
                        style={{
                          padding: 0,
                          textAlign: "center",
                          width: "15%",
                        }}
                      >
                        {selectColumns &&
                        selectColumns.includes(column) &&
                        selectOptions &&
                        selectOptions[column] ? (
                          <Select
                            size="small"
                            style={{ padding: "2px 0 0 0", fontSize: "0.8rem" }}
                            value={
                              selectedValues[row.id] &&
                              selectedValues[row.id][column]
                                ? selectedValues[row.id][column]
                                : row[column]
                            }
                            onChange={(event) =>
                              handleSelectChange(row.id, column, event)
                            }
                          >
                            {selectOptions[column].map(
                              (option, optionIndex) => (
                                <MenuItem key={optionIndex} value={option}>
                                  {option}
                                </MenuItem>
                              )
                            )}
                          </Select>
                        ) : column === "Full Name" ? (
                          <Link
                            style={{ color: "inherit", textDecoration: "none" }}
                            to={`/lead/${row.id}`}
                          >
                            {row[column]}
                          </Link>
                        ) : (
                          row[column]
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[15, 30, 50]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default TableComponent;

import React from "react";
import DataTable from "./DataTable"; // Подставьте правильный путь к компоненту DataTable
import StatsDB from "../../source/StatsDB.json";
import { Box, Typography } from "@mui/material";
const Stats = () => {
  return (
    <div>
      <Typography
        style={{
          border: "1px solid black",
          width: "fit-content",
          margin: "10px auto",
          padding: 3,
          borderRadius: "4px",
        }}
      >
        Total leads : 123456
      </Typography>
      <DataTable data={StatsDB} />
    </div>
  );
};

export default Stats;

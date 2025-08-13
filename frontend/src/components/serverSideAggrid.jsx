import { Box, Button, Paper, TextField } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import { Flex } from "antd";
import React, { useState, useRef, useMemo } from "react";

const ServerSideAggrid = () => {
  const [rowData, setRowData] = useState({ name: "", role: "" });
  const gridRef = useRef();

  const columnDefs = useMemo(() => {
    [
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        minWidth: 200,
      },
      {
        field: "role",
        hearderName: "Role",
        width: 200,
      },
    ];
  });
  return (
    <div>
      <Box className="flex justify-center py-4 gap-2">
        <TextField label="name" />
        <TextField label="role" />
        <Button variant="contained">Add</Button>
      </Box>
      <Paper>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          domLayout="autoHeight"
          onGridReady={(params) => {
            gridRef.current = params.api;
          }}
        />
      </Paper>
    </div>
  );
};

export default ServerSideAggrid;

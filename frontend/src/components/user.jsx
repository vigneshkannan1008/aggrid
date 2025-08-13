import { AgGridReact } from "ag-grid-react";
import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { Modal } from "antd";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  TextField,
  Button,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";
import axios from "./axios";
import { EditOutlined, DeleteOutline, CheckBox } from "@mui/icons-material";
import { themeQuartz } from "ag-grid-community";

const initialData = {
  rowData: [],
  addModal: {
    open: false,
    editUser: false,
    data: {
      name: "",
      dept: "",
      year: "",
      regNo: "",
      dob: "",
      clg: "",
      fees: false,
      courses: [],
    },
  },
};

const User = () => {
  const [rowData, setRowData] = useState(initialData?.rowData);
  const [addUser, setAddUser] = useState(initialData?.addModal);
  const gridRef = useRef();
  const [editableYear, setEditableYear] = useState(null);
  const [search, setSearch] = useState("");

  const myTheme = themeQuartz.withParams({
    accentColor: "#15BDE8",
    backgroundColor: "#0C0C0D",
    borderColor: "#ffffff00",
    borderRadius: 20,
    browserColorScheme: "dark",
    cellHorizontalPaddingScale: 1,
    chromeBackgroundColor: {
      ref: "backgroundColor",
    },
    columnBorder: false,
    fontFamily: {
      googleFont: "Roboto",
    },
    fontSize: 16,
    foregroundColor: "#BBBEC9",
    headerBackgroundColor: "#182226",
    headerFontSize: 14,
    headerFontWeight: 500,
    headerTextColor: "#FFFFFF",
    headerVerticalPaddingScale: 0.9,
    iconSize: 20,
    rowBorder: false,
    rowVerticalPaddingScale: 1.2,
    sidePanelBorder: false,
    spacing: 8,
    wrapperBorder: false,
    wrapperBorderRadius: 20,
  });

  const nameTest = /^[A-Za-z\s]{2,50}$/;

  const getServerSideDatasource = useCallback(() => {
    return {
      getRows: async (params) => {
        try {
          const response = await axios.post("/get", {
            startRow: params.request.startRow,
            endRow: params.request.endRow,
          });

          const { rowData, rowCount } = response.data;

          params.success({
            rowData: rowData,
            rowCount: rowCount,
          });
        } catch (error) {
          console.error("Error fetching data:", error);
          params.fail();
        }
      },
    };
  }, []);

  const columnDefs = useMemo(() => {
    const isEditable = (params) => {
      return (
        !editableYear ||
        params?.data?.year === editableYear ||
        params?.data?.year === null
      );
    };

    const highlightEditable = (params) => {
      return isEditable(params) ? { backgroundColor: "#2244CC44" } : undefined;
    };

    return [
      {
        field: "regNo",
        headerName: "Reg No",
        width: 140,
        sortable: true,
        filter: "agNumberColumnFilter",
        valueGetter: (params) => Number(params?.data?.regNo || 0),
        cellRenderer: "agGroupCellRenderer",
      },
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        minWidth: 150,
        sortable: true,
        filter: "agTextColumnFilter",
        editable: isEditable,
        cellStyle: highlightEditable,
        cellEditor: "agTextCellEditor",
      },
      {
        field: "dob",
        headerName: "DOB",
        width: 240,
        sortable: true,
        filter: "agDateColumnFilter",
        valueFormatter: (params) => {
          if (!params?.value) return "";
          const date = new Date(params?.value);
          return date.toLocaleDateString("en-GB");
        },
        editable: isEditable,
        cellStyle: highlightEditable,
        cellEditor: "agDateCellEditor",
      },
      {
        field: "clg",
        headerName: "College",
        width: 180,
        sortable: true,
        filter: "agTextColumnFilter",
        editable: isEditable,
        cellStyle: highlightEditable,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: ["kit", "psg", "cit", "krishna", "ramakrishna", "sns"],
        },
      },
      {
        field: "dept",
        headerName: "Department",
        width: 180,
        sortable: true,
        filter: "agTextColumnFilter",
        editable: isEditable,
        cellStyle: highlightEditable,
      },
      {
        field: "year",
        headerName: "Year",
        width: 140,
        sortable: true,
        filter: "agNumberColumnFilter",
        editable: isEditable,
        cellStyle: highlightEditable,
        cellEditor: "agNumberCellEditor",
      },
      {
        field: "fees",
        headerName: "Fees Paid",
        width: 160,
        editable: isEditable,
        cellStyle: highlightEditable,
        filter: "agTextColumnFilter",
        sortable: true,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: [true, false],
        },
        valueFormatter: (params) => {
          const val = params?.value;
          return val === true || val === "true" ? "Yes" : "No";
        },
      },
      {
        headerName: "Action",
        width: 120,
        filter: false,
        sortable: false,
        cellRenderer: (params) => (
          <div className="flex">
            <IconButton onClick={() => handleEdit(params?.data)}>
              <EditOutlined style={{ color: "green" }} />
            </IconButton>
            <IconButton onClick={() => handleDelete(params?.data)}>
              <DeleteOutline style={{ color: "red" }} />
            </IconButton>
          </div>
        ),
      },
    ];
  }, [editableYear]);

  const handleCellEdit = async (e) => {
    try {
      const field = e?.colDef?.field;
      let value = e?.data?.[field];
      const oldValue = e?.oldValue;

      if (field === "fees") {
        if (value === null || value === undefined) {
          alert("Please select Fees detail");
          return e?.node?.setDataValue(field, oldValue);
        }
        e.node.setDataValue(field, value);
        e.data[field] = value;
      }

      if (value === "" || value === null || value === undefined) {
        alert("Field cannot be empty");
        return e?.node?.setDataValue(field, oldValue);
      }
      if (field === "name" && !nameTest.test(value)) {
        alert("Enter a valid name");
        return e?.node?.setDataValue(field, oldValue);
      }
      if (field === "clg" && !nameTest.test(value)) {
        alert("Enter a valid college name");
        return e?.node?.setDataValue(field, oldValue);
      }
      if (field === "dept" && !nameTest.test(value)) {
        alert("Enter a valid department name");
        return e?.node?.setDataValue(field, oldValue);
      }
      if (field === "year") {
        const year = Number(value);
        if (!Number.isInteger(year) || year < 1 || year > 4) {
          alert("Enter a valid year (1-4)");
          return e?.node?.setDataValue(field, oldValue);
        }
      }
      if (field === "fees") {
        e?.node?.setDataValue(field, value === true);
      }

      await axios.put(`/update/${e?.data?.regNo}`, e?.data);

      if (gridRef.current?.refreshServerSide) {
        gridRef.current.refreshServerSide({ purge: false });
      }
    } catch (err) {
      console.log("Error on cell edit", err.message);
    }
  };

  const handleDelete = async (data) => {
    try {
      await axios.delete(`/delete/${data.regNo}`);

      if (gridRef.current?.refreshServerSide) {
        gridRef.current.refreshServerSide({ purge: true });
      }
    } catch (err) {
      console.log("Error deleting user", err.message);
    }
  };

  const handleEdit = (data) => {
    setAddUser({ open: true, editUser: true, data: data });
  };

  const handleAdd = () => {
    setAddUser({ ...initialData?.addModal, open: true, editUser: false });
  };

  const handleClose = () => {
    setAddUser({ ...initialData?.addModal, open: false });
  };

  const handleChange = (field, value) => {
    setAddUser((prev) => ({
      ...prev,
      data: {
        ...prev?.data,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    const { name, dept, year, regNo, clg, dob, fees, courses } =
      addUser?.data || {};

    if (!name || !dept || !year || !regNo || !clg || !dob) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      if (!addUser?.editUser) {
        if (!regNo || isNaN(regNo) || regNo < 0 || regNo > 999)
          return alert("Enter valid regNo");

        if (!nameTest.test(name)) return alert("Enter valid name");
        if (!nameTest.test(clg)) return alert("Enter valid clg name");
        if (!nameTest.test(dept)) return alert("Enter valid dept name");
        if (year > 4 || year < 1) return alert("Enter a valid year");

        const newUser = {
          ...addUser?.data,
          courses: courses || [],
        };

        await axios.post("/create", newUser);
      } else {
        if (!nameTest.test(name)) return alert("Enter valid name");
        if (!nameTest.test(clg)) return alert("Enter valid clg name");
        if (!nameTest.test(dept)) return alert("Enter valid dept name");
        if (year > 4 || year < 1) return alert("Enter a valid year");

        const updatedUser = {
          ...addUser?.data,
          courses: courses || [],
        };

        await axios.put(`/update/${addUser?.data?.regNo}`, updatedUser);
      }

      handleClose();
      if (gridRef.current?.refreshServerSide) {
        gridRef.current.refreshServerSide({ purge: true });
      }
    } catch (err) {
      console.log("Error submitting user", err.message);
    }
  };

  const onFirst = useCallback(() => {
    if (gridRef?.current?.paginationGoToFirstPage) {
      gridRef.current.paginationGoToFirstPage();
    }
  }, []);

  const onLast = useCallback(() => {
    if (gridRef?.current?.paginationGoToLastPage) {
      gridRef.current.paginationGoToLastPage();
    }
  }, []);

  const onNext = useCallback(() => {
    if (gridRef?.current?.paginationGoToNextPage) {
      gridRef.current.paginationGoToNextPage();
    }
  }, []);

  const onPrevious = useCallback(() => {
    if (gridRef?.current?.paginationGoToPreviousPage) {
      gridRef.current.paginationGoToPreviousPage();
    }
  }, []);

  const setText = (id, text) => {
    const element = document.querySelector(id);
    if (element) {
      element.innerHTML = text;
    }
  };

  const handlePageChange = useCallback(() => {
    if (gridRef?.current?.paginationGetPageSize)
      setText("#pageSize", gridRef.current.paginationGetPageSize());
    if (gridRef?.current?.paginationGetTotalPages)
      setText("#totalPage", gridRef.current.paginationGetTotalPages());
    if (gridRef?.current?.paginationGetCurrentPage)
      setText("#currentPage", gridRef.current.paginationGetCurrentPage() + 1);
  }, []);

  return (
    <div className="overflow-y-auto max-h-[700px] px-8 w-dvw h-full bg-gray-700 ">
      <div className="flex flex-col gap-4 h-screen">
        <h2 className="text-center text-2xl my-2 text-white font-bold">
          AG-Grid Server-Side Sort and Filter with Backend
        </h2>
        <div className="w-full flex justify-between items-center gap-x-4">
          <TextField
            label="search"
            variant="filled"
            size="medium"
            onChange={(e) => {
              setSearch(e?.target?.value || "");
            }}
            className="bg-white rounded-lg"
          />

          <Button
            type="primary"
            size="large"
            variant="contained"
            onClick={handleAdd}
          >
            Add user
          </Button>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-4">
            <Button variant="contained" onClick={onPrevious}>
              To Previous Page
            </Button>
            <Button variant="contained" onClick={onFirst}>
              To First Page
            </Button>
            <Button variant="contained" onClick={onLast}>
              To Last Page
            </Button>
            <Button variant="contained" onClick={onNext}>
              To Next Page
            </Button>
            <FormControl variant="filled" style={{ minWidth: "120px" }}>
              <InputLabel>Year</InputLabel>
              <Select
                value={editableYear ?? ""}
                onChange={(e) => {
                  setEditableYear(Number(e?.target?.value));
                  gridRef.current?.redrawRows();
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {[1, 2, 3, 4].map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <Paper
            elevation={3}
            sx={{ background: "#374151" }}
            className="bg-gray-700 w-full max-w-4xl p-4 rounded-lg"
          >
            <Box className="flex justify-around items-center text-white">
              <Box className="flex flex-col items-center">
                <Typography variant="subtitle2" className="text-gray-300">
                  Page Size
                </Typography>
                <Typography
                  variant="h6"
                  id="pageSize"
                  className="font-bold"
                ></Typography>
              </Box>
              <Box className="flex flex-col items-center">
                <Typography variant="subtitle2" className="text-gray-300">
                  Total Pages
                </Typography>
                <Typography
                  variant="h6"
                  id="totalPage"
                  className="font-bold"
                ></Typography>
              </Box>
              <Box className="flex flex-col items-center">
                <Typography variant="subtitle2" className="text-gray-300">
                  Current Page
                </Typography>
                <Typography
                  variant="h6"
                  id="currentPage"
                  className="font-bold"
                ></Typography>
              </Box>
            </Box>
          </Paper>
        </div>

        <div>
          <AgGridReact
            rowModelType="serverSide"
            serverSideDatasource={getServerSideDatasource()}
            serverSideStoreType="full"
            cacheBlockSize={100}
            maxBlocksInCache={5}
            columnDefs={columnDefs}
            domLayout="autoHeight"
            theme={myTheme}
            getRowId={(params) => params?.data?.regNo}
            onGridReady={(params) => {
              gridRef.current = params.api;
            }}
            quickFilterText={search}
            animateRows={true}
            onCellEditingStopped={handleCellEdit}
            pagination={true}
            paginationPageSize={100}
            onPaginationChanged={handlePageChange}
            defaultColDef={{
              flex: 1,
              sortable: true,
              filter: true,
              resizable: true,
            }}
          />
        </div>
      </div>

      <Modal
        title={addUser?.editUser ? "Edit User" : "Add User"}
        open={addUser?.open}
        onCancel={handleClose}
        onOk={handleSubmit}
        okText={addUser?.editUser ? "Update" : "Add"}
      >
        <div className="w-full flex flex-col gap-4">
          <TextField
            label="Name"
            variant="outlined"
            value={addUser?.data?.name}
            onChange={(e) => handleChange("name", e?.target?.value || "")}
          />
          <TextField
            label="DOB"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={addUser?.data?.dob}
            type="date"
            onChange={(e) => handleChange("dob", e?.target?.value || "")}
          />
          <TextField
            label="College"
            variant="outlined"
            value={addUser?.data?.clg}
            onChange={(e) => handleChange("clg", e?.target?.value || "")}
          />
          <TextField
            label="Department"
            variant="outlined"
            value={addUser?.data?.dept}
            onChange={(e) => handleChange("dept", e?.target?.value || "")}
          />
          <TextField
            label="Year"
            variant="outlined"
            value={addUser?.data?.year}
            onChange={(e) => handleChange("year", e?.target?.value || "")}
          />
          <FormControl variant="filled">
            <InputLabel>Fees Paid</InputLabel>
            <Select
              label="Fees"
              value={addUser?.data?.fees.toString()}
              onChange={(e) =>
                handleChange("fees", e?.target?.value === "true")
              }
            >
              <MenuItem value="true">Yes</MenuItem>
              <MenuItem value="false">No</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Reg No"
            variant="outlined"
            value={addUser?.data?.regNo}
            onChange={(e) => handleChange("regNo", e?.target?.value || "")}
            disabled={addUser?.editUser}
          />
        </div>
      </Modal>
    </div>
  );
};

export default User;

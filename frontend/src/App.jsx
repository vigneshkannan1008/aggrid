import React from "react";
import User from "./components/user";
// import Aggrid from "../components/user";

function App() {
  return (
    <div className="w-dvw h-screen flex justify-center bg-gray-700 min-h-screen">
      {/* <Aggrid /> */}
      <User />
    </div>
  );
}

export default App;

// import React, { useMemo, useState } from "react";
// import { AgGridReact } from "ag-grid-react";
// import { Button, Modal, Typography } from "antd";
// import { CheckCircleTwoTone, DeleteOutlined } from "@ant-design/icons";
// import { IconButton, TextField } from "@mui/material";

// // Theme -
// // RowData - Table data
// // columnDef - Column Def

// //  const tableData = [
// // {
// //   name: "Abraham",
// //   deg: "Associate",
// //   regNo: 205,
// // },
// // {
// //   name: "Dinesh",
// //   deg: "Associate",
// //   regNo: 195,
// // },
// //   ];

// // [
// //               {
// //                 field: "name",
// //                 headerName: "Name",
// //               },
// //               {
// //                 field: "deg",
// //                 headerName: "Designation",
// //               },
// //               {
// //                 field: "regNo",
// //                 headerName: "Reg No",
// //               },
// //             ]

// // const needToAdd = {
// //   name: "Muni",
// //   deg: "CEO",
// //   regNo: 1,
// // };
// // setRowData((prev) => [...prev, needToAdd]);

// // const [columnDefs, setColumnDefs] = useState([]);
// const initialStates = {
//   rowData: [
//     {
//       name: "Abraham",
//       deg: "Associate",
//       regNo: 205,
//       verified: true,
//     },
//     {
//       name: "Dinesh",
//       deg: "Associate",
//       regNo: 195,
//       verified: false,
//     },
//   ],
//   addModal: {
//     show: false,
//     data: {
//       name: "",
//       deg: "",
//       regNo: "",
//       verified: false,
//     },
//   },
// };
// const AggridExample = () => {
//   const [rowData, setRowData] = useState(initialStates.rowData);
//   const [addModal, setAddModal] = useState(initialStates.addModal);

//   const columnDefs = useMemo(
//     () => [
//       {
//         field: "name",
//         headerName: "Name",
//         minWidth: 200,
//         flex: 1,
//         cellRenderer: (params) => {
//           const isVerified = params?.data?.verified || false;

//           return (
//             <div className="flex gap-4">
//               <div>{params?.value || ""}</div>
//               {isVerified ? (
//                 <div>
//                   <CheckCircleTwoTone />
//                 </div>
//               ) : null}
//             </div>
//           );
//         },
//       },
//       {
//         field: "deg",
//         headerName: "Designation",
//         width: 110,
//       },
//       {
//         field: "regNo",
//         headerName: "Reg No",
//         width: 100,
//         valueGetter: (params) => {
//           return Number(params?.data?.regNo || "");
//         },
//       },
//       {
//         headerName: "Actions",
//         width: 90,
//         cellRenderer: (params) => {
//           return (
//             <div>
//               <IconButton size="small">
//                 <DeleteOutlined style={{ color: "red" }} />
//               </IconButton>
//             </div>
//           );
//         },
//       },
//     ],
//     []
//   );
//   const handleOpenAddModal = () => {
//     console.log("Hi");
//     setAddModal({ ...initialStates.addModal, show: true });
//   };
//   const handleCloseModal = () => {
//     setAddModal({ ...initialStates.addModal });
//   };
//   const handleAdd = () => {
//     setRowData((prev) => [...prev, addModal.data]);
//     handleCloseModal();
//   };

//   return (
//     <div className="w-full h-full flex flex-col gap-4">
//       <Typography.Title level={3}>Aggrid</Typography.Title>
//       <div className="w-full flex justify-end">
//         <div>
//           <Button type="primary" onClick={handleOpenAddModal}>
//             Add
//           </Button>
//         </div>
//       </div>
//       <div className="w-full h-full">
//         <AgGridReact rowData={rowData} columnDefs={columnDefs} />
//       </div>
//       <Modal
//         title="Add User"
//         open={addModal?.show || false}
//         onOk={handleAdd}
//         onCancel={handleCloseModal}
//       >
//         <div className="w-full flex flex-col gap-4">
//           <TextField
//             size="small"
//             variant="outlined"
//             label="Name"
//             fullWidth
//             value={addModal?.data?.name || ""}
//             onChange={(e) => {
//               const value = e?.target?.value || "";
//               if (value.length > 100) return;
//               setAddModal((prev) => {
//                 const updatedData = { ...prev.data, name: value };
//                 return { ...prev, data: updatedData };
//               });
//             }}
//           />
//           <TextField
//             size="small"
//             variant="outlined"
//             label="Designation"
//             fullWidth
//             value={addModal?.data?.deg || ""}
//             onChange={(e) => {
//               const value = e?.target?.value || "";
//               if (value.length > 100) return;
//               setAddModal((prev) => {
//                 const updatedData = { ...prev.data, deg: value };
//                 return { ...prev, data: updatedData };
//               });
//             }}
//           />
//           <TextField
//             size="small"
//             variant="outlined"
//             label="Reg No"
//             fullWidth
//             value={addModal?.data?.regNo || ""}
//             onChange={(e) => {
//               const value = e?.target?.value || "";
//               if (Number(value) < 1000) {
//                 setAddModal((prev) => {
//                   const updatedData = { ...prev.data, regNo: value };
//                   return { ...prev, data: updatedData };
//                 });
//               } else if (!value.length) {
//                 setAddModal((prev) => {
//                   const updatedData = { ...prev.data, regNo: "" };
//                   return { ...prev, data: updatedData };
//                 });
//               }
//             }}
//           />
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default AggridExample;

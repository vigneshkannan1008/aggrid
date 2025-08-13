import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import "./index.css";
import App from "./App.jsx";
import {
  ColumnMenuModule,
  MenuModule,
  ClipboardModule,
  ExcelExportModule,
  CsvExportModule,
  RichSelectModule,
  ClientSideRowModelModule,
  MasterDetailModule,
  RowGroupingModule,
  ServerSideRowModelModule,
  ServerSideRowModelApiModule,
} from "ag-grid-enterprise";

ModuleRegistry.registerModules([
  AllCommunityModule,
  ColumnMenuModule,
  MenuModule,
  ClipboardModule,
  ExcelExportModule,
  CsvExportModule,
  RichSelectModule,
  ClientSideRowModelModule,
  MasterDetailModule,
  RowGroupingModule,
  ServerSideRowModelModule,
  ServerSideRowModelApiModule,
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

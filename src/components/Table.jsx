import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState } from "react";
import { DATA_GRID_DEFAULT_LOCALE_TEXT } from "~/utils/datagrid-default-locale-text";

export default function Table({ columns, rows }) {
  const [pageSize, setPageSize] = useState(10);

  return (
    <DataGrid
      //Data
      rows={rows}
      columns={columns}
      //Style
      sx={{
        height: "500px",
        p: 2,
        "& .super-app-theme--cell": {
          padding: "10px",
        },
        ".MuiDataGrid-columnSeparator": {
          display: "none",
        },
        "& .MuiDataGrid-columnHeaders": {
          fontSize: 15,
          color: "#003366",
        },
        "&.MuiDataGrid-root .MuiDataGrid-cell:focus": {
          outline: "none",
        },
      }}
      //Locale text
      localeText={DATA_GRID_DEFAULT_LOCALE_TEXT}
      //Pagination
      pagination
      pageSize={pageSize}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      rowsPerPageOptions={[10, 20, 30]}
      //Selection
      isRowSelectable={() => false}
      isCellEditable={() => false}
      disableSelectionOnClick
      //
      getRowHeight={() => 60}
      disableColumnMenu
      components={{ Toolbar: GridToolbar }}
      disableDensitySelector
      getCellClassName={() => "super-app-theme--cell"}
      componentsProps={{
        pagination: {
          labelRowsPerPage: "Số dòng trên trang",
        },
        toolbar: {
          showQuickFilter: true,
          printOptions: { disableToolbarButton: true },
          csvOptions: { disableToolbarButton: true },
          quickFilterProps: { debounceMs: 500 },
        },
      }}
    />
  );
}

import { Chip } from "@mui/material";
import { useDispatch } from "react-redux";
import ActionsMenu from "~/components/Properties/ActionsMenu";
import * as SagaActionTypes from "~/redux/constants/constantSaga";
import Table from "../Table";

const columns = [
  {
    field: "name",
    headerName: "Tiêu đề",
    minWidth: 150,
  },
  {
    field: "estateCategory",
    headerName: "Chuyên mục",
    minWidth: 150,
  },
  {
    field: "province",
    headerName: "Tỉnh / Thành phố",
    minWidth: 150,
  },
  {
    field: "district",
    headerName: "Quận / Huyện",
    minWidth: 140,
  },
  {
    field: "address",
    headerName: "Địa chỉ cụ thể",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "area",
    headerName: "Diện tích",
    minWidth: 130,
  },
  {
    field: "postStatus",
    headerName: "Trạng thái",
    minWidth: 120,
    headerClassName: "datagrid-header",
    renderCell: (params) =>
      params.value === "Đã xuất bản" ? (
        <Chip
          key={params.value.id}
          label="Đã xuất bản"
          color="warning"
          sx={{
            bgcolor: "success.light",
            color: "success.dark",
            fontSize: "13px",
            fontWeight: "bold",
            width: "100px",
          }}
        />
      ) : (
        <Chip
          key={params.value.id}
          label="Đã ẩn"
          color="error"
          sx={{
            bgcolor: "error.extraLight",
            color: "error.main",
            fontSize: "13px",
            fontWeight: "bold",
            width: "100px",
          }}
        />
      ),
  },
  {
    field: "actions",
    headerName: "",
    minWidth: 120,
    sortable: false,
    hideable: false,
    filterable: false,
    renderCell: (params) => {
      const { row } = params;
      return (
        <ActionsMenu
          key={row.id}
          property={row}
          handleDelete={row.handleDelete}
        />
      );
    },
  },
];

export default function TableProperties({ data }) {
  const dispatch = useDispatch();

  const handleDelete = (property) => {
    dispatch({
      type: SagaActionTypes.DELETE_PROPERTY_SAGA,
      propertyId: property.id,
    });
  };

  const modifiedRows = data.map((element) => {
    return {
      ...element,
      handleDelete: handleDelete,
    };
  });

  return <Table columns={columns} rows={modifiedRows} />;
}

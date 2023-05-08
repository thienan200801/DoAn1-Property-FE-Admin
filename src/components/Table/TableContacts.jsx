import { Chip } from "@mui/material";
import { useDispatch } from "react-redux";
import ActionsMenu from "~/components/Contacts/ActionsMenu";
import * as SagaActionTypes from "~/redux/constants/constantSaga";
import Table from "../Table";

const columns = [
  {
    field: "fullname",
    headerName: "Họ tên",
    minWidth: 150,
  },
  {
    field: "email",
    headerName: "Email",
    minWidth: 150,
  },
  {
    field: "phoneNumber",
    headerName: "Số điện thoại",
    minWidth: 140,
  },
  {
    field: "demandType",
    headerName: "Loại yêu cầu",
    minWidth: 140,
  },
  {
    field: "message",
    headerName: "Thông điệp",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "processingStatus",
    headerName: "Trạng thái",
    minWidth: 140,
    renderCell: (params) => {
      switch (params.value) {
        case "Đang xử lý":
          return (
            <Chip
              key={params.value.id}
              label="Đang xử lý"
              color="primary"
              sx={{
                bgcolor: "warning.light",
                color: "warning.dark",
                fontSize: "13px",
                fontWeight: "bold",
                width: "100px",
              }}
            />
          );
        case "Đã xử lý":
          return (
            <Chip
              key={params.value.id}
              label="Đã xử lý"
              color="warning"
              sx={{
                bgcolor: "success.light",
                color: "success.dark",
                fontSize: "13px",
                fontWeight: "bold",
                width: "100px",
              }}
            />
          );
        default:
          return (
            <Chip
              key={params.value.id}
              label="Đang chờ"
              color="error"
              sx={{
                bgcolor: "error.extraLight",
                color: "error.main",
                fontSize: "13px",
                fontWeight: "bold",
                width: "100px",
              }}
            />
          );
      }
    },
  },
  {
    field: "noteByAdmin",
    headerName: "Ghi chú",
    minWidth: 100,
  },
  {
    field: "actions",
    headerName: "",
    minWidth: 165,
    sortable: false,
    hideable: false,
    filterable: false,
    renderCell: (params) => {
      const { row } = params;
      return (
        <ActionsMenu
          key={row.id}
          contact={row}
          handleDetail={row.handleDetail}
          handleModify={row.handleModify}
          handleDelete={row.handleDelete}
        />
      );
    },
  },
];

export default function TableContacts({ data, handleDetail, handleModify }) {
  const dispatch = useDispatch();

  const handleDelete = (contact) => {
    dispatch({
      type: SagaActionTypes.DELETE_CONTACT_SAGA,
      contactId: contact.id,
    });
  };

  const modifiedRows = data.map((element) => {
    return {
      ...element,
      handleDetail: handleDetail,
      handleModify: handleModify,
      handleDelete: handleDelete,
    };
  });

  return <Table columns={columns} rows={modifiedRows} />;
}

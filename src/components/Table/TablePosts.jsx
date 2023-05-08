import { Chip } from "@mui/material";
import { useDispatch } from "react-redux";
import ActionsMenu from "~/components/Posts/ActionsMenu";
import * as SagaActionTypes from "~/redux/constants/constantSaga";
import Table from "../Table";

const columns = [
  {
    field: "name",
    headerName: "Tên bài viết",
    minWidth: 350,
  },
  {
    field: "description",
    headerName: "Mô tả ngắn",
    minWidth: 350,
    flex: 1,
  },
  {
    field: "postStatus",
    headerName: "Trạng thái",
    minWidth: 140,

    renderCell: (params) => {
      switch (params.value) {
        case "DRAFT":
          return (
            <Chip
              key={params.value.id}
              label="Bản nháp"
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
        case "PUBLISHED":
          return (
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
          );
        default:
          return (
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
          );
      }
    },
  },
  {
    field: "actions",
    headerName: "",
    minWidth: 140,
    sortable: false,
    hideable: false,
    filterable: false,
    renderCell: (params) => {
      const { row } = params;
      return (
        <ActionsMenu key={row.id} post={row} handleDelete={row.handleDelete} />
      );
    },
  },
];

export default function TablePosts({ data, postType }) {
  const dispatch = useDispatch();

  const handleDelete = (post) => {
    dispatch({
      type: SagaActionTypes.DELETE_POST_SAGA,
      postId: post.id,
      postType: postType,
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

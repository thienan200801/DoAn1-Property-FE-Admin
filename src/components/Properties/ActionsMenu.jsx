import { Box, IconButton, Tooltip } from "@mui/material";
import { IconPencil, IconTrash } from "@tabler/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import AlertModal from "~/ui-components/AlertModal";

export default function ActionsMenu({ property, handleDelete }) {
  const [openDelete, setOpenDelete] = useState(false);

  const handleClose = () => {
    setOpenDelete(false);
  };

  const handleOpen = () => {
    setOpenDelete(true);
  };

  const handleDeleteProperty = (property) => {
    handleClose();
    handleDelete(property);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "right" }}>
        <Link to={`/danh-sach-tai-san-ban/chinh-sua/${property.slug}`}>
          <Tooltip title="Chỉnh sửa tài sảns">
            <IconButton variant="text" color="secondary" size="large">
              <IconPencil />
            </IconButton>
          </Tooltip>
        </Link>
        <Tooltip title="Xoá tài sản">
          <IconButton
            size="large"
            variant="text"
            color="error"
            onClick={handleOpen}
          >
            <IconTrash color="#F44336" />
          </IconButton>
        </Tooltip>
      </Box>
      {openDelete && (
        <AlertModal
          content="Bạn có chắc muốn xóa tài sản này?"
          handleClose={handleClose}
          action={() => handleDeleteProperty(property)}
        />
      )}
    </>
  );
}

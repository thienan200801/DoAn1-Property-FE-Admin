import { Box, IconButton, Tooltip } from "@mui/material";
import { IconPencil, IconTrash, IconInfoCircle } from "@tabler/icons";
import { useState } from "react";
import AlertModal from "~/ui-components/AlertModal";

export default function ActionsMenu({
  contact,
  handleDetail,
  handleModify,
  handleDelete,
}) {
  const [openDelete, setOpenDelete] = useState(false);

  const handleClose = () => {
    setOpenDelete(false);
  };

  const handleOpen = () => {
    setOpenDelete(true);
  };

  const handleDeleteContact = (contact) => {
    handleClose();
    handleDelete(contact);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "right" }}>
        <Tooltip title="Xem chi tiết thông tin liên hệ">
          <IconButton
            variant="text"
            color="info"
            size="large"
            onClick={() => handleDetail(contact)}
          >
            <IconInfoCircle />
          </IconButton>
        </Tooltip>
        <Tooltip title="Chỉnh sửa trạng thái và ghi chú">
          <IconButton
            variant="text"
            color="secondary"
            size="large"
            onClick={() => handleModify(contact)}
          >
            <IconPencil />
          </IconButton>
        </Tooltip>
        <Tooltip title="Xoá thông tin liên hệ">
          <IconButton
            size="large"
            variant="text"
            color="error"
            onClick={() => handleOpen()}
          >
            <IconTrash color="#F44336" />
          </IconButton>
        </Tooltip>
      </Box>
      {openDelete && (
        <AlertModal
          content="Bạn có chắc muốn xóa thông tin liên hệ này?"
          handleClose={handleClose}
          action={() => handleDeleteContact(contact)}
        />
      )}
    </>
  );
}

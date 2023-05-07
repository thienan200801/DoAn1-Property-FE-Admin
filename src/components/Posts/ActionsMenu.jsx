import { Box, IconButton, Tooltip } from "@mui/material";
import { IconPencil, IconTrash } from "@tabler/icons";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AlertModal from "~/ui-components/AlertModal";

export default function ActionsMenu({ post, handleDelete }) {
  const location = useLocation();
  const [openDelete, setOpenDelete] = useState(false);

  const handleClose = () => {
    setOpenDelete(false);
  };

  const handleOpen = () => {
    setOpenDelete(true);
  };

  const handleDeletePost = (post) => {
    handleClose();
    handleDelete(post);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "right" }}>
        <Link to={`${location.pathname}/chinh-sua/${post.slug}`}>
          <Tooltip title="Chỉnh sửa bài viết">
            <IconButton variant="text" color="secondary" size="large">
              <IconPencil />
            </IconButton>
          </Tooltip>
        </Link>
        <Tooltip title="Xoá bài viết">
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
          content="Bạn có chắc muốn xóa bài viết này?"
          handleClose={handleClose}
          action={() => handleDeletePost(post)}
        />
      )}
    </>
  );
}

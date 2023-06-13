import { Avatar, Box, Grid, IconButton, Typography } from "@mui/material";
import { IconCameraPlus, IconTrash } from "@tabler/icons";
import ImageServices from "~/services/ImageServices";
import showSweetAlert from "~/utils/show-sweet-alert";

export default function Thumbnail({ thumbnail, handleChangeThumbnail }) {
  const uploadImage = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    ImageServices.postImage(formData)
      .then((response) => {
        handleChangeThumbnail(response.data.link);
      })
      .catch((error) => {
        showSweetAlert("Tải ảnh thất bại", "error");
      });
  };

  const handleDeleteThumbnail = () => {
    handleChangeThumbnail("");
  };

  return (
    <Grid
      item
      xs={12}
      sx={{ display: "flex", alignItems: "center", gap: "8px" }}
    >
      <Typography>Ảnh đại diện</Typography>
      {thumbnail === "" ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <IconButton color="info" component="label">
            <IconCameraPlus />
            <input
              type="file"
              accept="image/png, image/gif, image/jpeg"
              hidden
              onChange={(e) => {
                uploadImage(e.target.files[0]);
              }}
            />
          </IconButton>
        </Box>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
          <Avatar
            sx={{
              bgcolor: "#fff",
              height: "100px",
              width: "auto",
              objectFit: "contain",
            }}
            variant="rounded"
            src={thumbnail}
          ></Avatar>
          <IconButton
            color="error"
            onClick={handleDeleteThumbnail}
            sx={{ ml: 1 }}
          >
            <IconTrash />
          </IconButton>
        </Box>
      )}
    </Grid>
  );
}

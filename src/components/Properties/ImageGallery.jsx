import {
  Box,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import { IconCameraPlus, IconTrash } from "@tabler/icons";
import ImageServices from "~/services/ImageServices";
import showSweetAlert from "~/utils/show-sweet-alert";

export default function ImageGallery({ gallery, handleChangeGallery }) {
  const uploadImage = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    ImageServices.postImage(formData)
      .then((response) => {
        const newGallery = gallery;
        newGallery.push(response.data.link);
        handleChangeGallery(newGallery);
      })
      .catch((error) => {
        showSweetAlert("Tải ảnh thất bại", "error");
      });
  };

  const handleDeleteImage = (image) => {
    const newGallery = gallery.filter((item) => item !== image);
    handleChangeGallery(newGallery);
  };

  return (
    <Grid
      item
      xs={12}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        gap: "8px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Typography>Album ảnh</Typography>
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
      <ImageList variant="masonry" cols={4} gap={8}>
        {gallery.map((image) => (
          <ImageListItem key={image}>
            <img src={image} alt="" loading="lazy" />
            <ImageListItemBar
              sx={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, " +
                  "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
              }}
              position="top"
              actionIcon={
                <IconButton
                  sx={{ color: "white" }}
                  onClick={() => {
                    handleDeleteImage(image);
                  }}
                >
                  <IconTrash />
                </IconButton>
              }
              actionPosition="right"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Grid>
  );
}

import { Box, Paper } from "@mui/material";
import PostForm from "~/components/Posts/PostForm";
import PageHeading from "~/ui-components/PageHeading";

export default function NewPost() {
  return (
    <Paper elevation={0}>
      <PageHeading content="Tạo mới bài viết tin tức" />
      <Box height="24px" />
      <PostForm type="new" postType="NEWS" />
    </Paper>
  );
}

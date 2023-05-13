import { Box, Paper } from "@mui/material";
import PostForm from "~/components/Posts/PostForm";
import PageHeading from "~/ui-components/PageHeading";

export default function NewProjectPost() {
  return (
    <Paper elevation={0}>
      <PageHeading content="Tạo mới bài viết giới thiệu dự án" />
      <Box height="24px" />
      <PostForm type="new" postType="PROJECT" />
    </Paper>
  );
}

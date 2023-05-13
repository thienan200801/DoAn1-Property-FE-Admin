import { Box, Button, CircularProgress, Paper } from "@mui/material";
import { IconPlus } from "@tabler/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TablePosts from "~/components/Table/TablePosts";
import * as SagaActionTypes from "~/redux/constants/constantSaga";
import * as ActionTypes from "~/redux/constants/constant";
import PageHeading from "~/ui-components/PageHeading";

export default function Posts() {
  const { loading } = useSelector((state) => state.LoadingReducer);
  const { posts } = useSelector((state) => state.PostReducer);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ActionTypes.GET_POSTS, posts: [] });
    dispatch({ type: SagaActionTypes.GET_POSTS_SAGA, postType: "NEWS" });
  }, []);

  const navigateToNewPost = () => {
    navigate("/tin-tuc/tao-moi");
  };

  return (
    <Paper elevation={0}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          rowGap: "16px",
        }}
      >
        <PageHeading content="Danh sách bài viết tin tức" />

        <Button
          onClick={navigateToNewPost}
          variant="outlined"
          sx={{ ml: 2, py: "12px", borderRadius: 1 }}
        >
          <IconPlus />
        </Button>
      </Box>

      <Box sx={{ height: "16px" }} />
      {loading ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "4rem",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <TablePosts data={posts} postType="NEWS" />
      )}
    </Paper>
  );
}

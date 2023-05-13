import { Box, CircularProgress, Paper } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PostForm from "~/components/Posts/PostForm";
import * as ActionTypes from "~/redux/constants/constant";
import * as SagaActionTypes from "~/redux/constants/constantSaga";
import PageHeading from "~/ui-components/PageHeading";

export default function EditProjectPost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.LoadingReducer);
  const { modifyingPost } = useSelector((state) => state.PostReducer);
  const params = useParams();
  const { slug } = params;

  const navigateToNotFound = () => {
    navigate("/404");
  };

  useEffect(() => {
    dispatch({
      type: SagaActionTypes.GET_POST_BY_SLUG_SAGA,
      slug: slug,
      navigateToNotFound: navigateToNotFound,
    });

    return () => {
      dispatch({ type: ActionTypes.GET_MODIFYING_POST, modifyingPost: null });
    };
  }, []);

  return (
    <Paper elevation={0}>
      <PageHeading content="Chỉnh sửa bài viết giới thiệu dự án" />
      <Box height="24px" />
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
        <PostForm type="modify" postType="PROJECT" post={modifyingPost} />
      )}
    </Paper>
  );
}

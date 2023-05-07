import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import * as SagaActionTypes from "~/redux/constants/constantSaga";
import {
  convertImageUrlToImageName,
  replaceImageUrlByImageName,
} from "~/utils/image-processing";
import Editor from "../Editor";
import Thumbnail from "../Thumbnail";

const CustomErrorText = (errorText) => {
  return (
    <Typography sx={{ fontSize: 12, ml: "16px", mt: "4px", color: "red" }}>
      {errorText}
    </Typography>
  );
};

export default function PostForm({ type, postType, post }) {
  const dispatch = useDispatch();
  const optimizeValues = (values) => {
    const newPost = {
      ...values,
      gallery: [],
      postType: postType,
      postStatus: values.postStatus ? "PUBLISHED" : "HIDDEN",
      content: replaceImageUrlByImageName(values.content),
      thumbnail: convertImageUrlToImageName(values.thumbnail),
    };

    if (post) newPost.id = post.id;

    return newPost;
  };

  const handleNewPost = (values, resetForm) => {
    dispatch({
      type: SagaActionTypes.POST_POST_SAGA,
      post: optimizeValues(values),
      postType: postType,
      resetForm: resetForm,
    });
  };

  const handleModifyPost = (values) => {
    dispatch({
      type: SagaActionTypes.UPDATE_POST_SAGA,
      post: optimizeValues(values),
      postType: postType,
    });
  };

  return (
    <Formik
      initialValues={{
        name: post ? post.name : "",
        description: post ? post.description : "",
        content: post ? post.content : "",
        thumbnail: post ? post.thumbnail : "",
        postStatus: post
          ? post.postStatus === "HIDDEN"
            ? false
            : true
          : false,
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Vui lòng nhập tiêu đề"),
        description: Yup.string().required("Vui lòng nhập mô tả ngắn"),
        content: Yup.string().required("Vui lòng nhập nội dung"),
        thumbnail: Yup.string().required(
          "Vui lòng tải ảnh đại diện cho bài viết"
        ),
      })}
      onSubmit={async (values, { resetForm }) => {
        if (type === "new") handleNewPost(values, resetForm);
        else handleModifyPost(values);
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        setFieldValue,
        handleSubmit,
        touched,
        values,
      }) => (
        <div>
          <form noValidate onSubmit={handleSubmit}>
            <Grid container columnSpacing={2}>
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.name && errors.name)}
                  sx={{ mb: 2 }}
                >
                  <TextField
                    label="Tiêu đề"
                    value={values.name}
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.name && errors.name && (
                    <FormHelperText error>{errors.name}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.description && errors.description)}
                  sx={{ mb: 2 }}
                >
                  <TextField
                    label="Mô tả ngắn"
                    value={values.description}
                    name="description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.description && errors.description && (
                    <FormHelperText error>{errors.description}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ mb: 2 }}>
                <Editor
                  content={values.content}
                  handleChange={(value) => setFieldValue("content", value)}
                />
                {errors.content && CustomErrorText(errors.content)}
              </Grid>
            </Grid>
            <Thumbnail
              thumbnail={values.thumbnail}
              handleChangeThumbnail={(thumbnail) => {
                setFieldValue("thumbnail", thumbnail);
              }}
            />
            {errors.thumbnail && CustomErrorText(errors.thumbnail)}

            <Grid item xs={12} sx={{ my: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    value={values.postStatus}
                    checked={values.postStatus}
                    onChange={(e) => {
                      setFieldValue("postStatus", e.target.checked);
                    }}
                    sx={{
                      "& .MuiSwitch-track": {
                        opacity: 1,
                        backgroundColor: "#ccc",
                        borderRadius: 20 / 2,
                      },
                    }}
                  />
                }
                label="Hiển thị với mọi người"
                labelPlacement="start"
                sx={{ ml: 0 }}
              />
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ py: "12px", px: "24px" }}
              >
                {type === "new" ? "Tạo mới" : "Xác nhận"}
              </Button>
            </Box>
          </form>
        </div>
      )}
    </Formik>
  );
}

import {
  Autocomplete,
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
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import * as SagaActionTypes from "~/redux/constants/constantSaga";
import { convertImageUrlToImageName } from "~/utils/image-processing";
import Thumbnail from "../Thumbnail";
import ImageGallery from "./ImageGallery";

const CustomErrorText = (errorText) => {
  return (
    <Typography sx={{ fontSize: 12, ml: "16px", mt: "4px", color: "red" }}>
      {errorText}
    </Typography>
  );
};

export default function PropertyForm({ type, property, province, district }) {
  const dispatch = useDispatch();
  const { provinces, districts } = useSelector(
    (state) => state.AdministrativeReducer
  );

  const handleChangeProvince = (province) => {
    dispatch({
      type: SagaActionTypes.GET_DISTRICTS_SAGA,
      pCode: province.code,
    });
  };

  const optimizeValues = (values) => {
    const newProperty = {
      ...values,
      province: values.province.name,
      district: values.district.name,
      postStatus: values.postStatus ? "PUBLISHED" : "HIDDEN",
      thumbnail: convertImageUrlToImageName(values.thumbnail),
      gallery: values.gallery.map((imageUrl) =>
        convertImageUrlToImageName(imageUrl)
      ),
    };

    if (property) newProperty.id = property.id;

    return newProperty;
  };

  const handleNewProperty = (values, resetForm) => {
    dispatch({
      type: SagaActionTypes.POST_PROPERTY_SAGA,
      property: optimizeValues(values),
      resetForm: resetForm,
    });
  };

  const handleModifyProperty = (values) => {
    dispatch({
      type: SagaActionTypes.UPDATE_PROPERTY_SAGA,
      property: optimizeValues(values),
    });
  };

  return (
    <Formik
      initialValues={{
        name: property ? property.name : "",
        description: property ? property.description : "",
        estateCategory: property ? property.estateCategory : "",
        province: province ? province : null,
        district: district ? district : null,
        address: property ? property.address : "",
        area: property ? property.area : "",
        price: property ? property.price : "",
        iframe: property ? property.iframe : "",
        thumbnail: property ? property.thumbnail : "",
        gallery: property ? property.gallery : [],
        postStatus: property
          ? property.postStatus === "HIDDEN"
            ? false
            : true
          : false,
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Vui lòng nhập tiêu đề"),
        description: Yup.string().required("Vui lòng nhập mô tả"),
        estateCategory: Yup.string().required("Vui lòng nhập chuyên mục"),
        province: Yup.object()
          .required("Vui lòng chọn quận / huyện")
          .nullable(),
        district: Yup.object()
          .required("Vui lòng chọn quận / huyện")
          .nullable(),
        address: Yup.string().required("Vui lòng nhập địa chỉ cụ thể"),
        area: Yup.number()
          .required("Vui lòng nhập diện tích")
          .min(1, "Diện tích phải lớn hơn 0"),
        price: Yup.number()
          .required("Vui lòng nhập giá tiền")
          .min(1, "Giá tiền phải lớn hơn 0"),
        thumbnail: Yup.string().required(
          "Vui lòng tải ảnh đại diện cho tài sản"
        ),
      })}
      onSubmit={async (values, { resetForm, setFieldValue }) => {
        if (type === "new")
          handleNewProperty(values, () => {
            resetForm();
            setFieldValue("gallery", []);
          });
        else handleModifyProperty(values);
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container columnSpacing={2}>
            {/* name */}
            <Grid item xs={12} lg={8}>
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

            {/* estateCategory */}
            <Grid item xs={12} lg={4}>
              <FormControl
                fullWidth
                error={Boolean(touched.estateCategory && errors.estateCategory)}
                sx={{ mb: 2 }}
              >
                <TextField
                  label="Chuyên mục"
                  value={values.estateCategory}
                  name="estateCategory"
                  minRows={4}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.estateCategory && errors.estateCategory && (
                  <FormHelperText error>{errors.estateCategory}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            {/* province */}
            <Grid item xs={12} lg={4}>
              <FormControl
                fullWidth
                sx={{ mb: 2 }}
                error={Boolean(touched.province && errors.province)}
              >
                <Autocomplete
                  name="province"
                  options={provinces}
                  value={values.province}
                  disableClearable
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option, value) =>
                    option.code === value.code
                  }
                  onBlur={handleBlur}
                  onChange={(e, option) => {
                    handleChangeProvince(option);
                    setFieldValue("province", option);
                    setFieldValue("district", null);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tỉnh / Thành phố"
                      value={values.province}
                    />
                  )}
                />
                {touched.province && errors.province && (
                  <FormHelperText error>{errors.province}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            {/* district */}
            <Grid item xs={12} lg={4}>
              <FormControl
                fullWidth
                sx={{ mb: 2 }}
                error={Boolean(touched.district && errors.district)}
              >
                <Autocomplete
                  name="district"
                  options={districts.length > 0 ? districts : []}
                  value={values.district}
                  disableClearable
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onBlur={handleBlur}
                  onChange={(e, option) => {
                    setFieldValue("district", option);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Quận / Huyện"
                      value={values.district}
                    />
                  )}
                />
                {touched.district && errors.district && (
                  <FormHelperText error>{errors.district}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            {/* address */}
            <Grid item xs={12} lg={4}>
              <FormControl
                fullWidth
                error={Boolean(touched.address && errors.address)}
                sx={{ mb: 2 }}
              >
                <TextField
                  label="Địa chỉ cụ thể"
                  value={values.address}
                  name="address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.address && errors.address && (
                  <FormHelperText error>{errors.address}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            {/* area */}
            <Grid item xs={12} lg={4}>
              <FormControl
                fullWidth
                error={Boolean(touched.area && errors.area)}
                sx={{ mb: 2 }}
              >
                <TextField
                  type="number"
                  label="Diện tích (Mét vuông)"
                  value={values.area}
                  name="area"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.area && errors.area && (
                  <FormHelperText error>{errors.area}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            {/* price */}
            <Grid item xs={12} lg={4}>
              <FormControl
                fullWidth
                error={Boolean(touched.price && errors.price)}
                sx={{ mb: 2 }}
              >
                <TextField
                  label="Giá tiền (VNĐ)"
                  type="number"
                  inputProps={{ step: 1000 }}
                  value={values.price}
                  name="price"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.price && errors.price && (
                  <FormHelperText error>{errors.price}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            {/* iframe */}
            <Grid item xs={12} lg={4}>
              <FormControl
                fullWidth
                error={Boolean(touched.iframe && errors.iframe)}
                sx={{ mb: 2 }}
              >
                <TextField
                  label="Bản đồ (Nếu không có vui lòng để trống)"
                  value={values.iframe}
                  name="iframe"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.iframe && errors.iframe && (
                  <FormHelperText error>{errors.iframe}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            {/* description */}
            <Grid item xs={12}>
              <FormControl
                fullWidth
                error={Boolean(touched.description && errors.description)}
                sx={{ mb: 2 }}
              >
                <TextField
                  label="Mô tả"
                  value={values.description}
                  name="description"
                  multiline
                  minRows={4}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.description && errors.description && (
                  <FormHelperText error>{errors.description}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            {/* postStatus */}
            <Grid item xs={12}>
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

            <Thumbnail
              thumbnail={values.thumbnail}
              handleChangeThumbnail={(thumbnail) => {
                setFieldValue("thumbnail", thumbnail);
              }}
            />
            {errors.thumbnail && CustomErrorText(errors.thumbnail)}

            <ImageGallery
              gallery={values.gallery}
              handleChangeGallery={(gallery) => {
                setFieldValue("gallery", gallery);
              }}
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
      )}
    </Formik>
  );
}

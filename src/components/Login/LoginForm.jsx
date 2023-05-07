import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { IconEye, IconEyeOff } from "@tabler/icons";
import { Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import * as SagaActionTypes from "~/redux/constants/constantSaga";

const LoginForm = () => {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (values) => {
    dispatch({
      type: SagaActionTypes.POST_USER_LOGIN_SAGA,
      userLogin: values,
    });
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .max(255)
          .required("Vui lòng nhập email")
          .email("Email không hợp lệ"),
        password: Yup.string().max(255).required("Vui lòng nhập mật khẩu"),
      })}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          <FormControl fullWidth error={Boolean(touched.email && errors.email)}>
            <InputLabel htmlFor="email-input">Email</InputLabel>
            <OutlinedInput
              id="email-input"
              type="email"
              value={values.email}
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Email"
            />
            {touched.email && errors.email && (
              <FormHelperText error>{errors.email}</FormHelperText>
            )}
          </FormControl>

          <FormControl
            fullWidth
            error={Boolean(touched.password && errors.password)}
            sx={{ mt: 2 }}
          >
            <InputLabel htmlFor="password-input">Mật khẩu</InputLabel>
            <OutlinedInput
              id="password-input"
              type={showPassword ? "text" : "password"}
              value={values.password}
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="large"
                  >
                    {showPassword ? <IconEye /> : <IconEyeOff />}
                  </IconButton>
                </InputAdornment>
              }
              label="Mật khẩu"
            />
            {touched.password && errors.password && (
              <FormHelperText error>{errors.password}</FormHelperText>
            )}
          </FormControl>

          <Box sx={{ mt: 4 }}>
            <Button
              disableElevation
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
            >
              Đăng nhập
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;

import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import image from "~/assets/images/login.jpg";
import LoginForm from "~/components/Login/LoginForm";

const Login = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const { userLogin } = useSelector((state) => state.UserReducer);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (userLogin) {
        navigate("/", { replace: true });
      } else {
        Cookies.remove("token");
      }
    }, 1000);
  }, [userLogin, navigate]);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: { xs: 800, lg: 800 },
          margin: { xs: 2.5, md: 3 },
        }}
      >
        <Box sx={{ p: { xs: 3, xl: 5 } }}>
          <Grid container spacing={matchDownSM ? 0 : 4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Grid container>
                <Grid item xs={12}>
                  <Grid
                    container
                    direction={matchDownSM ? "column-reverse" : "row"}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item>
                      <Typography
                        color={theme.palette.primary.main}
                        sx={{ fontWeight: 700 }}
                        gutterBottom
                        variant={matchDownSM ? "h5" : "h4"}
                      >
                        Đăng Nhập
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <LoginForm />
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              xs={0}
              md={6}
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <img src={image} alt="" style={{ width: 360 }} />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;

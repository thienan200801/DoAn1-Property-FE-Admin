import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import contactsImg from "~/assets/images/contacts.svg";
import newsImg from "~/assets/images/news.svg";
import projectImg from "~/assets/images/project.svg";
import sellImg from "~/assets/images/sell.svg";

export default function Home() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "calc(100vh - 168px)" }}
    >
      <Paper
        elevation={0}
        sx={{
          width: { xs: 500, lg: 600 },
          p: { xs: 2, sm: 3, xl: 2 },
        }}
      >
        <Grid container alignItems="center">
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link to="/danh-sach-tai-san-ban">
              <Button
                sx={{
                  width: "200px",
                  padding: "40px",
                  border: "2px solid #003366",
                  borderRadius: "16px",
                  userSelect: "none",
                }}
              >
                <img
                  src={sellImg}
                  alt=""
                  style={{ width: "100%" }}
                  draggable={false}
                />
              </Button>
            </Link>
            <Typography variant="button" sx={{ mt: "8px", fontWeight: "bold" }}>
              Danh sách tài sản
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              mt: { xs: "24px", sm: "0px" },
            }}
          >
            <Link to="/gioi-thieu-du-an">
              <Button
                sx={{
                  width: "200px",
                  padding: "40px",
                  border: "2px solid #003366",
                  borderRadius: "16px",
                  userSelect: "none",
                }}
              >
                <img
                  src={projectImg}
                  alt=""
                  style={{ width: "100%" }}
                  draggable={false}
                />
              </Button>
            </Link>
            <Typography variant="button" sx={{ mt: "8px", fontWeight: "bold" }}>
              Giới thiệu dự án
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              mt: "24px",
            }}
          >
            <Link to="/tin-tuc">
              <Button
                sx={{
                  width: "200px",
                  padding: "40px",
                  border: "2px solid #003366",
                  borderRadius: "16px",
                  userSelect: "none",
                }}
              >
                <img
                  src={newsImg}
                  alt=""
                  style={{ width: "100%" }}
                  draggable={false}
                />
              </Button>
            </Link>
            <Typography variant="button" sx={{ mt: "8px", fontWeight: "bold" }}>
              Tin tức
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              mt: "24px",
            }}
          >
            <Link to="/danh-sach-lien-he">
              <Button
                sx={{
                  width: "200px",
                  padding: "40px",
                  border: "2px solid #003366",
                  borderRadius: "16px",
                  userSelect: "none",
                }}
              >
                <img
                  src={contactsImg}
                  alt=""
                  style={{
                    width: "100%",
                  }}
                  draggable={false}
                />
              </Button>
            </Link>
            <Typography variant="button" sx={{ mt: "8px", fontWeight: "bold" }}>
              Danh sách khách hàng
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

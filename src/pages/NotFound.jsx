import { Box, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import img404 from "~/assets/images/404.svg";

export default function NotFound() {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

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
          width: { xs: 300, lg: 400 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={img404} alt="404" draggable={false} />
        <Typography sx={{ textAlign: "center" }}>
          Không tìm thấy tài sản hoặc bài viết phù hợp
        </Typography>
        
        <Button onClick={navigateToHome} variant="outlined" sx={{ mt: 2 }}>
          Trở về trang chủ
        </Button>
      </Paper>
    </Box>
  );
}

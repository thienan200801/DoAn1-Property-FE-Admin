import { Box, Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const MainLayout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CssBaseline />
      <Header />
      <Container
        sx={{ mt: "64px", py: "24px", minHeight: "calc(100vh - 120px)" }}
      >
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
};

export default MainLayout;

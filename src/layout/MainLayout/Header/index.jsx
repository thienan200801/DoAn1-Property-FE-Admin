import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { IconMenu2 } from "@tabler/icons";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logoTransparent from "~/assets/images/logo-transparent.png";
import logo from "~/assets/images/logo.jpg";
import ActionMenu from "./ActionMenu";

const menu = [
  {
    name: "TRANG CHỦ",
    link: "/",
    id: "714c0101-a601-40b0-8e0d-4fdc063f8425",
  },
  {
    name: "DANH SÁCH TÀI SẢN BÁN",
    link: "/danh-sach-tai-san-ban",
    id: "6c2f462a-aeec-4bbe-a6d5-a7269969be0f",
  },
  {
    name: "GIỚI THIỆU DỰ ÁN",
    link: "/gioi-thieu-du-an",
    id: "61240dc5-a042-4123-8323-5e470b0e84be",
  },
  {
    name: "TIN TỨC",
    link: "/tin-tuc",
    id: "df63b38e-91b7-4c8c-839d-02c95858427b",
  },
  {
    name: "DANH SÁCH LIÊN HỆ",
    link: "/danh-sach-lien-he",
    id: "c8838c75-984c-4196-9bc0-fa0c665e3510",
  },
];

const drawerWidth = 260;

const Header = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigateMenu = (to) => {
    navigate(to);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <img src={logo} alt="logo" style={{ width: "100px" }} draggable={false} />
      <Divider />
      <List>
        {menu.map((menuItem) => (
          <ListItem key={menuItem.id} disablePadding>
            <ListItemButton
              sx={{
                textAlign: "left",
                backgroundColor:
                  location.pathname === menuItem.link ? "#eee" : "#fff",
              }}
              onClick={() => navigateMenu(menuItem.link)}
            >
              <ListItemText primary={menuItem.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { xs: "block", lg: "none" } }}
          >
            <IconMenu2 />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: { xs: "none", lg: "flex" } }}>
            <img
              src={logoTransparent}
              alt="logo"
              style={{ height: "50px" }}
              draggable={false}
            />
          </Box>
          <Box sx={{ display: { xs: "none", lg: "block" }, flexGrow: 1 }}>
            {menu.map((menuItem) => (
              <Button
                key={menuItem.id}
                sx={{
                  color: "#fff",
                  mr: "10px",

                  border:
                    location.pathname === menuItem.link
                      ? "1px solid #ccc"
                      : "none",
                }}
                onClick={() => navigateMenu(menuItem.link)}
              >
                {menuItem.name}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: { xs: "block", lg: "none" }, flexGrow: 1 }}></Box>
          <ActionMenu />
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Header;

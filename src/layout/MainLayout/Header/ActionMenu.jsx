import {
  Box,
  Button,
  ClickAwayListener,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { IconLogout } from "@tabler/icons";
import Cookies from "js-cookie";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as ActionTypes from "~/redux/constants/constant";

const ActionMenu = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const anchorRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl) || false;
  const id = open ? "navbar-popper" : undefined;

  const handleLogout = async () => {
    Cookies.remove("token");
    dispatch({ type: ActionTypes.GET_USER, userLogin: null });
    navigate("/login", { replace: true });
  };

  const handleToggle = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        sx={{
          padding: "8px",
          borderRadius: "4px",
          borderColor: theme.palette.common.white,
          color: theme.palette.common.white,
          border: "1px solid #fff",
        }}
        disableElevation
        ref={anchorRef}
        onClick={handleToggle}
        aria-describedby={id}
        type="button"
      >
        <Box sx={{ px: "8px" }}>ID: admin</Box>
      </Button>

      <Popper
        placement="bottom-end"
        id={id}
        open={open}
        anchorEl={anchorEl}
        disablePortal
        sx={{ pt: "4px" }}
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <Paper>
              <Box sx={{ px: 1 }}>
                <List
                  component="nav"
                  sx={{
                    width: "100%",
                    maxWidth: 350,
                    minWidth: 160,
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: "10px",
                    [theme.breakpoints.down("md")]: {
                      minWidth: "100%",
                    },
                  }}
                >
                  <ListItemButton
                    sx={{ borderRadius: "4px" }}
                    onClick={handleLogout}
                  >
                    <ListItemIcon>
                      <IconLogout stroke={1.5} size="1.3rem" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body2">Đăng xuất</Typography>
                      }
                    />
                  </ListItemButton>
                </List>
              </Box>
            </Paper>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </div>
  );
};

export default ActionMenu;

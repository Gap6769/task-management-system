import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Switch,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";

import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/providers/NotificationProvider";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";

const Navigation = ({ onThemeChange }) => {
  const navigate = useNavigate();
  const { token, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const { showMessage } = useNotification();

  const [anchorEl, setAnchorEl] = useState(null);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  useEffect(() => {
    onThemeChange(darkMode);
  }, [darkMode, onThemeChange]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const triggerError = () => {
    showMessage("some weird error", "error");
  };

  return (
    <AppBar position="sticky" sx={{ padding: 2, mb: 3 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {!isSmallScreen && (
            <Typography variant="h6" sx={{ mr: 2 }}>
              Taskify
            </Typography>
          )}
          {token && !isSmallScreen && (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/dashboard">
                Chart
              </Button>
            </Box>
          )}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {isSmallScreen && (
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
          )}
          <LightModeIcon />
          <Switch checked={darkMode} onChange={handleThemeChange} />
          <DarkModeIcon />
          {token && (
            <IconButton color="inherit" onClick={handleLogout}>
              <ExitToAppIcon />
            </IconButton>
          )}
        </Box>
        {isSmallScreen && (
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem component={Link} to="/" onClick={handleMenuClose}>
              Home
            </MenuItem>
            <MenuItem component={Link} to="/dashboard" onClick={handleMenuClose}>
              Chart
            </MenuItem>
          </Menu>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;

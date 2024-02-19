import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { clearLocalStorage } from "../../services/jwtService";

const Navbar = ({ setAccessToken, username, role }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleLogout = () => {
    clearLocalStorage();

    setAccessToken(null);
    alert("Logged out successfully!");
    // Navigate to the home page
    navigate("/");
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTender = () => {
    navigate("/tender");
  };

  const handleDelayResponse = () => {
    navigate("/delayResponse");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "green" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          BlomsterBorsen
        </Typography>

        <>
          <Typography variant="h6" sx={{ padding: "10px" }}>
           {/* <Button color="inherit" onClick={handleTender}>
              Tender
            </Button> */}
            <Button color="inherit" onClick={handleDelayResponse}>
              Delay Response
            </Button>
          </Typography>
          <IconButton
            size="large"
            color="inherit"
            onClick={handleMenuClick}
            sx={{ marginRight: 2 }}
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>{username}</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

import Paper from "@mui/material/Paper";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { Button, Avatar, Menu, MenuItem, Snackbar, Alert } from "@mui/material";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [anchorEl, setAnchorEl] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

 const handleLogout = () => {
  localStorage.removeItem("user");
  setOpenSnackbar(true); // show logout message
  handleCloseMenu();

  // Delay navigation so Snackbar can show
  setTimeout(() => {
    navigate("/");
  }, 500); // 500ms delay
};


  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <>
      <Paper
        elevation={3}
        style={{
          background: "rgba(255, 255, 255, 0.7)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 30px",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#3a436eff" }}>
          Blogs
        </Typography>

        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <Link to="/" style={{ textDecoration: "none", color: "#3a436eff" }}>
            Home
          </Link>

          {!user && (
            <>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "#3a436eff" }}
              >
                Login
              </Link>
              <Link
                to="/signup"
                style={{ textDecoration: "none", color: "#3a436eff" }}
              >
                Signup
              </Link>
            </>
          )}

          {user && (
            <>
              <Avatar
                onClick={handleClick}
                sx={{
                  bgcolor: "#43c2bbff",
                  cursor: "pointer",
                  width: 35,
                  height: 35,
                  fontWeight: "bold",
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </Avatar>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {user.name}
                  </Typography>
                </MenuItem>
                <MenuItem>{user.email}</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </div>
      </Paper>

      {/* Snackbar Notification */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="info"
          sx={{ width: "100%" }}
        >
          You have been logged out!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Navbar;

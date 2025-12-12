import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert
} from "@mui/material";
import { IoMdPerson, IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import axios from "../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Show alert if redirected from homepage
  useEffect(() => {
    if (location.state?.showAlert) {
      setOpenSnackbar(true);
    }
  }, [location.state]);

  const handleLogin = async () => {
    if (!name || !password) {
      alert("All fields required!");
      return;
    }

    try {
      const res = await axios.get(`/users?name=${name}&password=${password}`);
      if (res.data.length > 0) {
        localStorage.setItem("user", JSON.stringify(res.data[0]));
        navigate("/blog");
      } else {
        alert("Invalid credentials!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <div>
      <Paper
        elevation={5}
        style={{
          padding: "20px",
          maxWidth: "400px",
          margin: "50px auto",
          textAlign: "center",
          backgroundColor: "#f5f5f5",
          outline: "2px solid",
          outlineColor: "#43c2bbff",
        }}
      >
        <Typography
          variant="h5"
          style={{ font: "status-bar", fontSize: "25px", color: "#3a436eff" }}
        >
          Login <FaLock />
        </Typography>

        <div
          style={{
            marginTop: "20px",
            gap: "20px",
            display: "flex",
            flexDirection: "column",
            width: "250px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <TextField
            name="name"
            label="Enter Name"
            onChange={(e) => setName(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IoMdPerson />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            name="password"
            label="Enter Password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>

        <Button
          variant="contained"
          style={{
            marginTop: "30px",
            backgroundColor: "#43c2bbff",
            fontWeight: "bold",
          }}
          onClick={handleLogin}
        >
          Submit
        </Button>

        <Typography
          style={{
            color: "#454856ff",
            fontWeight: "bold",
            marginTop: "15px",
          }}
        >
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </Typography>
      </Paper>

      {/* Snackbar alert */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="warning" sx={{ width: "100%" }}>
          Login to see the blog!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;

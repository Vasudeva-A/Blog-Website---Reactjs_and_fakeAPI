import React, { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { IoMdPerson } from "react-icons/io";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { TfiEmail } from "react-icons/tfi";
import { FaLock } from "react-icons/fa";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [repass, setRepass] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!name || !email || !pass || !repass) {
      alert("All fields required!");
      return;
    }
    if (pass !== repass) {
      alert("Passwords do not match!");
      return;
    }

    await axios.post("/users", {
      name,
      email,
      password: pass,
    });

    alert("Signup Successful!");
    navigate("/login");
  };

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
          Signup <FaLock />
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
            name="email"
            label="Enter Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <TfiEmail />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            name="password"
            label="Enter Password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPass(e.target.value)}
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

          <TextField
            name="confirm"
            label="Re-Enter Password"
            type={showPassword1 ? "text" : "password"}
            onChange={(e) => setRepass(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword1(!showPassword1)}>
                    {showPassword1 ? <IoMdEyeOff /> : <IoMdEye />}
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
          onClick={handleSignup}
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
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Paper>
    </div>
  );
};

export default Signup;

import React, { useState } from "react";
import { TextField, Button, Grid, Box } from "@mui/material";
import { API_URL } from "../../../services/apiConfig";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setAccessToken, setRole, setUsername }) => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error("Failed to log in");
      }

      const { access_token, refresh_token, role, username } =
        await response.json();

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("role", role);
      localStorage.setItem("username", username);

      alert("Logged in successfully");

      setAccessToken(access_token);
      setRole(role);
      setUsername(username);

      navigate("/");
    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Username"
            name="username"
            value={loginData.username}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
      </Grid>

      <Box mt={2} sx={{ textAlign: "center" }}>
        <Button type="submit" variant="contained" color="success">
          Login
        </Button>
      </Box>
    </form>
  );
};

export default LoginPage;

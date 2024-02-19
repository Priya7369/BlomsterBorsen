import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
} from "@mui/material";
import { API_URL } from "../../../services/apiConfig";
import "./css/SignUpPage.css";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    role: "",
    subscription_type: "",
    owner_name: "",
    contact_number: "",
    address: "",
    forest_name: "",
    location: "",
    soil_type: "",
    botanical_name: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let apiEndpoint = "";
      let requestBody = {};

      if (formData.role === "Forest Owner") {
        apiEndpoint = "/api/forest_owner";
        requestBody = {
          username: formData.username,
          password: formData.password,
          email: formData.email,
          role: formData.role,
          subscription_type: formData.subscription_type,
          owner_name: formData.owner_name,
          contact_number: formData.contact_number,
          address: formData.address,
          forest_name: formData.forest_name,
          location: formData.location,
          soil_type: formData.soil_type,
        };
      } else if (formData.role === "Botanical Owner") {
        apiEndpoint = "/api/botanical_owner";
        requestBody = {
          username: formData.username,
          password: formData.password,
          email: formData.email,
          role: formData.role,
          subscription_type: formData.subscription_type,
          owner_name: formData.owner_name,
          contact_number: formData.contact_number,
          address: formData.address,
          botanical_name: formData.botanical_name,
          location: formData.location,
        };
      }

      // Make a POST request to the determined API endpoint
      const response = await fetch(`${API_URL}${apiEndpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      // Handle the success response as needed
      alert("Form submitted successfully");

      navigate("/");
    } catch (error) {
      alert("Error submitting form:", error.message);
      // Handle the error as needed
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <MenuItem value="Forest Owner">Forest Owner</MenuItem>
              <MenuItem value="Botanical Owner">Botanical Owner</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <InputLabel>Subscription Type</InputLabel>
            <Select
              name="subscription_type"
              value={formData.subscription_type}
              onChange={handleChange}
              required
            >
              <MenuItem value="Free">Free</MenuItem>
              <MenuItem value="Premium">Premium</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Role-specific fields */}
        {formData.role === "Forest Owner" && (
          <>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Owner Name"
                name="owner_name"
                value={formData.owner_name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Contact Number"
                name="contact_number"
                value={formData.contact_number}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Forest Name"
                name="forest_name"
                value={formData.forest_name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Soil Type"
                name="soil_type"
                value={formData.soil_type}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
          </>
        )}

        {formData.role === "Botanical Owner" && (
          <>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Owner Name"
                name="owner_name"
                value={formData.owner_name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Contact Number"
                name="contact_number"
                value={formData.contact_number}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Botanical Name"
                name="botanical_name"
                value={formData.botanical_name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
          </>
        )}
      </Grid>

      <Box mt={2} sx={{ textAlign: "center" }}>
        <Button type="submit" variant="contained" color="success">
          Sign Up
        </Button>
      </Box>
    </form>
  );
};

export default SignUpPage;

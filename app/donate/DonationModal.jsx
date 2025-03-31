"use client";
import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import {
  Close,
  Email,
  Person,
  Phone,
  Cake,
  AssignmentInd,
} from "@mui/icons-material";

const DonationModal = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    age: "",
    pancard: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          bgcolor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 500,
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            position: "relative",
          }}
        >
          <IconButton
            sx={{ position: "absolute", top: 10, right: 10, color: "maroon" }}
            onClick={handleClose}
          >
            <Close />
          </IconButton>
          <Typography variant="h5" gutterBottom color="maroon" textAlign="center">
            Donation Form
          </Typography>

          <TextField
            fullWidth
            margin="normal"
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            InputProps={{
              startAdornment: <Person sx={{ color: "maroon", mr: 1 }} />,
            }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            InputProps={{
              startAdornment: <Email sx={{ color: "maroon", mr: 1 }} />,
            }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Mobile"
            name="mobile"
            type="tel"
            value={formData.mobile}
            onChange={handleChange}
            InputProps={{
              startAdornment: <Phone sx={{ color: "maroon", mr: 1 }} />,
            }}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel sx={{ color: "maroon" }}>Gender</InputLabel>
            <Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            margin="normal"
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            InputProps={{
              startAdornment: <Cake sx={{ color: "maroon", mr: 1 }} />,
            }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="PAN Card"
            name="pancard"
            value={formData.pancard}
            onChange={handleChange}
            InputProps={{
              startAdornment: <AssignmentInd sx={{ color: "maroon", mr: 1 }} />,
            }}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2, bgcolor: "maroon", color: "white", "&:hover": { bgcolor: "darkred" } }}
            onClick={() => console.log(formData)}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DonationModal;

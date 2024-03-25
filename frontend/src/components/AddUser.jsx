import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { TextField, Button, Box, Typography } from "@mui/material";
import { getUsers, addUser } from "../api/user.js";

export const loader = () => getUsers();

const AddUser = () => {
  const theme = useTheme();
  const users = useLoaderData();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if users is iterable
    if (!Array.isArray(users)) {
      setError("Error: User data not loaded");
      return false;
    }

    // Check if email is already in use
    for (const user of users) {
      if (user.email === email) {
        setError("Email is already in use");
        return false;
      }
    }

    addUser({ name, email })
      .then((data) => {
        window.location.reload();
        setName("");
        setEmail("");
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to add user");
      });
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: { xs: "100%", sm: "75%", md: "50%", lg: "35%", xl: "15%" },
        margin: "auto",
        backgroundColor: "rgba(255, 255, 255, 0.75)",
        borderRadius: "10px",
        padding: "7px",
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Email"
        variant="outlined"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Add User
      </Button>
    </Box>
  );
};

export { AddUser };

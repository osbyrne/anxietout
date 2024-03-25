import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { updateUser, getUsers } from "../api/user";
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  Grid,
} from "@mui/material";

const UserUpdate = () => {
  const { userId } = useParams();
  const [existingUser, setExistingUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getUsers();
        console.log("Fetched users:", usersData);

        // Ensure userId is a valid number
        const userIdNumber = Number(userId);

        if (isNaN(userIdNumber) || userId === undefined) {
          console.error("Invalid userId:", userId);
          return; // Exit early if userId is not a valid number or undefined
        }

        console.log("UserId:", userIdNumber);

        // Find the existing user based on userId
        const foundUser = usersData.find((user) => user.id === userIdNumber);

        console.log("Existing user:", foundUser);

        if (foundUser) {
          setExistingUser(foundUser);
          setName(foundUser.name);
          setEmail(foundUser.email);
        } else {
          console.error("User not found for update");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [userId]);

  const handleUpdate = async () => {
    try {
      // Ensure existingUser is defined before updating
      if (existingUser) {
        const updatedUser = { ...existingUser, name, email };
        await updateUser(updatedUser);
        console.log("User updated successfully:", updatedUser);
        window.location.href = "/users";
      } else {
        console.error("Cannot update user. User data is missing.");
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/background.webp')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Container
        component={Paper}
        elevation={3}
        style={{ padding: "20px", opacity: 0.75, paddingTop: "20px" }}
      >
        <Typography variant="h4" gutterBottom>
          Update User
        </Typography>
        {existingUser && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdate}
              >
                Update User
              </Button>
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
};

export { UserUpdate };

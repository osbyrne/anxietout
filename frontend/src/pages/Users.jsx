import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { AddUser } from "../components/AddUser.jsx";
import { deleteUser, getUsers } from "../api/user.js";

export const loader = () => getUsers();

const Users = () => {
  const users = useLoaderData();
  const [hoveredUserId, setHoveredUserId] = useState(null);

  const styles = `
  .card {
    transition : all 0.3s ease;
    margin: 7px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
    opacity:0.75;
  }
  .card:hover{
    background-color: rgba(128, 128, 128, 0.5);
    transform:scale(1.1);
  }
  .card-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 4px;
  }
  .button-container{
    position : absolute;
    bottom: 10px;
    left: 50%;
    transform : translateX(-50%);
    display: flex;
    gap: 8px;
  }
  `;

  const deleteUserLocal = async (userId) => {
    await deleteUser(userId);
    window.location.reload();
  };

  return (
    <>
      <div
        style={{
          backgroundImage: "url('/background.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          minHeight: "100vh",
          backgroundAttachment: "fixed",
        }}
      >
        <style>{styles}</style>

        <div className="card-container">
          {users.map((user) => (
            <Card
              key={user.id}
              className="card"
              sx={{ padding: 2, width: 200, height: 140, margin: "0 auto" }}
              onMouseEnter={() => setHoveredUserId(user.id)}
              onMouseLeave={() => setHoveredUserId(null)}
            >
              <CardContent>
                <Typography>Name: {user.name}</Typography>
                <Typography>Email: {user.email}</Typography>
                {hoveredUserId === user.id && (
                  <div className="button-container">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() =>
                        (window.location.href = "/update/users/" + user.id)
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      onClick={() => deleteUserLocal(user.id)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        <AddUser />
      </div>
    </>
  );
};

export { Users };

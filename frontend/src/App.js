import * as React from "react";
import {
  Typography,
  AppBar,
  Toolbar,
  Button,
  CircularProgress,
} from "@mui/material";
import { Link as RouterLink, useNavigation } from "react-router-dom";

import "./App.css";
import { Outlet } from "react-router-dom";

export function Loading() {
  return (
    <div>
      <div>
        <CircularProgress />
      </div>
      <div>Loading...</div>
    </div>
  );
}

const Path = ({ to }) => {
  return (
    <Typography variant="h6" color="inherit" component="div">
      <Button color="inherit" component={RouterLink} to={to}>
        {to === "/" ? "Home" : to.slice(1).toUpperCase()}
      </Button>
    </Typography>
  );
};

const App = () => {
  const navigation = useNavigation();

  return (
    <>
      <div style={{ backgroundColor: "#808080", minHeight: "100vh" }}>
        <AppBar
          position="sticky"
          style={{
            backgroundColor: "rgb(31, 31, 31)",
            justifyContent: "center",
          }}
        >
          <Toolbar
            variant="dense"
            style={{
              justifyContent: "center",
            }}
          >
            <Path to="/" />
            <Path to="/users" />
            <Path to="/items" />
            <Path to="/maps" />
          </Toolbar>
        </AppBar>
        <div>{navigation.state === "loading" ? <Loading /> : <Outlet />}</div>
      </div>
    </>
  );
};

export { App };

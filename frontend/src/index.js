import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserUpdate } from "./pages/UserUpdate.jsx";
import { ItemUpdate } from "./pages/ItemUpdate.jsx";
import { App } from "./App";
import { Users, loader as usersLoader } from "./pages/Users";
import { About } from "./pages/About";
import { Items } from "./pages/Items";
import { Home } from "./pages/Home";
import { ItemDetails } from "./pages/ItemDetails";
import { Maps } from "./pages/Maps.jsx";
import { MapUpdate } from "./pages/MapUpdate.jsx";
import { UserDetail } from "./pages/UserDetail.jsx";
import { MapDetails } from "./pages/MapDetails.jsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <div>Error loading the home page!</div>,
      },
      {
        path: "/about",
        element: <About />,
        errorElement: <div>Error loading the about Page!</div>,
      },

      //╔═════════════════════════════════════╗
      //║              users                  ║
      //╚═════════════════════════════════════╝

      {
        path: "/users",
        element: <Users />,
        loader: usersLoader,
        errorElement: <div>Error loading the users!</div>,
      },
      {
        path: "/users/:userId",
        element: <UserDetail />,
        errorElement: <h1>Error loading user update page</h1>,
      },
      {
        path: "/update/users/:userId",
        element: <UserUpdate />,
        errorElement: <h1>Error loading user update page</h1>,
      },

      //╔═════════════════════════════════════╗
      //║              items                  ║
      //╚═════════════════════════════════════╝

      {
        path: "/items",
        element: <Items />,
        errorElement: <h1>Error loading the Items Page!</h1>,
      },
      {
        path: "items/:id",
        element: <ItemDetails />,
        errorElement: <h1>Error loading item details page</h1>,
      },
      {
        path: "/update/item/:itemId",
        element: <ItemUpdate />,
        errorElement: <h1>Error loading item update page</h1>,
      },

      //╔═════════════════════════════════════╗
      //║              maps                   ║
      //╚═════════════════════════════════════╝

      {
        path: "/maps",
        element: <Maps />,
        errorElement: <h1>Error loading the map page</h1>,
      },
      {
        path: "/maps/:mapId",
        element: <MapDetails />,
        errorElement: <h1>Error loading the map page</h1>,
      },
      {
        path: "/update/maps/:mapId",
        element: <MapUpdate />,
        errorElement: <h1>Error loading the map update page</h1>,
      },
      {
        path: "*",
        element: <h1>404 Not Found</h1>,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

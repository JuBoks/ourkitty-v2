import React from "react";
import { createBrowserRouter } from "react-router-dom";
import UserMainLayout from "../layouts/UserMainLayout";
import Landing from "../pages/Landing";
import Test from "../pages/Test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserMainLayout />,
    children: [{ index: true, path: "", element: <Landing /> }],
  },
]);

export default router;

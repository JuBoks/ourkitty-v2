import React from "react";
import { createBrowserRouter } from "react-router-dom";
import UserMainLayout from "../layouts/UserMainLayout";
import NotFound from "../components/common/NotFound";
import UserMain from "../pages/User/UserMain";
const router = createBrowserRouter([
  {
    path: "/",
    element: <UserMainLayout />,
    errorElement: <NotFound />,
    children: [{ index: true, path: "", element: <UserMain /> }],
  },
]);

export default router;

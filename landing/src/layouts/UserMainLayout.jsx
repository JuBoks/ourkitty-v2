import React from "react";
import { Outlet } from "react-router-dom";

function UserMainLayout() {
  return (
    <div className="w-[1920px] h-screen">
      <Outlet />
    </div>
  );
}

export default UserMainLayout;

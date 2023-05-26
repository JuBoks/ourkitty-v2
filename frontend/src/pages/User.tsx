import React from "react";
import ActivateUser from "../components/user/ActivateUser";
import DeactivateUser from "../components/user/DeactivateUser";
import DeletedUser from "../components/user/DeletedUser";

export default function User() {
  return (
    <div className="w-full h-full flex flex-row gap-[15px] p-3">
      <div className="w-full h-full flex flex-col gap-2">
        <div className="w-full h-[50%] bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
          <ActivateUser />
        </div>
        <div className="w-full h-[50%] flex flex-row gap-5">
          <div className="w-[50%] h-full bg-white pt-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
            <DeactivateUser />
          </div>
          <div className="w-[50%] h-full bg-white pt-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
            <DeletedUser />
          </div>
        </div>
      </div>
    </div>
  );
}

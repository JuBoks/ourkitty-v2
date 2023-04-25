import React from "react";
import MyUser from "../components/User/MyUser";
import DisabledUser from "../components/User/DisabledUser";
import ProfileHistory from "../components/User/ProfileHistory";

export default function User() {
  return (
    <div className="flex flex-col gap-3 mx-5 w-full h-full overflow-x-auto overflow-y-hidden px-1">
      <MyUser />
      <div className="flex flex-row my-2 gap-3 h-full w-[950px] rounded-xl">
        <div className="h-full">
          <DisabledUser />
        </div>
        <div className="h-full">
          <ProfileHistory />
        </div>
      </div>
    </div>
  );
}

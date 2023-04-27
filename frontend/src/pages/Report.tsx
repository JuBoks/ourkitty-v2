import React from "react";
import Equipment from "../components/Report/Equipment";
import Threat from "../components/Report/Threat";

export default function Report() {
  return (
    <div className="flex flex-row gap-5 mx-5 w-full h-full overflow-x-auto overflow-y-hidden px-1">
      <Equipment />
      <Threat />
    </div>
  );
}

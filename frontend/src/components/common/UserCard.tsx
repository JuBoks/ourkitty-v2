import React from "react";
import "../../css/UserCard.css";

export default function UserCard({ children }: any) {
  return (
    <div className="user-card dark:bg-neutral-500 relative">{children}</div>
  );
}

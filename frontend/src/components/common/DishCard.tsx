import React from "react";
import "../../css/DishCard.css";

export default function DishCard({ children }: any) {
  return (
    <div className="user-card dark:bg-neutral-500 relative">{children}</div>
  );
}

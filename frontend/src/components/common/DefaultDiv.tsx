import React from "react";
import "../../css/DefaultDiv.css";

export default function DefaultDiv({ children }: any) {
  return <div className="card h-full">{children}</div>;
}

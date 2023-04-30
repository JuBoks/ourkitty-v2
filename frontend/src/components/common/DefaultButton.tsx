import React from "react";

export default function DefaultButton({ content }: any) {
  return (
    <button className="bg-LightMainHover p-2 text-white rounded-xl hover:bg-LightMain dark:bg-DarkMain">
      {content}
    </button>
  );
}

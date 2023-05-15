import React from "react";
import "../../css/Modal2.css";

export default function Modal(props: any) {
  const { open, close, header } = props;

  return (
    <div className={open ? "openModal modal relative" : "modal relative"}>
      {open ? (
        <section className="w-[1000px] h-[800px]">
          <header className="h-[50px] text-[1.5rem] dark:bg-DarkMain">
            {header}
            <button className="close" onClick={close}>
              x
            </button>
          </header>
          <main className="h-[680px] dark:bg-DarkBackground2 overflow-y-auto overflow-x-hidden dark:text-white">
            {props.children}
          </main>
        </section>
      ) : null}
    </div>
  );
}

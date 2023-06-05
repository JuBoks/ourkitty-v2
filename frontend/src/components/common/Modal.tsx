import React from "react";
import "../../css/Modal.css";

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
          <main className="h-[500px] dark:bg-DarkBackground2 overflow-y-auto overflow-x-hidden dark:text-white">
            {props.children}
          </main>
          <footer className="relative h-[70px] dark:bg-DarkBackground2">
            <button
              className="w-[80px] h-[50px] close bg-LightMain opacity-70 hover:opacity-100 dark:bg-DarkMain"
              onClick={close}
            >
              닫기
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
}

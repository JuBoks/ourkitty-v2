import * as THREE from "three";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useIntersect, ScrollControls, Scroll } from "@react-three/drei";
import mainbg from "../assets/page1-bg.gif";

const Section = (props) => {
  return (
    <section
      className={`h-screen flex flex-col justify-center p-10 ${
        props.right ? "items-end" : "items-start"
      }`}
    >
      <div className="w-1/2 flex items-center justify-center">
        <div className="max-w-sm w-full">
          <div className="rounded-lg px-8 py-12">{props.children}</div>
        </div>
      </div>
    </section>
  );
};

function Title() {
  const visible = useRef(false);
  const refH1 = useIntersect((isVisible) => (visible.current = isVisible));
  const refH2 = useIntersect((isVisible) => (visible.current = isVisible));

  useFrame((state, delta) => {
    refH1.current.style.scale = refH1.current.style.scale =
      THREE.MathUtils.damp(
        refH1.current.style.scale,
        visible.current ? 8 : 1,
        2,
        delta
      );
    setTimeout(() => {
      refH2.current.style.display = "block";
      refH2.current.style.scale = refH2.current.style.scale =
        THREE.MathUtils.damp(
          refH2.current.style.scale,
          visible.current ? 8 : 1,
          1,
          delta
        );
    }, 1500);
  });

  return (
    <Section>
      <h1 className="absolute top-40 z-10 font-noto" ref={refH1}>
        <p className="text-[2.5rem]">
          <span className="font-bold">길고양이</span>와{" "}
          <span className="font-bold">지역주민</span>의
        </p>{" "}
        <p className="text-[2.2rem]">
          <span className="text-Yellow text-[4rem] font-bold">공존</span>을 위한
          첫 걸음
        </p>
      </h1>
      <h1
        id="main-title"
        ref={refH2}
        className="hidden relative text-[5rem] font-bold mt-20 z-10 font-noto"
      >
        냥그릇
      </h1>
    </Section>
  );
}

export default function Landing1() {
  return (
    <div className="w-full h-full">
      <Canvas
        orthographic
        camera={{ zoom: 80 }}
        gl={{ alpha: false, antialias: false, stencil: false, depth: false }}
        dpr={[1, 1.5]}
      >
        <ScrollControls damping={6} pages={1}>
          <Scroll html style={{ width: "100%", height: "100vh" }}>
            <div className="flex flex-col justify-center text-center w-full h-full bg-white">
              <Title></Title>
              <img
                className="absolute bottom-10 right-0 w-[50%] h-[50%]"
                src={mainbg}
                alt=""
              />
            </div>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
}

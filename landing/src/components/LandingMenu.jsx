import React, { Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Cloud, Sky } from "@react-three/drei";
import { useRecoilState } from "recoil";
import { selectMenu } from "../recoil/landingState";

function Rig() {
  const camera = useThree((state) => state.camera);
  return useFrame((state) => {
    camera.position.z = Math.sin(state.clock.elapsedTime) * 20;
  });
}

export default function LandingMenu({ setClickMenu }) {
  const [page, setPage] = useRecoilState(selectMenu);

  return (
    <div className="relative w-screen h-screen">
      <div className="w-screen h-screen z-10">
        <Canvas camera={{ position: [0, 0, 16], fov: 75 }}>
          <ambientLight intensity={1} />
          <pointLight intensity={1} position={[0, 0, 50 - 15]} />
          <Suspense fallback={0}>
            <Cloud
              position={[-8, -8, 5]}
              speed={0.2}
              opacity={0.2}
              segments={20}
            />
            <Cloud
              position={[-6, -8, 5]}
              speed={0.2}
              opacity={0.5}
              segments={20}
            />
            <Cloud
              position={[-4, -8, 5]}
              speed={0.2}
              opacity={0.8}
              segments={20}
            />
            <Cloud
              position={[-2, -8, 5]}
              speed={0.2}
              opacity={0.5}
              segments={20}
            />
            <Cloud
              position={[0, -8, 5]}
              speed={0.2}
              opacity={1}
              segments={20}
            />
            <Cloud
              position={[2, -8, 5]}
              speed={0.2}
              opacity={0.5}
              segments={20}
            />
            <Cloud
              position={[4, -8, 5]}
              speed={0.2}
              opacity={0.6}
              segments={20}
            />
            <Cloud
              position={[6, -8, 5]}
              speed={0.2}
              opacity={0.5}
              segments={20}
            />
            <Cloud
              position={[8, -8, 5]}
              speed={0.2}
              opacity={0.8}
              segments={20}
            />
            <Cloud position={[10, -8, 5]} speed={0.2} opacity={0.4} />
            <Cloud position={[-8, -6, -10]} speed={0.2} opacity={0.2} />
            <Cloud position={[-6, -6, -10]} speed={0.2} opacity={0.5} />
            <Cloud position={[-4, -6, -10]} speed={0.2} opacity={0.3} />
            <Cloud position={[-2, -6, -10]} speed={0.2} opacity={0.5} />
            <Cloud position={[0, -6, -10]} speed={0.2} opacity={0.4} />
            <Cloud position={[2, -6, -10]} speed={0.2} opacity={0.6} />
            <Cloud position={[4, -6, -10]} speed={0.2} opacity={0.8} />
            <Cloud position={[6, -6, -10]} speed={0.2} opacity={1} />
            <Cloud position={[8, -6, -10]} speed={0.2} opacity={0.4} />
            <Cloud position={[10, -6, -10]} speed={0.2} opacity={0.5} />
            <Cloud position={[12, -6, -10]} speed={0.2} opacity={0.8} />
          </Suspense>
          <Sky
            azimuth={1}
            turbidity={10}
            rayleigh={0.5}
            inclination={0.6}
            distance={1000}
          />
          <Rig />
        </Canvas>
      </div>
      <div className="w-30">
        <hr className="fixed w-screen top-[5vh] border-2 border-white z-10" />
        <div
          className="fixed px-[51px] py-[62px] bg-white rounded-full right-[1vw] top-[2vh] z-20 font-bold text-[1rem] cursor-pointer rotate-45 transition ease-in-out duratioin-5000 hover:transform-none"
          onClick={() => setClickMenu((cur) => !cur)}
        >
          MAIN
        </div>
        <div className="fixed w-[10px] bg-white top-0 bottom-0 right-[4vh] my-[5vh] opacity-40 z-20"></div>
        <div className="absolute top-0 right-[30%] flex flex-col gap-20 justify-center text-center h-screen text-[3vh] font-bold font-noto">
          <div>
            <span
              className="manu-cat cursor-pointer"
              onClick={() => {
                setClickMenu((cur) => !cur);
                setPage(0);
              }}
            >
              냥그릇 소개
            </span>
          </div>
          <div>
            <span
              className="manu-cat cursor-pointer"
              onClick={() => {
                setClickMenu((cur) => !cur);
                setPage(1);
              }}
            >
              냥그릇 활동
            </span>
          </div>
          <div>
            <span
              className="manu-cat cursor-pointer"
              onClick={() => {
                setClickMenu((cur) => !cur);
                setPage(2);
              }}
            >
              냥그릇 현황
            </span>
          </div>
          <div>
            <span
              className="manu-cat cursor-pointer"
              onClick={() => {
                setClickMenu((cur) => !cur);
                setPage(3);
              }}
            >
              후원 안내
            </span>
          </div>
        </div>
        {/* <div className="absolute bottom-5 right-10">
        <img className="w-[150px] h-[150px]" src={CatGif} alt="" />
      </div> */}
        <hr className="fixed w-screen bottom-[5%] border-2 border-white" />
        <p className="fixed w-screen text-white ml-5 text-xl bottom-[1vh] font-noto">
          Contact Us <span className=" ml-4 font-bold">catbowl@gmail.com</span>
        </p>
      </div>
    </div>
  );
}

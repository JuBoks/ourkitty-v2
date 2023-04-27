import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import Slider from "react-slick";
import * as random from "maath/random/dist/maath-random.esm";
import Cat1 from "../assets/cat01.jpg";
import Cat2 from "../assets/cat02.jpg";
import Cat3 from "../assets/cat03.jpg";

export default function Landing2() {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  return (
    <div className="relative">
      <div className="w-screen h-screen bg-[#12071f] z-10">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <mesh>
            <Stars />
          </mesh>
        </Canvas>
      </div>
      <div className="absolute top-[15%] w-full h-[60%] bg-[#00000000] z-10">
        <Slider {...settings}>
          <div>
            <div className="relative w-[50vh] h-[50vh] text-white mt-40 mx-auto">
              <img
                className="w-full h-full rounded-[50%] opacity-80"
                src={Cat1}
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="relative w-[50vh] h-[50vh] text-white mx-auto">
              <img
                className="w-full h-full rounded-[50%] opacity-80"
                src={Cat2}
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="relative w-[50vh] h-[50vh] text-white mt-40 mx-auto">
              <img
                className="w-full h-full rounded-[50%] opacity-80"
                src={Cat3}
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="relative w-[50vh] h-[50vh] text-white mx-auto">
              <img
                className="w-full h-full rounded-[50%] opacity-80"
                src={Cat1}
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="relative w-[50vh] h-[50vh] text-white mt-40 mx-auto">
              <img
                className="w-full h-full rounded-[50%] opacity-80"
                src={Cat2}
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="relative w-[50vh] h-[50vh] text-white mx-auto">
              <img
                className="w-full h-full rounded-[50%] opacity-80"
                src={Cat3}
                alt=""
              />
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
}
function Stars(props) {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.5 })
  );
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#ffa0e0"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

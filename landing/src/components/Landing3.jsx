import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import KoreaMap from "./Map/KoreaMap";
import ApexCharts from "react-apexcharts";
import { useRecoilState } from "recoil";
import { selectSido } from "../recoil/selectMap";

export default function Landing3() {
  const landingState = useRecoilState(selectSido)[0];

  const sidoName = landingState.sidoName;
  const data1 = landingState.data1;
  const data2 = landingState.data2;

  const series = [
    {
      name: "전체 개체 수",
      data: data1,
    },
    {
      name: "중성화 개체 수",
      data: data2,
    },
  ];

  return (
    <div className="relative">
      <div className="w-screen h-screen bg-[#12071f] z-10">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <mesh>
            <Stars />
          </mesh>
        </Canvas>
      </div>
      <div className="absolute top-0 w-full h-full bg-[#00000000] z-10 flex flex-row gap-3 justify-center text-center">
        <div className="m-auto basis-1/2">
          <KoreaMap />
        </div>
        <div className="m-auto basis-1/2 overflow-hidden">
          <div className="pr-20 max-w-[90%]">
            {sidoName === "" ? null : (
              <ApexCharts
                type="line"
                series={series}
                options={{
                  chart: {
                    zoom: {
                      enabled: false,
                    },
                  },
                  dataLabels: {
                    enabled: false,
                  },
                  stroke: {
                    curve: "straight",
                  },
                  colors: ["#FFCD4A", "#c495fd"],
                  title: {
                    text: `${sidoName}`,
                    align: "left",
                    style: {
                      color: "#FFFFFF",
                    },
                  },
                  grid: {
                    row: {
                      colors: ["transparent"],
                      opacity: 0.5,
                    },
                  },
                  legend: {
                    labels: {
                      colors: "#FFFFFF",
                    },
                  },
                  xaxis: {
                    categories: [
                      "1월",
                      "2월",
                      "3월",
                      "4월",
                      "5월",
                      "6월",
                      "7월",
                      "8월",
                      "9월",
                      "10월",
                      "11월",
                      "12월",
                    ],
                    labels: {
                      style: {
                        colors: "#FFFFFF",
                      },
                    },
                  },
                  yaxis: {
                    labels: {
                      style: {
                        colors: "#FFFFFF",
                      },
                    },
                  },
                }}
              ></ApexCharts>
            )}
          </div>
        </div>
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

import React, { useEffect, useRef } from "react";
import * as d3 from 'd3';
import { useRecoilState } from "recoil";
import { selectedButtonState, selectedDateState } from "../../recoil/chart";
import { useQuery } from "react-query";
import { getClusterInfo } from "apis/api/cluster";

const datas = [
  { x: 10, y: 20, image: 'https://picsum.photos/800/600?random=1' },
  { x: 20, y: 30, image: 'https://picsum.photos/800/600?random=2' },
  { x: 30, y: 40, image: 'https://picsum.photos/800/600?random=3' },
  { x: 40, y: 50, image: 'https://picsum.photos/800/600?random=4' },
  { x: 50, y: 60, image: 'https://picsum.photos/800/600?random=5' }
];

const xScale = d3.scaleLinear()
  .domain([0, 100])
  .range([0, 500]);

const yScale = d3.scaleLinear()
  .domain([0, 100])
  .range([500, 0]);

export default function ClusteringChart() {
  const resultRef = useRef(null);

  // 클러스터 정보 가져오기
  const dishSerialNum = "EZZwEhRzzs9LvyZ";
  const dishDate = "2023-05-10";
  const { data, isLoading } = useQuery({
    queryKey: ["getClusterInfo", dishSerialNum, dishDate],
    queryFn: () => getClusterInfo(dishSerialNum, dishDate),
  });
  console.log("dd", data)

  const [selectedButton, setSelectedButton] = useRecoilState(selectedDateState);
  const [selectedDish, setSelectedDish] = useRecoilState(selectedButtonState);


  useEffect(() => {
    // 초기화
    const result = d3.select(resultRef.current);
    result.selectAll("svg").remove(); // SVG 요소를 모두 삭제

    // scatter plot 생성
    const svg = d3.select(resultRef.current)
      .append("svg")
      .attr("width", 500)
      .attr("height", 500);

    // 이미지 파일 로드
    // const image = svg.append("svg:image")
    //   .attr("xlink:href", "point.png")
    //   .attr("width", 60)
    //   .attr("height", 80);

    // 데이터 점 생성
    const points = svg.selectAll("image")
      .data(datas)
      .enter()
      .append("image")
      .attr("x", function (d) { return xScale(d.x); })
      .attr("y", function (d) { return yScale(d.y); })
      .attr("xlink:href", function (d) { return d.image; })
      .attr("width", 100)
      .attr("height", 120);
  }, []);

  return (
    <div className="w-full h-full gap-1">
      <h1 className="text-[1.3rem] font-bold" >클러스터링 결과</h1>
      <div className="w-full h-full">
        <div>{selectedButton}, {selectedDish}</div>
        <div className="w-full h-full" ref={resultRef}></div>
      </div>
    </div>
  );
}

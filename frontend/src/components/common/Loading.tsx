import React, { useState, useEffect } from "react";
import "../../css/Loading.css"; // Import CSS file for styling

export default function Loading() {
  const [message, setMessage] = useState("AI 준비 완료!");
  const [loopCount, setLoopCount] = useState(0);

  useEffect(() => {
    if(loopCount === 0) {
      const timer1 = setTimeout(() => {
        setMessage("고양이들의 왼쪽 귀 분석을 시작합니다!");
      }, 2000);
  
      const timer2 = setTimeout(() => {
        setMessage("분석이 거의 완료 됐어요!");
      }, 8000);
  
      const timer3 = setTimeout(() => {
        setMessage("고양이가 많아 시간이 조금 더 소요됩니다!");
      }, 13000);
  
      const timer4 = setTimeout(() => {
        setLoopCount((prevCount) => prevCount + 1);
      }, 17000);
  
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    }
    else {
      const timer2 = setTimeout(() => {
        setMessage("분석이 거의 완료 됐어요!");
      }, 8000);
  
      const timer3 = setTimeout(() => {
        setMessage("고양이가 많아 시간이 조금 더 소요됩니다!");
      }, 13000);
  
      const timer4 = setTimeout(() => {
        setLoopCount((prevCount) => prevCount + 1);
      }, 17000);
  
      return () => {
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };  
    }
  }, [loopCount]);

  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <div>{message}</div>
    </div>
  );
}
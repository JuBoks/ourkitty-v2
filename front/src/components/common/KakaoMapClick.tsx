import React, { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

export default function KakaoMap() {
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const [state, setState] = useState({
    center: {
      lat: 0,
      lng: 0,
    },
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setState((prev) => ({
          ...prev,
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          isLoading: false,
        }));
      });
    } else {
      setState((prev) => ({
        ...prev,
        errMsg: "현재 위치 정보를 받아올 수 없습니다",
        isLoading: false,
      }));
    }
  }, []);

  return (
    <Map
      className="rounded-xl"
      center={{
        lat: state.center.lat,
        lng: state.center.lng,
      }}
      style={{
        // 지도의 크기
        width: "100%",
        height: "100%",
      }}
      level={4}
      onClick={(_t, mouseEvent: any) =>
        setPosition({
          lat: mouseEvent.latLng.getLat(),
          lng: mouseEvent.latLng.getLng(),
        })
      }
    >
      <MapMarker
        position={position}
        image={{
          src: "https://ifh.cc/g/b7l4NQ.png", // 마커이미지의 주소입니다
          size: {
            width: 54,
            height: 54,
          }, // 마커이미지의 크기입니다
          options: {
            offset: {
              x: 27,
              y: 69,
            }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
          },
        }}
      />
    </Map>
  );
}

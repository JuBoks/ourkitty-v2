import React, { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

export default function KakaoMapClick({ pos }: any) {
  const [position, setPosition] = useState(pos);
  const [state, setState] = useState({
    lat: pos.lat,
    lng: pos.lng,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setState((prev) => ({
          ...prev,

          lat: position.coords.latitude,
          lng: position.coords.longitude,

          isLoading: false,
        }));
        setPosition(() => ({
          lat: position.coords.latitude,
          lng: position.coords.longitude,

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

  useEffect(() => {
    setPosition(pos);
    setState(pos);
  }, [pos]);

  return (
    <Map
      className="rounded-xl"
      center={{
        lat: state.lat,
        lng: state.lng,
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
            width: 35,
            height: 35,
          }, // 마커이미지의 크기입니다
        }}
        draggable={true}
      />
    </Map>
  );
}

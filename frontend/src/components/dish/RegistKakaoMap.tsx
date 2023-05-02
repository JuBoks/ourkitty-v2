import React, { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

export default function RegistKakaoMap({ dishPosition, setDishPosition }: any) {
  const [position, setPosition] = useState(dishPosition);

  useEffect(() => {
    setPosition(dishPosition);
  }, [dishPosition]);

  return (
    <Map
      className="rounded-lg"
      center={{
        lat: dishPosition.lat,
        lng: dishPosition.lng,
      }}
      isPanto={true}
      style={{
        // 지도의 크기
        width: "100%",
        height: "100%",
      }}
      level={4}
      onClick={(_t, mouseEvent: any) => {
        setPosition({
          lat: mouseEvent.latLng.getLat(),
          lng: mouseEvent.latLng.getLng(),
        });
        setDishPosition({
          lat: mouseEvent.latLng.getLat(),
          lng: mouseEvent.latLng.getLng(),
        });
      }}
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

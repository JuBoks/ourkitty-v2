import React, { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import Marker1 from "../../assets/Marker1.png";
import Marker2 from "../../assets/Marker2.png";
import Marker3 from "../../assets/Marker3.png";
import { useRecoilState } from "recoil";
import { catbowlInfo } from "../../recoil/states/catbowl";

interface mapContent {
  serial: string;
  name: string;
  content: string;
  img1: string;
  img2: string;
  latlng: { lat: number; lng: number };
  remain: number;
}
export default function KakaoMap() {
  const [info, setInfo] = useRecoilState(catbowlInfo);

  const positions = [
    {
      serial: "A1234",
      name: "냥그릇 1",
      content: "냥그릇 1 입니다.",
      img1: "https://cdn.eyesmag.com/content/uploads/posts/2022/08/08/main-ad65ae47-5a50-456d-a41f-528b63071b7b.jpg",
      img2: "https://i.namu.wiki/i/IZlJBszHxEFTRwxKs3cnreTd0JyzYtHiSBd8j4b9xR0JTyKG4s5jFFgEbo1Oymak-mUgRZmMApKMWbh60ep0qSglcVmUmeXmfV2US0nFMl0bHMx6HGklwKXLnBQMX3SFrl8gqQbqKQfGfRrujVV67A.webp",
      latlng: { lat: 33.450705, lng: 126.570677 },
      remain: 0.3,
    },
    {
      serial: "B1234",
      name: "냥그릇 2",
      content: "냥그릇 2 입니다.",
      img1: "https://dimg.donga.com/ugc/CDB/WEEKLY/Article/5b/02/77/fa/5b0277fa109dd2738de6.jpg",
      img2: "https://image.zdnet.co.kr/2020/02/26/paikshow_5K6v7KLykRg.jpg",
      latlng: { lat: 33.450936, lng: 126.569477 },
      remain: 0.6,
    },
    {
      serial: "C1234",
      name: "냥그릇 3",
      content: "냥그릇 3 입니다.",
      img1: "https://blog.kakaocdn.net/dn/nIxZe/btq8aZUDa8c/0pZCTurE0TUPFu9Dq5u8K0/img.jpg",
      img2: "https://www.sisain.co.kr/news/photo/202110/45791_82634_4851.jpg",
      latlng: { lat: 33.450879, lng: 126.56994 },
      remain: 0.8,
    },
    {
      serial: "D1234",
      name: "냥그릇 4",
      content: "냥그릇 4 입니다.",
      img1: "https://images.mypetlife.co.kr/content/uploads/2019/08/09153207/adorable-animal-cat-2286016.jpg",
      img2: "https://images.mypetlife.co.kr/content/uploads/2019/08/09153106/patrick-robert-doyle-KjmtLyEFax0-unsplash.jpg",
      latlng: { lat: 33.451393, lng: 126.570738 },
      remain: 0.1,
    },
  ];

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

  const setCatBowlState = (info: mapContent) => {
    setInfo({
      serial: info.serial,
      name: info.name,
      content: info.content,
      img1: info.img1,
      img2: info.img2,
      latlng: { lat: info.latlng.lat, lng: info.latlng.lng },
    });
  };
  return (
    <Map
      className="rounded-xl"
      center={{
        lat: 33.450701,
        lng: 126.570667,
      }}
      style={{
        // 지도의 크기
        width: "97%",
        height: "100%",
      }}
      level={2}
    >
      {positions.map((position, index) =>
        position.remain < 0.3 ? (
          <MapMarker
            key={`${position.name}-${position.latlng}`}
            position={position.latlng} // 마커를 표시할 위치
            image={{
              src: Marker3,
              size: {
                width: 45,
                height: 45,
              }, // 마커이미지의 크기입니다
            }}
            title={position.name} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            onClick={() => setCatBowlState(position)}
          >
            <div style={{ padding: "5px", color: "#000" }}>{position.name}</div>
          </MapMarker>
        ) : position.remain >= 0.3 && position.remain < 0.8 ? (
          <MapMarker
            key={`${position.name}-${position.latlng}`}
            position={position.latlng} // 마커를 표시할 위치
            image={{
              src: Marker2,
              size: {
                width: 45,
                height: 45,
              }, // 마커이미지의 크기입니다
            }}
            title={position.name} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            onClick={() => setCatBowlState(position)}
          >
            <div style={{ padding: "5px", color: "#000" }}>{position.name}</div>
          </MapMarker>
        ) : (
          <MapMarker
            key={`${position.name}-${position.latlng}`}
            position={position.latlng} // 마커를 표시할 위치
            image={{
              src: Marker1,
              size: {
                width: 45,
                height: 45,
              }, // 마커이미지의 크기입니다
            }}
            title={position.name} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            onClick={() => setCatBowlState(position)}
          >
            <div
              style={{
                padding: "5px",
                color: "#000",
              }}
            >
              {position.name}
            </div>
          </MapMarker>
        )
      )}
    </Map>
  );
}

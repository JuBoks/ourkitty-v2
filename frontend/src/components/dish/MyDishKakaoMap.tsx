import React, { useState, useEffect } from "react";
import { Map, MapMarker, useMap } from "react-kakao-maps-sdk";
import MarkerBlue from "../../assets/marker_blue.png";
import MarkerYellow from "../../assets/marker_yellow.png";
import MarkerRed from "../../assets/marker_red.png";
import { useRecoilState } from "recoil";
import { dishInfo, dishRegist, dishCountState } from "../../recoil/dish";
import { useQuery } from "react-query";
import { getDishList } from "../../apis/api/dish";

interface detailData {
  createdData: string;
  dishAddress: string;
  dishCatCount: number;
  dishId: number;
  dishLat: number;
  dishLong: number;
  dishName: string;
  dishProfileImagePath: string;
  dishSerialNum: string;
  dishTnrCount: number;
  dishWeight: number;
  isDeleted: boolean;
  locationCode: string;
  updatedDate: string;
}
export default function MyDishKakaoMap() {
  const [dish, setDish] = useRecoilState(dishInfo);
  const [isRegist, setIsRegist] = useRecoilState(dishRegist);
  const dishCount = useRecoilState(dishCountState)[0];
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [markerList, setMarkerList] = useState([] as boolean[]);

  const handleModifyDish = (item: detailData, index: number) => {
    handleMarkers(item, index);
    setCenter({ lat: item.dishLat, lng: item.dishLong });
    setIsRegist(false);
    setDish({
      dishId: item.dishId,
      dishAddress: item.dishAddress,
      dishLat: item.dishLat,
      dishLong: item.dishLong,
      dishName: item.dishName,
      dishSerialNum: item.dishSerialNum,
      file: item.dishProfileImagePath,
    });
  };

  const handleMarkers = (item: detailData, index: number) => {
    const markers: boolean[] = [];
    data?.data.map((index: number) => markers.push(false));
    markers[index] = true;
    setMarkerList([...markers]);
  };

  const handleMarkerClose = () => {
    const markers: boolean[] = [];
    data?.data.map((index: number) => markers.push(false));
    setMarkerList(markers);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["getDishList", dishCount],
    queryFn: () => getDishList(),
  });

  useEffect(() => {
    setCenter({ lat: data?.centerLat, lng: data?.centerLong });
    const markers: boolean[] = [];
    data?.data.map((index: number) => markers.push(false));
    setMarkerList(markers);
  }, [data]);

  if (isLoading || data === undefined) return null;

  return (
    <Map
      className="rounded-lg"
      center={{
        lat: center.lat,
        lng: center.lng,
      }}
      isPanto={true}
      style={{
        // 지도의 크기
        width: "100%",
        height: "100%",
      }}
      level={8}
      onClick={handleMarkerClose}
    >
      {data.data.map((item: detailData, index: number) => {
        return (
          <MapMarker
            key={item.dishId}
            position={{ lat: item.dishLat, lng: item.dishLong }}
            image={{
              src: `${
                item.dishWeight < 30
                  ? MarkerRed
                  : item.dishWeight >= 30 && item.dishWeight < 80
                  ? MarkerYellow
                  : MarkerBlue
              }`,
              size: { width: 45, height: 45 },
            }}
            title={item.dishName}
            onClick={() => {
              handleModifyDish(item, index);
            }}
          >
            {markerList[index] && (
              <div style={{ minWidth: "150px" }}>
                <img
                  alt="close"
                  width="14"
                  height="13"
                  src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
                  style={{
                    position: "absolute",
                    right: "5px",
                    top: "5px",
                    cursor: "pointer",
                  }}
                  onClick={handleMarkerClose}
                />
                <div style={{ padding: "5px", color: "#000" }}>
                  {item.dishName}
                </div>
              </div>
            )}
          </MapMarker>
        );
      })}
    </Map>
  );
}

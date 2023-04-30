import React, { useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
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

  const handleModifyDish = (item: detailData) => {
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
  const { data, isLoading } = useQuery({
    queryKey: ["getDishList", dishCount],
    queryFn: () => getDishList(),
  });

  if (isLoading) return null;

  return (
    <Map
      className="rounded-lg"
      center={{
        lat: data.centerLat,
        lng: data.centerLong,
      }}
      style={{
        // 지도의 크기
        width: "100%",
        height: "100%",
      }}
      level={5}
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
            onClick={() => handleModifyDish(item)}
          ></MapMarker>
        );
      })}
    </Map>
  );
}

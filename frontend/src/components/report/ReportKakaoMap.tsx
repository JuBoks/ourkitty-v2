import React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import MarkerBlue from "../../assets/marker_blue.png";
import MarkerYellow from "../../assets/marker_yellow.png";
import MarkerRed from "../../assets/marker_red.png";
import { useRecoilState } from "recoil";
import { reportDetailId } from "../../recoil/report";
import { useQuery, useMutation } from "react-query";
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
export default function ReportKakaoMap() {
  const { data, isLoading } = useQuery({
    queryKey: ["getDishList"],
    queryFn: () => getDishList(),
  });

  if (isLoading || data === undefined) return null;

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
          ></MapMarker>
        );
      })}
    </Map>
  );
}

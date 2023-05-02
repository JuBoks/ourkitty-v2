import React, { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import MarkerBlue from "../../assets/marker_blue.png";
import MarkerYellow from "../../assets/marker_yellow.png";
import MarkerRed from "../../assets/marker_red.png";
import { useRecoilState } from "recoil";
import { reportDetailId } from "../../recoil/report";
import { useQuery } from "react-query";
import { getReportItem } from "../../apis/api/report";

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
export default function ReportKakaoMap2() {
  const reportId = useRecoilState(reportDetailId)[0];
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["getReportItem", reportId],
    queryFn: () => getReportItem(reportId),
  });

  if (isLoading || data === undefined) return null;

  return (
    <Map
      className="rounded-lg"
      center={{
        lat: data.data.data.dish.dishLat,
        lng: data.data.data.dish.dishLong,
      }}
      style={{
        // 지도의 크기
        width: "100%",
        height: "100%",
      }}
      level={5}
    >
      <MapMarker
        position={{
          lat: data.data.data.dish.dishLat,
          lng: data.data.data.dish.dishLong,
        }}
        image={{
          src: `${
            data.data.dishWeight < 30
              ? MarkerRed
              : data.data.data.dish.dishWeight >= 30 &&
                data.data.data.dish.dishWeight < 80
              ? MarkerYellow
              : MarkerBlue
          }`,
          size: { width: 45, height: 45 },
        }}
        title={data.data.data.dish.dishName}
      >
        <div style={{ padding: "5px", color: "#000" }}>
          {data.data.data.dish.dishName}
        </div>
      </MapMarker>
    </Map>
  );
}

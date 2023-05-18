import React, { useEffect } from "react";
import CatButton from "../components/chart/CatButton";
import ClusteringChart from "../components/dishDetail/ClusteringChart";
import DateList from "../components/dishDetail/DateList";
import ClusteringResult from "../components/dishDetail/ClusteringResult";
import { useRecoilState } from "recoil";
import {
  selectedClusterOriginalState,
  selectedClusterState,
  selectedDateState,
  selectedSerialNumberState,
  statusInfoState,
} from "recoil/chart";
import { useQuery } from "react-query";
import { getClusterInfo, getClusterStatus } from "apis/api/cluster";

export default function DishDetail() {
  const [selectedButton, setSelectedButton] = useRecoilState(selectedDateState);
  const [selectedSerialNumber, setSelectedSerialNumber] = useRecoilState(
    selectedSerialNumberState
  );
  const [selectedCluster, setSelectedCluster] =
    useRecoilState(selectedClusterState);
  const [selectedClusterOriginal, setSelectedClusterOriginal] = useRecoilState(
    selectedClusterOriginalState
  );
  const [statusInfo, setStatusInfo] = useRecoilState(statusInfoState);

  const { data, isLoading } = useQuery({
    queryKey: ["getClusterInfo", selectedSerialNumber, selectedButton],
    queryFn: () => getClusterInfo(selectedSerialNumber, selectedButton),
  });

  const { data: statuss } = useQuery({
    queryKey: ["getClusterStatus", selectedSerialNumber],
    queryFn: () => getClusterStatus(selectedSerialNumber),
  });

  useEffect(() => {
    if (data) {
      setSelectedCluster(data.refined);
      setSelectedClusterOriginal(data.original);
    }
  }, [data]);

  useEffect(() => {
    if (statuss) {
      setStatusInfo(statuss);
    }
  }, [statuss]);

  return (
    <div className="w-full h-full flex flex-row gap-[15px] p-2">
      <div className="w-[16%] h-full flex flex-col gap-2">
        <div className="w-full h-full bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
          <CatButton />
        </div>
      </div>
      <div className="w-[84%] h-full flex flex-col gap-2">
        <div className="w-full h-[60px] bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
          <DateList statusInfo={statusInfo} />
        </div>
        <div className="w-full h-[calc(100%-60px)] flex flex-row gap-2">
          <div className="w-[70%] h-full bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
            {isLoading || data === undefined || data.original === null || data.original && data.original.status === -1 ? (
              <div className="w-full h-full flex flex-row justify-center m-auto gap-20">
                <div className="flex flex-col my-auto gap-10">
                  <div className="w-40 h-20 bg-LightInput rounded-lg dark:bg-DarkBackground"></div>
                  <div className="w-40 h-20 bg-red-200 rounded-lg dark:bg-red-500"></div>
                  <div className="w-40 h-20 bg-LightMainHover rounded-lg dark:bg-DarkMainHover"></div>
                </div>
                <div className="flex flex-col my-auto gap-20 text-[30px]">
                  <div className="">: 데이터 없음</div>
                  <div className="">: 클러스터링 미완료</div>
                  <div className="">: 클러스터링 완료</div>
                </div>
              </div>
            ) : (
              <ClusteringChart data={selectedCluster} />
            )}
          </div>
          <div className="w-[30%] h-full bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
            {isLoading || data === undefined || data && data.original === null ? (
              <div></div>
            ) : (
              <ClusteringResult data={selectedCluster.represetatives} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

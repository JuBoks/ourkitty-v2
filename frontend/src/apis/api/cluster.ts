import { Cluster, ClusterFeature } from "types";
import { ClusterModifyRequest, ClusterRepresentative } from "types/Clusters";
import { aiInstance } from "../utils";

// GET
export const getClusterInfo = async (dishSerialNum: string, clusterDate: string) => {
  const { data } = await aiInstance.get(`info?serial_number=${dishSerialNum}&date=${clusterDate}`);
  return data;
};

export const getClusterStatus = async (dishSerialNum: string) => {
  const { data } = await aiInstance.get(`info/status?serial_number=${dishSerialNum}`);
  return data;
};

// PUT
export const modifyClusterInfo = async (dishSerialNum: string, clusterDate: string, body: ClusterModifyRequest) => {
  const { data } = await aiInstance.put(`info?serial_number=${dishSerialNum}&date=${clusterDate}`, body);
  return data;
};

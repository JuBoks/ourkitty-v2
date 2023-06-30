import { ClusterTnrInfo } from "types/Clusters";
import { aiInstance } from "../utils";

// GET
export const getClusterInfo = async (dishSerialNum: string, clusterDate: string) => {
  const { data } = await aiInstance.get(`info?serial_number=${dishSerialNum}&date=${clusterDate}`);
  return data;
};

export const getClusterTnrInfo = async (dishSerialNum: string, clusterDate: string) => {
  const { data } = await aiInstance.get(`detect/tnr?serial_number=${dishSerialNum}&date=${clusterDate}`);
  return data.content;
};

export const getClusterStatus = async (dishSerialNum: string) => {
  const { data } = await aiInstance.get(`info/status?serial_number=${dishSerialNum}`);
  return data.content;
};

// PUT
export const modifyClusterInfo = async (dishSerialNum: string, clusterDate: string, body: ClusterTnrInfo) => {
  const { data } = await aiInstance.put(`detect/tnr?serial_number=${dishSerialNum}&date=${clusterDate}`, body);
  return data;
};

export const resetClusterInfo = async (dishSerialNum: string, clusterDate: string) => {
  const { data } = await aiInstance.put(`detect/undo?serial_number=${dishSerialNum}&date=${clusterDate}`);
  return data;
};

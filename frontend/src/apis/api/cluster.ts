import { aiInstance } from "../utils";

// GET


export const getClusterInfo = async (dishSerialNum: string, clusterDate: string) => {
  const { data } = await aiInstance.get(`info?serial_number=${dishSerialNum}&date=${clusterDate}`);
  return data;
};
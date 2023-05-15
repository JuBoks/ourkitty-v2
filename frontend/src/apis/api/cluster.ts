import { Cluster, ClusterFeature } from "types";
import { aiInstance } from "../utils";

// GET


export const getClusterInfo = async (dishSerialNum: string, clusterDate: string) => {
  const { data } = await aiInstance.get(`info?serial_number=${dishSerialNum}&date=${clusterDate}`);
  console.log("ddd", data)
  let features: ClusterFeature[] = [];
  let result: Cluster = {
    width: data.width,
    height: data.height,
    features,
    clusters: data.num_clusters
  };
  data.file_feature_info.forEach((el: any) => result.features.push({
    x: el[2],
    y: el[3],
    image: el[0],
    cls: el[1]
  }));

  console.log('rrr', result);
  return result;
};
import { Cluster, ClusterFeature } from "types";
import { ClusterModifyRequest, ClusterRepresentative } from "types/Clusters";
import { aiInstance } from "../utils";

// GET
export const getClusterInfo = async (dishSerialNum: string, clusterDate: string) => {
  const { data } = await aiInstance.get(`info?serial_number=${dishSerialNum}&date=${clusterDate}`);
  console.log('original', data);

  let features: ClusterFeature[] = [];
  let represetatives: ClusterRepresentative[] = [];
  let result: Cluster = {
    width: data.width,
    height: data.height,
    features,
    clusters: data.num_clusters,
    represetatives,
  };

  data.file_feature_info.forEach((el: any) => result.features.push({
    x: el[2],
    y: el[3],
    image: el[0],
    cls: el[1]
  }));
  data.representative_images.forEach((el: any) => result.represetatives.push({
    cls: el[0],
    image: el[1],
  }));

  console.log('refined', result);
  return { 'original': data, 'refined': result };
};

// PUT
export const modifyClusterInfo = async (body: ClusterModifyRequest) => {
  console.log('boody', body)
  const { data } = await aiInstance.put(`info`, body);
  console.log('modifyClusterInfo: ', data)
}
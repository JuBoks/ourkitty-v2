import { atom } from "recoil";
import { Cluster } from "types";
import { ClusterOriginal } from "types/Clusters";

const _original: ClusterOriginal = {
  closest_images: [],
  file_feature_info: [],
  height: 0,
  width: 0,
  num_clusters: 0,
  representative_images: [],
  status: 0,
  tnr_count: 0,
  tnr_info: [],
};
const _cluster: Cluster = {
  width: 0,
  height: 0,
  features: [],
  clusters: 0,
  represetatives: [],
};

export const selectedButtonState = atom({
  key: "selectedButtonState",
  default: 1,
});

export const selectedSerialNumberState = atom({
  key: "selectedSerialNumberState",
  default: "",
});

export const selectedDateState = atom({
  key: "selectedDateState",
  default: "",
});

export const selectedClusterState = atom<Cluster>({
  key: "selectedClusterState",
  default: _cluster,
});

export const selectedClusterOriginalState = atom<ClusterOriginal>({
  key: "selectedClusterOriginalState",
  default: _original,
});

export const statusInfoState = atom({
  key: "statusInfoState",
  default: {},
});
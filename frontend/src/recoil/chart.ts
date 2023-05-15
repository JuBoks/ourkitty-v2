import { atom } from "recoil";
import { Cluster } from "types";

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
export type ClusterModifyRequest = {
  serial_number: string;
  date: string;
  status: number;
};

export type ClusterOriginal = {
  status: number;
  num_clusters: number;
  representative_images: any[];
  width: number;
  height: number;
  file_feature_info: any[];
  closest_images: any[];
  tnr_info: any[];
  tnr_count: number;
};

export type Cluster = {
  width: number;
  height: number;
  features: ClusterFeature[];
  clusters: number;
  represetatives: ClusterRepresentative[];
};

export type ClusterFeature = {
  x: number;
  y: number;
  image: string;
  cls: number;
};

export type ClusterRepresentative = {
  cls: number;
  image: string;
};

export type ClusterTnrInfo = {
  status: number;
  num_clusters: number;
  representative_images: [];
  tnr_info: [];
  tnr_count: number;
};

export type ClusterIotImage = {
  img: string;
  is_tnr: boolean;
};

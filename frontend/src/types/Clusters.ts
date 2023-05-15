export type Cluster = {
  width: number,
  height: number,
  features: ClusterFeature[],
  clusters: number,
  represetatives: ClusterRepresentative[],
}

export type ClusterFeature = {
  x: number,
  y: number,
  image: string,
  cls: number
}

export type ClusterRepresentative = {
  cls: number,
  image: string,
}

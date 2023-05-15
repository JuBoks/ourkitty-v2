export type Cluster = {
  width: number,
  height: number,
  features: ClusterFeature[],
  clusters: number,
}

export type ClusterFeature = {
  x: number,
  y: number,
  image: string,
  cls: number
}

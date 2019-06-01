function toRadians(d) {
  return d * Math.PI / 180
}

export default function getDistance(lat1, lng1, lat2, lng2) {
  let radLat1 = toRadians(lat1)
  let radLat2 = toRadians(lat2)
  let deltaLat = radLat1 - radLat2
  let deltaLng = toRadians(lng1) - toRadians(lng2)
  let dis =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(deltaLat / 2), 2) +
          Math.cos(radLat1) *
            Math.cos(radLat2) *
            Math.pow(Math.sin(deltaLng / 2), 2)
      )
    )
  return dis * 6378137
}

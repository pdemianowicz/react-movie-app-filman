const BASE_IMG_URL = "https://image.tmdb.org/t/p";

export default function getImageUrl(path: string, size: string = "w500") {
  return `${BASE_IMG_URL}/${size}${path}`;
}

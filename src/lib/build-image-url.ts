type ImageSizes = {
  backdrop: ["w300", "w780", "w1280"],
  poster: ["w92", "w154", "w185", "w342", "w500", "w780"],
  profile: ["w45", "w185", "w342", "h632"],
  // logo: ["w45", "w92", "w154", "w185", "w300", "w500"],
};

export type ImageType = keyof ImageSizes;
export type ImageSize<T extends ImageType> = ImageSizes[T][number];

const BASE_URL = "https://image.tmdb.org/t/p/" as const

export function getImageUrl<T extends ImageType>(
  src: string | undefined,
  imageType: T,
  imageSize: ImageSize<T> | "original"
) {
  if (!src) {
    return `/images/${imageType}-placeholder.png`
  }

  return `${BASE_URL}${imageSize}${src}`;
}

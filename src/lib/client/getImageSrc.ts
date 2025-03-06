export const getImageSrc = (imagePath: string) => {
  return `${process.env.NEXT_PUBLIC_BASE_PATH}/images/${imagePath}`;
};
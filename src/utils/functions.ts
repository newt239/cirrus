export const getImageParams = (f: File) => {
  let width: number = 100;
  let height: number = 100;
  const img = new Image();
  img.onload = () => {
    width = img.naturalWidth;
    height = img.naturalHeight;
    URL.revokeObjectURL(img.src);
  };
  img.src = URL.createObjectURL(f);
  return { width, height };
};

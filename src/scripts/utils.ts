// https://stackoverflow.com/a/61226119/7092954
export const blobToBase64 = (blob: Blob): Promise<string> => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);

  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(<string>reader.result);
    };
  });
};

export const MISSING_IMAGE =
  "https://github.com/Fazendaaa/manga.up/blob/master/public/img/icons/android-chrome-pwa-512x512.png?raw=true";

// https://stackoverflow.com/a/20965997/7092954
// https://stackoverflow.com/a/4409745/7092954
export const resizeImage = (img: string, width: number, height: number) => {
  // create an off-screen canvas
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const imageCanvas = new Image();

  // set its dimension to target size
  canvas.width = width;
  canvas.height = height;

  imageCanvas.onload = () => {
    // draw source image into the off-screen canvas:
    // @ts-expect-error: going to type it later
    ctx.drawImage(imageCanvas, 0, 0, width, height);
  };
  imageCanvas.src = img;

  // encode image to data-uri with base64 version of compressed image
  return canvas.toDataURL();
};

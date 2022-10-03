// https://stackoverflow.com/a/61226119/7092954
export const blobToBase64 = async (blob: Blob): Promise<string> => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);

  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(<string>reader.result);
    };
  });
};

// https://stackoverflow.com/a/36183085/7092954
export const base64ToBlob = (base64: string): Promise<Blob> =>
  fetch(base64).then((res) => res.blob());

export const imgToBase64 = async (imgPath: string): Promise<string> => {
  const data = await fetch(imgPath);

  return blobToBase64(await data.blob());
};

export const MISSING_IMAGE = "splash_screens/icon.png";

// https://stackoverflow.com/a/20965997/7092954
// https://stackoverflow.com/a/4409745/7092954
export const resizeImage = async (
  img: string,
  width: number,
  height: number
): Promise<string> => {
  // create an off-screen canvas
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const imageCanvas = new Image();

  // set its dimension to target size
  canvas.width = width;
  canvas.height = height;

  imageCanvas.src = img;

  return new Promise(
    (resolve: (image: string) => void, reject: (error: Error) => void) => {
      imageCanvas.onload = () => {
        // draw source image into the off-screen canvas:
        // @ts-expect-error: going to type it later
        ctx.drawImage(imageCanvas, 0, 0, width, height);

        // encode image to data-uri with base64 version of compressed image
        resolve(canvas.toDataURL());
      };
    }
  );
};

interface IImageDimensions {
  width: number;
  height: number;
}

// https://stackoverflow.com/a/17775293/7092954
export const getImageDimensions = async (
  base64: string
): Promise<IImageDimensions> => {
  const image = new Image();

  image.src = base64;

  return new Promise(
    (
      resolve: (dimensions: IImageDimensions) => void,
      reject: (error: Error) => void
    ) => {
      image.onload = () => {
        resolve({
          width: image.width,
          height: image.height,
        });
      };
    }
  );
};

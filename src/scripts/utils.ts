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

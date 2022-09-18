// https://stackoverflow.com/a/61226119/7092954
export const blobToBase64 = (blob: Blob): Promise<any> => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);

  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
};

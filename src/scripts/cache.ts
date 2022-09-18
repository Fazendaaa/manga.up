import { API_PROXY } from "./API";
import { blobToBase64 } from "./utils";

const storeLocalStorage = (id: string, content: string): string => {
  localStorage.setItem(id, content);

  return id;
};

const readLocalStorage = (id: string) => localStorage.getItem(id);

export const cacheImage = (path: string) => {
  const id = path.split("/").pop();

  if ("undefined" === typeof id) {
    throw "Index for Local Storage ain't a valid one";
  }

  const data = readLocalStorage(id);

  if (null !== data) {
    return data;
  }

  return fetch(API_PROXY.concat(path), {
    method: "GET",
    referrerPolicy: "no-referrer",
  })
    .then((response) => response.blob())
    .then(blobToBase64)
    .then((base64) => storeLocalStorage(id, base64))
    .then(readLocalStorage)
    .then((imageData) => {
      if (null === imageData) {
        return "https://github.com/Fazendaaa/manga.up/blob/master/public/img/icons/android-chrome-pwa-512x512.png?raw=true";
      }

      return imageData;
    });
};

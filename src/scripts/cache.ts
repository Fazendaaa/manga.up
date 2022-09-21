import { API_PROXY } from "./API";
import { readFromDatabase, saveToDatabase } from "./database";
import { IVolumesImages } from "./types";
import { IChapterBlobContent, IChapterContent } from "./types";
import {
  base64ToBlob,
  blobToBase64,
  getImageDimensions,
  MISSING_IMAGE,
  resizeImage,
} from "./utils";

const storeImage = async (
  objectStorage: string,
  id: string,
  content: Blob
): Promise<string> =>
  saveToDatabase(objectStorage, id, content).then((stored) => {
    if (stored) {
      return id;
    }

    throw new Error("Error while storing in database");
  });

const storeChapter = async (
  objectStorage: string,
  id: string,
  content: IChapterBlobContent[]
): Promise<string | null> =>
  saveToDatabase(objectStorage, id, content)
    .then((stored) => {
      if (stored) {
        return id;
      }

      throw new Error("Error while storing in database");
    })
    .catch((error) => {
      console.error(error);

      return null;
    });

const readImage = async (
  objectStorage: string,
  id: string
): Promise<string | null> =>
  readFromDatabase(objectStorage, id)
    .then((result) => {
      if (undefined !== result && "data" in result) {
        return blobToBase64(<Blob>result["data"]);
      }

      return null;
    })
    .catch((error) => {
      console.error(error);

      return null;
    });

const readChapter = async (
  objectStorage: string,
  id: string
): Promise<IChapterContent[] | null> =>
  readFromDatabase(objectStorage, id)
    .then((result) => {
      if (undefined !== result && "data" in result) {
        return Promise.all(
          (<IChapterBlobContent[]>result["data"]).map(async (data) => {
            const image = await blobToBase64(data["image"]["data"]);
            const thumbnail = await blobToBase64(data["thumbnail"]["data"]);

            return {
              image,
              thumbnail,
              height: data["image"]["height"],
              width: data["image"]["width"],
            };
          })
        );
      }

      return null;
    })
    .catch((error) => {
      console.error(error);

      return null;
    });

export const cacheImage = async (
  objectStorage: string,
  path: string
): Promise<string> => {
  const id = path.split("/").pop();

  if ("undefined" === typeof id) {
    throw "Index for Local Storage ain't a valid one";
  }

  const data = await readImage(objectStorage, id);

  if (null !== data) {
    return data;
  }

  return fetch(API_PROXY.concat(path), {
    method: "GET",
    referrerPolicy: "no-referrer",
  })
    .then((response) => response.blob())
    .then((base64) => storeImage(objectStorage, id, base64))
    .then((response) => readImage(objectStorage, response))
    .then((imageData) => {
      if (null === imageData) {
        return "https://github.com/Fazendaaa/manga.up/blob/master/public/img/icons/android-chrome-pwa-512x512.png?raw=true";
      }

      return imageData;
    })
    .catch((error) => {
      console.error(error);

      return "https://github.com/Fazendaaa/manga.up/blob/master/public/img/icons/android-chrome-pwa-512x512.png?raw=true";
    });
};

const getChapterImages = async (
  chapter: IVolumesImages
): Promise<IChapterBlobContent[]> => {
  const base =
    "https://cors.proxy.fazenda.solutions/https://uploads.mangadex.org/data/";
  const links: string[] = [];
  const thumbDimensions = 150;

  for (const image of chapter["chapter"]["data"]) {
    links.push(`${base}${chapter["chapter"]["hash"]}/${image}`);
  }

  return Promise.all(
    links.map((link) =>
      fetch(API_PROXY.concat(link), {
        method: "GET",
        referrerPolicy: "no-referrer",
      })
        .then((response) => response.blob())
        .then(async (blob) => {
          const image = await blobToBase64(blob);
          const thumbnail = await resizeImage(
            image,
            thumbDimensions,
            thumbDimensions
          );
          const imageDimensions = await getImageDimensions(image);

          return {
            image: {
              data: blob,
              height: imageDimensions["height"],
              width: imageDimensions["width"],
            },
            thumbnail: {
              data: await base64ToBlob(thumbnail),
              height: thumbDimensions,
              width: thumbDimensions,
            },
          };
        })
    )
  );
};

export const cacheChapter = async (
  chapter: IVolumesImages
): Promise<IChapterContent[]> => {
  const objectStorage = "chapters";
  const id = chapter["chapter"]["hash"];
  const missing = [
    {
      image: MISSING_IMAGE,
      thumbnail: MISSING_IMAGE,
      height: 200,
      width: 200,
    },
  ];

  if ("undefined" === typeof id) {
    throw "Index for Local Storage ain't a valid one";
  }

  const data = await readChapter(objectStorage, id);

  if (null !== data) {
    return data;
  }

  return getChapterImages(chapter)
    .then((base64) => storeChapter(objectStorage, id, base64))
    .then((response) => readChapter(objectStorage, <string>response))
    .then((imageData) => {
      if (null === imageData) {
        return missing;
      }

      return imageData;
    })
    .catch((error) => {
      console.error(error);

      return missing;
    });
};

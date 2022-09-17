export interface Token {
  session: string;
  refresh: string;
}

export interface ResponseToken {
  result: string;
  token: Token;
}

export interface Search {
  id: string;
  type: string;
  related: string;
}

const API_PROXY =
  process.env.VUE_APP_CORS_PROXY || "https://cors.proxy.fazenda.solutions/";
const API_BASE = "https://api.mangadex.org/";
const API =
  "production" == process.env.NODE_ENV ? API_PROXY.concat(API_BASE) : API_BASE;
// const TOKEN = process.env.VUE_APP_MD_TOKEN_SESSION;
const BASIC_REQUEST: RequestInit = {
  cache: "default",
  referrer: "",
  referrerPolicy: "no-referrer",
  redirect: "follow",
};

const fetchMangaDex = async (
  endpoint: string,
  method: string,
  body: Record<string, unknown>
) =>
  fetch(API.concat(endpoint), {
    ...BASIC_REQUEST,
    ...{
      method,
      body: JSON.stringify({
        ...body,
        // token: TOKEN,
      }),
    },
  })
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.error("error", error));

const queryMangaDex = async (
  endpoint: string,
  params: Record<string, string> | string
) =>
  fetch(API.concat(endpoint, "?") + new URLSearchParams(params), {
    ...BASIC_REQUEST,
    ...{
      method: "GET",
    },
  })
    .then((response) => response.text())
    .then((result) => JSON.parse(result));

export const generateToken = async (
  username: string,
  password: string,
  email: string
) =>
  fetchMangaDex("auth/login/", "POST", {
    username,
    email,
    password,
  }).then((result: ResponseToken) => result["token"]);

export const refreshToken = async (token: string) =>
  fetchMangaDex("auth/refresh/", "POST", {
    token,
  }).then((result: ResponseToken) => result["token"]);

const getMangaID = async (title: string): Promise<Search[]> =>
  queryMangaDex("manga", {
    title,
    limit: "1",
  }).then((result) => result["data"][0]["relationships"]);

const getCoverID = async (mangaID: string) =>
  fetch(API.concat("cover/", mangaID), {
    method: "GET",
  })
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .then((result) => result["data"]);

// https://stackoverflow.com/a/61226119/7092954
const blobToBase64 = (blob: Blob): Promise<any> => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);

  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
};

const storeLocalStorage = (id: string, content: string): string => {
  localStorage.setItem(id, content);

  return id;
};

const readLocalStorage = (id: string) => localStorage.getItem(id);

const cacheImage = (path: string) => {
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

export const getMangaCover = async (manga: string) => {
  const data = await getMangaID(manga);
  const coverData = await getCoverID(data[2]["id"]);
  const mangaID = coverData["relationships"][0]["id"];
  const coverFilename = coverData["attributes"]["fileName"];
  const path = `https://uploads.mangadex.org/covers/${mangaID}/${coverFilename}.256.jpg`;

  return await cacheImage(path);
};

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

const API_PROXY = "https://cors.docker.localhost/";
const API_BASE = "https://api.mangadex.org/";
const API =
  "production" == process.env.NODE_ENV ? API_PROXY.concat(API_BASE) : API_BASE;
const TOKEN = process.env.VUE_APP_MD_TOKEN_SESSION;
const BASIC_REQUEST: RequestInit = {
  redirect: "follow",
  headers: {
    "Content-Type": "application/json",
  },
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
        token: TOKEN,
      }),
    },
  })
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.error("error", error));

const getMangaDex = async (
  endpoint: string,
  params: Record<string, string> | string
) =>
  fetch(API.concat(endpoint, "?") + new URLSearchParams(params))
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
  getMangaDex("manga", {
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

export const getMangaCover = async (manga: string) => {
  const data = await getMangaID(manga);
  const coverData = await getCoverID(data[2]["id"]);
  const mangaID = coverData["relationships"][0]["id"];
  const coverFilename = coverData["attributes"]["fileName"];

  return `https://uploads.mangadex.org/covers/${mangaID}/${coverFilename}.256.jpg`;
};

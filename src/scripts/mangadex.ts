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

const API = "https://api.mangadex.org/";

const fetchMangaDex = async (endpoint: string, method: string, body: string) =>
  fetch(API.concat(endpoint), {
    method,
    redirect: "follow",
    headers: {
      "Content-Type": "application/json",
    },
    body,
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
  fetchMangaDex(
    "auth/login/",
    "POST",
    JSON.stringify({
      username,
      email,
      password,
    })
  ).then((result: ResponseToken) => result["token"]);

export const refreshToken = async (token: string) =>
  fetchMangaDex(
    "auth/refresh/",
    "POST",
    JSON.stringify({
      token,
    })
  ).then((result: ResponseToken) => result["token"]);

const getMangaID = async (title: string): Promise<Search[]> =>
  getMangaDex("manga", {
    title,
    limit: "1",
  }).then((result) => result["data"][0]["relationships"]);

const getCoverID = async (mangaID: string) =>
  fetch(API.concat("cover/", mangaID), {
    method: "GET",
    redirect: "follow",
    headers: {
      "Content-Type": "application/json",
    },
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

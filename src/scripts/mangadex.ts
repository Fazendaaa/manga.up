export interface Token {
  session: string;
  refresh: string;
}

export interface ResponseToken {
  result: string;
  token: Token;
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
    .catch((error) => console.log("error", error));

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

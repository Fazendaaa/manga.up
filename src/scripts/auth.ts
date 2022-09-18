import { fetchMangaDex } from "./API";

export interface Token {
  session: string;
  refresh: string;
}

export interface ResponseToken {
  result: string;
  token: Token;
}

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

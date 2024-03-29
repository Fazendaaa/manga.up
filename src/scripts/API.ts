export const API_PROXY = process.env.VUE_APP_CORS_PROXY || "";
const API_BASE = "https://api.mangadex.org/";
export const API =
  "production" == process.env.NODE_ENV || API_PROXY
    ? API_PROXY.concat(API_BASE)
    : API_BASE;
const BASIC_REQUEST: RequestInit = {
  cache: "default",
  referrer: "",
  referrerPolicy: "no-referrer",
  redirect: "follow",
};

export const fetchMangaDex = async (
  endpoint: string,
  method: string,
  body?: Record<string, unknown>
) => {
  const basicRequest = {
    ...BASIC_REQUEST,
    ...{
      method,
    },
  };
  let toRequest: RequestInit = basicRequest;

  if (undefined !== body) {
    toRequest = {
      ...basicRequest,
      ...{
        body: JSON.stringify({
          ...body,
        }),
      },
    };
  }

  return fetch(API.concat(endpoint), toRequest)
    .then((response) => {
      if (200 !== response.status) {
        throw new Error("Wrong response code");
      }

      return response.text();
    })
    .then(JSON.parse)
    .catch(console.error);
};

export const queryMangaDex = async (
  endpoint: string,
  params:
    | string
    | URLSearchParams
    | Record<string, string>
    | string[][]
    | undefined
) => {
  return fetch(API.concat(endpoint, "?") + new URLSearchParams(params), {
    ...BASIC_REQUEST,
    ...{
      method: "GET",
    },
  })
    .then((response) => {
      if (200 !== response.status) {
        throw new Error("Error while GETting data");
      }

      return response.text();
    })
    .then((result) => {
      if ("" === result) {
        throw new Error("Empty response while queryMangaDex");
      }

      return JSON.parse(result);
    })
    .catch(console.error);
};

import { API, queryMangaDex, fetchMangaDex } from "./API";
import { cacheChapterImages, cacheImage } from "./cache";
import {
  ContentRating,
  IAggregate,
  ICover,
  IManga,
  IMangaStatistics,
  IMangaStatisticsResult,
  IVolumesImages,
} from "./types";
import { MISSING_IMAGE } from "./utils";

const getCover = async (ID: string): Promise<ICover> => {
  if ("" === ID) {
    throw new Error("Missing ID");
  }

  return fetch(API.concat("cover/", ID), {
    method: "GET",
  })
    .then((response) => {
      if (200 !== response.status) {
        throw new Error("Failed response while fetching cover");
      }

      return response.text();
    })
    .then((result) => {
      if ("" === result) {
        throw new Error("Empty response while fetching cover");
      }

      return JSON.parse(result);
    })
    .then((result) => {
      return result["data"];
    })
    .catch((error) => {
      console.error(error);

      throw error;
    });
};

const addLinksData = (manga: IManga): IManga => {
  const links = manga.attributes.links;

  links.mangaDex = `https://mangadex.org/title/${manga.id}`;

  if ("al" in links) {
    links.al = `https://anilist.com/manga/${links.al}`;
  }
  if ("ap" in links) {
    links.ap = `https://www.anime-planet.com/manga/${links.ap}`;
  }
  if ("bw" in links) {
    links.bw = `https://bookwalker.jp/${links.bw}`;
  }
  if ("mu" in links) {
    links.mu = `https://www.mangaupdates.com/series.html?id=${links.mu}`;
  }
  if ("nu" in links) {
    links.nu = `https://www.novelupdates.com/series/${links.nu}`;
  }
  if ("kt" in links) {
    links.kt = `https://kitsu.io/api/edge/manga/${links.kt}`;
  }
  if ("ebj" in links) {
    links.ebj = `https://anilist.com/manga/${links.ebj}`;
  }
  if ("mal" in links) {
    links.mal = `https://myanimelist.net/manga/${links.mal}`;
  }

  manga.attributes.links = links;

  return manga;
};

const fetchGetManga = async (endpoint: string) =>
  fetchMangaDex(endpoint, "GET");

export const searchMangaCoverPreview = async (
  mangaID: string,
  coverID: string
): Promise<string> => {
  if ("" === mangaID || "" === coverID) {
    return MISSING_IMAGE;
  }

  return getCover(coverID)
    .then((data) => {
      const coverFilename = data["attributes"]["fileName"];

      return `https://uploads.mangadex.org/covers/${mangaID}/${coverFilename}.256.jpg`;
    })
    .then((result) => cacheImage("covers", result))
    .catch((error) => {
      console.error(error);

      return MISSING_IMAGE;
    });
};

export const getRandomMangas = async (
  includes: string[],
  contentRating: ContentRating[]
): Promise<IManga> => {
  const queryIncludes: string[] = [];
  const queryContentRating: string[] = [];

  includes.forEach((value) => queryIncludes.push(`includes%5B%5D=${value}`));
  contentRating.forEach((value) =>
    queryContentRating.push(`contentRating%5B%5D=${value}`)
  );

  const query = [queryIncludes, queryContentRating].join("&");

  return queryMangaDex("manga/random", query).then((result) => result["data"]);
};

export const searchManga = async (title: string): Promise<IManga[]> =>
  queryMangaDex("manga", {
    title,
    limit: "1",
  })
    .then((result) => {
      if (undefined !== result && "data" in result) {
        return result["data"];
      }

      throw new Error("Missing manga data");
    })
    .catch((error) => {
      console.error(error);

      throw new AggregateError("searchManga: ", error);
    });

export const getMangaIssues = async (
  mangaID: string,
  translations?: string[]
): Promise<IAggregate> => {
  const toTranslate =
    undefined === translations
      ? ""
      : translations.reduce(
          (previvous, current) =>
            `${previvous}translatedLanguage%5B%5D=${current}`,
          "?"
        );

  return fetchGetManga(
    `manga/${mangaID.toLowerCase()}/aggregate${toTranslate}`
  ).then((result) => result["volumes"]);
};

export const getManga = async (mangaID: string): Promise<IManga> =>
  fetchGetManga(`manga/${mangaID.toLowerCase()}`).then((result) =>
    addLinksData(result["data"])
  );

export const getChapterImages = async (chatperID: string) =>
  fetchGetManga(`at-home/server/${chatperID.toLowerCase()}?forcePort443=false`)
    .then((result: IVolumesImages) => {
      if (
        undefined !== result &&
        "result" in result &&
        "ok" === result["result"]
      ) {
        return result;
      }

      throw new Error("Getting chapter");
    })
    .then(cacheChapterImages);

export const getMangaStatistics = async (
  mangaID: string
): Promise<IMangaStatistics> =>
  fetchGetManga(`statistics/manga/${mangaID.toLowerCase()}`).then(
    (result: IMangaStatisticsResult) => {
      if (
        undefined !== result &&
        "result" in result &&
        "ok" === result["result"]
      ) {
        return result["statistics"];
      }

      throw new Error("Getting statistics");
    }
  );

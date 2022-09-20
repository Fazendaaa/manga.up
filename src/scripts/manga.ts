import { API, queryMangaDex, fetchMangaDex } from "./API";
import { cacheChapter, cacheImage } from "./cache";
import { IMangaStatistics, IMangaStatisticsResult } from "./types";
import { MISSING_IMAGE } from "./utils";

export type ContentRating =
  | "--"
  | "safe"
  | "suggestive"
  | "erotica"
  | "pornographic";

export type Status =
  | "ongoing"
  | "completed"
  | "published"
  | "hiatus"
  | "cancelled";

export type Languages = "en" | "ja";

export type Locale = "ja";

export type Demographic = "shounem";

export interface ITranslations {
  en: string;
}

export interface ILinks {
  mu: string;
  raw: string;
}

export interface TagAttribute {
  name: ITranslations;
  description: unknown[];
  group: "genre" | "theme";
  version: number;
}

export interface ITags {
  id: string;
  type: "tag";
  attributes: TagAttribute;
  relationships: unknown[];
}

export interface IMangaAttributes {
  title: ITranslations;
  altTitles: ITranslations[];
  description: ITranslations;
  isLocked: boolean;
  links: ILinks;
  originalLanguage: Languages;
  lastVolume: number | string | null;
  lastChapter: number | string | null;
  publicationDemographic: Demographic;
  status: Status;
  year: unknown;
  contentRating: ContentRating;
  tags: ITags[];
}

export interface IRelationships {
  id: string;
  type: "author" | "artist" | "cover_art";
}

export interface IManga {
  id: string;
  type: "manga";
  attributes: IMangaAttributes;
  relationships: IRelationships[];
}

export interface ICoverAttributes {
  createdAt: string;
  description: string;
  fileName: string;
  locale: Locale;
  updatedAt: string;
  version: number;
  volume: unknown;
}

export interface ICover {
  id: string;
  type: "cover_art";
  attributes: ICoverAttributes;
  relationships: IRelationships[];
}

export interface IChapter {
  id: string;
  chapter: string;
  count: number;
  others: string[];
}

export interface IVolumes {
  volume: string;
  count: number;
  chapters: IChapter;
}

export interface IAggregate {
  [issue: string]: IVolumes;
}

export interface IChapterImages {
  hash: string;
  data: string[];
  dataSaver: string[];
}

export interface IVolumesImages {
  result: string;
  baseURL: string;
  chapter: IChapterImages;
}

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

export const getMangaIssues = async (mangaID: string): Promise<IAggregate> =>
  fetchGetManga(`manga/${mangaID.toLowerCase()}/aggregate`).then(
    (result) => result["volumes"]
  );

export const getManga = async (mangaID: string): Promise<IManga> =>
  fetchGetManga(`manga/${mangaID.toLowerCase()}`).then(
    (result) => result["data"]
  );

export const getChapter = async (chatperID: string) =>
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
    .then(cacheChapter);

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

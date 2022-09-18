import { API, queryMangaDex } from "./API";
import { cacheImage } from "./cache";

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

const MISSING_IMAGE =
  "https://github.com/Fazendaaa/manga.up/blob/master/public/img/icons/android-chrome-pwa-512x512.png?raw=true";

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
    .then((result) => JSON.parse(result))
    .then((result) => result["data"])
    .catch((error) => {
      console.error(error);

      throw error;
    });
};

export const getMangaCoverPreview = async (
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
    .then(cacheImage)
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

export const getManga = async (title: string): Promise<IManga[]> =>
  queryMangaDex("manga", {
    title,
    limit: "1",
  }).then((result) => result["data"]);

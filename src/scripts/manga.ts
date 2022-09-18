import { API, queryMangaDex } from "./API";
import { cacheImage } from "./cache";

export interface Search {
  id: string;
  type: string;
  related: string;
}

export type ContentRating =
  | "--"
  | "safe"
  | "suggestive"
  | "erotica"
  | "pornographic";

export type Languages = "en" | "ja";

export type Demographic = "shounem";

export type Status = "ongoing";

export interface Title {
  en: string;
}

export interface Name {
  en: string;
}

export interface Description {
  en: string;
}

export interface Links {
  mu: string;
  raw: string;
}

export interface TagAttribute {
  name: Name;
  description: unknown[];
  group: "genre" | "theme";
  version: number;
}

export interface Tags {
  id: string;
  type: "tag";
  attributes: TagAttribute;
  relationships: unknown[];
}

export interface Attributes {
  title: Title;
  altTitles: Title[];
  description: Description;
  isLocked: boolean;
  links: Links;
  originalLanguage: Languages;
  lastVolume: unknown;
  lastChapter: unknown;
  publicationDemographic: Demographic;
  status: Status;
  year: unknown;
  contentRating: ContentRating;
  tags: Tags[];
}

export interface Relationships {
  id: string;
  type: "author" | "artist" | "cover_art";
}

export interface MangaSearch {
  id: string;
  type: "manga";
  attributes: Attributes;
  relationships: Relationships[];
}

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

export const getMangaCover = async (manga: string) => {
  const data = await getMangaID(manga);
  const coverData = await getCoverID(data[2]["id"]);
  const mangaID = coverData["relationships"][0]["id"];
  const coverFilename = coverData["attributes"]["fileName"];
  const path = `https://uploads.mangadex.org/covers/${mangaID}/${coverFilename}.256.jpg`;

  return await cacheImage(path);
};

export const getRandomMangas = async (
  includes: string[],
  contentRating: ContentRating[]
): Promise<MangaSearch> => {
  const queryIncludes: string[] = [];
  const queryContentRating: string[] = [];

  includes.forEach((value) => queryIncludes.push(`includes%5B%5D=${value}`));
  contentRating.forEach((value) =>
    queryContentRating.push(`contentRating%5B%5D=${value}`)
  );

  const query = [queryIncludes, queryContentRating].join("&");

  return queryMangaDex("manga/random", query).then((result) => result["data"]);
};

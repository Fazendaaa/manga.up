export interface IImageBlob {
  data: Blob;
  width: number;
  height: number;
}

export interface IChapterBlobContent {
  image: IImageBlob;
  thumbnail: IImageBlob;
}

export interface IChapterContent {
  image: string;
  thumbnail: string;
  width: number;
  height: number;
}

export interface IStatisticsRating {
  average: number;
  bayesian: number;
  distribution: {
    [index: string]: number;
  };
}

export interface IMangaStatisticsItem {
  rating: IStatisticsRating;
  follows: number;
}

export interface IMangaStatistics {
  [id: string]: IMangaStatisticsItem;
}

export interface IMangaStatisticsResult {
  result: string;
  statistics: IMangaStatistics;
}

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
  mangaDex: string;
  // anilist
  al?: string;
  // animeplanet
  ap?: string;
  // bookwalker.jp
  bw?: string;
  // mangaupdates
  mu?: string;
  // novelupdates
  nu?: string;
  // kitsu.io
  kt?: string;
  // amazon
  amz?: string;
  // ebookjapan
  ebj?: string;
  // myanimelist
  mal?: string;
  // CDJapan
  cdj?: string;
  // unknown
  raw?: string;
  // unknown
  engtl?: string;
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
  availableTranslatedLanguages: string[];
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

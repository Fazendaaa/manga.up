export type ContentRating = "safe" | "suggestive" | "erotica" | "pornographic";

export type Content =
  | "author"
  | "artist"
  | "cover_art"
  | "scanlation_group"
  | "user"
  | "manga";

export type Status =
  | "ongoing"
  | "completed"
  | "published"
  | "hiatus"
  | "cancelled";

export type Languages =
  | "en"
  | "ja"
  | "zh"
  | "zh-hk"
  | "pt-br"
  | "es"
  | "es-la"
  | "jp-ro"
  | "zh-ro";

export type Locale = "ja";

export type Demographic = "shounem" | "shoujo" | "josei" | "seinen";

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
  type: Content;
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

export interface IChapters {
  id: string;
  chapter: string;
  count: number;
  others: string[];
}

export interface IChaptersAggregate {
  [issue: number]: IChapters;
}

export interface IVolumes {
  volume: string;
  count: number;
  chapters: IChaptersAggregate;
}

export interface IVolumesAggregate {
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

export interface IChapterAttributes {
  volume: string;
  chapter: string;
  title: string;
  translatedLanguage: Languages;
  externalURL: string;
  publishedAt: string;
  readableAt: string;
  createdAt: string;
  updatedAt: string;
  pages: number;
  version: number;
}

export interface IChapter {
  id: string;
  type: "chapter";
  attributes: IChapterAttributes;
  relationships: IRelationships[];
}

export interface IRelativeIssues {
  volume: {
    previous: string;
    current: string;
    next: string;
  };
  chapter: {
    previous: string;
    current: string;
    next: string;
  };
}

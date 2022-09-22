import {
  getRandomMangas,
  searchMangaCoverPreview,
  searchManga,
  getManga,
  getChapter,
  getMangaIssues,
  getChapterImages,
  getMangaStatistics,
} from "./manga";
import { status } from "./server";
import {
  IManga,
  IRelationships,
  IVolumes,
  ILinks,
  IVolumesAggregate,
} from "./types";

export {
  IManga,
  IRelationships,
  IVolumes,
  ILinks,
  IVolumesAggregate,
  status,
  getRandomMangas,
  getChapter,
  searchMangaCoverPreview,
  searchManga,
  getManga,
  getMangaIssues,
  getChapterImages,
  getMangaStatistics,
};

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

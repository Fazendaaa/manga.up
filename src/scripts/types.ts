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

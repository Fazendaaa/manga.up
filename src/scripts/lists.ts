import { appendToDatabase } from "./database";

interface IReadlist {
  [id: string]: {
    added: boolean;
  };
}

export const addToReadList = async (mangaID: string): Promise<boolean> => {
  const toAdd: IReadlist = {};

  toAdd[mangaID] = {
    added: true,
  };

  return appendToDatabase("user", {}, "readlist", toAdd);
};

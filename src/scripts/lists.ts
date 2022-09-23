import { readFromDatabase, saveToDatabase, updateInDatabase } from "./database";

interface IReadlist {
  [id: string]: {
    added: boolean;
  };
}

export const addToReadList = async (mangaID: string): Promise<boolean> => {
  const objectStore = "user";
  const id = "readlist";
  const readlist = await readFromDatabase(objectStore, id);
  const toAdd: IReadlist = {};

  toAdd[mangaID] = {
    added: true,
  };

  return undefined === readlist
    ? saveToDatabase(objectStore, id, toAdd)
    : updateInDatabase(objectStore, id, {
        ...toAdd,
        ...(readlist.data as IReadlist),
      });
};

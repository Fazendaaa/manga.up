import { readFromDatabase, saveToDatabase, updateInDatabase } from "./database";

export interface IReadlist {
  [id: string]: {
    added: boolean;
  };
}

const OBJECT_STORE = "user";
const ID = "readlist";

export const addToReadList = async (mangaID: string): Promise<boolean> => {
  const readlist = await readFromDatabase(OBJECT_STORE, ID);
  const toAdd: IReadlist = {};

  toAdd[mangaID] = {
    added: true,
  };

  return undefined === readlist
    ? saveToDatabase(OBJECT_STORE, ID, toAdd)
    : updateInDatabase(OBJECT_STORE, ID, {
        ...toAdd,
        ...(readlist.data as IReadlist),
      });
};

export const getList = async (): Promise<IReadlist> =>
  (await readFromDatabase(OBJECT_STORE, ID))["data"] as IReadlist;

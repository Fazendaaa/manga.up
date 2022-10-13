import { readFromDatabase, saveToDatabase, updateInDatabase } from "./database";

export interface IReadingHistory {
  [id: string]: boolean;
}

export const readHistory = async (id: string): Promise<IReadingHistory> => {
  const parsedID = id.toLocaleLowerCase();

  return readFromDatabase("readingHistory", parsedID).then((response) => {
    if (undefined === response || undefined === response.data) {
      const entry = {};

      return saveToDatabase("readingHistory", parsedID, entry).then((value) => {
        return entry;
      });
    }

    return <IReadingHistory>response["data"];
  });
};

export const addToHistory = async (
  id: string,
  chapter: string
): Promise<IReadingHistory> => {
  const objectStorage = "readingHistory";
  const parsedID = id.toLocaleLowerCase();

  return readFromDatabase(objectStorage, parsedID).then((response) => {
    if (undefined === response || undefined === response.data) {
      const entry: IReadingHistory = {};

      entry[chapter] = true;

      return saveToDatabase(objectStorage, parsedID, entry).then((value) => {
        return entry;
      });
    }

    const data = <IReadingHistory>response["data"];

    data[chapter] = true;

    return updateInDatabase(objectStorage, parsedID, data).then((value) => {
      return data;
    });
  });
};

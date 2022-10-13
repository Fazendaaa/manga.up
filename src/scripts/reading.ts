import { readFromDatabase, saveToDatabase } from "./database";

export interface IReadingHistory {
  [id: string]: boolean;
}

export const readHistory = async (id: string): Promise<IReadingHistory> =>
  readFromDatabase("readingHistory", id).then((response) => {
    if (undefined === response || undefined === response.data) {
      const entry = {};

      return saveToDatabase("readingHistory", id, entry).then((value) => {
        return entry;
      });
    }

    return <IReadingHistory>response["data"];
  });

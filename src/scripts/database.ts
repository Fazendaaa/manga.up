import { IChapterBlobContent } from "./types";

export interface IDabaseData {
  id: string;
  data: unknown;
}

const INDEXED_DB = "indexedDB" in window ? window.indexedDB : undefined;

const handleDBError = (connection: IDBOpenDBRequest) => () => {
  const database = connection.result;
  return database;
};

const handleBlockedDBConnection = (connection: IDBOpenDBRequest) => () => {
  const database = connection.result;
  return database;
};

const handleDBVersions =
  (connection: IDBOpenDBRequest) => (event: IDBVersionChangeEvent) => {
    const database = connection.result;

    switch (event.oldVersion) {
      case 0:
        database.createObjectStore("covers", { keyPath: "id" });
        database.createObjectStore("chapters", { keyPath: "id" });
        // initDatabase
        break;
      case 1:
        // handleMigration
        break;
    }
  };

const handleDBConnection =
  (
    connection: IDBOpenDBRequest,
    resolve: (database: IDBDatabase) => void,
    reject: (error: Error) => void
  ) =>
  () => {
    const database = connection.result;

    database.onversionchange = () => {
      database.close();
      alert(
        "You opened another session in this browser while having a database \
update, please close both sessions and open only one"
      );
    };

    resolve(database);
  };

const initDatabase = () =>
  new Promise(
    (
      resolve: (database: IDBDatabase) => void,
      reject: (error: Error) => void
    ) => {
      if (undefined === INDEXED_DB) {
        return "";
      }

      const connection = INDEXED_DB.open("manga.up", 1);

      connection.onupgradeneeded = handleDBVersions(connection);
      connection.onsuccess = handleDBConnection(connection, resolve, reject);
      // connection.onerror = handleDBError(connection);
      // connection.onblocked = handleBlockedDBConnection(connection);
    }
  );

export const saveToDatabase = async (
  objectStore: string,
  id: string,
  data: string | Blob | Blob[] | IChapterBlobContent[]
): Promise<boolean> =>
  initDatabase()
    .then((database) => {
      const transaction = database.transaction(objectStore, "readwrite");
      const item = transaction.objectStore(objectStore);

      return item.add({
        id,
        data,
      });
    })
    .then(
      (response) =>
        new Promise((resolve, reject) => {
          response.onsuccess = () => {
            resolve(true);
          };
          response.onerror = () => {
            console.error("Error ", response.result);

            reject(new Error("Error while adding to database"));
          };
        })
    );

export const readFromDatabase = async (
  objectStore: string,
  id: string
): Promise<IDabaseData> =>
  initDatabase()
    .then((database) => {
      const transaction = database.transaction(objectStore, "readonly");
      const item = transaction.objectStore(objectStore);

      return item.get(id);
    })
    .then(
      (response) =>
        new Promise((resolve, reject) => {
          response.onsuccess = () => {
            resolve(response.result);
          };
          response.onerror = () => {
            console.error("Error ", response.result);

            reject(new Error(response.result));
          };
        })
    );

export const updateInDatabase = async (
  id: string,
  data: string | Blob
): Promise<boolean> => initDatabase().then((database) => true);

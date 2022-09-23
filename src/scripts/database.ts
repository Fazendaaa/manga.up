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
        database.createObjectStore("user", { keyPath: "id" });
        break;
      case 1:
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

const availableKey = async (request: IDBRequest): Promise<boolean> =>
  new Promise((resolve, reject) => {
    request.onsuccess = () => {
      resolve(true);
    };

    request.onerror = () => {
      resolve(false);
    };
  });

const addItem = async (request: IDBRequest): Promise<boolean> =>
  new Promise((resolve, reject) => {
    request.onsuccess = () => {
      resolve(true);
    };

    request.onerror = () => {
      reject(new Error("Failure while adding data to db"));
    };
  });

export type AllowedRecord =
  | string
  | Blob
  | Blob[]
  | IChapterBlobContent[]
  | Record<any, any>;

export const saveToDatabase = async (
  objectStore: string,
  id: string,
  data: AllowedRecord
): Promise<boolean> => {
  const database = await initDatabase();
  const transaction = database.transaction(objectStore, "readwrite");
  const store = transaction.objectStore(objectStore);
  const isAvailable = await availableKey(store.get(id));

  if (false === isAvailable) {
    return true;
  }

  return addItem(
    store.add({
      id,
      data,
    })
  );
};

const appendValue = async (
  request: IDBRequest,
  data: AllowedRecord
): Promise<boolean> =>
  new Promise((resolve, reject) => {
    request.onsuccess = () => {
      console.log("request.result:");
      console.log(request.result);
      resolve(true);
    };

    request.onerror = () => {
      reject(new Error("Failure while adding data to db"));
    };
  });

export const appendToDatabase = async (
  objectStore: string,
  initial: AllowedRecord,
  id: string,
  data: AllowedRecord
): Promise<boolean> => {
  const database = await initDatabase();
  const transaction = database.transaction(objectStore, "readwrite");
  const store = transaction.objectStore(objectStore);
  const request = store.get(id);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      if (undefined === request.result) {
        const init = store.add({
          id,
          data: initial,
        });

        init.onerror = () => resolve(false);
        init.onsuccess = () => {
          const result = store.get(id);

          result.onsuccess = () => {
            resolve(appendValue(result.result, data));
          };
        };
      } else {
        console.log(request.result);
        resolve(appendValue(request, data));
      }
    };
  });
};

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

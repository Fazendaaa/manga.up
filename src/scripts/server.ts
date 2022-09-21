import { API } from "./API";

export const status = async (): Promise<boolean> =>
  fetch(API.concat("ping")).then((response) => {
    if (200 !== response.status) {
      return false;
    }

    if (false === response.ok) {
      return false;
    }

    return true;
  });

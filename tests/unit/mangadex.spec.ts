// import { searchMangaCover } from "@/scripts/mangadex";
import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();

describe("Covers", () => {
  test("Bleach Cover", async () => {
    fetchMock.mockResponseOnce("", { status: 200 });

    // expect(await searchMangaCover("Bleach")).toBe();
  });
});

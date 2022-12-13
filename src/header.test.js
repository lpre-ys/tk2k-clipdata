import { getEmptyData, getHeader } from "./header";

describe("getHeader", () => {
  test('type is "ANIME_FRAME", then return ANIME_FRAME header', () => {
    const result = getHeader("ANIME_FRAME");
    expect(result).toEqual({
      celList: 1,
    });
  });
  test('type is "ANIME", then return ANIME header', () => {
    const result = getHeader("ANIME");
    expect(result).toEqual({
      title: 1,
      material: 2,
      effectList: 6,
      target: 9,
      yLine: 10,
      frameList: 12,
    });
  });
});

describe("getEmptyData", () => {
  test('type is "ANIME_FRAME", then return ANIME FRAME empty data', () => {
    const result = getEmptyData("ANIME_FRAME");
    expect(result).toEqual({
      celList: {
        no: 1,
        raw: [],
      },
    });
  });
  test('type is "ANIME", then return ANIME empty data', () => {
    const result = getEmptyData("ANIME");
    expect(result).toEqual({
      title: { no: 1, raw: [] },
      material: { no: 2, raw: [] },
      effectList: { no: 6, raw: [] },
      target: { no: 9, raw: [] },
      yLine: { no: 10, raw: [] },
      frameList: { no: 12, raw: [] },
    });
  });
});

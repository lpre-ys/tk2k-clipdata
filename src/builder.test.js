import { buildRawData } from "./builder";

test("no Data(raw)", () => {
  const data = {
    no: 18,
    raw: [1, 2, 3, 4],
  };

  const result = buildRawData({ 18: data });
  expect(result).toEqual([
    ...[7, 0, 0, 0, 1, 0, 0, 0],
    ...[18, 4, 1, 2, 3, 4],
    0,
  ]);
});

test("string", () => {
  const data = {
    no: 42,
    data: "テスト表現チェック",
    raw: [],
  };

  const result = buildRawData({ 42: data });
  expect(result).toEqual([
    ...[21, 0, 0, 0, 1, 0, 0, 0],
    ...[
      42, 18, 131, 101, 131, 88, 131, 103, 149, 92, 140, 187, 131, 96, 131, 70,
      131, 98, 131, 78,
    ],
    0,
  ]);
});

describe("List", () => {
  describe('has data', () => {

    test("length is 1", () => {
      const data = {
        no: 7,
        data: [
          {
            id: 11,
            data: {
              21: {
                no: 21,
                raw: [1, 2, 3, 4],
              },
            },
          },
        ],
        raw: [],
      };

      const result = buildRawData({ 7: data });
      expect(result).toEqual([
        ...[12, 0, 0, 0, 1, 0, 0, 0],
        ...[7, 9, 1, ...[11, 21, 4, 1, 2, 3, 4, 0], 0],
      ]);
    });
    test("length is 2", () => {
      const data = {
        no: 91,
        data: [
          {
            id: 11,
            data: {
              21: {
                no: 21,
                raw: [1, 2, 3, 4],
              },
            },
          },
          {
            id: 12,
            data: {
              22: {
                no: 22,
                raw: [5, 6, 7, 8],
              },
            },
          },
        ],
        raw: [],
      };

      const result = buildRawData({ 7: data });
      expect(result).toEqual([
        ...[20, 0, 0, 0, 1, 0, 0, 0],
        ...[91, 17, 2,
          ...[11, 21, 4, 1, 2, 3, 4, 0],
          ...[12, 22, 4, 5, 6, 7, 8, 0],
          0],
      ]);
    });
  });
  describe('has raw', () => {
    test('length is 1', () => {
      const data = {
        no: 7,
        data: [
          {
            id: 11,
            raw: [21, 4, 1, 2, 3, 4, 0],
          },
        ],
        raw: [],
      };

      const result = buildRawData({ 7: data });
      expect(result).toEqual([
        ...[12, 0, 0, 0, 1, 0, 0, 0],
        ...[7, 9, 1, ...[11, 21, 4, 1, 2, 3, 4, 0], 0],
      ]);
    })
  })
});

test("Multi Data", () => {
  const data1 = {
    no: 18,
    raw: [1, 2, 3, 4],
  };
  const data2 = {
    no: 42,
    data: "テスト表現チェック",
    raw: [],
  };
  const result = buildRawData({ 18: data1, 42: data2 });
  expect(result).toEqual([
    ...[27, 0, 0, 0, 1, 0, 0, 0],
    ...[18, 4, 1, 2, 3, 4],
    ...[
      42, 18, 131, 101, 131, 88, 131, 103, 149, 92, 140, 187, 131, 96, 131, 70,
      131, 98, 131, 78,
    ],
    0,
  ]);
});

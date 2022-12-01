import { parseList, parseObject, parseString } from "./parser";

describe("parseString", () => {
  test("TypeArray to Shift jis String", () => {
    // text: テスト表現チェック
    const data = new Uint8Array([
      131, 101, 131, 88, 131, 103, 149, 92, 140, 187, 131, 96, 131, 70, 131, 98,
      131, 78,
    ]);

    const result = parseString(data);
    expect(result).toBe("テスト表現チェック");
  });
});

describe("parseObject", () => {
  test("1 object", () => {
    const data = new Uint8Array([42, 3, 1, 2, 3, 0]);

    const result = parseObject(data);
    expect(result[42].no).toBe(42);
    expect(result[42].raw).toEqual(new Uint8Array([1, 2, 3]));
    expect(result.length).toBe(6);
  });
  test("2 object", () => {
    const data = new Uint8Array([
      1, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 2, 5, 1, 2, 3, 4, 5, 0,
    ]);

    const result = parseObject(data);
    expect(result[1].no).toBe(1);
    expect(result[1].raw).toEqual(
      new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    );
    expect(result[2].no).toBe(2);
    expect(result[2].raw).toEqual(new Uint8Array([1, 2, 3, 4, 5]));
    expect(result.length).toBe(20);
  });
});

describe("parseList", () => {
  test("length 0 list", () => {
    // List id 1x, Object id 2x
    const data = new Uint8Array([1, 0]);

    const result = parseList(data);
    expect(result).toHaveLength(0);
  });
  test("length 1 list", () => {
    // List id 1x, Object id 2x
    const data = new Uint8Array([1, 11, 21, 3, 1, 2, 3, 0]);

    const result = parseList(data);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(11);
    expect(result[0].data[21].no).toBe(21);
  });
  test("length 2 list", () => {
    // List id 1x, Object id 2x
    const data = new Uint8Array([2, 11, 21, 3, 1, 2, 3, 0, 12, 21, 3, 1, 2, 3, 0]);

    const result = parseList(data);
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe(11);
    expect(result[0].data[21].no).toBe(21);
    expect(result[1].id).toBe(12);
    expect(result[1].data[21].no).toBe(21);
  });
});

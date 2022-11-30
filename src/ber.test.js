import { intToBer, berToIntData } from "./ber";

describe("read", () => {
  test("[0, 1, 1, 1], then result is 0, length is 1", () => {
    const result = berToIntData([0, 1, 1, 1]);

    expect(result.length).toBe(1);
    expect(result.result).toBe(0);
  });
  test("[42, 1, 1, 1], then result is 42, length is 1", () => {
    const result = berToIntData([42, 1, 1, 1]);

    expect(result.length).toBe(1);
    expect(result.result).toBe(42);
  });
  describe("plus", () => {
    test("[1, 1, 1, 1], then result is 1, length is 1", () => {
      const result = berToIntData([1, 1, 1, 1]);

      expect(result.length).toBe(1);
      expect(result.result).toBe(1);
    });
    test("[127, 0, 1, 1], then result is 127, length is 1", () => {
      const result = berToIntData([127, 0, 1, 1]);
      expect(result.length).toBe(1);
      expect(result.result).toBe(127);
    });
    test("[129, 0, 1, 1], then result is 128, length is 2", () => {
      const result = berToIntData([129, 0, 1, 1]);
      expect(result.length).toBe(2);
      expect(result.result).toBe(128);
    });
    test("[129, 1, 1, 1], then result is 129, length is 2", () => {
      const result = berToIntData([129, 1, 1, 1]);
      expect(result.length).toBe(2);
      expect(result.result).toBe(129);
    });
    test("[255, 127, 1, 1], then result is 16383, length is 2", () => {
      const result = berToIntData([255, 127, 1, 1]);
      expect(result.length).toBe(2);
      expect(result.result).toBe(16383);
    });
    test("[129, 128, 0, 1], then result is 16384, length is 3", () => {
      const result = berToIntData([129, 128, 0, 1]);
      expect(result.length).toBe(3);
      expect(result.result).toBe(16384);
    });
    test("[129, 128, 1, 1], then result is 16385, length is 3", () => {
      const result = berToIntData([129, 128, 1, 1]);
      expect(result.length).toBe(3);
      expect(result.result).toBe(16385);
    });
  });
  describe("minus", () => {
    test("[143, 255, 255, 255, 127, 1, 1, 1], then result is -1, length is 5", () => {
      const result = berToIntData([143, 255, 255, 255, 127, 1, 1, 1]);
      expect(result.length).toBe(5);
      expect(result.result).toBe(-1);
    });
    test("[143, 255, 255, 255, 126, 1, 1, 1], then result is -2, length is 5", () => {
      const result = berToIntData([143, 255, 255, 255, 126, 1, 1, 1]);
      expect(result.length).toBe(5);
      expect(result.result).toBe(-2);
    });
  });
});

describe("write", () => {
  test("0 to [0]", () => {
    const result = intToBer(0);
    expect(result).toEqual([0]);
  });
  test("42 to [42]", () => {
    expect(intToBer(42)).toEqual([42]);
  });
  describe("plus", () => {
    test("1 to [1]", () => {
      expect(intToBer(1)).toEqual([1]);
    });
    test("127 to [127]", () => {
      expect(intToBer(127)).toEqual([127]);
    });
    test("128 to [129, 0]", () => {
      expect(intToBer(128)).toEqual([129, 0]);
    });
    test("129 to [129, 1]", () => {
      expect(intToBer(129)).toEqual([129, 1]);
    });
    test("16383 to [255, 127]", () => {
      expect(intToBer(16383)).toEqual([255, 127]);
    });
    test("16384 to [129, 128, 0]", () => {
      expect(intToBer(16384)).toEqual([129, 128, 0]);
    });
    test("16385 to [129, 128, 1]", () => {
      expect(intToBer(16385)).toEqual([129, 128, 1]);
    });
  });
  describe("minus", () => {
    test("-1 to [143, 255, 255, 255, 127]", () => {
      expect(intToBer(-1)).toEqual([143, 255, 255, 255, 127]);
    });
    test("-2 to [143, 255, 255, 255, 126]", () => {
      expect(intToBer(-2)).toEqual([143, 255, 255, 255, 126]);
    });
  });
});

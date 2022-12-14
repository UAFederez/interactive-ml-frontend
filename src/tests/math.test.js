import { describe, expect, it } from "vitest";
import { dotProduct, generateRange, setProduct } from "../utils/math";

describe("#dotProduct", () => {
  it("returns 0 for empty arrays", () => {
    expect(dotProduct([], [])).toBe(0);
  });

  it("returns 0 when at least one of the arrays are empty", () => {
    expect(dotProduct([], [1, 2, 3])).toBe(0);
    expect(dotProduct([1, 2, 3], [])).toBe(0);
  });

  it("correctly computes the dot product same-length vectors", () => {
    expect(dotProduct([1, 2, 3], [4, 5, 6])).toBe(32);
    expect(dotProduct([1, -2, 3], [4, -5, 6])).toBe(32);
    expect(dotProduct([1, 2, 3], [4, -5, 6])).toBe(12);
  });
});

describe("#setProduct", () => {
  it("returns an empty array when both arrays are empty", () => {
    expect(setProduct([], [])).toStrictEqual([]);
  });
  it("returns an empty array when one of the arrays is empty", () => {
    expect(setProduct([1, 2, 3], [])).toStrictEqual([]);
    expect(setProduct([], [1, 2, 3])).toStrictEqual([]);
  });
  it("correctly computes the cartesian product of two arrays", () => {
    // When arrays are of equal length
    expect(setProduct([1, 2], [3, 4])).toStrictEqual([
      [1, 3],
      [1, 4],
      [2, 3],
      [2, 4],
    ]);
    expect(setProduct([3, 4], [1, 2])).toStrictEqual([
      [3, 1],
      [3, 2],
      [4, 1],
      [4, 2],
    ]);

    // When the arrays are of unequal length
    expect(setProduct([1, 2], [3])).toStrictEqual([
      [1, 3],
      [2, 3],
    ]);
    expect(setProduct([3], [1, 2])).toStrictEqual([
      [3, 1],
      [3, 2],
    ]);
  });
});

describe("#generateRange", () => {
  it("returns an empty array when left == right", () => {
    expect(generateRange(1, 1, 100)).toStrictEqual([]);
  });

  it("returns the correct number of points", () => {
    expect(generateRange(1, 2, 100).length).toBe(100);
    expect(generateRange(2, 1, 100).length).toBe(100);
  });

  it("returns elements within [left, right) when left < right", () => {
    generateRange(1, 2, 100).forEach((x) => {
      expect(x).toBeGreaterThanOrEqual(1);
      expect(x).toBeLessThan(2);
    });
  });

  it("returns elements within (left, right] when left > right", () => {
    generateRange(2, 1, 100).forEach((x) => {
      expect(x).toBeGreaterThan(1);
      expect(x).toBeLessThanOrEqual(2);
    });
  });
});

import { getSurrounding, getFullNum, getSurroundingNums } from "./3-2";

test("getSurrounding single x,y", () => {
  const got = getSurrounding(4, 2);
  const want = [
    [3, 2],
    [5, 2],
    [3, 1],
    [3, 3],
    [4, 1],
    [4, 3],
    [5, 1],
    [5, 3],
  ];
  expect(got).toEqual(want);
});

test.each([2, 3, 4])("getFullNum: %i", (i) => {
  const line = "..593...";
  const got = getFullNum(line, i);
  const want = [593, [2, 3, 4]];
  expect(got).toEqual(want);
});

test("getSurroundingNums: 4 nums", () => {
  const lines = ["45.67", "..*3.", "225.."];
  const got = getSurroundingNums(2, lines);
  const want = [3, 45, 225, 67];
  expect(got).toEqual(want);
});

test("getSurroundingNums: same 2 nums", () => {
  const lines = ["..23.", "..*..", ".23.."];
  const got = getSurroundingNums(2, lines);
  const want = [23, 23];
  expect(got).toEqual(want);
});

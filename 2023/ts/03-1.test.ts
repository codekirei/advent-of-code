import { getSurrounding } from "./03-1";

test("getSurrounding single x,y", () => {
  const got = getSurrounding(4, 4, 2);
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

test("getSurround range x,y", () => {
  const got = getSurrounding(3, 5, 7);
  const want = [
    [2, 7],
    [6, 7],
    [2, 6],
    [2, 8],
    [3, 6],
    [3, 8],
    [4, 6],
    [4, 8],
    [5, 6],
    [5, 8],
    [6, 6],
    [6, 8],
  ];
  expect(got).toEqual(want);
});

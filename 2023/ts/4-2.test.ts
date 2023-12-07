import { incrFirstN, default as main } from "./4-2";

test("incrFirstN", () => {
  const arr = [0, 0, 0, 0, 0];
  incrFirstN(arr, 3);
  const want = [1, 1, 1, 0, 0];
  expect(arr).toEqual(want);
});

test("incrFirstN by x", () => {
  const arr = [1, 1, 1, 1, 0];
  incrFirstN(arr, 3, 3);
  const want = [4, 4, 4, 1, 0];
  expect(arr).toEqual(want);
});

test("correct solution", () => {
  const got = main();
  const want = 5489600;
  expect(got).toEqual(want);
});

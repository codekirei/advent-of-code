import { default as main } from "./22-1";

test("correct solution", () => {
  const got = main();
  const want = 463;
  expect(got).toEqual(want);
});

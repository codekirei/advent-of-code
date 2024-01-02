import { default as main } from "./8-1";

test("correct solution", async () => {
  const got = await main();
  const want = 16697;
  expect(got).toEqual(want);
});

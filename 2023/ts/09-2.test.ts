import { default as main } from "./09-2";

test("correct solution", async () => {
  const got = await main();
  const want = 1131;
  expect(got).toEqual(want);
});

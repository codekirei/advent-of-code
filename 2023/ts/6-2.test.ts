import { default as main } from "./6-2";

test("correct solution", async () => {
  const got = await main();
  const want = 41382569;
  expect(got).toEqual(want);
});

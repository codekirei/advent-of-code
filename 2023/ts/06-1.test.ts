import { default as main } from "./06-1";

test("correct solution", async () => {
  const got = await main();
  const want = 840336;
  expect(got).toEqual(want);
});

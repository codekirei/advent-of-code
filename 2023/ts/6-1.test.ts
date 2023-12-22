import { default as main } from "./6-1";

test("correct solution", async () => {
  const got = await main();
  const want = 840336;
  expect(got).toEqual(want);
});

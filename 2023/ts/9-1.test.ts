import { default as main } from "./9-1";

test("correct solution", async () => {
  const got = await main();
  const want = 1955513104;
  expect(got).toEqual(want);
});

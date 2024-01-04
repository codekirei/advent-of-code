import { default as main } from "./10-1";

test("correct solution", async () => {
  const got = await main();
  const want = 6864;
  expect(got).toEqual(want);
});

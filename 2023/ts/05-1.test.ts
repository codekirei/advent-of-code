import { createMap, readMap, readMaps, default as main } from "./05-1";

const map = [
  [98, 99, -48],
  [50, 97, 2],
];

const maps = [map, [[50, 52, 4]]];

test("createMap", () => {
  const arr = [
    [50, 98, 2],
    [52, 50, 48],
  ];
  const got = createMap(arr);
  expect(got).toEqual(map);
});

test.each([
  [1, 1],
  [50, 52],
  [97, 99],
  [98, 50],
  [100, 100],
])("convert: %i to %i", (input, want) => {
  const got = readMap(input, map);
  expect(got).toEqual(want);
});

test("readMaps", () => {
  const got = readMaps(98, maps);
  const want = 54;
  expect(got).toEqual(want);
});

test("correct solution", () => {
  const got = main();
  const want = 551761867;
  expect(got).toEqual(want);
});

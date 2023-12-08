import { readFile } from "fs/promises";

// Utility Functions and Setup -------------------------------------------------

// input format:
//   [dest_start, src_start, range_count]
// output format:
//   [src_start, src_end, src_to_dest_delta]
export const createMap = (input: number[][]): number[][] => {
  return input.map(([a, b, c]) => [b, b + c - 1, a - b]);
};

export const readMap = (src: number, map: number[][]): number => {
  for (const [min, max, delta] of map) {
    if (src > max || src < min) continue;
    return src + delta;
  }
  return src;
};

export const readMaps = (src: number, maps: number[][][]): number => {
  return maps.reduce((accum, map) => readMap(accum, map), src);
};

// Parse and Evaluate Input ----------------------------------------------------
const input = await readFile("./5.input.txt", { encoding: "utf8" });
const maps: number[][][] = [];
let seeds: number[];

const sections = input.trim().split("\n\n");

const parseSeeds = (raw: string) => {
  seeds = raw
    .split(" ")
    .slice(1)
    .map((str) => parseInt(str));
};

parseSeeds(sections.shift());

const parseMap = (raw: string) => {
  const lines = raw.split("\n").slice(1);
  maps.push(
    createMap(lines.map((line) => line.split(" ").map((str) => parseInt(str)))),
  );
};

sections.forEach((raw: string) => parseMap(raw));

export default function main() {
  const locations = seeds.map((seed: number) => readMaps(seed, maps));
  return Math.min(...locations);
}

// sort by lowest z
// drop the block to min z
// look for collisions
// if collisions n == 1, make that block as unsafe to disint
// return (total blocks - unsafe to disint)

import { readInput } from "./utils";

const input = await readInput("22");
const blocks = input.trim().split("\n");
const blocksCt = blocks.length;

const canDisintegrate = {};

type Coord = {
  x: number;
  y: number;
  z: number;
};

type Block = {
  key: string;
  id: number;
  x0: number;
  y0: number;
  z0: number;
  x1: number;
  y1: number;
  z1: number;
};

let maxX = 0;
let maxY = 0;

const findPoints = (
  x0: number,
  y0: number,
  z0: number,
  x1: number,
  y1: number,
  z1: number,
): Coord[] => {
  const points = [];

  points.push({ x: x0, y: y0, z: z0 });

  if (x1 > x0) {
    for (let i = x0 + 1; i <= x1; ++i) {
      points.push({ x: i, y: y0, z: z0 });
    }
  }

  if (y1 > y0) {
    for (let i = y0 + 1; i <= y1; ++i) {
      points.push({ x: x0, y: i, z: z0 });
    }
  }

  if (z1 > z0) {
    for (let i = z0 + 1; i <= z1; ++i) {
      points.push({ x: x0, y: y0, z: i });
    }
  }

  return points;
};

const rawToBlock = (raw: string, i: number): Block => {
  const [p0, p1] = raw.split("~");
  const [x0, y0, z0] = p0.split(",").map((s) => parseInt(s));
  const [x1, y1, z1] = p1.split(",").map((s) => parseInt(s));

  if (x0 > maxX) maxX = x0;
  if (x1 > maxX) maxX = x1;
  if (y0 > maxY) maxY = y0;
  if (y1 > maxY) maxY = y0;

  return {
    key: raw,
    id: i,
    x0,
    y0,
    z0,
    x1,
    y1,
    z1,
  };
};

const sortBlocks = (a: Block, b: Block) => {
  return a.z0 - b.z0;
};

const createLayer = (x: number, y: number) => {
  const row = Array(x).fill(null);
  return Array(y).fill(row);
};

const grid3d = [];

export default function main() {
  const orderedBlocks = blocks.map(rawToBlock).sort(sortBlocks);
  const stack = () => grid3d.push(createLayer(maxX + 1, maxY + 1));
}

main();

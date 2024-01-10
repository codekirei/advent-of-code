// sort by lowest z
// drop the block to min z
// look for collisions

import { readInput } from "./utils";

const input = await readInput("22");
const raw = input.trim().split("\n");

// const idToSupportedCt = {};
// const incrSupported = (id: number) => {
//   idToSupportedCt[id] = idToSupportedCt.hasOwnProperty(id)
//     ? idToSupportedCt[id] + 1
//     : 1;
// };

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

type NodeT = {
  height: number;
  id: number;
};

const grid: NodeT[][] = [];

const prepGrid = (x: number, y: number) => {
  const createNode = (): NodeT => ({ height: 0, id: null });
  const createRow = () => Array(x).fill(null).map(createNode);
  grid.push(...Array(y).fill(null).map(createRow));
};

const dropTall = (block: Block) => {
  const { x0, y0, z0, z1, id } = block;

  const node = grid[y0][x0];

  const supportingBlock = node.id;
  if (supportingBlock) {
    // TODO: handle collision for disintegrate detection
  }

  node.height = node.height + z1 - z0 + 1;
  node.id = id;
};

const dropFlat = (block: Block) => {};

const dropBlock = (block: Block) => {
  if (block.z1 > block.z0) {
    dropTall(block);
  } else {
    dropFlat(block);
  }
};

export default function main() {
  const blocks = raw.map(rawToBlock);
  prepGrid(maxX + 1, maxY + 1);

  blocks.sort(sortBlocks).forEach(dropBlock);
}

main();

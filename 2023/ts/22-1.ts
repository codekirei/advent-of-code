import { readInput } from "./utils";

type CoordT = {
  x: number;
  y: number;
};

type BlockT = {
  id: number;
  x0: number;
  y0: number;
  z0: number;
  x1: number;
  y1: number;
  z1: number;
};

type NodeT = {
  height: number;
  id: number;
};

const input = await readInput("22");
export const raw = input.trim().split("\n");
const blockCt = raw.length;

const keyBlocks = new Map();
let grid: NodeT[][];

const prepGrid = (x: number, y: number) => {
  const createNode = (): NodeT => ({ height: 0, id: null });
  const createRow = () => Array(x).fill(null).map(createNode);
  grid = Array(y).fill(null).map(createRow);
};

const parseRaw = (raw: string[]): [BlockT[], number, number] => {
  return raw.reduce(
    (accum, block, i) => {
      let [blocks, maxX, maxY] = accum;

      const [p0, p1] = block.split("~");
      const [x0, y0, z0] = p0.split(",").map((s) => parseInt(s));
      const [x1, y1, z1] = p1.split(",").map((s) => parseInt(s));

      if (x1 > maxX) maxX = x1;
      if (y1 > maxY) maxY = y0;

      blocks.push({
        id: i,
        x0,
        y0,
        z0,
        x1,
        y1,
        z1,
      });

      return [blocks, maxX, maxY];
    },
    [[], 0, 0],
  );
};

const sortBlocks = (a: BlockT, b: BlockT) => {
  return a.z0 - b.z0;
};

const dropTall = (block: BlockT) => {
  const { x0, y0, z0, z1, id } = block;

  const node = grid[y0][x0];
  if (node.id) {
    keyBlocks.set(node.id, true);
  }

  node.height = node.height + z1 - z0 + 1;
  node.id = id;
};

const coordsInFlatBlock = (block: BlockT): CoordT[] => {
  const { x0, y0, x1, y1 } = block;

  const coords: CoordT[] = [];
  coords.push({ x: x0, y: y0 });

  if (x1 > x0) {
    for (let i = x0 + 1; i <= x1; ++i) {
      coords.push({ x: i, y: y0 });
    }
  }

  if (y1 > y0) {
    for (let i = y0 + 1; i <= y1; ++i) {
      coords.push({ x: x0, y: i });
    }
  }

  return coords;
};

const dropFlat = (block: BlockT) => {
  const { id } = block;

  let tallest = 0;
  const supportingBlocks = new Map();

  coordsInFlatBlock(block)
    .map(({ x, y }): NodeT => {
      const node = grid[y][x];
      if (node.height > tallest) tallest = node.height;
      return node;
    })
    .forEach((node: NodeT) => {
      if (node.height == tallest && node.id != null) {
        supportingBlocks.set(node.id, true);
      }
      node.height = tallest + 1;
      node.id = id;
    });

  if (supportingBlocks.size == 1) {
    keyBlocks.set(supportingBlocks.keys().next().value, true);
  }
};

const dropBlock = (block: BlockT) => {
  if (block.z1 > block.z0) {
    dropTall(block);
  } else {
    dropFlat(block);
  }
};

export default function main() {
  const [blocks, maxX, maxY] = parseRaw(raw);

  prepGrid(maxX + 1, maxY + 1);

  blocks.sort(sortBlocks).forEach(dropBlock);

  return blockCt - keyBlocks.size;
}

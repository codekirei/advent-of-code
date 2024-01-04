import { readInput } from "./utils";

const input = await readInput("10");
export const grid = input.trim().split("\n");

// DOWN and RIGHT are POSITIVE

const START = "S";

const dirMap = {
  // [x, y]
  U: [0, -1],
  D: [0, 1],
  R: [1, 0],
  L: [-1, 0],
};

const dirs = Object.keys(dirMap);
type dirT = (typeof dirs)[number];

const symbolMap = {
  // INTO.SYMBOL: OUTOF
  "D.|": "D",
  "U.|": "U",
  "R.-": "R",
  "L.-": "L",
  "D.L": "R",
  "L.L": "U",
  "D.J": "L",
  "R.J": "U",
  "U.7": "L",
  "R.7": "D",
  "U.F": "R",
  "L.F": "D",
};

type coordT = [number, number];

const findStart = (_grid: string[]): coordT => {
  for (let y = 0; y < _grid.length; ++y) {
    const x = _grid[y].indexOf(START);
    if (x > -1) {
      return [x, y];
    }
  }
};

const startCoord = findStart(grid);

const modifyCoord = (coord: coordT, mod: coordT): coordT => {
  return [coord[0] + mod[0], coord[1] + mod[1]];
};

const getKey = (dir: dirT, symbol: string): string => {
  return dir + "." + symbol;
};

const getNext = (coord: coordT, dir: dirT): [coordT, string] => {
  const mod = dirMap[dir];
  const nextCoord = modifyCoord(coord, mod);
  const [x, y] = nextCoord;
  return [nextCoord, grid[y][x]];
};

const findFirstDir = (coord: coordT): dirT => {
  for (const dir of dirs) {
    const [_, symbol] = getNext(coord, dir);
    const maybeDir = symbolMap[getKey(dir, symbol)];
    if (maybeDir) {
      return dir;
    }
  }
};

const isSameCoord = (a: coordT, b: coordT): boolean => {
  return a[0] === b[0] && a[1] === b[1];
};

const walk = (
  start: coordT,
  current: coordT,
  steps: number,
  dir: dirT,
): number => {
  if (steps > 0 && isSameCoord(start, current)) {
    return steps;
  }
  const [nextCoord, symbol] = getNext(current, dir);
  const nextDir = symbolMap[getKey(dir, symbol)];
  return walk(start, nextCoord, steps + 1, nextDir);
};

export default function main() {
  const firstDir = findFirstDir(startCoord);
  const totalSteps = walk(startCoord, startCoord, 0, firstDir);
  // furthest away is total / 2
  return totalSteps / 2;
}

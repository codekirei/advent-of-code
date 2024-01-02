import { readInput } from "./utils";

type MapNodeT = {
  L: string;
  R: string;
};
type MapT = { [key: string]: MapNodeT };

const START = "AAA";
const END = "ZZZ";

const getDirections = (cleaned: string[]): string => {
  return cleaned[0];
};

const lineToNode = (line: string): [string, string, string] => {
  const segments = line.split(" ");
  return [segments[0], segments[2].slice(1, 4), segments[3].slice(0, 3)];
};

const makeMap = (cleaned: string[]): MapT => {
  const out: MapT = {};
  cleaned.slice(2).forEach((line) => {
    const [key, left, right] = lineToNode(line);
    out[key] = { L: left, R: right };
  });
  return out;
};

const input = await readInput();
const cleaned = input.trim().split("\n");
const directions = getDirections(cleaned);
const map = makeMap(cleaned);

const walk = (i: number, left: string, right: string): number => {
  const nextDir = directions[i % directions.length];
  const nodeName = nextDir === "L" ? left : right;
  if (nodeName === END) {
    return i + 1;
  }

  const node = map[nodeName];

  return walk(++i, node.L, node.R);
};

export default async function main() {
  return walk(0, map[START].L, map[START].R);
}

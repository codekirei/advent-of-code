import { readInput } from "./utils";

interface Race {
  time: number;
  dist: number;
}

const extractNums = (str: string): string[] => {
  return str.match(/\b\d+\b/g);
};

const parseInput = (input: string): Race[] => {
  const lines = input.trim().split("\n");
  const times = extractNums(lines[0]);
  const dists = extractNums(lines[1]);

  return times.map((t, i) => ({
    time: parseInt(t),
    dist: parseInt(dists[i]),
  }));
};

const calcDist = (t: number, maxT: number): number => {
  return t * (maxT - t);
};

const countWins = (race: Race): number => {
  let ct = 0;
  for (let i = 1; i < race.time; ++i) {
    if (calcDist(i, race.time) > race.dist) {
      ct += 1;
    }
  }
  return ct;
};

export default async function main() {
  const input = await readInput();
  const races = parseInput(input);
  return races.reduce((accum, race) => accum * countWins(race), 1);
}

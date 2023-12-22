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

const findMid = (min: number, max: number) => {
  return Math.floor(min + (max - min) / 2);
};

// Find the time that has the best distance.
const findBest = (
  min: number,
  max: number,
  maxT: number,
  best: number,
): number => {
  if (min >= max) {
    return min;
  }
  const midpoint = findMid(min, max);
  const wins = calcDist(midpoint, maxT);
  return wins > best
    ? findBest(midpoint, max, maxT, wins)
    : findBest(min, midpoint - 1, maxT, best);
};

// Find the smallest time that meets the threshold.
const findMin = (
  min: number,
  max: number,
  maxT: number,
  threshold: number,
): number => {
  if (min >= max) {
    return min;
  }
  const midpoint = findMid(min, max);
  const wins = calcDist(midpoint, maxT);
  if (wins > threshold) {
    return findMin(min, midpoint, maxT, threshold);
  } else {
    return findMin(midpoint + 1, max, maxT, threshold);
  }
};

const countWins = (race: Race): number => {
  const best = findBest(0, race.time, race.time, 0);
  const min = findMin(0, best, race.time, race.dist);
  const adjustment = race.time % 2 ? 2 : 1;
  return (best - min) * 2 + adjustment;
};

export default async function main() {
  const input = await readInput();
  const races = parseInput(input);
  return races.reduce((accum, race) => accum * countWins(race), 1);
}

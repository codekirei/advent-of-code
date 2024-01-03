import { readInput } from "./utils";

import { Race, extractNums, countWins } from "./06-1";

const parseInput = (input: string): Race => {
  const lines = input.trim().split("\n");
  const time = parseInt(extractNums(lines[0]).join(""));
  const dist = parseInt(extractNums(lines[1]).join(""));
  return { time, dist };
};

export default async function main() {
  const input = await readInput("06");
  const race = parseInput(input);
  return countWins(race);
}

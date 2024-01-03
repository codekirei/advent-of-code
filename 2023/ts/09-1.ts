import { readInput } from "./utils";

const input = await readInput("09");
export const lines = input.trim().split("\n");

const loop = (nums: number[], accum: number) => {
  let loopAgain = false;

  const diffs = [];
  nums.reduce((prev, cur) => {
    const diff = cur - prev;
    if (diff !== 0) {
      loopAgain = true;
    }
    diffs.push(diff);
    return cur;
  });

  return loopAgain ? loop(diffs, accum + diffs[diffs.length - 1]) : accum;
};

const extrapolate = (line: string): number => {
  const nums = line.split(" ").map((str) => parseInt(str));
  return loop(nums, nums[nums.length - 1]);
};

export default async function main() {
  return lines.reduce((accum, line) => accum + extrapolate(line), 0);
}

import { lines } from "./9-1";

const loop = (nums: number[], firsts: number[]): number => {
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

  return loopAgain
    ? loop(diffs, diffs.slice(0, 1).concat(firsts))
    : firsts.reduce((a, b) => b - a);
};

const extrapolateBackwards = (line: string): number => {
  const nums = line.split(" ").map((str) => parseInt(str));
  return nums[0] - loop(nums, []);
};

export default async function main() {
  return lines.reduce((accum, line) => accum + extrapolateBackwards(line), 0);
}

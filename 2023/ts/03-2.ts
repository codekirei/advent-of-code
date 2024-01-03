import { lines } from "./03-1";

/**
  Pseudocode
  ----------
  - Loop through grid left to right, top to bottom
  - If you reach a needle (*), check surrounding spaces
    - If spaces are digits, find full nums at digits
    - If there are exactly 2 nums, multiply them and add to aggregate count

  Optimizations
  -------------
  - Could go a bit faster by having a global cache of nums at various indices
    so we never read them twice. That's a decently large tradeoff in code
    complexity for not going a huge amount faster, though.
  - Could go a bit faster by always using global lines instead of passing lines
    into getSurrounding nums, but the current isolation makes testing very
    simple. This would also be achievable with a mockable getLines func.
*/

// Read puzzle input file ------------------------------------------------------
const maxXidx = lines[0].length - 1;

// Define Helper Maps ----------------------------------------------------------
const digits = {
  0: true,
  1: true,
  2: true,
  3: true,
  4: true,
  5: true,
  6: true,
  7: true,
  8: true,
  9: true,
};

const needle = "*";

// Define Helper Functions -----------------------------------------------------
export const getSurrounding = (x: number, y: number): number[][] => {
  const out = [];

  if (x > 0) {
    out.push([x - 1, y]);
  }

  if (x < maxXidx) {
    out.push([x + 1, y]);
  }

  const xMin = Math.max(0, x - 1);
  const xMax = Math.min(maxXidx, x + 1);

  for (let i = xMin; i <= xMax; ++i) {
    out.push([i, y - 1], [i, y + 1]);
  }

  return out;
};

export const getFullNum = (line: string, x: number): [number, number[]] => {
  const seen = [x];

  const walkF = (i: number, numStr: string): string => {
    if (!digits[line[i]]) {
      return numStr;
    }
    seen.push(i);
    return walkF(i + 1, numStr + line[i]);
  };

  const walkB = (i: number, numStr: string): string => {
    if (!digits[line[i]]) {
      return numStr;
    }
    seen.unshift(i);
    return walkB(i - 1, line[i] + numStr);
  };

  return [parseInt(walkB(x - 1, "") + line[x] + walkF(x + 1, "")), seen];
};

// Could make this faster by exiting immediately if 3 nums are found.
export const getSurroundingNums = (x: number, lines: string[]): number[] => {
  const seen = {};
  const out = [];
  const toCheck = getSurrounding(x, 1);
  for (const [_x, y] of toCheck) {
    if (seen[x]?.[y]) {
      continue;
    }

    const val = lines[y]?.[_x];
    if (!digits[val]) {
      continue;
    }

    const [num, xCoords] = getFullNum(lines[y], _x);
    xCoords.forEach((__x) => (seen[__x] = { ...seen[__x], [y]: true }));
    out.push(num);
  }

  return out;
};

// Parse Input -----------------------------------------------------------------
let total = 0;

lines.forEach((line, y) => {
  for (let x = 0; x <= maxXidx; ++x) {
    const char = line[x];
    if (char != needle) {
      continue;
    }
    const surroundingNums = getSurroundingNums(x, lines.slice(y - 1, y + 2));
    if (surroundingNums.length == 2) {
      const [a, b] = surroundingNums;
      total += a * b;
    }
  }
});

console.log(total);

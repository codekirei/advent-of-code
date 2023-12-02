/***
 * Decided to use a dual needle implementation that starts at beginning and
 * end of each line and loop until the needles converge.
 *
 * It would probably also be reasonable to just remove all non-eligible chars
 * with a string filter and then take the remining first and last chars, though
 * I suspect my chosen implementation is faster.
 */

const input = `...`;

const digits = {
  1: true,
  2: true,
  3: true,
  4: true,
  5: true,
  6: true,
  7: true,
  8: true,
  9: true,
  0: true,
};

const dualNeedle = (str: string): number => {
  let first = "";
  let last = "";
  let i = 0;
  let j = str.length - 1;

  while (!first || !last) {
    if (!first) {
      const iChar = str[i];
      if (digits[iChar]) first = iChar;
      ++i;
    }

    if (!last) {
      const jChar = str[j];
      if (digits[jChar]) last = jChar;
      --j;
    }

    // if this happens, str was even and only digit was in middle pair
    if (j < i) {
      if (!first) first = last;
      else if (!last) last = first;
    }
  }

  return parseInt(first + last);
};

const calibrationSum = input
  .trim()
  .split("\n")
  .reduce((accum, cur) => accum + dualNeedle(cur), 0);

console.log(calibrationSum);

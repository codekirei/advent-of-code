/***
 * Note that "zero" wasn't anywhere in my input, so I didn't account for it.
 * This made the logic slightly cleaner.
 *
 * Opted for two recursive loops going from 0 -> n and n -> 0.
 */
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

const numWords = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const forward = (str: string): string => {
  const loop = (substr: string) => {
    if (!substr) {
      throw new Error(`Cannot find num in str: ${str}`);
    }

    if (digits[substr[0]]) {
      return substr[0];
    }

    for (let i = 3; i < 6; ++i) {
      const val = substr.slice(0, i);
      if (numWords[val]) {
        return numWords[val];
      }
    }

    return loop(substr.slice(1));
  };

  return loop(str);
};

const backward = (str: string): string => {
  const loop = (substr: string) => {
    if (!substr) {
      throw new Error(`Cannot find num in str: ${str}`);
    }

    if (digits[substr[substr.length - 1]]) {
      return substr[substr.length - 1];
    }

    for (let i = 3; i < 6; ++i) {
      const val = substr.slice(substr.length - i);
      if (numWords[val]) {
        return numWords[val];
      }
    }

    return loop(substr.slice(0, substr.length - 1));
  };

  return loop(str);
};

const inputs = `
...
`;

const calibrationSum = inputs
  .trim()
  .split("\n")
  .reduce((accum, line) => accum + parseInt(forward(line) + backward(line)), 0);

console.log(calibrationSum);

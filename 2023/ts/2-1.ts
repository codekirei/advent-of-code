const input = `
...
`;

const maxVals = {
  red: 12,
  green: 13,
  blue: 14,
};

const isPossible = (line: string): boolean => {
  for (const game of line.split(": ")[1].split("; ")) {
    for (const colorCount of game.split(", ")) {
      const [countStr, color] = colorCount.split(" ");
      const count = parseInt(countStr);
      if (count > maxVals[color]) {
        return false;
      }
    }
  }

  return true;
};

const out = input
  .trim()
  .split("\n")
  .reduce((accum, line, i) => (isPossible(line) ? accum + i + 1 : accum), 0);

console.log(out);

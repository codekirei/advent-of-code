const input = `
...
`;

const colorToIndex = {
  red: 0,
  green: 1,
  blue: 2,
};

const minCubesPower = (line: string): number => {
  const max = [0, 0, 0];
  for (const game of line.split(": ")[1].split("; ")) {
    for (const colorCount of game.split(", ")) {
      const [countStr, color] = colorCount.split(" ");
      const count = parseInt(countStr);
      const idx = colorToIndex[color];
      if (count > max[idx]) {
        max[idx] = count;
      }
    }
  }

  return max.reduce((accum, min) => accum * min, 1);
};

const out = input
  .trim()
  .split("\n")
  .reduce((accum, line) => accum + minCubesPower(line), 0);

console.log(out);

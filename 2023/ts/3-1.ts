import { readFile } from "fs/promises";

/**
  Pseudocode
  ----------
  - Loop through grid left to right, top to bottom
  - If you reach a dot (no consequence)
    - Add coords to seen
  - If you reach a symbol
    - Add coords to symbols
    - Add coords to seen
  - If you reach a digit
    - Aggregate the number and coords, left to right
    - Check surrounding coords for symbols
    - If symbol found, add to total aggregate
    - Add coords to seen
  - When checking surrounding coords for symbols
    - If seen
      - If symbol
        - Add num to aggregate
        - Stop checking surrounding coords
    - Else (not seen)
      - If symbol
        - Add coords to seen
        - Add coords to symbols
        - Add num to aggregate
        - Stop checking surrounding coords
      - Else if dot
        - Add coords to seen
      - Note that we aren't adding digits to seen!
*/

// Read puzzle input file ------------------------------------------------------
const input = await readFile("./3.input.txt", { encoding: "utf8" });
const lines = input.split("\n");
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

const symbols = {
  "+": true,
  "-": true,
  "=": true,
  "/": true,
  "*": true,
  "#": true,
  "@": true,
  "%": true,
  "&": true,
  $: true,
};

const seenCoords = {};
const symbolCoords = {};

// Define Helper Functions -----------------------------------------------------
interface CoordMap {
  x?: {
    y: boolean;
  };
}

const set = (target: CoordMap) => (x: number, y: number) => {
  target[x] = { [y]: true };
};
const get =
  (target: CoordMap) =>
  (x: number, y: number): boolean | undefined => {
    return target[x]?.[y];
  };

const haveSeen = get(seenCoords);
const setSeen = set(seenCoords);
const getSymbol = get(symbolCoords);
const setSymbol = set(symbolCoords);

export const getSurrounding = (
  x0: number,
  x1: number,
  y: number,
): number[][] => {
  const out = [];

  if (x0 > 0) {
    out.push([x0 - 1, y]);
  }

  if (x1 < maxXidx) {
    out.push([x1 + 1, y]);
  }

  const xMin = Math.max(0, x0 - 1);
  const xMax = Math.min(maxXidx, x1 + 1);

  for (let i = xMin; i <= xMax; ++i) {
    out.push([i, y - 1], [i, y + 1]);
  }

  return out;
};

const handleDot = (x: number, y: number) => {
  setSeen(x, y);
};

const handleSymbol = (x: number, y: number) => {
  setSeen(x, y);
  setSymbol(x, y);
};

const handleNumber = (str: string, x: number, y: number, numStr: string) => {
  setSeen(x, y);
  const val = str[x];

  if (digits[val]) {
    return handleNumber(str, x + 1, y, numStr + val);
  }

  if (symbols[val]) {
    setSymbol(x, y);
  }

  return { x1: x - 1, num: parseInt(numStr) };
};

// Parse Input -----------------------------------------------------------------
let total = 0;

lines.forEach((line, y, arr) => {
  for (let x = 0; x <= maxXidx; ++x) {
    if (haveSeen(x, y)) {
      continue;
    }

    const char = line[x];

    if (symbols[char]) {
      handleSymbol(x, y);
      continue;
    }

    if (!digits[char]) {
      handleDot(x, y);
      continue;
    }

    const { x1, num } = handleNumber(line, x + 1, y, char);
    const adjCoords = getSurrounding(x, x1, y);
    while (adjCoords.length) {
      const [_x, _y] = adjCoords.pop();
      if (haveSeen(_x, _y)) {
        if (getSymbol(_x, _y)) {
          total += num;
          break;
        } else {
          continue;
        }
      }
      const _char = arr[_y]?.[_x];
      if (symbols[_char]) {
        total += num;
        setSymbol(_x, _y);
        setSeen(_x, _y);
        break;
      }
      if (!digits[_char]) {
        setSeen(_x, _y);
      }
    }

    // jump ahead to x1 since we've already parsed x..x1 via handleNumber
    x = x1;
  }
});

console.log(total);

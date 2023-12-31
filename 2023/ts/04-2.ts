import { cards, countMatches } from "./04-1";

let cardCt = cards.length;
const extras = new Array(cardCt).fill(0);

export const incrFirstN = (arr: number[], n: number, amount: number = 1) => {
  for (let i = 0; i < Math.min(n, arr.length); ++i) {
    arr[i] += amount;
  }
};

export default function main() {
  cards.forEach((card) => {
    const matches = countMatches(card);
    const thisExtras = extras.shift();
    cardCt += thisExtras;
    incrFirstN(extras, matches, thisExtras + 1);
  });

  return cardCt;
}

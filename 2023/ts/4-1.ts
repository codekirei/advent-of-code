import { readFile } from "fs/promises";

const input = await readFile("./4.input.txt", { encoding: "utf8" });
const cards = input.trim().split("\n");

const valueOfMatches = (matchCt: number): number => {
  if (matchCt == 0) {
    return 0;
  }
  return Math.pow(2, matchCt - 1);
};

interface MatchMap {
  num?: true;
}

const countMatches = (card: string): number => {
  const matches: MatchMap = {};
  let matchCt = 0;

  const [matchStr, numStr] = card.split(": ")[1].split(" | ");

  matchStr.split(" ").forEach((val: string) => {
    // There are single digit nums that will leak empty strings into this logic
    if (val != "") {
      matches[val] = true;
    }
  });

  numStr.split(" ").forEach((val: string) => {
    if (matches[val]) {
      matchCt += 1;
    }
  });

  return matchCt;
};

const parseCard = (card: string): number => {
  const matchCt = countMatches(card);
  return valueOfMatches(matchCt);
};

let out = 0;
cards.forEach((card) => {
  out += parseCard(card);
});
console.log(out);

import { readFile } from "fs/promises";

export async function readInput(day: string): Promise<string> {
  return await readFile(`${day}.input.txt`, { encoding: "utf8" });
}

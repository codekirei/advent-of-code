import path from "node:path";
import { readFile } from "fs/promises";

export async function readInput(): Promise<string> {
  const entryFile = process.argv[1];
  const basename = path.basename(entryFile);
  const day = basename[0];
  return await readFile(`${day}.input.txt`, { encoding: "utf8" });
}

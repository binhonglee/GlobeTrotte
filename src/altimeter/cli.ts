import { readFileSync } from "fs";
import { genRun, AltimeterConfig } from ".";

const args = process.argv.slice(2);
const config = Object.setPrototypeOf(
  JSON.parse(readFileSync(args[0], "utf8")),
  AltimeterConfig.prototype,
);

genRun(config);

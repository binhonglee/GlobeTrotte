import { readFileSync } from "fs";
import { exit } from "process";
import { genRun, AltimeterConfig } from ".";

const args = process.argv.slice(2);

if (args.length < 1) {
  console.error("Please define a config file.");
  exit(1);
}

const config = Object.assign(
  new AltimeterConfig(),
  JSON.parse(readFileSync(args[0], "utf8")),
);

genRun(config);

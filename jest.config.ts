import type { Config } from "@jest/types";

export default async (): Promise<Config.InitialOptions> => {
  const coverageDir = "jest_coverage";
  return {
    moduleFileExtensions: ["js", "ts", "json", "vue"],
    moduleNameMapper: {
      "@/(.*)": "<rootDir>/src/cockpit/$1",
    },
    transform: {
      "^.+\\.vue$": "vue-jest",
      "^.+\\.ts$": "esbuild-jest",
    },
    reporters: [
      "default",
      [
        "jest-junit",
        {
          outputDirectory: coverageDir,
          outputName: "test_results.xml",
        },
      ],
    ],
    collectCoverage: true,
    collectCoverageFrom: ["**/*.{ts,vue}", "!**/node_modules/**"],
    coverageDirectory: coverageDir,
    coverageProvider: "v8",
    coveragePathIgnorePatterns: ["/node_modules/"],
    coverageReporters: ["json", "cobertura"],
    verbose: true,
    globals: {
      "vue-jest": {
        pug: {
          doctype: "html",
        },
      },
    },
  };
};

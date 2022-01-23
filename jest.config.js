// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = async () => {
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
    rootDir: ".",
    snapshotSerializers: ["jest-serializer-html"],
    snapshotResolver: "<rootDir>/src/cockpit/tests/snapshotResolver.js",
    collectCoverage: true,
    collectCoverageFrom: [
      "**/*.{ts,vue}",
      "!**/node_modules/**",
      "!**/*.{config,d}.ts",
    ],
    coverageDirectory: coverageDir,
    coverageProvider: "v8",
    coveragePathIgnorePatterns: [
      "/node_modules/",
      "<rootDir>/src/cockpit/tests/",
      "<rootDir>/src/cockpit/scripts/",
      "<rootDir>/src/cockpit/main.ts",
      "<rootDir>/plz-out/",
    ],
    coverageReporters: ["json", "cobertura"],
    verbose: true,
    globals: {
      "vue-jest": {
        pug: {
          doctype: "html",
        },
      },
    },
    testRegex: "src/cockpit/tests/.*\\.spec\\.ts$",
  };
};

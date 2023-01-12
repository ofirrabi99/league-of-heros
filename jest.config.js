const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./",
});
const customJestConfig = {
  moduleDirectories: ["node_modules"],
  setupFilesAfterEnv: ["./lib/jestSetup.ts"],
};

module.exports = createJestConfig(customJestConfig);

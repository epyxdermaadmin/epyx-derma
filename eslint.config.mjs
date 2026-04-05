import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "build/**",
    "build-next/**",
    "dist/**",
    "out/**",
    "next-env.d.ts",
    "scripts/*.cjs",
  ]),
]);

export default eslintConfig;

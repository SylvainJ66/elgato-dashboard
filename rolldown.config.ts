import { defineConfig } from "rolldown";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sdPlugin = "com.sylvain.claudecode.sdPlugin";

export default defineConfig({
  input: "src/infrastructure/stream-deck/plugin.ts",
  output: {
    dir: `${sdPlugin}/bin`,
    format: "esm",
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@domain": path.resolve(__dirname, "src/domain"),
      "@infrastructure": path.resolve(__dirname, "src/infrastructure"),
    },
  },
  external: ["node:fs", "node:path", "node:os", "node:url"],
  platform: "node",
  plugins: [
    {
      name: "emit-module-package-file",
      generateBundle() {
        this.emitFile({
          type: "asset",
          fileName: "package.json",
          source: JSON.stringify({ type: "module" }, null, 2),
        });
      },
    },
  ],
});

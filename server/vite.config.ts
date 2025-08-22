import devServer from "@hono/vite-dev-server";
import { defineConfig } from "vite";

import build from "@hono/vite-build/node";
import path from "path";

export default defineConfig(() => {
  return {
    server: {
      port: 3000,
    },
    plugins: [
      build({
        entry: "src/index.ts",
      }),
      devServer({
        entry: "src/index.ts",
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});

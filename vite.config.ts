import { defineConfig } from "vitest/config";
import solidPlugin from "vite-plugin-solid";
import typescript from "@rollup/plugin-typescript";

import pkg from "./package.json";

const peer = Object.keys(pkg.peerDependencies);
const external = (id: string) => peer.includes(id);

export default defineConfig({
  plugins: [solidPlugin()],
  test: {
    globals: true,
    setupFiles: ["setupTest.ts"],
    environment: "jsdom",
    deps: {
      inline: [/solid-js/, /solid-testing-library/],
    },
    transformMode: {
      web: [/\.tsx?$/],
    },
  },
  resolve: {
    conditions: ["development", "browser"],
  },
  build: {
    lib: {
      entry: "./src/core/index.ts",
      name: "index.js",
      fileName: "index",
      formats: ["es", "umd"],
    
    },
    rollupOptions: {
      external: external,
      plugins: [
        typescript({
          target: "es2015",
          declaration: true,
          declarationDir: "./dist/types",
          exclude: ["node_modules/**", "tests/**/*"],
          allowSyntheticDefaultImports: true,
          sourceMap: false,
        }),
      ],
    },
  },
});

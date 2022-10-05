import { defineConfig } from "vitest/config";
import solidPlugin from "vite-plugin-solid";

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
});

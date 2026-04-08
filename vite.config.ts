import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

const config = defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    // this is the plugin that enables path aliases
    // viteTsConfigPaths({
    //   projects: ["./tsconfig.json"],
    // }),
    tanstackStart(),
    nitro({
      preset: "bun",
    }),
    tailwindcss(),
    viteReact({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
  ],
});

export default config;

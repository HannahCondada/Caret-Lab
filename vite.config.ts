import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const uiSource = fileURLToPath(new URL("./packages/ui/src/", import.meta.url));

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
    alias: [
      { find: "@caret-lab/ui/tokens.css", replacement: `${uiSource}tokens.css` },
      { find: "@caret-lab/ui/settings", replacement: `${uiSource}settings.tsx` },
      { find: "@caret-lab/ui", replacement: `${uiSource}index.tsx` },
    ],
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      server: { entry: "server" },
    }),
    viteReact(),
    nitro(),
  ],
});

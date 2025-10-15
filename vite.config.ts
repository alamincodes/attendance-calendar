import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === "library") {
    return {
      plugins: [react(), tailwindcss()],
      build: {
        lib: {
          entry: resolve(__dirname, "src/index.ts"),
          name: "AttendanceCalendar",
          fileName: "index",
          formats: ["es"],
        },
        rollupOptions: {
          external: ["react", "react-dom"],
          output: {
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
            },
            assetFileNames: (assetInfo) => {
              // Ensure CSS is named properly
              if (assetInfo.name === "style.css") return "index.css";
              return assetInfo.name || "asset";
            },
          },
        },
        outDir: "dist",
        sourcemap: true,
        cssCodeSplit: false,
      },
    };
  }

  return {
    plugins: [react(), tailwindcss()],
  };
});

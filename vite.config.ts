import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
const env = dotenv.config().parsed;
const envApi = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: envApi,
});

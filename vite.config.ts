import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react';
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tsconfigPaths()],
    define: {
      ...Object.keys(env).reduce((prev: Record<string, string>, key) => {
        prev[`process.env.${key}`] = JSON.stringify(env[key])
        return prev
      }, {}),
    },
  }
})

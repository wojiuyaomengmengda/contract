import { defineConfig } from 'vite'
import config from "./vite.config.base"

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return config
})

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // '@ahmiao666/ahmiao-lucky-wheel-vue': resolve(__dirname, '../../src/vue.ts'),
    },
  },
  optimizeDeps: {
    // exclude: ['@ahmiao666/ahmiao-lucky-wheel-vue'],
  },
})

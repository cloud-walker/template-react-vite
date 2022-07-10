import react from '@vitejs/plugin-react'
import {defineConfig} from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: './src/setupVitest.ts',
    // environment: 'happy-dom',
    environment: 'jsdom',
    coverage: {
      exclude: ['**/*.mocks.ts'],
    },
  },
})

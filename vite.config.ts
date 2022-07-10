import react from '@vitejs/plugin-react'
import {defineConfig} from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: './src/setupVitest.ts',

    /**
     * We want to use happy-dom here, but it currently have a compatibility bug
     * with @testing-library/user-event.
     *
     * @link https://github.com/capricorn86/happy-dom/issues/467
     */
    environment: 'jsdom',
  },
})

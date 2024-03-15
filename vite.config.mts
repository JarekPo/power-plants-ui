import react from '@vitejs/plugin-react-swc';
import WindiCSS from 'vite-plugin-windicss';
import {defineConfig} from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), WindiCSS()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true,
    reporters: ['verbose'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*'],
      exclude: [],
    },
  },
});

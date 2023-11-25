import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Configure manual chunks here
        manualChunks(id) {
          // For example, create a separate chunk for lodash
          if (id.includes('node_modules/lodash-es')) {
            return 'lodash';
          }
        },
      },
    },
  },
});

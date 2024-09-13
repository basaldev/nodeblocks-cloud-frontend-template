import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import ViteYaml from '@modyfi/vite-plugin-yaml';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: './dist',
    target: 'esnext',
    sourcemap: true,
  },
  plugins: [react(), ViteYaml()],
});

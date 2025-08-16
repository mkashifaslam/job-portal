import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
const config = {
    plugins: [react()],
    server: {
        port: Number(env.VITE_PORT) || 5173,
        proxy: {
            '/api': {
                target: env.VITE_BACKEND_URL || 'http://localhost:8080',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, ''),
            },
        },
    },
    preview: {
        port: Number(env.VITE_PORT) || 5173,
    },
};
return config;
});

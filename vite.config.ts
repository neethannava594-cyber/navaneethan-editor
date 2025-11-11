import path from 'path';
import fs from 'fs';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    // Determine HTTPS config: if cert/key files exist (or paths provided via env), use them.
    const keyPath = env.HTTPS_KEY || path.resolve(__dirname, 'certs', 'localhost-key.pem');
    const certPath = env.HTTPS_CERT || path.resolve(__dirname, 'certs', 'localhost.pem');
    let httpsConfig: false | { key: Buffer; cert: Buffer } = false;
    try {
      if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
        httpsConfig = {
          key: fs.readFileSync(keyPath),
          cert: fs.readFileSync(certPath),
        };
      }
    } catch (e) {
      // ignore and fall back to http
      httpsConfig = false;
    }

    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        // Vite's types expect a specific ServerOptions shape; pass undefined when no certs
        https: httpsConfig || undefined,
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});

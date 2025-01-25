import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': '#1DA57A',
        },
      },
    },
  },
  resolve: {
		alias: {
			'@components': path.resolve(__dirname, './src/components'),
			'@views': path.resolve(__dirname, './src/views'),
			'@types': path.resolve(__dirname, './src/types'),
			'@repositories': path.resolve(__dirname, './src/repositories'),
			'@assets': path.resolve(__dirname, './src/assets'),
			'@context': path.resolve(__dirname, './src/context'),
			'@store': path.resolve(__dirname, './src/store'),
		},
  },
});
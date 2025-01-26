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
      '@layout': path.resolve(__dirname, './src/layout'),
      '@layout/*': path.resolve(__dirname, './src/layout/*'),
			'@components': path.resolve(__dirname, './src/components'),
      '@components/*': path.resolve(__dirname, './src/components/*'),
			'@types': path.resolve(__dirname, './src/types'),
			'@assets': path.resolve(__dirname, './src/assets'),
      '@context': path.resolve(__dirname, './src/context'),
			'@context/*': path.resolve(__dirname, './src/context/*'),
			'@hooks': path.resolve(__dirname, './src/hooks'),
      '@hooks/*': path.resolve(__dirname, './src/hooks/*'),
		},
  },
});
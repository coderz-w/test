import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
const pathSrc = path.resolve(__dirname, 'src');
const pathTypes = path.resolve(__dirname, 'types');

export default defineConfig({
	base: '/twenty-propaganda-h5/',
	build: {
		outDir: 'build',
	},
	resolve: {
		alias: {
			'~/': `${pathTypes}/`,
			'@/': `${pathSrc}/`,
		},
	},

	plugins: [react()],
	server: {
		hmr: { overlay: false },
		host: '0.0.0.0',
		port: 8011,
		open: true,
		cors: true,
		proxy: {
			'/api': {
				target: 'https://be-dev.redrock.cqupt.edu.cn',
				changeOrigin: true,
				rewrite: (path: string): string => path.replace(/^\/api/, ''),
			},
		},
	},
});

import path from 'path';
import postcsspxtoviewport from 'postcss-px-to-viewport';
import postcssPresetEnv from 'postcss-preset-env';
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
	css: {
		postcss: {
			plugins: [
				postcssPresetEnv(),
				postcsspxtoviewport({
					unitToConvert: 'px', // 要转化的单位
					viewportWidth: 750, // UI设计稿的宽度
					unitPrecision: 6, // 转换后的精度，即小数点位数
					propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
					viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
					fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
					selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
					minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
					mediaQuery: false, // 是否在媒体查询的css代码中也进行转换，默认false
					replace: true, // 是否转换后直接更换属性值
					// exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
					// exclude: [],
					landscape: true, // 是否处理横屏情况
				}),
			],
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

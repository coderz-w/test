import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./index.html', './src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {},
		},
	},
	plugins: [],
};
export default config;

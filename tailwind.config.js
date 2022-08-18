/** @type {import('tailwindcss').Config} */

const calcContentPage = 'calc(100vh - var(--nav-height))';

module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: 'class',
	mode: 'jit',
	theme: {
		fontFamily: {
			display: ['sans-serif', 'system-ui', 'monospace'],
			body: ['sans-serif', 'system-ui', 'monospace'],
			spacing: {
				'content-page': 'var(--nav-height) auto 0',
			},
		},
		extend: {
			backgroundColor: {
				'special-color-1': '#FDB568',
				'special-color-2': '#E3A25D',
				'special-color-3': '#BD874D',
				'special-color-4': '#7D5933',
				'special-color-5': '#3D2C19',
				'main-bg': '#FAFBFB',
				'main-dark-bg': '#20232A',
				'secondary-dark-bg': '#33373E',
				'light-gray': '#F7F7F7',
				'half-transparent': 'rgba(0, 0, 0, 0.5)',
				'75-transparent': 'rgba(0, 0, 0, 0.75)',
				'half-white-transparent': 'rgba(255, 255, 255, 0.5)',
				'75-white-transparent': 'rgba(255, 255, 255, 0.75)',
			},
			minWidth: {
				48: '12rem',
			},
			height: {
				'main-nav-page': 'var(--nav-height)',
				'full-content-page': calcContentPage,
			},
			maxHeight: {
				'full-content-page': calcContentPage,
			},
			minHeight: {
				'full-content-page': calcContentPage,
			},
			spacing: {
				'content-page': 'calc(var(--nav-height))',
			},
		},
	},
	plugins: [],
};

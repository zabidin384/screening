/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			screens: {
				hp: "450px",
			},
			colors: {
				"theme-900": "#00071b",
				"theme-800": "#071646",
				"theme-700": "#0f2572",
				"theme-600": "#17349f	",
				"theme-500": "#2044cd",
				"theme-400": "#365de5",
				"theme-300": "#6081eb",
				"theme-200": "#8da5f1",
				"theme-100": "#b9c9f8",
				"light-white": "rgba(255,255,255,0.18)",
			},
		},
	},
	plugins: [],
};

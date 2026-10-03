import js from '@eslint/js';
import globals from 'globals';

export default [
	{ ignores: ['node_modules/**', 'swagger/swagger_output.json', 'coverage/**'] },
	js.configs.recommended, // includes no-undef: catches things like a missing `jsonwebtoken` import
	{
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: { ...globals.node }
		},
		rules: {
			'no-undef': 'error',
			'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
		}
	},
	{
		// Served to the browser by the Swagger UI.
		files: ['swagger/custom.js'],
		languageOptions: { sourceType: 'script', globals: { ...globals.browser } }
	}
];

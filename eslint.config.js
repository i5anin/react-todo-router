import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
	{ ignores: ['dist', 'build'] },
	{
		files: ['**/*.{js,jsx}'],
		languageOptions: {
			ecmaVersion: 'latest',
			globals: globals.browser,
			parserOptions: {
				ecmaFeatures: { jsx: true },
				sourceType: 'module',
			},
		},
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			'jsx-a11y': jsxA11y,
			import: importPlugin,
		},
		rules: {
			...js.configs.recommended.rules,
			...reactHooks.configs.recommended.rules,

			// React Fast Refresh
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

			// JSX a11y
			'jsx-a11y/alt-text': 'warn',
			'jsx-a11y/anchor-is-valid': 'warn',

			// Import
			'import/order': [
				'warn',
				{
					groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
					'newlines-between': 'always',
				},
			],
			'import/no-unresolved': 'off',

			// Общие JS правила
			'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]' }],
			'no-console': 'warn',
			'no-debugger': 'warn',
		},
	},
];

import js from '@eslint/js';
import globals from 'globals';
import jestPlugin from 'eslint-plugin-jest';

export default [
  // webpackのビルド成果物はlint対象外
  { ignores: ['dist/**'] },

  js.configs.recommended,

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // ビルド設定はCommonJS
  {
    files: ['webpack.config.js', 'babel.config.js'],
    languageOptions: { sourceType: 'commonjs' },
  },

  {
    files: ['**/*.test.js'],
    plugins: { jest: jestPlugin },
    languageOptions: { globals: globals.jest },
  },
];

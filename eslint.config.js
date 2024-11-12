import js from '@eslint/js'
import checkFile from 'eslint-plugin-check-file'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'simple-import-sort': simpleImportSort,
      'check-file': checkFile,
      react: reactPlugin
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'off',
      'react-refresh/only-export-components': ['off', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }
      ],
      'react-hooks/exhaustive-deps': 'off',

      'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }], // only allow .tsx file extension for write react component
      'react/prefer-stateless-function': 'error', // forbidden using class component
      'react/no-unused-prop-types': 'error', // forbidden to defint props that unused

      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', '^@?\\w'],
            ['^@pages', '^@features', '^@components', '^@apis'],
            ['^@hooks', '^@store', '^@context', '^@lib', '^@routes', '^@typescript', '^@assets'],
            ['^.+\\.?(css)$']
          ]
        }
      ]
    }
  }
)

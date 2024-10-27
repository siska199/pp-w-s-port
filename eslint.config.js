import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

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
      'simple-import-sort': simpleImportSort
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
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', '^@?\\w'], // Packages `react` related packages come first.
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'], // Parent imports. Put `..` last.
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'], // Other relative imports. Put same-folder imports and `.` last.
            ['^.+\\.?(css)$'] // Style imports.
          ]
        }
      ]
    }
  }
)

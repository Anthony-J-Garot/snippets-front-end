module.exports = {
  'root': true,
  'env': {
    'browser': true,
    'node': true,
    'es2021': true,
    'jest': true
  },
  'globals': {
    'JSX': true,
    '$': true
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 2020,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true
    }
  },
  'plugins': [
    '@typescript-eslint',
    'react'
  ],
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  'settings': {
    'react': {
      'version': 'detect',
    }
  },
  'rules': {
    'react/prop-types': 'off', // Not compatible with TS interfaces
    'react/jsx-no-undef': [2, { 'allowGlobals': true }],
    'no-mixed-operators': 'error',
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 1
      }
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'no-console': 'off',
    '@typescript-eslint/no-unused-vars' : [
      'warn',
      {
        'varsIgnorePattern': '^_',
        'argsIgnorePattern': '(^_|^e$)'
      }
    ],
    'no-warning-comments' : [
      'warn',
      {
        'terms': [
          'todo',
          'fixme',
          'hack'
        ]
      }
    ],
    'quotes': [
      'warn',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    '@typescript-eslint/ban-types': [
      'warn'
    ]
  },
};

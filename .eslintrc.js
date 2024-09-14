module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
  ],

  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    quotes: ['error', 'single'],
    'prettier/prettier': [
      'error',
      {
        plugins: ['@trivago/prettier-plugin-sort-imports'],
        singleQuote: true,
        endOfLine: 'auto',
        importOrder: [
          '^@/utils/(.*)$',
          '^@/@types/(.*)$',
          '^@/adapters/(.*)$',
          '^@/plugins/(.*)$',
          '^@/models/(.*)$',
          '^@/analytics',
          '^@/analytics/(.*)$',
          '^@/enums/(.*)$',
          '^@/config',
          '^@/const',
          '^@/store',
          '^@/store/(.*)$',
          '^@/router',
          '^@/router/(.*)$',
          '^@/assets/(.*)$',
          '^@/components/(.*)$',
          '^[./]',
        ],
        importOrderSeparation: true,
        importOrderSortSpecifiers: true,
        importOrderParserPlugins: [
          'typescript',
          'classProperties',
          'decorators-legacy',
        ],
      },
    ],
    'vue/valid-v-slot': 0,
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'any',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/attributes-order': [
      'error',
      {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          ['UNIQUE', 'SLOT'],
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
        ],
        alphabetical: false,
      },
    ],
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};

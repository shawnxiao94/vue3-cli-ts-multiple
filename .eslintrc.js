/*
 * @Author: your name
 * @Date: 2021-01-20 18:51:26
 * @LastEditTime: 2021-01-20 18:51:48
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /vue3-cli-ts-antd/.eslintrc.js
 */
module.exports = {
  root: true,
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  env: {
    browser: true,
    es6: true,
    node: true
  },
  plugins: ['prettier', 'vue', '@typescript-eslint/eslint-plugin'],
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/class-name-casing': 'off',
    'vue/valid-v-slot': 'off',
    'no-debugger': 'off',
    'vue/experimental-script-setup-vars': 'off'
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  overrides: [
    {
      files: [
        '**/tests/*.{j,t}s?(x)',
        '**/tests/**/*.spec.{j,t}s?(x)',
        '**/tests/*.spec.{j,t}s?(x)'
      ],
      env: {
        mocha: true
      }
    }
  ]
}
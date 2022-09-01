module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2022: true
  },
  extends: [
    'eslint:recommended', 'prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    "no-unused-vars": ["warn"]
  }
}

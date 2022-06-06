module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: 'eslint:recommended',
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        '@typescript-eslint/ban-ts-comment': [
            'error',
            { 'ts-ignore': 'allow-with-description' },
        ],
    },
    parser: 'babel-eslint',
}

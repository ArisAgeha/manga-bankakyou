module.exports = {
    extends: ['erb'],
    rules: {
        // A temporary hack related to IDE not resolving correct package.json
        'import/no-extraneous-dependencies': 'off',
        'import/prefer-default-export': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'class-methods-use-this': 'off',
        '@typescript-eslint/no-useless-constructor': 'off',
        'no-console': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'no-restricted-syntax': 'off',
        '@typescript-eslint/ban-types': 'off',
        'no-plusplus': 'off',
        '@typescript-eslint/no-shadow': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        'no-prototype-builtins': 'off',
        'no-bitwise': 'off',
        'no-nested-ternary': 'off',
        '@typescript-eslint/no-unused-expressions': 'off',
        'no-param-reassign': 'off',
        'consistent-return': 'off',
        'no-await-in-loop': 'off',
        'no-underscore-dangle': 'off',
    },
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        createDefaultProgram: true,
    },
    settings: {
        'import/resolver': {
            // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
            node: {},
            webpack: {
                config: require.resolve(
                    './.erb/configs/webpack.config.eslint.js'
                ),
            },
        },
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
    },
};

module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
    },
    plugins: [
        'import',
        'json-format',
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'airbnb-base',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
    ],
    settings: {
        'json/sort-package-json': 'standard',
        'json/ignore-files': ['**/package-lock.json'],
        'json/json-with-comments-files': ['**/tsconfig.json', '.vscode/**'],
        'import/parsers': {
            '@typescript-eslint/parser': [
                '.ts',
                '.tsx',
                '.d.ts',
            ],
        },
        'import/resolver': { typescript: { alwaysTryTypes: true } },
        parserOptions: {
            project: 'tsconfig.json',
            tsconfigRootDir: '.',
            ecmaVersion: 2021,
            sourceType: 'module',
        },
    },
    rules: {
        '@typescript-eslint/consistent-type-imports': 'warn',
        '@typescript-eslint/ban-ts-comment': [
            'error',
            { 'ts-ignore': 'allow-with-description' },
        ],
        '@typescript-eslint/no-unused-vars': 'off',
        'no-unused-vars': 'off',
        'import/prefer-default-export': 'off',
        'max-classes-per-file': [
            'error',
            {
                ignoreExpressions: true,
                max: 2,
            },
        ],
        'newline-per-chained-call': [
            'error',
            { ignoreChainWithDepth: 5 },
        ],
        camelcase: 'off',
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                ts: 'never',
                tsx: 'never',
            },
        ],
        'import/no-unresolved': 'error',
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
                VariableDeclarator: 1,
                outerIIFEBody: 1,
                // MemberExpression: null,
                FunctionDeclaration: {
                    parameters: 1,
                    body: 1,
                },
                FunctionExpression: {
                    parameters: 1,
                    body: 1,
                },
                CallExpression: { arguments: 1 },
                ArrayExpression: 1,
                ObjectExpression: 1,
                ImportDeclaration: 1,
                flatTernaryExpressions: false,
                // list derived from https://github.com/benjamn/ast-types/blob/HEAD/def/jsx.js
                ignoreComments: false,
            },
        ],
        'no-param-reassign': [
            'error',
            { props: false },
        ],
        'linebreak-style': [
            'error', process.platform === 'win32' ? 'windows' : 'unix',
        ],
        'object-curly-spacing': [
            'error',
            'always',
        ],
        semi: [
            'error',
            'never',
        ],
        //        "import/prefer-default-export": "off",
        'no-multi-assign': [
            'error',
            { ignoreNonDeclaration: true },
        ],
        'lines-between-class-members': [
            'error',
            'always',
            { exceptAfterSingleLine: true },
        ],
        'no-bitwise': 'off',
        'class-methods-use-this': 'warn',
        'no-shadow': 'off',
        'object-curly-newline': [
            'error',
            {
                multiline: true,
                consistent: false,
            },
        ],
        'no-await-in-loop': 'off',
        'max-len': [
            'error',
            { code: 200 },
        ],
        'guard-for-in': 'off',
        'arrow-parens': [
            'error',
            'as-needed',
        ],
        'no-restricted-syntax': [
            'warn',
            {
                selector: 'ForInStatement',
                message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
            },
            {
                selector: 'ForOfStatement',
                message: 'iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.',
            },
            {
                selector: 'LabeledStatement',
                message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
            },
            {
                selector: 'WithStatement',
                message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
            },
        ],
    },
}

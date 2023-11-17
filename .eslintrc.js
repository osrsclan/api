module.exports = {
    root: true,
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    rules: {
        '@typescript-eslint/no-unused-vars': [2, { 'argsIgnorePattern': '_' }],
        'quotes': [
            'error',
            'single'
        ],
        'sort-imports': [
            'error', {
            'ignoreCase': false,
            'ignoreDeclarationSort': false,
            'ignoreMemberSort': false,
            'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single'],
            'allowSeparatedGroups': true
            }
        ]
    },
}
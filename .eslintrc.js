module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react"
    ],
    "rules": {
        "no-multi-spaces": "error",
        "linebreak-style": ["error", "windows"],
        "comma-dangle": ["error", "never"],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
        "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
        "no-use-before-define": 0,
        "no-console": 0,
        "spaced-comment":0,
        "no-loop-func":0,
        "import/prefer-default-export":0,
        "no-case-declarations":0,
        "class-methods-use-this":0,
        "no-shadow":0
    },
    "env": {
        "browser": true,
        "node": true,
        "jest": true,
    },
    "parser": "babel-eslint"
};
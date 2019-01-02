module.exports = {
  "extends": "airbnb",
  "plugins": [
    "react"
  ],
  "rules": {
    "no-multi-spaces": "error",
    "linebreak-style": ["error", "windows"],
    "comma-dangle": ["error", "never"],
    "react/jsx-filename-extension": [1, {
      "extensions": [".js", ".jsx"]
    }],
    "import/no-extraneous-dependencies": ["error", {
      "devDependencies": true
    }],
    "no-unused-vars": ["error", {
      "argsIgnorePattern": "^_"
    }],
    "spaced-comment": 0,
    "import/prefer-default-export": 0,
    "no-case-declarations": 0,
    "no-console": 0,
    "no-use-before-define": 0,
    "class-methods-use-this": 0,
    "no-shadow": 0,
    "no-restricted-syntax": 0,
    "jsx-a11y/label-has-for": [2, {
      "components": ["Label"],
      "required": {
        "every": ["id"]
      },
      "allowChildren": false
    }]
  },
  "env": {
    "browser": true,
    "node": true,
    "jest": true,
  },
  "parser": "babel-eslint"
};
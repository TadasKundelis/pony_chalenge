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
    "no-underscore-dangle": ["error", { "allow": ["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] }],
    "no-console": 0,
    "no-shadow": 0,
    "import/no-named-as-default": 0,
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
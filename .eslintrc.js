module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "indent": [
      "warn",
      2
    ],
    "no-unused-vars": ["warn"],
    "no-extra-semi": ["warn"],
    "linebreak-style": [
      "warn",
      "unix"
    ],
    "quotes": [
      "warn",
      "single"
    ],
    "semi": [
      "warn",
      "always"
    ],
    "react/prop-types": [
      "warn"
    ]
  }
};

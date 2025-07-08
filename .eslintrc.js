module.exports = {
  extends: ["next/core-web-vitals"],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  rules: {
    "react/no-unescaped-entities": "off", // ⛔ disables quote warning
  },
};

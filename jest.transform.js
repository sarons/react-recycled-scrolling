module.exports = require('babel-jest').createTransformer({
  presets: ['@babel/preset-env', '@babel/react'],
  ignore: [".css"]
});
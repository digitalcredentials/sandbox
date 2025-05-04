const { override, addBabelPlugins, babelInclude } = require('customize-cra');
const path = require('path');

module.exports = override(
  // Add Babel plugins with consistent 'loose' configuration
  addBabelPlugins(
    ['@babel/plugin-transform-class-properties', { loose: true }],
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['@babel/plugin-transform-private-property-in-object', { loose: true }]
  ),

  // Include @digitalcredentials modules for Babel processing
  babelInclude([
    path.resolve('src'),
    path.resolve('node_modules/@digitalcredentials'),
  ])
);

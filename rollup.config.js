import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

import postcss from 'rollup-plugin-postcss';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
import postcssModules from 'postcss-modules';

const cssExportMap = {};

let postcssPlugins = [
  autoprefixer(),
  postcssModules({
    getJSON(id, exportTokens) {
      cssExportMap[id] = exportTokens;
    },
    // Update .babelrc too
    generateScopedName: 'easy-print-[name]-[local]-[hash:base64:4]',
  }),
  cssnano(),
];

const input = './src/index.jsx';
const name = 'ReactEasyPrint';
const globals = {
  'react': 'React',
  'react-dom': 'ReactDOM',
  'react-proptypes': 'PropTypes',
};
const babelOptions = {
  exclude: ['node_modules/**'],
  babelrc: true,
  // We are using @babel/plugin-transform-runtime
  runtimeHelpers: true,
};

const commonjsOptions = {
  ignoreGlobal: true,
  include: /node_modules/,
};

const plugins = [
  postcss({
    plugins: postcssPlugins,
    namedExports(id) {
      return cssExportMap[id];
    },
    extensions: ['.css'],
    inject: true,
  }),
  resolve({
    extensions: ['.js', '.jsx', '.json'],  // Default: [ '.mjs', '.js', '.json', '.node' ]
  }),
  babel(babelOptions),
  commonjs(commonjsOptions),
  replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
  sizeSnapshot(),
  terser(),
];

export default [
  // we use just babel for esm that is keep separate files, little bit faster (~1.5s) and compact (~8KiB)
  // {
  //   input,
  //   output: { file: 'lib/es/index.js', format: 'es', name, globals, sourcemap: true, },
  //   external: Object.keys(globals),
  //   plugins,
  // },

  {
    input,
    output: { file: 'lib/umd/index.js', format: 'umd', name, globals, sourcemap: true, },
    external: Object.keys(globals),
    plugins,
  }
];

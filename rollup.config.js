/*process.env.NODE_ENV = 'development';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';
import svgr from '@svgr/rollup';

import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    external(),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
      plugins: [
        'transform-react-jsx',
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        // '@babel/plugin-external-helpers',
        '@babel/plugin-proposal-class-properties'
      ]
    }),
    resolve(),
    commonjs()
  ]
};*/

import { readdirSync } from 'fs';
import path from 'path';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import pkg from './package.json';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.json'];
const CODES = [
  'THIS_IS_UNDEFINED',
  'MISSING_GLOBAL_NAME',
  'CIRCULAR_DEPENDENCY'
];

const getChunks = (URI) =>
  readdirSync(path.resolve(URI))
    .filter((x) => x.includes('.js'))
    .reduce((a, c) => ({ ...a, [c.replace('.js', '')]: `src/${c}` }), {});

const discardWarning = (warning) => {
  if (CODES.includes(warning.code)) {
    return;
  }

  console.error(warning);
};

const env = process.env.NODE_ENV;

const commonPlugins = () => [
  external({
    includeDependencies: true
  }),
  babel({
    babelrc: false,
    presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],
    extensions: EXTENSIONS,
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      '@babel/plugin-proposal-class-properties'
    ],
    exclude: 'node_modules/**'
  }),
  commonjs({
    include: /node_modules/
  }),
  replace({ 'process.env.NODE_ENV': JSON.stringify(env) }),
  resolve({
    extensions: EXTENSIONS,
    preferBuiltins: false
  })
];

export default [
  {
    onwarn: discardWarning,
    input: 'src/index.js',
    output: {
      esModule: false,
      file: pkg.unpkg,
      format: 'umd',
      name: 'silkyCharts',
      exports: 'named',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'styled-components': 'styled'
      }
    },
    plugins: [...commonPlugins(), env === 'production' && terser()]
  },
  {
    onwarn: discardWarning,
    input: getChunks('src'),
    output: [
      { dir: '.', format: 'esm', sourcemap: true },
      { dir: '.', format: 'cjs', exports: 'named', sourcemap: true }
    ],
    plugins: commonPlugins()
  }
];

import { camelCase } from 'lodash'
import { babel } from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import replace from '@rollup/plugin-replace'

const pkg = require('./package.json')

const extensions = [
  '.js', '.jsx', '.ts', '.tsx',
]

const appConfig = {
  input: `./src/${pkg.name}.ts`,
  plugins: [
    json(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.BUILD_DATE': JSON.stringify(new Date()),
      'process.env.VERSION': JSON.stringify(pkg.version),
      __buildDate__: () => JSON.stringify(new Date()),
      __buildVersion__: JSON.stringify(pkg.version),
      preventAssignment: true
    }),
    resolve({ extensions, moduleDirectories: [] }),
    commonjs(),
    babel({
      extensions,
      babelHelpers: 'bundled',
      include: ['src/**/*'],
    })
  ],
  output: [
    { file: pkg.main, name: camelCase(pkg.name), format: 'umd', sourcemap: true},
    { file: pkg.minimized, name: camelCase(pkg.name), format: 'umd', sourcemap: true, plugins: [terser()] },
    { file: pkg.module, format: 'esm', sourcemap: true },
  ]
}

export default [
  appConfig
]

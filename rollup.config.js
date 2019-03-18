import nodeResolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'
import babel from 'rollup-plugin-babel'

export default [
  // ES for browsers
  {
    input: 'src/paint-timing.js',
    output: {
      file: 'es/pt.mjs',
      format: 'es',
      indent: false
    },
    plugins: [
      nodeResolve({
        jsnext: true
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        }
      })
    ]
  },
  // ES
  {
    input: 'src/paint-timing.js',
    output: {
      file: 'es/pt.js',
      format: 'es',
      indent: false
    },
    external: [
      ...Object.keys(pkg.dependencies ||{}),
      ...Object.keys(pkg.peerDependencies || {})
    ],
    plugins: [babel()]
  },
  // CommonJS
  {
    input: 'src/paint-timing.js',
    output: {
      file: 'lib/pt.js',
      format: 'cjs',
      indent: false
    },
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ],
    plugins: [babel()]
  },
  // UMD Development
  {
    input: 'src/paint-timing.js',
    output: {
      file: 'dist/pt.js',
      format: 'umd',
      name: 'pt',
      indent: false
    },
    plugins: [
      nodeResolve({
        jsnext: true
      }),
      babel({
        exclude: 'node_modules/**'
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development')
      })
    ]
  },
  // UMD Production
  {
    input: 'src/paint-timing.js',
    output: {
      file: 'dist/pt.min.js',
      format: 'umd',
      name: 'pt',
      indent: false
    },
    plugins: [
      nodeResolve({
        jsnext: true
      }),
      babel({
        exclude: 'node_modules/**'
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        }
      })
    ]
  }
]
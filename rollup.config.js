import babel from '@rollup/plugin-babel';

export default {
  input: 'src/index.js',
  output: [
    { file: 'lib/index.cjs.js', format: 'cjs', exports: 'default' },
    { file: 'lib/index.esm.js', format: 'esm' },
  ],
  external: [
    'prop-types',
    'react',
    'react-dom',
    'use-isomorphic-layout-effect',
  ],
  plugins: [babel({ babelHelpers: 'bundled' })],
};
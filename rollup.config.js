import babel from '@rollup/plugin-babel';

export default {
  input: 'src/index.js',
  output: [
    {
      exports: 'default',
      file: 'lib/index.cjs.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'lib/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  external: ['prop-types', 'react', 'react-dom'],
  plugins: [babel({ babelHelpers: 'bundled' })],
};

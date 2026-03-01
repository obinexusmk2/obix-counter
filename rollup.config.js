import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import path from 'path';

export default {
  input: 'pages/counter.js',
  output: {
    file: path.join(path.resolve(), 'dist', 'bundle.js'),
    format: 'iife',
    name: 'CounterApp',
    sourcemap: true,
  },
  plugins: [resolve(), commonjs(), terser()],
};

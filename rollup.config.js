import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import path from 'path';

export default {
  input: 'pages/counter.js', // Entry file
  output: {
    file: path.join(path.resolve(), 'dist', 'bundle.js'), // Output file with resolved path
    format: 'iife', // Immediately Invoked Function Expression for browser compatibility
    name: 'CounterApp',
    globals: {
      obix: 'obix', // Specify the global variable name for 'obix'
    },
  },
  plugins: [
    resolve(), // Resolves node_modules imports
    commonjs(), // Converts CommonJS to ES6
    terser(), // Minifies the output
  ],
  external: ['obix'], // Mark 'obix' as an external dependency
};
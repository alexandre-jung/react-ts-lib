import { readFile } from 'fs/promises';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';

/**
 * [Import assertions](https://nodejs.dev/fr/api/v18/esm/#import-assertions) still is an experimental feature.
 *
 * Once it is made stable, we might use the following import:
 *
 * `import packageJson from './package.json' assert { type: 'json' };`
 *
 * Originally found on [Rollup doc](https://rollupjs.org/command-line-interface/#importing-package-json)
 */

const packageJson = await loadPackageJson();

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        name: 'react-ts-lib',
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
        name: 'react-ts-lib',
      },
    ],
    plugins: [
      external(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      postcss({
        // https://www.npmjs.com/package/rollup-plugin-postcss
        // https://stackoverflow.com/a/59034076
        extract: true,  // Extract to an external CSS file.
        minimize: true,  // Minify the resulting CSS.
        sourceMap: true,  // As its name suggests.
        modules: {
          generateScopedName: false,  // Do not prefix class names with the module name.
        },
      }),
      terser(),
    ],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [
      {
        file: 'dist/index.d.ts',
        format: 'esm',
      },
    ],
    external: [/\.css$/],
    plugins: [dts()],
  },
];

async function loadPackageJson (filename = 'package.json') {
  return JSON.parse(await readFile(filename));
}

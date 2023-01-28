import dts from 'rollup-plugin-dts';
import external from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';

/**
 * Configuration that generates a bundle with ES modules, preserved structure and type definitions.
 */
const esmConfig = getBuildConfig({
  format: 'esm',
  outDirFromDist: 'esm',
  tsconfig: 'tsconfig-esm.json',
});

/**
 * Configuration that generates a bundle with CommonJS modules, preserved structure and type definitions.
 */
const cjsConfig = getBuildConfig({
  format: 'cjs',
  outDirFromDist: 'cjs',
  tsconfig: 'tsconfig-cjs.json',
});

/**
 * Configuration that generates the type definitions at the root of the dist/ folder.
 *
 * It should be included last.
 */
const rootTypeDefinitionsConfig = {
  input: 'dist/esm/types/index.d.ts',
  output: [
    {
      file: 'dist/index.d.ts',
    },
  ],
  external: [/\.css$/],  // Preserve imports.
  plugins: [dts()],  // Roll-up the .d.ts definition files.
};

export default [
  cjsConfig,
  esmConfig,
  rootTypeDefinitionsConfig,
];

function getBuildConfig ({
  format,
  outDirFromDist,
  tsconfig,
}) {
  return {
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist',
        format,
        sourcemap: true,
        name: 'react-ts-lib',
        preserveModules: true,
        // To output CSS one level up: https://github.com/rollup/rollup/issues/3507#issuecomment-616634947
        entryFileNames: `${outDirFromDist}/[name].js`,
      },
    ],
    external: [/\.css$/],  // Preserve imports.
    plugins: [
      external(),
      resolve(),
      commonjs(),
      typescript({ tsconfig }),
      postcss({
        // https://www.npmjs.com/package/rollup-plugin-postcss
        // https://stackoverflow.com/a/59034076
        extract: true,  // Extract to an external CSS file.
        minimize: true,  // Minify the resulting CSS.
        sourceMap: true,
        modules: {
          generateScopedName: false,  // Do not prefix class names with the module name.
        },
        plugins: [],
      }),
      terser(),  // Minify the bundle.
    ],
  };
}

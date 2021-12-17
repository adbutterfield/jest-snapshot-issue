import { terser } from 'rollup-plugin-terser';
import sourcemaps from 'rollup-plugin-sourcemaps';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { readdirSync, statSync } from 'fs';
import path from 'path';

const sharedConfig = {
  external: ['react', 'styled-components', 'react-router-dom', 'lodash.debounce', 'styled-normalize', 'body-scroll-lock'],
  plugins: [sourcemaps(), terser(), resolve({ extensions: ['.ts', '.tsx'] }), babel({ extensions: ['.ts', '.tsx'], babelHelpers: 'inline' })],
};

const componentsToBundle = [];
const otherFilesToBundle = [];
// List of directories with files that we also want to bundle
const nonComponentDirsToBundle = ['hooks', 'styles', 'utils'];

readdirSync('./src').forEach((file) => {
  if (/^[A-Z]/.test(file)) {
    // Directories starting with a capitol letter contain components.
    componentsToBundle.push(file);
  } else {
    const stats = statSync(path.join(__dirname, 'src', file));
    if (stats.isDirectory() && nonComponentDirsToBundle.includes(file)) {
      // We also want to bundle some other files.
      otherFilesToBundle.push(file);
    }
  }
});

// Create the rollup config for each component.
const componentConfigs = componentsToBundle
  .reduce((acc, cmpName) => {
    return [
      ...acc,
      {
        ...sharedConfig,
        input: path.join('src', cmpName, 'index.ts'),
        output: {
          file: path.join('build', cmpName, 'index.js'),
          format: 'cjs',
          exports: 'named',
          sourcemap: true,
        },
      },
    ];
  }, [])
  .filter(Boolean);

// Create rollup configs for the other files we want to bundle
const otherConfigs = otherFilesToBundle
  .reduce((acc, dirName) => {
    // Make a list of the full path to all the files we want to bundle in each directory.
    return [
      ...acc,
      ...readdirSync(path.join('src', dirName))
        // Exclude test files
        .filter((fileName) => !/\.test\.tsx$/.test(fileName))
        .map((filename) => path.join('src', dirName, filename)),
    ];
  }, [])
  .map((fileName) => ({
    ...sharedConfig,
    input: fileName,
    output: {
      file: fileName.replace('src', 'build').replace(/\.ts$/, '.js'),
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
  }));

// Create rollup config for the index file (makes one big bundle of the entire component library)
const indexFileConfig = {
  ...sharedConfig,
  input: path.join('src', 'index.ts'),
  output: {
    file: path.join('build', 'index.js'),
    format: 'cjs',
    exports: 'named',
    sourcemap: true,
  },
};

const allConfigs = [...componentConfigs, ...otherConfigs, indexFileConfig];

export default allConfigs;

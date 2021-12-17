/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import path from 'path';
import fse from 'fs-extra';
import glob from 'glob';

const packagePath = process.cwd();
const buildPath = path.join(packagePath, './build');
const srcPath = path.join(packagePath, './src');

const includeFileInBuild = async (file: string): Promise<void> => {
  const sourcePath = path.resolve(packagePath, file);
  const targetPath = path.resolve(buildPath, path.basename(file));
  await fse.copy(sourcePath, targetPath);
  // eslint-disable-next-line no-console
  console.log(`Copied ${sourcePath} to ${targetPath}`);
};

/**
 * Puts a package.json into every immediate child directory of rootDir.
 * That package.json contains information about esm for bundlers so that imports
 * like `import Typography from '@alj-react/ui-components/Text'` are tree-shakeable.
 *
 * It also tests that an this import can be used in TypeScript by checking
 * if an index.d.ts is present at that path.
 *
 * @param {string} rootDir
 */
const createModulePackages = async ({ from, to }: { from: string; to: string }): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const directoryPackages = glob
    .sync('**/index.ts', { cwd: from })
    // eslint-disable-next-line @typescript-eslint/unbound-method
    .map(path.dirname)
    .filter((name) => name !== '.');

  await Promise.all(
    directoryPackages.map(async (directoryPackage) => {
      const packageJson = {
        sideEffects: false,
        module: './index.js',
        typings: './index.d.ts',
      };
      const packageJsonPath = path.join(to, directoryPackage, 'package.json');

      const [typingsExist] = await Promise.all([
        fse.pathExists(path.join(to, directoryPackage, 'index.d.ts')),
        fse.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2)),
      ]);

      if (!typingsExist) {
        throw new Error(`index.d.ts for ${directoryPackage} is missing`);
      }

      return packageJsonPath;
    }),
  );
};

const createPackageFile = async (): Promise<void> => {
  const packageData = await fse.readFile(path.resolve(packagePath, './package.json'), 'utf8');
  const { scripts, devDependencies, husky, 'lint-staged': lintStaged, ...packageDataOther } = JSON.parse(packageData);
  const newPackageData = {
    ...packageDataOther,
    private: false,
    main: './index.js',
    module: './index.js',
    typings: './index.d.ts',
  };
  const targetPath = path.resolve(buildPath, './package.json');

  await fse.writeFile(targetPath, JSON.stringify(newPackageData, null, 2), 'utf8');
  // eslint-disable-next-line no-console
  console.log(`Created package.json in ${targetPath}`);

  return newPackageData;
};

const run = async (): Promise<void> => {
  try {
    await createPackageFile();

    await Promise.all(['./README.md', './src/types.d.ts'].map((file) => includeFileInBuild(file)));

    await createModulePackages({ from: srcPath, to: buildPath });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  }
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
run();

const fs = require('fs');
const path = require('path');

// Find all the test and snapshot files
function getTestFiles() {
  return fs.readdirSync('src').reduce(
    (acc, file) => {
      const testFileName = path.join(__dirname, '..', 'src', file, '__test__', `${file}.test.tsx`);
      const screenshotTestFileName = path.join(__dirname, '..', 'src', file, '__test__', `${file}.screenshot.test.tsx`);
      const testSnapshotsFileName = path.join(__dirname, '..', 'src', file, '__test__', '__snapshots__', `${file}.test.tsx.snap`);

      if (fs.existsSync(testFileName)) {
        acc[0].push(testFileName);
      }

      if (fs.existsSync(screenshotTestFileName)) {
        acc[0].push(screenshotTestFileName);
      }

      if (fs.existsSync(testSnapshotsFileName)) {
        acc[1].push(testSnapshotsFileName);
      }

      return acc;
    },
    [[], []],
  );
}

function copyTestFiles() {
  const [testFiles, snapshotFiles] = getTestFiles();
  // Create a copy of the test files, but change to import components from build instead of src
  testFiles.forEach((filePath) => {
    const readStream = fs.createReadStream(filePath);
    const writeStream = fs.createWriteStream(filePath.replace('.test.', '.build.test.'));
    let fileData = '';
    readStream.on('data', (chunk) => {
      fileData += chunk;
    });
    readStream.on('end', () => {
      writeStream.write(fileData.replace(/from\s'(\.\.\/)+([A-Z])/g, "from '../../../build/$2"));
    });
  });

  // Create copy of any snapshot files
  snapshotFiles.forEach((filePath) => {
    fs.copyFileSync(filePath, filePath.replace('.test.', '.build.test.'));
  });
}

copyTestFiles();

const processFiles = require('./processFiles');

async function main() {
  const filePaths = ['file1.txt', 'file2.txt'];
  await processFiles(filePaths);
}

main();
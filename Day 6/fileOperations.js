const fs = require('fs').promises;

async function readFileAsync(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return data;
  } catch (error) {
    throw new Error(`Error reading file: ${error.message}`);
  }
}

module.exports = readFileAsync;
const fs = require('fs').promises;

async function writeFileAsync(filePath, content) {
  try {
    await fs.writeFile(filePath, content);
    console.log(`File written successfully to ${filePath}`);
  } catch (error) {
    throw new Error(`Error writing to file: ${error.message}`);
  }
}

module.exports = writeFileAsync;
const readFileAsync = require('./readFileAsync');
const writeFileAsync = require('./writeFileAsync');

async function processFiles(filePaths) {
  try {
    for (const filePath of filePaths) {
      const content = await readFileAsync(filePath);
      // Manipulate the content here (e.g., add a timestamp, reverse, convert to uppercase)
      const modifiedContent = content.toUpperCase();
      await writeFileAsync(`modified_${filePath}`, modifiedContent);
    }
  } catch (error) {
    console.error(`Error processing files: ${error.message}`);
  }
}

module.exports = processFiles;

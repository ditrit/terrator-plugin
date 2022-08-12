const fs = require('fs');

const resources = {};

/**
 * This script has for goal to generate an index.js in the src/assets folder, to centralize all resources in one file.
 */

fs.readdirSync('src/assets/')
  .filter((name) => name !== 'index.js')
  .forEach((dirName) => {
    resources[dirName] = {};
    fs.readdirSync(`src/assets/${dirName}`)
      .map((fileName) => ({
        name: fileName.split('.')[0],
        value: fs.readFileSync(`src/assets/${dirName}/${fileName}`).toString(),
      }))
      .forEach((file) => {
        resources[dirName][file.name] = file.value;
      });
  });

fs.writeFileSync('src/assets/index.js', `export default ${JSON.stringify(resources)};`);

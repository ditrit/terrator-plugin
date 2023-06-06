const fs = require('fs');
const { exec } = require('node:child_process');
const os = require('os');

const antlr4Version = /\d+\.\d+\.\d+/.exec(require('../package.json').dependencies.antlr4)[0];

let antlr4Path = process.env.ANTLR4_PATH;
let classpath = '$CLASSPATH';

if (!antlr4Path || antlr4Path === '') {
  antlr4Path = `/usr/local/lib/antlr-${antlr4Version}-complete.jar`;
}

if (os.type() === 'Windows_NT') {
  classpath = '%CLASSPATH%';
  antlr4Path = `C:\\Javalib\\antlr-${antlr4Version}-complete.jar`;
}

new Promise(() => {
  exec(`java -cp "${antlr4Path}:${classpath}" org.antlr.v4.Tool -Dlanguage=JavaScript src/antlr/terraform.g4 -lib src/antlr/`, (error) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    const path = './src/antlr/terraformParser.js';
    const generatedListenerPath = './src/antlr/terraformListener.js';
    const content = fs.readFileSync(path, 'utf8');
    const newContent = content.replace(/\.\/terraformListener\.js/g, 'src/parser/TerraformListener.js');
    fs.writeFileSync(path, newContent, 'utf8');
    fs.unlinkSync(generatedListenerPath);
  });
});

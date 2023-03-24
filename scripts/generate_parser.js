const fs = require('fs');
const { exec } = require('node:child_process');
const os = require('os');

let classpath = '$CLASSPATH';

let antlr4_path = process.env.ANTLR4_PATH

if(!antlr4_path || antlr4_path == '' || antlr4_path === undefined) {
    antlr4_path = '/usr/local/lib/antlr-4.11.0-complete.jar'
}

if (os.type() == 'Windows_NT') {
    classpath = '%CLASSPATH%'
    antlr4_path = 'C:\\Javalib\\antlr-4.11.0-complete.jar'
}

new Promise(() => {
  exec(`java -cp "${antlr4_path}:${classpath}" org.antlr.v4.Tool -Dlanguage=JavaScript src/antlr/terraform.g4 -lib src/antlr/`, (error) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    else {
      const path = './src/antlr/terraformParser.js';
      const generatedListenerPath = './src/antlr/terraformListener.js';
      const content = fs.readFileSync(path, 'utf8');
      const newContent = content.replace(/\.\/terraformListener\.js/g, 'src/parser/TerraformListener.js');
      fs.writeFileSync(path, newContent, 'utf8');
      fs.unlinkSync(generatedListenerPath);
    }
  });
});
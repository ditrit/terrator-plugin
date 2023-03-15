const fs = require('fs');
const { exec } = require('node:child_process');
const os = require('os');

var classpath = '$CLASSPATH';

if (os.type() == 'Windows_NT') {
    classpath = '%CLASSPATH%'
}

const antlr4_path = process.env.ANTLR4_PATH;


new Promise(() => {
  exec(`java -cp "${antlr4_path}:${classpath}" org.antlr.v4.Tool -Dlanguage=JavaScript src/antlr/terraformParser.g4 -lib src/antlr/`, (error) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    else {
      const path = './src/antlr/terraformParser.js';
      const generatedListenerPath = './src/antlr/terraformParserListener.js';
      const content = fs.readFileSync(path, 'utf8');
      const newContent = content.replace(/terraformParserListener/g, 'TerraformListener').replace(/\.\/TerraformListener\.js/g, 'src/parser/TerraformListener.js');
      fs.writeFileSync(path, newContent, 'utf8');
      fs.unlinkSync(generatedListenerPath);
    }
  });
});

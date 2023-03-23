import antlr4 from 'antlr4';
import {
  DefaultParser,
} from 'leto-modelizer-plugin-core';
import TerraformListener from 'src/parser/TerraformListener';
import Lexer from 'src/antlr/terraformLexer';
import Parser from 'src/antlr/terraformParser';

/**
 * Class to parse and retrieve components/links from Terraform files.
 */
class TerraformParser extends DefaultParser {
  /**
   * Indicate if this parser can parse this file.
   *
   * @param {FileInformation} [fileInformation] - File information.
   * @returns {boolean} Boolean that indicates if this file can be parsed or not.
   */
  isParsable(fileInformation) {
    return /^.*\.tf$/.test(fileInformation.path);
  }

  /**
   * Convert the content of files into Components.
   *
   * @param {FileInput[]} [inputs=[]] - Data you want to parse.
   */
  parse(inputs = []) {
    this.pluginData.components = [];
    const listener = new TerraformListener(this.pluginData.definitions.components);
    inputs
      .filter(({ content }) => content !== null)
      .forEach((input) => {
        listener.currentFile = input;
        const stream = new antlr4.InputStream(input.content);
        const lexer = new Lexer(stream);
        const tokens = new antlr4.CommonTokenStream(lexer);
        const parser = new Parser(tokens);
        parser.buildParseTrees = true;
        const tree = parser.file_();
        antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, tree);
      });

    listener.components.forEach((component) => {
      if (component.id === null) {
        component.id = this.pluginData.generateComponentId(component.definition);
      }
      this.pluginData.components.push(component);
    });
    this.pluginData.parseErrors = listener.errors;
  }
}

export default TerraformParser;

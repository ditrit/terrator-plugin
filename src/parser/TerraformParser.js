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
   * @param {string} [parentEventId=null] - Parent event id.
   */
  parse(inputs = [], parentEventId = null) {
    this.pluginData.components = [];

    const listener = new TerraformListener(this.pluginData.definitions.components);

    inputs
      .filter(({ content }) => {
        if (content !== null || content?.trim() === '') {
          return true;
        }

        this.pluginData.emitEvent({
          parent: parentEventId,
          type: 'Parser',
          action: 'read',
          status: 'warning',
          data: {
            code: 'no_content',
            global: false,
          },
        });

        return false;
      })
      .forEach((input) => {
        const id = this.pluginData.emitEvent({
          parent: parentEventId,
          type: 'Parser',
          action: 'read',
          status: 'running',
          files: [input.path],
          data: {
            global: false,
          },
        });

        listener.currentFile = input;
        const stream = new antlr4.InputStream(input.content);
        const lexer = new Lexer(stream);
        const tokens = new antlr4.CommonTokenStream(lexer);
        const parser = new Parser(tokens);
        parser.buildParseTrees = true;
        const tree = parser.file_();
        antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, tree);
        this.pluginData.emitEvent({ id, status: 'success' });
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

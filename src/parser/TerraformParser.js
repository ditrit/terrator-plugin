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
    const listener = new TerraformListener(this.pluginData.definitions.components);
    inputs.forEach((input) => {
      listener.currentFile = input;
      const stream = new antlr4.InputStream(input.content);
      const lexer = new Lexer(stream);
      const tokens = new antlr4.CommonTokenStream(lexer);
      const parser = new Parser(tokens);
      parser.buildParseTrees = true;
      const tree = parser.file();
      antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, tree);
    });
    const components = listener.components.map((component) => {
      component.id = component.name;
      return component;
    });

    this.pluginData.components = this.getComponentTree(components);
    this.pluginData.parseErrors = listener.errors;
  }

  /**
   * Transforms components to components tree, where each child component are in the parent
   * component.
   *
   * @param {Component[]} components - Horizontal component without any tree.
   * @returns {Component[]} Component tree.
   */
  getComponentTree(components) {
    const tree = [];
    components.forEach((component) => {
      if (this.hasParent(component)) {
        this.getParents(components, component)
          .forEach((parent) => {
            parent.children.push(component);
          });
      } else {
        tree.push(component);
      }
    });
    return tree;
  }

  /**
   * Get all parents of a component.
   *
   * @param {Component[]} components - Components list that contains all parents and children.
   * @param {Component} child - Child to get parent id from attributes.
   * @returns {Component[]} Parent list.
   */
  getParents(components, child) {
    return components
      .filter((component) => {
        if (!component.definition || !component.definition.isContainer) {
          return false;
        }

        return child.attributes
          .some((attribute) => attribute.definition
            && attribute.definition.type === 'Reference'
            && attribute.definition.containerRef === component.definition.type
            && attribute.value === component.id);
      });
  }

  /**
   * Indicate if a component can have parent.
   *
   * @param {Component} component - Component to check.
   * @returns {boolean} Return true if component can have parent otherwise false.
   */
  hasParent(component) {
    if (!component.definition) {
      return false;
    }
    return component.definition.parentTypes.length > 0 && component.attributes
      .some((attribute) => attribute.definition && attribute.definition.type === 'Reference');
  }
}

export default TerraformParser;

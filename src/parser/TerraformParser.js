import antlr4 from 'antlr4';
import {
  DefaultParser,
  ComponentLink,
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
   * @param {String} [fileName] - Name of file.
   * @return {Boolean} - Boolean that indicates if this file can be parsed or not.
   */
  isParsable(fileName) {
    return /^.*\.tf$/.test(fileName);
  }

  /**
   * Convert the content of files into Components.
   * @param {String[]} [inputs=[]] - Data you want to parse.
   * @return {Object} - Object that contains all components, links and errors.
   */
  parse(inputs = []) {
    const listener = new TerraformListener(this.definitions.components);
    inputs.forEach((input) => {
      const stream = new antlr4.InputStream(input);
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

    return {
      components: this.getComponentTree(components),
      links: this.getLinks(components),
      errors: listener.errors,
    };
  }

  /**
   * Transforms components to components tree, where each child component are in the parent
   * component.
   * @param {Component[]} components - Horizontal component without any tree.
   * @return {Component[]} Component tree.
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
   * @param {Component[]} components - Components list that contains all parents and children.
   * @param {Component} child - Child to get parent id from attributes.
   * @return {Component[]} Parent list.
   */
  getParents(components, child) {
    return components
      .filter((component) => {
        if (!component.definition.isContainer) {
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
   * @param {Component} component - Component to check.
   * @return {boolean} Return true if component can have parent otherwise false.
   */
  hasParent(component) {
    if (!component.definition) {
      return false;
    }
    return component.definition.parentTypes.length > 0 && component.attributes
      .some((attribute) => attribute.definition && attribute.definition.type === 'Reference');
  }

  /**
   * Get all links from components attributes.
   * @param {Component[]} components - Component list to parse to retrieve links.
   * @return {ComponentLink[]} Component link array.
   */
  getLinks(components) {
    const links = [];
    this.definitions.links.forEach((linkDefinition) => {
      const sourceRef = (linkDefinition.type === 'Default') ? linkDefinition.sourceRef : linkDefinition.targetRef;

      components
        .filter((component) => component.definition && component.definition.type === sourceRef)
        .forEach((component) => {
          component.attributes
            .filter((attribute) => attribute.name === linkDefinition.attributeRef)
            .forEach((attribute) => {
              if (attribute.type === 'Array') {
                attribute.value.forEach((value) => links.push(new ComponentLink({
                  source: component.id,
                  target: value,
                  definition: linkDefinition,
                })));
              } else {
                links.push(new ComponentLink({
                  source: component.id,
                  target: attribute.value,
                  definition: linkDefinition,
                }));
              }
            });
        });
    });
    return links;
  }
}

export default TerraformParser;

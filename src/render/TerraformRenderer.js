import nunjucks from 'nunjucks';
import template from 'src/render/TerraformTemplate';
import {
  DefaultRender,
  ComponentAttribute,
  FileInput,
} from 'leto-modelizer-plugin-core';

/**
 * Class to render Terraform files from components/links.
 */
class TerraformRenderer extends DefaultRender {
  /**
   * Default constructor, initialize nunjucks library and template.
   */
  constructor() {
    super();
    this.template = template;
    nunjucks.configure({
      autoescape: false,
      trimBlocks: true,
      lstripBlocks: true,
    });
  }

  /**
   * Convert all provided components and links in terraform files.
   * @param {Component[]} componentsTree - List of components you want to convert.
   * @param {ComponentLink[]} links - List of links you want to convert.
   * @param {String} defaultFileName - Default file name to set in case of empty path on component.
   * @return {FileInput[]} - Array of generated files from components and links.
   */
  render(componentsTree, links, defaultFileName = './new_file.tf') {
    links.forEach((link) => {
      const component = componentsTree.find((c) => c.id === link.source);
      if (!component) {
        return;
      }
      this.setComponentAttribute(
        component,
        link.definition.attributeRef,
        'Array',
        link.target,
      );
    });

    const componentsMap = new Map();
    this.collectComponentsFromTree(componentsMap, componentsTree, defaultFileName);

    return this.generateFilesFromComponentsMap(componentsMap);
  }

  /**
   * Set attribute value on component.
   * @param {Component} component - Component to set attribute.
   * @param {String} name - Name of attribute to set.
   * @param {String} type - Type of attribute.
   * @param {String} value - Value of attribute, only id of component is expected here.
   */
  setComponentAttribute(component, name, type, value) {
    const attribute = component.attributes.find((a) => a.name === name);
    const isArray = type === 'Array';

    if (!attribute) {
      component.attributes.push(new ComponentAttribute({
        name,
        value: isArray ? [value] : value,
        type,
      }));
    } else if (isArray && !attribute.value.includes(value)) {
      attribute.value.push(value);
    } else if (!isArray) {
      attribute.value = value;
    }
  }

  /**
   * Set container parent id on child attribute.
   * @param {Component} parent - Parent component to get id.
   * @param {Component} child - Child to set id attribute with parent id.
   */
  setContainerAttribute(parent, child) {
    const definition = child.definition.definedAttributes
      .find((def) => def.type === 'Reference' && def.containerRef === parent.definition.type);

    this.setComponentAttribute(child, definition.name, 'String', parent.id);
  }

  /**
   * Transform tree of components into an array of components associated by file name in a map.
   * @param {Map<String, Component[]>} files - Final map to populate.
   * @param {Component[]} tree - Tree to get components.
   * @param {String} defaultFileName - Default file name to set in case of empty path on component.
   */
  collectComponentsFromTree(files, tree, defaultFileName) {
    tree.forEach((component) => {
      this.initComponentPath(component, defaultFileName);

      if (!files.has(component.path)) {
        files.set(component.path, [component]);
      } else {
        files.get(component.path).push(component);
      }

      if (component.children.length === 0) {
        return;
      }
      component.children.forEach((child) => this.setContainerAttribute(component, child));
      this.collectComponentsFromTree(files, component.children, component.path);
    });
  }

  /**
   * Initialize component path if empty.
   * @param {Component} component - Component to init.
   * @param {String} defaultFileName - Default file name to set if empty.
   */
  initComponentPath(component, defaultFileName) {
    if (!component.path) {
      component.path = defaultFileName;
    }
  }

  /**
   * Render files from related components.
   * @param {Map<String,Component>} map - Component mapped by file name.
   * @return {FileInput[]} Render files array.
   */
  generateFilesFromComponentsMap(map) {
    const files = [];
    map.forEach((components, path) => {
      files.push(new FileInput({
        path,
        content: `${nunjucks.renderString(this.template, { components }).trim()}\n`,
      }));
    });
    return files;
  }
}

export default TerraformRenderer;

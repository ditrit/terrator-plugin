import nunjucks from 'nunjucks';
import template from 'src/render/TerraformTemplate';
import {
  DefaultRender,
  FileInput,
} from 'leto-modelizer-plugin-core';

/**
 * Class to render Terraform files from components/links.
 */
class TerraformRenderer extends DefaultRender {
  /**
   * Default constructor, initialize nunjucks library and template.
   *
   * @param {object} pluginData - Plugin data with components
   */
  constructor(pluginData) {
    super(pluginData);
    this.template = template;
    nunjucks.configure({
      autoescape: false,
      trimBlocks: true,
      lstripBlocks: true,
    });
  }

  /**
   * Convert all provided components and links in terraform files.
   *
   * @returns {FileInput[]} Array of generated files from components and links.
   */
  render() {
    const componentsMap = new Map();
    this.collectComponentsFromTree(componentsMap, this.pluginData.components, 'new_file.tf');

    return this.generateFilesFromComponentsMap(componentsMap);
  }

  /**
   * Transform tree of components into an array of components associated by file name in a map.
   *
   * @param {Map<string, Component[]>} files - Final map to populate.
   * @param {Component[]} tree - Tree to get components.
   * @param {string} defaultFileName - Default file name to set in case of empty path on component.
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

      this.collectComponentsFromTree(files, component.children, component.path);
    });
  }

  /**
   * Initialize component path if empty.
   *
   * @param {Component} component - Component to init.
   * @param {string} defaultFileName - Default file name to set if empty.
   */
  initComponentPath(component, defaultFileName) {
    if (!component.path) {
      component.path = defaultFileName;
    }
  }

  /**
   * Render files from related components.
   *
   * @param {Map<string,Component>} map - Component mapped by file name.
   * @returns {FileInput[]} Render files array.
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

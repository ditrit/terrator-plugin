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
  renderFiles() {
    return this.generateFilesFromComponentsMap(
      this.pluginData.components.reduce(
        (map, component) => {
          this.initComponentPath(component, 'new_file.tf');
          if (!map.has(component.path)) {
            map.set(component.path, [component]);
          } else {
            map.get(component.path).push(component);
          }
          return map;
        },
        new Map(),
      ),
    );
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

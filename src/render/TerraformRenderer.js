import nunjucks from 'nunjucks';
import templates from 'src/render/TerraformTemplate';
import {
  DefaultRender,
  FileInput,
} from 'leto-modelizer-plugin-core';

/**
 * Class to render Terraform files from components/links.
 * @augments {DefaultRender}
 */
class TerraformRenderer extends DefaultRender {
  /**
   * Default constructor, initialize nunjucks library and template.
   * @param {object} pluginData - Plugin data with components
   */
  constructor(pluginData) {
    super(pluginData);

    const Loader = nunjucks.Loader.extend({
      getSource(name) {
        return {
          src: templates[name],
        };
      },
    });
    const env = new nunjucks.Environment(new Loader(), {
      autoescape: false,
      trimBlocks: true,
      lstripBlocks: true,
    });
    this.template = nunjucks.compile(templates.root, env);
  }

  /**
   * Convert all provided components and links in terraform files.
   * @param {string} [parentEventId] - Parent event id.
   * @returns {FileInput[]} Array of generated files from components and links.
   */
  renderFiles(parentEventId = null) {
    const componentsMap = this.pluginData.components.reduce(
      (map, component) => {
        if (!map.has(component.path)) {
          map.set(component.path, [component]);
        } else {
          map.get(component.path).push(component);
        }

        return map;
      },
      new Map(),
    );
    const variablesMap = this.pluginData.variables.reduce((map, variable) => {
      if (!map.has(variable.path)) {
        map.set(variable.path, [variable]);
      } else {
        map.get(variable.path).push(variable);
      }

      return map;
    }, new Map());

    return this.generateFiles(componentsMap, variablesMap, parentEventId);
  }

  /**
   * Render files from related components.
   * @param {Map<string,Component>} componentsMap - Components mapped by file name.
   * @param {Map<string,TerraformVariable>} variablesMap - Variables mapped by file name.
   * @param {string} parentEventId - Parent event id.
   * @returns {FileInput[]} Render files array.
   */
  generateFiles(componentsMap, variablesMap, parentEventId) {
    const files = [];
    const map = (componentsMap.size === 0) ? variablesMap : componentsMap;

    map.forEach((_, path) => {
      const id = this.pluginData.emitEvent({
        parent: parentEventId,
        type: 'Render',
        action: 'write',
        status: 'running',
        files: [path],
        data: {
          global: false,
        },
      });

      const allVariables = variablesMap?.get(path) || [];
      const allComponents = componentsMap?.get(path) || [];

      files.push(new FileInput({
        path,
        content: `${this.template.render({
          components: allComponents,
          variables: allVariables.filter((v) => v.category === 'variable'),
          locals: allVariables.filter((v) => v.category === 'local'),
          outputs: allVariables.filter((v) => v.category === 'output'),
          // XXX: This might cause issues with other providers.
          isValueReference: (value) => value?.match(/^(data.|var.|local.|module.|aws_|random_)/),
          isList: (type) => type?.startsWith('list(') || type?.startsWith('set('),
          getListType: (value) => value.split(/\(([^)]+)\)/)[1],
        }).trim()}\n`,
      }));

      this.pluginData.emitEvent({ id, status: 'success' });
    });

    return files;
  }
}

export default TerraformRenderer;

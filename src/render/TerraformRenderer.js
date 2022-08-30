import nunjucks from 'nunjucks';
import template from 'src/render/TerraformTemplate';
import {
  DefaultRender,
  ComponentAttribute,
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
   * Convert all provided components and links in terraform file content.
   * @param {Component[]} components - List of components you want to convert.
   * @param {ComponentLink[]} links - List of links you want to convert.
   * @return {String} - Generated file content from components and links.
   */
  render(componentsTree, links) {
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
    const components = [];
    this.collectComponentsFromTree(components, componentsTree);
    return `${nunjucks.renderString(this.template, { components }).trim()}\n`;
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
   * Transform tree of components into an array of components.
   * @param {Component[]} components - Final array to populate.
   * @param {Component[]} tree - Tree to get components.
   */
  collectComponentsFromTree(components, tree) {
    tree.forEach((component) => {
      components.push(component);
      if (component.children.length === 0) {
        return;
      }
      component.children.forEach((child) => this.setContainerAttribute(component, child));
      this.collectComponentsFromTree(components, component.children);
    });
  }
}

export default TerraformRenderer;

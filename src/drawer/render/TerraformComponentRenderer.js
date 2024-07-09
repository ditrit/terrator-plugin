import { ComponentRenderer } from 'leto-modelizer-plugin-core';

/**
 * Class to render Terraform components.
 */
class TerraformComponentRenderer extends ComponentRenderer {
  /**
   * Get data for nunjucks templating.
   * @param {Component} component - Component to render.
   * @returns {object} Data for templating.
   */
  getTemplateData(component) {
    const countAttribute = component.getAttributeByName('count');
    const hasCount = !!countAttribute && countAttribute.value !== 1;
    let count = '?';

    if (hasCount && countAttribute.type === 'Number') {
      count = countAttribute.value;
    }

    return {
      ...super.getTemplateData(component),
      hasCount,
      count,
    };
  }
}

export default TerraformComponentRenderer;

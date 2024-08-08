import { ComponentRenderer } from '@ditrit/leto-modelizer-plugin-core';

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
    const countValue = parseInt(countAttribute?.value, 10);
    const hasCount = !!countAttribute && countValue !== 1;
    let count = '?';

    if (hasCount && Number.isInteger(countValue)) {
      count = countValue;
    }

    return {
      ...super.getTemplateData(component),
      hasCount,
      count,
    };
  }
}

export default TerraformComponentRenderer;

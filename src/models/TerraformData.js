import {
  DefaultData,
} from 'leto-modelizer-plugin-core';

/**
 * Specific Terraform data.
 * @augments {DefaultData}
 */
class TerraformData extends DefaultData {
  /**
   * Get the value of a variable.
   * @param {string} variable - Variable to get value.
   * @returns {string} Value of the variable.
   */
  getVariableValue(variable) {
    const args = variable.split('.');

    if (args.length === 2) {
      if (args[0] === 'var') {
        args[0] = 'variable';
      }

      return this.variables
        .find((v) => v.name === args[1] && v.category === args[0])?.value || null;
    }

    return null;
  }

  /**
   * Get the value of the attribute.
   * @param {ComponentAttribute} attribute - Attribute to get value.
   * @returns {string[] | string} Value of the attribute.
   */
  getAttributeValue(attribute) {
    if (attribute.isVariable) {
      return this.getVariableValue(attribute.value);
    }

    if (attribute.definition?.type === 'Link') {
      const attributeValues = [];

      attribute.value.forEach((element) => {
        attributeValues.push(this.expandLinkAttribute(element, attribute.definition.linkAttribute));
      });

      return attributeValues;
    }

    if (attribute.definition?.type === 'Reference') {
      return this.expandLinkAttribute(attribute.value, attribute.definition.linkAttribute);
    }

    return attribute.value;
  }

  /**
   * Get the ID of a linked resource.
   * @param {string} value - Value of the link.
   * @returns {string} ID of the linked resource.
   */
  getComponentIdFromValue(value) {
    const args = value.split('.');

    if (args.length === 1) {
      return value;
    }

    if (args.length === 3) {
      return args[1];
    }

    return args[2];
  }

  /**
   * Get the ID of the linked component.
   * @param {TerraformComponentAttribute} attribute - Link to get value.
   * @returns {string[]} ID of the linked component.
   */
  getLinkedComponentsIds(attribute) {
    if (attribute.isVariable) {
      return [this.getVariableValue(attribute.value)];
    }

    const linkedComponentsIds = [];

    if (attribute.definition?.type === 'Link' || attribute.definition?.type === 'Array') {
      attribute.value.forEach((element) => {
        linkedComponentsIds.push(this.getComponentIdFromValue(element));
      });

      return linkedComponentsIds;
    }

    return [this.getComponentIdFromValue(attribute.value)];
  }

  /**
   * Expand the attribute name of a link from a string.
   * @param {string} value - Value to expand.a
   * @param {string} argName - Name of the argument to expand.
   * @returns {string} Value of the linked argument.
   */
  expandLinkAttribute(value, argName) {
    const resourceId = this.getComponentIdFromValue(value);

    if (argName === 'id') {
      return resourceId;
    }

    return this.components
      .find((component) => component.id === resourceId)?.attributes
      .find((attribute) => attribute.name === argName)?.value;
  }
}

export default TerraformData;

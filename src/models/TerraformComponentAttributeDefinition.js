import { ComponentAttributeDefinition } from 'leto-modelizer-plugin-core';

/**
 * Specific Terraform component attribute definition.
 * @augments {ComponentAttributeDefinition}
 */
class TerraformComponentAttributeDefinition extends ComponentAttributeDefinition {
  /**
   * Override ComponentAttribute constructor with linkAttribute property.
   * @param {object} props - Terraform block properties.
   * @param {boolean} [props.linkAttribute] - Attribute name of the link.
   * @see ComponentAttribute
   */
  constructor(props = {
    linkAttribute: 'id',
  }) {
    super(props);
    /**
     * Attribute name of the link.
     * @type {string}
     */
    this.linkAttribute = props.linkAttribute || 'id';
  }
}

export default TerraformComponentAttributeDefinition;

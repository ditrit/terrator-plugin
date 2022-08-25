import { ComponentDefinition } from 'leto-modelizer-plugin-core';

/**
 * Specific Terraform component definition.
 * @extends {ComponentDefinition}
 */
class TerraformComponentDefinition extends ComponentDefinition {
  /**
   * Override ComponentDefinition constructor with blockType and provider properties.
   * @param {String} [props.blockType] - Type of Terraform block.
   * @param {String} [props.provider] - Related provider of terraform block.
   * @see ComponentDefinition
   */
  constructor(props = {
    blockType: null,
    provider: null,
  }) {
    super(props);
    /**
     * Type of Terraform block.
     * @type {String}
     */
    this.blockType = props.blockType || null;
    /**
     * Related provider of the terraform block.
     * @type {String}
     */
    this.provider = props.provider || null;
  }
}

export default TerraformComponentDefinition;

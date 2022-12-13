import { ComponentDefinition } from 'leto-modelizer-plugin-core';

/**
 * Specific Terraform component definition.
 *
 * @augments {ComponentDefinition}
 */
class TerraformComponentDefinition extends ComponentDefinition {
  /**
   * Override ComponentDefinition constructor with blockType and provider properties.
   *
   * @param {object} props - Terraform block properties.
   * @param {string} [props.blockType] - Type of Terraform block.
   * @param {string} [props.provider] - Related provider of terraform block.
   * @see ComponentDefinition
   */
  constructor(props = {
    blockType: null,
    provider: null,
  }) {
    super(props);
    /**
     * Type of Terraform block.
     *
     * @type {string}
     */
    this.blockType = props.blockType || null;
    /**
     * Related provider of the terraform block.
     *
     * @type {string}
     */
    this.provider = props.provider || null;
  }
}

export default TerraformComponentDefinition;

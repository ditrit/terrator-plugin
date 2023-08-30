import { ComponentAttribute } from 'leto-modelizer-plugin-core';

/**
 * Specific Terraform component attribute.
 * @augments {ComponentAttribute}
 */
class TerraformComponentAttribute extends ComponentAttribute {
  /**
   * Override ComponentAttribute constructor with isDynamic property.
   * @param {object} props - Terraform block properties.
   * @param {boolean} [props.isDynamic] - Whether the block is dynamic or not.
   * @see ComponentAttribute
   */
  constructor(props = {
    isDynamic: false,
  }) {
    super(props);
    /**
     * Whether the block is dynamic or not.
     * @type {boolean}
     * @default false
     */
    this.isDynamic = props.isDynamic || false;
  }

  /**
   * Check if the attribute is a variable.
   * @returns {boolean} - true if the attribute is a variable otherwise false.
   */
  get isVariable() {
    return this.value !== null
      && typeof this.value === 'string'
      && (this.value.startsWith('var.') || this.value.startsWith('local.'));
  }
}

export default TerraformComponentAttribute;

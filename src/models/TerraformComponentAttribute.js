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

  /**
   * Add the specified ID to the value of attribute array.
   * @param {string} id - Id of link to be added.
   */
  addLink(id) {
    const validId = (/[^.]+\.[^.]+\.[^.]+/).exec(id)
      ? id
      : `${this.definition.linkRef}.${id}.${this.definition.linkAttribute}`;

    if (!this.value.includes(validId)) {
      this.value.push(validId);
    }
  }

  /**
   * Get only link id from each element inside attribute array.
   * @returns {Array} The value array of id links.
   */
  getLinkValue() {
    return this.value.map((v) => v.split('.')[1]);
  }

  /**
   * Remove the specified ID from the value of attribute array.
   * @param {string} id - Id of link to be removed.
   * @returns {boolean} True if value array is not empty, otherwise false.
   */
  removeLink(id) {
    const index = this.value.findIndex((value) => value.split('.')[1] === id);

    if (index >= 0) {
      this.value.splice(index, 1);
    }

    return this.value.length !== 0;
  }

  /**
   * Replace the old ID with the new ID in the link attribute's value.
   * @param {string} oldId - The old ID.
   * @param {string} newId - The new ID.
   */
  replaceLink(oldId, newId) {
    this.value.forEach((linkValue, index) => {
      const splitValue = linkValue.split('.');

      if (splitValue.length >= 2 && splitValue[1] === oldId) {
        splitValue[1] = newId;

        this.value[index] = splitValue.join('.');
      }
    });
  }

  /**
   * Get only the reference value of the attribute.
   * @returns {string} The reference value.
   */
  getReferenceValue() {
    const splitValue = this.value?.split('.');

    if (splitValue?.length >= 2) {
      return splitValue[1];
    }

    return null;
  }

  /**
   * Set the reference value of the attribute.
   * @param {string} value - The new reference value.
   */
  setReferenceValue(value) {
    if (typeof value === 'string' && value?.split('.').length === 1) {
      this.value = `${this.definition.containerRef}.${value}`;
    }
  }
}

export default TerraformComponentAttribute;

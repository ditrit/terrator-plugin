import { Variable } from '@ditrit/leto-modelizer-plugin-core';

/**
 * Specific Terraform variable.
 * @augments {Variable}
 */
class TerraformVariable extends Variable {
  /**
   * Default constructor.
   * @param {object} [props] - Object that contains all properties to set.
   * @param {*} [props.defaultValue] - Variable default value.
   * @param {string} [props.description] - Variable description.
   * @param {boolean} [props.sensitive] - Whether the variable value is sensitive or not.
   * @param {boolean} [props.nullable] - Whether the variable is nullable or not.
   */
  constructor(props = {
    defaultValue: null,
  }) {
    super(props);
    const {
      defaultValue,
      description,
      sensitive,
      nullable,
    } = props;

    /**
     * Use for drawer to get the type of object.
     * @type {string}
     * @private
     */
    this.__class = 'TerraformVariable';
    /**
     * Variable default value.
     * @type {boolean}
     */
    this.defaultValue = defaultValue || null;
    /**
     * Variable description.
     * @type {string}
     */
    this.description = description || null;
    /**
     * Whether the variable value is sensitive or not.
     * @type {boolean}
     */
    this.sensitive = sensitive || false;
    /**
     * Whether the variable value is nullable or not.
     * @type {boolean}
     */
    this.nullable = nullable || false;
  }

  /**
   * Get the variable name formatted for use in an attribute.
   * @returns {string} - The variable name formatted.
   */
  get formattedName() {
    const category = this.category === 'variable' ? 'var' : 'local';
    return this.category === 'output' ? null : `${category}.${this.name}`;
  }
}

export default TerraformVariable;

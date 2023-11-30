import { Component } from 'leto-modelizer-plugin-core';
import TerraformComponentAttribute from 'src/models/TerraformComponentAttribute';

/**
 * Specific Terraform component.
 * @augments {Component}
 */
class TerraformComponent extends Component {
  /**
   * Create a new instance of TerraformComponentAttribute with the provided properties.
   * @param {object} props - Properties to initialize the TerraformComponentAttribute with.
   * @returns {TerraformComponentAttribute} A new TerraformComponentAttribute instance.
   */
  createAttribute(props) {
    return new TerraformComponentAttribute(props);
  }

  /**
   * Get configuration key of the component.
   * Overriden from plugin-core.
   * @returns {string} Component's configuration key.
   */
  getConfigurationKey() {
    return `${this.definition.type}.${this.externalId}`;
  }
}

export default TerraformComponent;

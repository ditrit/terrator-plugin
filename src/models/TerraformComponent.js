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
}

export default TerraformComponent;

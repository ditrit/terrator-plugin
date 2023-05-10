import { DefaultConfiguration } from 'leto-modelizer-plugin-core';
import syntax from 'src/configuration/syntax';

/**
 * Terrator configuration.
 */
class TerraformConfiguration extends DefaultConfiguration {
  /**
   * Default constructor.
   * @param {object} [props] - Object that contains all properties to set.
   */
  constructor(props) {
    super({
      ...props,
      editor: {
        ...props.editor,
        syntax,
      },
      tags: ['Terraform', 'Infrastructure', 'IaC'],
    });
  }
}

export default TerraformConfiguration;

import { DefaultConfiguration, Tag } from 'leto-modelizer-plugin-core';
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
      tags: [
        new Tag({ type: 'language', value: 'Terraform' }),
        new Tag({ type: 'category', value: 'Infrastructure' }),
      ],
    });
  }
}

export default TerraformConfiguration;

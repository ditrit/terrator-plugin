import { DefaultConfiguration } from 'leto-modelizer-plugin-core';
import syntax from 'src/configuration/syntax';

/**
 * Terrator configuration.
 */
class TerraformConfiguration extends DefaultConfiguration {
  /**
   * Default constructor.
   */
  constructor() {
    super({
      editor: { syntax },
    });
  }
}

export default TerraformConfiguration;

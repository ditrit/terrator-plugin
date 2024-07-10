import { DefaultConfiguration, Tag } from 'leto-modelizer-plugin-core';
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
      editor: {
        syntax,
      },
      tags: [
        new Tag({ type: 'language', value: 'Terraform' }),
        new Tag({ type: 'category', value: 'Infrastructure' }),
      ],
      extraResources: [{
        type: 'markers',
        name: 'startLinkMarker',
      }, {
        type: 'markers',
        name: 'endLinkMarker',
      }, {
        type: 'links',
        name: 'defaultLink',
      }, {
        type: 'links',
        name: 'temporaryLink',
      }, {
        type: 'icons',
        name: 'error',
      }, {
        type: 'icons',
        name: 'menu',
      }, {
        type: 'icons',
        name: 'resize',
      }, {
        type: 'icons',
        name: 'unknown',
      }],
      container: {
        margin: 15,
        gap: 50,
      },
      defaultFileName: 'new_file.tf',
      defaultFileExtension: 'tf',
    });
  }
}

export default TerraformConfiguration;

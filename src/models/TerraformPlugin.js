import {
  DefaultPlugin,
} from '@ditrit/leto-modelizer-plugin-core';
import TerraformMetadata from 'src/metadata/TerraformMetadata';
import TerraformParser from 'src/parser/TerraformParser';
import TerraformRenderer from 'src/render/TerraformRenderer';
import TerraformConfiguration from 'src/models/TerraformConfiguration';
import TerraformData from 'src/models/TerraformData';
import TerraformDrawer from 'src/drawer/TerraformDrawer';
import packageInfo from 'package.json';

/**
 * Terraform plugin.
 */
class TerraformPlugin extends DefaultPlugin {
  /**
   * Default constructor.
   * @param {object} [props] - Object that contains all properties to set.
   * @param {object} [props.event] - Event manager.
   * @param {Function} [props.event.next] - Function to emit event.
   */
  constructor(props = {
    event: null,
  }) {
    const configuration = new TerraformConfiguration();
    const pluginData = new TerraformData(configuration, {
      name: packageInfo.name,
      version: packageInfo.version,
    }, props.event);

    super({
      pluginData,
      pluginDrawer: new TerraformDrawer(pluginData),
      pluginMetadata: new TerraformMetadata(pluginData),
      pluginParser: new TerraformParser(pluginData),
      pluginRenderer: new TerraformRenderer(pluginData),
      configuration,
    });
  }
}

export default TerraformPlugin;

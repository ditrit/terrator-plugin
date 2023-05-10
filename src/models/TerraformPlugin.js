import {
  DefaultPlugin,
  DefaultData,
} from 'leto-modelizer-plugin-core';
import TerraformDrawer from 'src/draw/TerraformDrawer';
import TerraformMetadata from 'src/metadata/TerraformMetadata';
import TerraformParser from 'src/parser/TerraformParser';
import TerraformRenderer from 'src/render/TerraformRenderer';
import TerraformConfiguration from 'src/models/TerraformConfiguration';
import packageInfo from 'package.json';

/**
 * Terraform plugin.
 */
class TerraformPlugin extends DefaultPlugin {
  /**
   * Default constructor.
   * @param {object} [props={}] - Object that contains all properties to set.
   * @param {object} [props.event] - Event manager.
   * @param {Function} [props.event.next] - Function to emit event.
   */
  constructor(props = {
    event: null,
  }) {
    const configuration = new TerraformConfiguration({
      defaultFileName: 'new_file.tf',
      defaultFileExtension: 'tf',
    });
    const pluginData = new DefaultData(configuration, {
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

import {
  DefaultPlugin,
  DefaultData,
} from 'leto-modelizer-plugin-core';
import TerraformDrawer from 'src/draw/TerraformDrawer';
import TerraformMetadata from 'src/metadata/TerraformMetadata';
import TerraformParser from 'src/parser/TerraformParser';
import TerraformRenderer from 'src/render/TerraformRenderer';
import { name, version } from 'package.json';

/**
 * Terraform plugin.
 */
class TerraformPlugin extends DefaultPlugin {
  /**
   * Default constructor.
   */
  constructor() {
    const pluginData = new DefaultData({
      name,
      version,
      defaultFileName: 'new_file.tf',
    });

    super({
      pluginData,
      pluginDrawer: new TerraformDrawer(pluginData),
      pluginMetadata: new TerraformMetadata(pluginData),
      pluginParser: new TerraformParser(pluginData),
      pluginRenderer: new TerraformRenderer(pluginData),
    });
  }
}

export default TerraformPlugin;

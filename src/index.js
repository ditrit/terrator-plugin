import TerraformDrawer from './draw/TerraformDrawer';
import TerraformMetadata from './metadata/TerraformMetadata';
import TerraformParser from './parser/TerraformParser';
import TerraformRenderer from './render/TerraformRenderer';

export default {
  PluginDrawer: TerraformDrawer,
  PluginMetadata: TerraformMetadata,
  PluginParser: TerraformParser,
  PluginRenderer: TerraformRenderer,
};

import TerraformDrawer from 'src/draw/TerraformDrawer';
import TerraformMetadata from 'src/metadata/TerraformMetadata';
import TerraformParser from 'src/parser/TerraformParser';
import TerraformRenderer from 'src/render/TerraformRenderer';
import resources from 'src/assets';

export default {
  PluginDrawer: TerraformDrawer,
  PluginMetadata: TerraformMetadata,
  PluginParser: TerraformParser,
  PluginRenderer: TerraformRenderer,
  resources,
};

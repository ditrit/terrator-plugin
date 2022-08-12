import MyPluginDrawer from './draw/MyPluginDrawer';
import MyPluginMetadata from './metadata/MyPluginMetadata';
import MyPluginParser from './parser/MyPluginParser';
import MyPluginRenderer from './render/MyPluginRenderer';
import resources from './assets';

/*
 * your plugins, for instance :
 *
 * import MyPluginDrawer from './draw/MyPluginDrawer';
 * will be replaced by
 * import [NameOfYourPlugin]Drawer from './draw/[NameOfYourPlugin]Drawer';
 *
 * Leto-modelizer expects to receive from this plugin an Object containing those properties:
 * - PluginDrawer
 * - PluginMetadata
 * - PluginParser
 * - PluginRenderer
 * - resources
 */
export default {
  PluginDrawer: MyPluginDrawer,
  PluginMetadata: MyPluginMetadata,
  PluginParser: MyPluginParser,
  PluginRenderer: MyPluginRenderer,
  resources,
};

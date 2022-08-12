import { DefaultDrawer } from 'leto-modelizer-plugin-core';
/*
 * By default the DefaultDrawer use D3 to draw.
 *
 * Feel free to override the default draw method if you want to use another library.
 *
 * Only the function draw is called by Leto-Modelizer with the id of the canvas and all the components to draw.
 */
class MyPluginDrawer extends DefaultDrawer {

  constructor(props) {
    super(props);
    // Set your custom properties here
  }

  /*
   * Example if you want to create a custom draw method for your model 'CustomModel.svg'.
   *
   * When you generate the ComponentDefinition in Metadata, the value of svgTemplate provides the name of the svg and
   * the method to call in drawer.
   *
   * This custom method has for purpose to set all custom properties when you draw all your components.
   *
   * You can see the default method here: https://github.com/ditrit/leto-modelizer-plugin-core/blob/main/src/draw/DefaultDrawer.js
   *
   * Example:
   *
   * For componentDefinition.svgTemplate = 'CustomModel';
   *
   * We expect to have a `src/assets/models/CustomModel.svg` svg and a method in MyPluqinDrawer.drawCustomModel.
   */
  drawCustomModel(component) {
    this.drawDefaultModel(); // to call if you want to have the default attribute management

    // Manage your custom attributes here.
  }
}

export default MyPluginDrawer;

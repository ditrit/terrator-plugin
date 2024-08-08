import { DefaultDrawer } from '@ditrit/leto-modelizer-plugin-core';
import TerraformComponentRenderer from './render/TerraformComponentRenderer';

/**
 * Class to draw Terraform components.
 */
class TerraformDrawer extends DefaultDrawer {
  /**
   * Initialize component renderer and return instance of it.
   * @param {boolean} readOnly - Indicate if user can make action or modify the scene.
   * @returns {TerraformComponentRenderer} New instance of TerraformComponentRenderer.
   */
  initComponentRenderer(readOnly) {
    return new TerraformComponentRenderer(this.pluginData, this.viewport, readOnly);
  }
}

export default TerraformDrawer;

import { DefaultRender } from 'leto-module-client';

class MyPluginRenderer extends DefaultRender {
  /*
   * The purpose of this function is to generate the content of one file.
   *
   * You have to map all the given components and links into a file content.
   */
  render(components = [], links = []) {
    /*
     * Implement your own parse function here.
     */
    return '';
  }
}

export default MyPluginRenderer;

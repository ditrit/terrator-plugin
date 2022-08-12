import {DefaultParser} from 'leto-modelizer-plugin-core';

class MyPluginParser extends DefaultParser {
  isParsable(fileName) {
    /*
     * Implement this to indicate which fileName your provider can manage.
     *
     * You just have to return a Boolean to say if your parser can manage the file or not.
     *
     * By default, this function return false only on null/undefined fileName.
     */
    return super.isParsable(fileName);
  }

  parse(inputs = []) {
    /*
     * Implement your own parse function here.
     *
     * You receive in `inputs` a list of content file.
     *
     * In our plugin managing the terraform files, we use antlr for parsing. You can find an example of the terraform
     * parser in https://github.com/ditrit/iactor/blob/dev/src/parser/TerraformParser.js.
     */
    return {
      components: [], // return Array of Component or Object that extends Component class
      links: [], // return Array of ComponentLink or Object that extends ComponentLink class
      errors: [], // return Array of ParseError
    };
  }
}

export default MyPluginParser;

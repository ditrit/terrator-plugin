import antlr4 from 'antlr4';
import { ParserLog } from 'leto-modelizer-plugin-core';

/**
 * Class to manage default error from antlr parser.
 */
class TerraformErrorListener extends antlr4.error.ErrorListener {
  /**
   * Default constructor.
   * @param {object} pluginData - Plugin data with components
   * @param {FileInformation} [file] - File information.
   */
  constructor(pluginData, file) {
    super();
    this.pluginData = pluginData;
    this.file = file;
  }

  syntaxError(recognizer, offendingSymbol, line, column, msg) {
    this.pluginData.parseLogs.push(new ParserLog({
      startLineNumber: line,
      startColumn: column + 1,
      endLineNumber: line,
      endColumn: column + offendingSymbol.stop - offendingSymbol.start + 2,
      severity: ParserLog.SEVERITY_ERROR,
      path: this.file.path,
      message: 'parser.error.parsing',
      initialErrorMessage: msg,
    }));
  }
}

export default TerraformErrorListener;

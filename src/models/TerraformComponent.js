import { Component, ParserLog } from '@ditrit/leto-modelizer-plugin-core';
import TerraformComponentAttribute from './TerraformComponentAttribute';

/**
 * Specific Terraform component.
 * @augments {Component}
 */
class TerraformComponent extends Component {
  /**
   * Create a new instance of TerraformComponentAttribute with the provided properties.
   * @param {object} props - Properties to initialize the TerraformComponentAttribute with.
   * @returns {TerraformComponentAttribute} A new TerraformComponentAttribute instance.
   */
  createAttribute(props) {
    return new TerraformComponentAttribute(props);
  }

  /**
   * Get configuration key of the component.
   * Overriden from plugin-core.
   * @returns {string} Component's configuration key.
   */
  getConfigurationKey() {
    return `${this.definition.type}.${this.externalId}`;
  }

  /**
   * Set all errors of component.
   * @param {ParserLog[]} [logs] - Logs to set, can be null.
   * @returns {ParserLog[]} All component logs.
   */
  getErrors(logs = []) {
    this.validateExternalId(logs);

    return super.getErrors(logs);
  }

  /**
   * Set warning if definition is unknown.
   * @param {ParserLog[]} [logs] - Logs to set, can be null.
   * @returns {ParserLog[]} All component logs.
   */
  validateDefinition(logs = []) {
    if (this.definition?.isUnknown) {
      logs.push(new ParserLog({
        componentId: this.id,
        severity: ParserLog.SEVERITY_WARNING,
        message: 'parser.warning.noComponentDefinition',
      }));
    }

    return logs;
  }

  /**
   * Set logs if external id is null.
   * @param {ParserLog[]} [logs] - Logs to set, can be null.
   * @returns {ParserLog[]} All component logs.
   */
  validateExternalId(logs = []) {
    if (this.externalId === null || this.externalId.length === 0) {
      logs.push(new ParserLog({
        componentId: this.id,
        severity: ParserLog.SEVERITY_ERROR,
        message: 'terrator-plugin.parser.error.noExternalId',
      }));
    }

    return logs;
  }
}

export default TerraformComponent;

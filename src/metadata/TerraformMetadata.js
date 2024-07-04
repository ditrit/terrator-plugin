import { DefaultMetadata } from 'leto-modelizer-plugin-core';
import TerraformComponentDefinition from 'src/models/TerraformComponentDefinition';
import TerraformComponentAttributeDefinition from 'src/models/TerraformComponentAttributeDefinition';
import providers from 'src/assets/metadata';

/**
 * Class to validate and retrieve components definitions from Terraform metadata.
 */
class TerraformMetadata extends DefaultMetadata {
  constructor(pluginData) {
    super(pluginData);
    this.providers = providers;
    this.getAttributeDefinition = this.getAttributeDefinition.bind(this);
  }

  /**
   * Parse all component/link definitions from metadata.
   */
  parse() {
    const definitions = this.getComponentDefinitions();

    this.setChildrenTypes(definitions);

    this.pluginData.definitions = {
      components: definitions,
    };
  }

  /**
   * Get all component definitions from metadata.
   * @returns {ComponentDefinition[]} Array of component definitions.
   */
  getComponentDefinitions() {
    return this.providers
      .map((definition) => new TerraformComponentDefinition({
        ...definition,
        definedAttributes: definition.definedAttributes.map(this.getAttributeDefinition),
        parentTypes: this.getParentTypes(definition),
      }));
  }

  /**
   * Get attribute definition.
   * @param {object} attribute - Attribute to parse.
   * @returns {TerraformComponentAttributeDefinition} Parsed attribute.
   */
  getAttributeDefinition(attribute) {
    const subAttributes = attribute.definedAttributes || [];
    return new TerraformComponentAttributeDefinition({
      ...attribute,
      definedAttributes: subAttributes.map(this.getAttributeDefinition),
    });
  }

  /**
   * Get all possible parent container types.
   * @param {TerraformComponentDefinition} componentDefinition - Definition to get all parent
   * container types.
   * @returns {string[]} All possible parent container types.
   */
  getParentTypes(componentDefinition) {
    const parentTypes = [];

    componentDefinition.definedAttributes
      .filter((attribute) => attribute.type === 'Reference')
      .map((attribute) => attribute.containerRef)
      .filter((ref) => !parentTypes.includes(ref))
      .forEach((ref) => parentTypes.push(ref));

    return parentTypes;
  }

  /**
   * Set all possible children container types.
   * @param {ComponentDefinition[]} componentDefinitions - Array of component definitions.
   * container types.
   */
  setChildrenTypes(componentDefinitions) {
    const children = componentDefinitions
      .filter((def) => def.parentTypes.length > 0)
      .reduce((acc, def) => {
        def.parentTypes.forEach((parentType) => {
          acc[parentType] = [...(acc[parentType] || []), def.type];
        });
        return acc;
      }, {});

    componentDefinitions.filter((def) => children[def.type])
      .forEach((def) => {
        def.childrenTypes = children[def.type];
      });
  }
}

export default TerraformMetadata;

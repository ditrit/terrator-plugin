import Ajv from 'ajv';
import {
  ComponentAttributeDefinition,
  DefaultMetadata,
} from 'leto-modelizer-plugin-core';
import TerraformComponentDefinition from 'src/models/TerraformComponentDefinition';
import Schema from 'src/metadata/ValidationSchema';
import providers from 'src/assets/metadata';

/**
 * Class to validate and retrieve components definitions from Terraform metadata.
 */
class TerraformMetadata extends DefaultMetadata {
  constructor(pluginData) {
    super(pluginData);
    this.providers = providers;
    this.ajv = new Ajv();
    this.schema = Schema;
    this.getAttributeDefinition = this.getAttributeDefinition.bind(this);
  }

  /**
   * Validate the provided metadata with a schemas.
   *
   * @returns {boolean} True if metadata is valid.
   */
  validate() {
    const errors = [];
    Object.keys(this.providers).forEach((provider) => {
      const validate = this.ajv.compile(this.schema);

      if (!validate(this.providers[provider])) {
        errors.push({
          provider,
          errors: validate.errors,
        });
      }
    });

    if (errors.length > 0) {
      throw new Error('Metadata are not valid', { cause: errors });
    }

    return true;
  }

  /**
   * Parse all component/link definitions from metadata.
   */
  parse() {
    this.pluginData.definitions = {
      components: this.getComponentDefinitions(),
    };
  }

  /**
   * Get all component definitions from metadata.
   *
   * @returns {ComponentDefinition[]} Array of component definitions.
   */
  getComponentDefinitions() {
    const definitions = [];
    Object.keys(this.providers)
      .map((key) => this.providers[key])
      .forEach((provider) => {
        const providerDefinitions = [];
        providerDefinitions.push(this.getProviderDefinition(provider));

        provider.data.forEach((data) => providerDefinitions.push(
          this.getBlockDefinition('data', provider.name, data),
        ));

        provider.modules.forEach((module) => providerDefinitions.push(
          this.getBlockDefinition('module', provider.name, module),
        ));

        provider.resources.forEach((resource) => providerDefinitions.push(
          this.getBlockDefinition('resource', provider.name, resource),
        ));

        provider.variables.forEach((variable) => providerDefinitions.push(
          this.getBlockDefinition('variable', provider.name, variable),
        ));

        this.setChildrenTypes(providerDefinitions);

        providerDefinitions.forEach((def) => {
          definitions.push(def);
        });
      });
    return definitions;
  }

  /**
   * Get provider definition.
   *
   * @param {object} provider - Provider from metadata to parse.
   * @returns {TerraformComponentDefinition} Parsed provider component Definition.
   */
  getProviderDefinition(provider) {
    const definition = new TerraformComponentDefinition({
      blockType: 'provider',
      provider: provider.name,
      type: provider.name,
      icon: provider.icon,
      model: provider.model,
      definedAttributes: provider.attributes.map(this.getAttributeDefinition),
      isContainer: provider.isContainer,
      displayName: provider.displayName,
      description: provider.description,
      url: provider.url,
    });

    definition.parentTypes = this.getParentTypes(definition);

    return definition;
  }

  /**
   * Get block definition.
   *
   * @param {string} blockType - Block type, can be module/data/resource/variable.
   * @param {string} providerName - Name of related provider.
   * @param {object} block - Block to parse.
   * @returns {TerraformComponentDefinition} Parsed component definition.
   */
  getBlockDefinition(blockType, providerName, block) {
    const attributes = block.attributes || [];
    const definition = new TerraformComponentDefinition({
      blockType,
      provider: providerName,
      type: block.type,
      model: block.model,
      icon: block.icon,
      isContainer: block.isContainer || false,
      definedAttributes: attributes.map(this.getAttributeDefinition),
      displayName: block.displayName,
      description: block.description,
      url: block.url,
    });

    definition.parentTypes = this.getParentTypes(definition);

    return definition;
  }

  /**
   * Get attribute definition.
   *
   * @param {object} attribute - Attribute to parse.
   * @returns {ComponentAttributeDefinition} Parsed attribute.
   */
  getAttributeDefinition(attribute) {
    const subAttributes = attribute.attributes || [];
    return new ComponentAttributeDefinition({
      ...attribute,
      definedAttributes: subAttributes.map(this.getAttributeDefinition),
    });
  }

  /**
   * Get all possible parent container types.
   *
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
   *
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

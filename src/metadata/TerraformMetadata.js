import Ajv from 'ajv';
import {
  ComponentAttributeDefinition,
  DefaultMetadata,
  ComponentLinkDefinition,
} from 'leto-modelizer-plugin-core';
import TerraformComponentDefinition from 'src/models/TerraformComponentDefinition';
import Schema from 'src/metadata/ValidationSchema';

/**
 * Class to validate and retrieve components definitions from Terraform metadata.
 */
class TerraformMetadata extends DefaultMetadata {
  constructor(resources) {
    super();
    this.providers = resources.metadata;
    this.ajv = new Ajv();
    this.schema = Schema;
    this.getAttributeDefinition = this.getAttributeDefinition.bind(this);
  }

  /**
   * Validate the provided metadata with a schemas.
   * @return {Boolean} - True if metadata is valid.
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
   * Get all definitions from metadata.
   * @returns {{components: ComponentDefinition[], links: ComponentLinkDefinition[]}} Definitions.
   */
  getDefinitions() {
    const components = this.getComponentDefinitions();
    const links = this.getLinkDefinitions(components);

    return {
      components,
      links,
    };
  }

  /**
   * Set link definitions from components.
   * @param {TerraformComponentDefinition[]} componentDefinitions - Component definitions to parse.
   * @param {ComponentLinkDefinition[]} [linkDefinitions=[]] - Link definitions array to populate by
   * this function.
   * @returns {ComponentLinkDefinition[]} All link definitions.
   */
  getLinkDefinitions(componentDefinitions, linkDefinitions = []) {
    componentDefinitions.forEach((componentDefinition) => {
      componentDefinition.definedAttributes
        .forEach((attribute) => this.setLinkDefinition(
          linkDefinitions,
          componentDefinition.type,
          attribute,
        ));
    });
    return linkDefinitions;
  }

  /**
   * Set link definition from attribute in link definition array.
   * @param {ComponentLinkDefinition[]} linkDefinitions - Link definition array.
   * @param {String} componentType - Type of related component.
   * @param {ComponentAttributeDefinition} definedAttribute - Attribute to parse.
   */
  setLinkDefinition(linkDefinitions, componentType, definedAttribute) {
    if (definedAttribute.definedAttributes.length > 0) {
      definedAttribute.definedAttributes
        .forEach((attribute) => this.setLinkDefinition(linkDefinitions, componentType, attribute));
    }

    if (definedAttribute.type !== 'Link') {
      return;
    }

    const linkDefinition = new ComponentLinkDefinition({ type: definedAttribute.linkType });
    if (definedAttribute.linkType === 'Reverse') {
      linkDefinition.sourceRef = definedAttribute.linkRef;
      linkDefinition.targetRef = componentType;
    } else {
      linkDefinition.sourceRef = componentType;
      linkDefinition.targetRef = definedAttribute.linkRef;
    }

    linkDefinition.attributeRef = definedAttribute.name;

    linkDefinitions.push(linkDefinition);
  }

  /**
   * Get all component definitions from metadata.
   * @return {ComponentDefinition[]} - Array of component definitions.
   */
  getComponentDefinitions() {
    const definitions = [];
    Object.keys(this.providers)
      .map((key) => this.providers[key])
      .forEach((provider) => {
        definitions.push(this.getProviderDefinition(provider));

        provider.data.forEach((data) => definitions.push(
          this.getBlockDefinition('data', provider.name, data),
        ));

        provider.modules.forEach((module) => definitions.push(
          this.getBlockDefinition('module', provider.name, module),
        ));

        provider.resources.forEach((resource) => definitions.push(
          this.getBlockDefinition('resource', provider.name, resource),
        ));

        provider.variables.forEach((variable) => definitions.push(
          this.getBlockDefinition('variable', provider.name, variable),
        ));
      });
    return definitions;
  }

  /**
   * Get provider definition.
   * @param {Object} provider - Provider from metadata to parse.
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
    });

    definition.parentTypes = this.getParentTypes(definition);

    return definition;
  }

  /**
   * Get block definition.
   * @param {String} blockType - Block type, can be module/data/resource/variable.
   * @param {String} providerName - Name of related provider.
   * @param {Object} block - Block to parse.
   * @returns {TerraformComponentDefinition} Parsed component definition.
   */
  getBlockDefinition(blockType, providerName, block) {
    const definition = new TerraformComponentDefinition({
      blockType,
      provider: providerName,
      type: block.type,
      model: block.model,
      icon: block.icon,
      isContainer: block.isContainer,
      definedAttributes: block.attributes.map(this.getAttributeDefinition),
    });

    definition.parentTypes = this.getParentTypes(definition);

    return definition;
  }

  /**
   * Get attribute definition.
   * @param {Object} attribute - Attribute to parse.
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
   * @param {TerraformComponentDefinition} componentDefinition - Definition to get all parent
   * container types.
   * @returns {String[]} All possible parent container types.
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
}

export default TerraformMetadata;

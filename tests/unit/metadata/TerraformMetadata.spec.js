import TerraformComponentDefinition from 'src/models/TerraformComponentDefinition';
import {
  ComponentAttributeDefinition,
  ComponentLinkDefinition,
} from 'leto-modelizer-plugin-core';
import { getTerraformMetadata } from 'tests/resources/utils';

describe('Test TerraformMetadata', () => {
  describe('Test methods', () => {
    describe('Test method: validate', () => {
      it('Should return true on valid metadata', () => {
        const metadata = getTerraformMetadata('validMetadata', 'tests/resources/metadata/valid.json');
        expect(metadata.validate()).toBeTruthy();
      });

      it('Should return false on invalid metadata', () => {
        const metadata = getTerraformMetadata('invalidMetadata', 'tests/resources/metadata/invalid.json');
        let error = null;
        try {
          metadata.validate();
        } catch (e) {
          error = e;
        }
        expect(error).not.toBeNull();
        expect(error.message).toEqual('Metadata are not valid');
        expect(error.cause).toEqual([{
          errors: [{
            dataPath: '',
            keyword: 'required',
            message: "should have required property 'name'",
            params: { missingProperty: 'name' },
            schemaPath: '#/required',
          }],
          provider: 'invalidMetadata',
        }]);
      });
    });

    describe('Test method: parse', () => {
      const metadata = getTerraformMetadata('validMetadata', 'tests/resources/metadata/valid.json');

      it('Should set component and link definitions', () => {
        metadata.parse();
        metadata.pluginData.initLinkDefinitions();

        expect(metadata.pluginData.definitions.links).not.toBeNull();
        expect(metadata.pluginData.definitions.links.length).toBeGreaterThanOrEqual(1);
        expect(metadata.pluginData.definitions.components).not.toBeNull();
        expect(metadata.pluginData.definitions.components.length).toBeGreaterThanOrEqual(1);
      });
    });

    describe('Test method: getComponentDefinitions', () => {
      const metadata = getTerraformMetadata('validMetadata', 'tests/resources/metadata/valid.json');

      it('Should return components', () => {
        expect(metadata.getComponentDefinitions()).toEqual([
          new TerraformComponentDefinition({
            blockType: 'provider',
            provider: 'provider',
            type: 'provider',
            icon: 'provider_icon',
            model: 'provider_model',
            definedAttributes: [
              new ComponentAttributeDefinition({ name: 'name1', type: 'String' }),
            ],
          }),
          new TerraformComponentDefinition({
            blockType: 'data',
            provider: 'provider',
            type: 'data_type',
            icon: 'data_icon',
            model: 'data_model',
            definedAttributes: [
              new ComponentAttributeDefinition({ name: 'boolean1', type: 'Boolean' }),
              new ComponentAttributeDefinition({ name: 'number1', type: 'Number' }),
              new ComponentAttributeDefinition({ name: 'array1', type: 'Array' }),
              new ComponentAttributeDefinition({
                name: 'object1',
                type: 'Object',
                definedAttributes: [new ComponentAttributeDefinition({ name: 'name2', type: 'String' })],
              }),
            ],
          }),
          new TerraformComponentDefinition({
            blockType: 'module',
            provider: 'provider',
            type: 'module_type',
            icon: 'module_icon',
            model: 'module_model',
            definedAttributes: [],
          }),
          new TerraformComponentDefinition({
            blockType: 'resource',
            provider: 'provider',
            type: 'resource_type',
            icon: 'resource_icon',
            model: 'resource_model',
            isContainer: true,
            definedAttributes: [
              new ComponentAttributeDefinition({ name: 'name3', type: 'String' }),
              new ComponentAttributeDefinition({
                name: 'link1',
                type: 'Link',
                linkType: 'Default',
                linkRef: 'module_type',
              }),
            ],
          }),
          new TerraformComponentDefinition({
            blockType: 'variable',
            provider: 'provider',
            type: 'variable_type',
            icon: 'variable_icon',
            model: 'variable_model',
            definedAttributes: [],
          }),
        ]);
      });
    });

    describe('Test method: setChildrenTypes', () => {
      const input = [{
        type: 'type1',
        parentTypes: [
          'type2',
          'type3',
        ],
      }, {
        type: 'type2',
        parentTypes: [
          'type3',
        ],
      }, {
        type: 'type3',
        parentTypes: [],
      }];
      const output = [{
        type: 'type1',
        parentTypes: [
          'type2',
          'type3',
        ],
      }, {
        type: 'type2',
        parentTypes: [
          'type3',
        ],
        childrenTypes: [
          'type1',
        ],
      }, {
        type: 'type3',
        parentTypes: [],
        childrenTypes: [
          'type1',
          'type2',
        ],
      }];

      it('should make match input and output', () => {
        const metadata = getTerraformMetadata('validMetadata', 'tests/resources/metadata/valid.json');
        metadata.setChildrenTypes(input);
        expect(input).toEqual(output);
      });
    });
  });

  describe('Validate default metadata', () => {
    it('Validate: aws.json', () => {
      const metadata = getTerraformMetadata('aws', 'tests/resources/metadata/valid.json');
      expect(metadata.validate()).toBeTruthy();
    });
  });

  describe('Test examples', () => {
    it('Test example: container.json', () => {
      const metadata = getTerraformMetadata('container', 'tests/resources/metadata/container.json');

      expect(metadata.validate()).toBeTruthy();
      expect(metadata.getComponentDefinitions()).toEqual([
        new TerraformComponentDefinition({
          blockType: 'provider',
          provider: 'aws',
          type: 'aws',
          icon: 'Aws',
          model: 'DefaultModel',
        }),
        new TerraformComponentDefinition({
          blockType: 'resource',
          provider: 'aws',
          type: 'aws_vpc',
          icon: 'AwsVpc',
          isContainer: true,
          model: 'DefaultContainer',
          childrenTypes: ['aws_internet_gateway'],
        }),
        new TerraformComponentDefinition({
          blockType: 'resource',
          provider: 'aws',
          type: 'aws_internet_gateway',
          parentTypes: ['aws_vpc'],
          icon: 'AwsInternetGateway',
          model: 'DefaultModel',
          definedAttributes: [
            new ComponentAttributeDefinition({
              name: 'vpc_id',
              type: 'Reference',
              containerRef: 'aws_vpc',
            }),
          ],
        }),
      ]);
    });

    it('Test example: link.json', () => {
      const metadata = getTerraformMetadata('container', 'tests/resources/metadata/link.json');
      metadata.parse();
      metadata.pluginData.initLinkDefinitions();

      expect(metadata.validate()).toBeTruthy();

      expect(metadata.pluginData.definitions.links).toEqual([
        new ComponentLinkDefinition({
          attributeRef: 'vpc_id2',
          sourceRef: 'aws_internet_gateway',
          targetRef: 'aws_vpc_2',
          type: 'Default',
        }),
        new ComponentLinkDefinition({
          attributeRef: 'vpc_id1',
          sourceRef: 'aws_internet_gateway',
          targetRef: 'aws_vpc',
          type: 'Default',
        }),
        new ComponentLinkDefinition({
          attributeRef: 'vpc_id2',
          sourceRef: 'aws_internet_gateway',
          targetRef: 'aws_vpc',
          type: 'Reverse',
        }),
      ]);
    });
  });
});

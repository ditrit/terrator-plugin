import TerraformMetadata from 'src/metadata/TerraformMetadata';
import TerraformComponentDefinition from 'src/models/TerraformComponentDefinition';
import fs from 'fs';
import {
  ComponentAttributeDefinition,
  ComponentLinkDefinition,
} from 'leto-modelizer-plugin-core';

describe('Test TerraformMetadata', () => {
  describe('Test methods', () => {
    const validMetadata = JSON.parse(fs.readFileSync('tests/resources/metadata/valid.json', 'utf8'));
    const invalidMetadata = JSON.parse(fs.readFileSync('tests/resources/metadata/invalid.json', 'utf8'));

    describe('Test method: validate', () => {
      it('Should return true on valid metadata', () => {
        const metadata = new TerraformMetadata({ metadata: { validMetadata } });
        expect(metadata.validate()).toBeTruthy();
      });

      it('Should return false on invalid metadata', () => {
        const metadata = new TerraformMetadata({ metadata: { invalidMetadata } });
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

    describe('Test method: getDefinitions', () => {
      const metadata = new TerraformMetadata({ metadata: { validMetadata } });

      it('Should return components and links', () => {
        const result = metadata.getDefinitions();

        expect(result).not.toBeNull();
        expect(result.links).not.toBeNull();
        expect(result.links.length).toBeGreaterThanOrEqual(1);
        expect(result.components).not.toBeNull();
        expect(result.components.length).toBeGreaterThanOrEqual(1);
      });
    })

    describe('Test method: getComponentDefinitions', () => {
      const metadata = new TerraformMetadata({ metadata: { validMetadata } });

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
  });

  describe('Validate default metadata', () => {
    it('Validate: aws.json', () => {
      const aws = JSON.parse(fs.readFileSync('src/assets/metadata/aws.json', 'utf8'));
      const metadata = new TerraformMetadata({
        metadata: {
          aws,
        },
      });
      expect(metadata.validate()).toBeTruthy();
    });
  });

  describe('Test examples', () => {
    it('Test example: container.json', () => {
      const container = JSON.parse(fs.readFileSync('tests/resources/metadata/container.json', 'utf8'));
      const metadata = new TerraformMetadata({ metadata: { container } });

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
      const container = JSON.parse(fs.readFileSync('tests/resources/metadata/link.json', 'utf8'));
      const metadata = new TerraformMetadata({ metadata: { container } });

      expect(metadata.validate()).toBeTruthy();

      const components = metadata.getComponentDefinitions();
      expect(metadata.getLinkDefinitions(components)).toEqual([
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
          sourceRef: 'aws_vpc',
          targetRef: 'aws_internet_gateway',
          type: 'Reverse',
        }),
      ]);
    });
  });
});

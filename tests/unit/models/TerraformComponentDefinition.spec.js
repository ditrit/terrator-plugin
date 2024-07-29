import TerraformComponentDefinition from 'src/models/TerraformComponentDefinition';

describe('Test class: TerraformComponentDefinition', () => {
  describe('Test constructor', () => {
    it('Check variable initialization', () => {
      const definition = new TerraformComponentDefinition();

      expect(definition.blockType).toBeNull();
      expect(definition.provider).toBeNull();
      expect(definition.isUnknown).toBeNull();
    });

    it('Check passing undefined variables to constructor', () => {
      const definition = new TerraformComponentDefinition({});

      expect(definition.blockType).toBeNull();
      expect(definition.provider).toBeNull();
      expect(definition.isUnknown).toBeNull();
    });

    it('Check passing variable to constructor', () => {
      const componentDefinition = new TerraformComponentDefinition({
        blockType: 'provider',
        provider: 'aws',
        isUnknown: true,
      });

      expect(componentDefinition.blockType).toEqual('provider');
      expect(componentDefinition.provider).toEqual('aws');
      expect(componentDefinition.isUnknown).toEqual(true);
    });

    it('Check non container attribute value', () => {
      const componentDefinition = new TerraformComponentDefinition({
        blockType: 'provider',
        provider: 'aws',
        isContainer: false,
        isUnknown: true,
      });

      expect(componentDefinition.defaultWidth).toEqual(96);
      expect(componentDefinition.defaultHeight).toEqual(80);
      expect(componentDefinition.minWidth).toEqual(96);
      expect(componentDefinition.minHeight).toEqual(80);
      expect(componentDefinition.reservedWidth).toEqual(0);
      expect(componentDefinition.reservedHeight).toEqual(0);
      expect(componentDefinition.isUnknown).toEqual(true);
    });

    it('Check container attribute value', () => {
      const componentDefinition = new TerraformComponentDefinition({
        blockType: 'provider',
        provider: 'aws',
        isUnknown: true,
        isContainer: true,
      });

      expect(componentDefinition.defaultWidth).toEqual(186);
      expect(componentDefinition.defaultHeight).toEqual(160);
      expect(componentDefinition.minWidth).toEqual(186);
      expect(componentDefinition.minHeight).toEqual(140);
      expect(componentDefinition.reservedWidth).toEqual(12);
      expect(componentDefinition.reservedHeight).toEqual(80);
      expect(componentDefinition.isUnknown).toEqual(true);
    });
  });
});

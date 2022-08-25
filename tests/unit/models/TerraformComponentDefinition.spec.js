import TerraformComponentDefinition from 'src/models/TerraformComponentDefinition';

describe('Test class: TerraformComponentDefinition', () => {
  describe('Test constructor', () => {
    it('Check variable initialization', () => {
      const definition = new TerraformComponentDefinition();

      expect(definition.blockType).toBeNull();
      expect(definition.provider).toBeNull();
    });

    it('Check passing undefined variables to constructor', () => {
      const definition = new TerraformComponentDefinition({});

      expect(definition.blockType).toBeNull();
      expect(definition.provider).toBeNull();
    });

    it('Check passing variable to constructor', () => {
      const componentDefinition = new TerraformComponentDefinition({
        blockType: 'provider',
        provider: 'aws',
      });

      expect(componentDefinition.blockType).toEqual('provider');
      expect(componentDefinition.provider).toEqual('aws');
    });
  });
});

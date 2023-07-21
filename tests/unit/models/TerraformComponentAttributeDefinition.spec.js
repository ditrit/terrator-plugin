import TerraformComponentAttributeDefinition
  from 'src/models/TerraformComponentAttributeDefinition';

describe('Test class: TerraformComponentAttributeDefinition', () => {
  describe('Test constructor', () => {
    it('Check variable initialization', () => {
      const attribute = new TerraformComponentAttributeDefinition();

      expect(attribute.linkAttribute).toEqual('id');
    });

    it('Check variable initialization with empty object', () => {
      const attribute = new TerraformComponentAttributeDefinition({});

      expect(attribute.linkAttribute).toEqual('id');
    });

    it('Check passing variable to constructor', () => {
      const attribute = new TerraformComponentAttributeDefinition({
        linkAttribute: 'test_value',
      });

      expect(attribute.linkAttribute).toEqual('test_value');
    });
  });
});

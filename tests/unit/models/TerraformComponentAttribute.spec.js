import TerraformComponentAttribute from 'src/models/TerraformComponentAttribute';

describe('Test class: TerraformComponentAttribute', () => {
  describe('Test constructor', () => {
    it('Check variable initialization', () => {
      const attribute = new TerraformComponentAttribute();

      expect(attribute.isDynamic).toEqual(false);
    });

    it('Check passing undefined variables to constructor', () => {
      const attribute = new TerraformComponentAttribute();

      expect(attribute.isDynamic).toEqual(false);
    });

    it('Check passing variable to constructor', () => {
      const attribute = new TerraformComponentAttribute({
        isDynamic: true,
      });

      expect(attribute.isDynamic).toEqual(true);
    });
  });

  describe('Test getter: isVariable', () => {
    it('should be false when the attribute is not a variable', () => {
      expect(new TerraformComponentAttribute({
        value: null,
      }).isVariable).toEqual(false);
      expect(new TerraformComponentAttribute({
        value: 'notAVariable',
      }).isVariable).toEqual(false);
      expect(new TerraformComponentAttribute({
        value: ['notAVariable'],
      }).isVariable).toEqual(false);
    });

    it('should be true when the attribute is a variable', () => {
      expect(new TerraformComponentAttribute({
        value: 'var.test_variable',
      }).isVariable).toEqual(true);
      expect(new TerraformComponentAttribute({
        value: 'local.test_variable',
      }).isVariable).toEqual(true);
    });
  });
});

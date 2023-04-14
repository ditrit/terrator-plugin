import TerraformVariable from 'src/models/TerraformVariable';

describe('Test class: TerraformVariable', () => {
  describe('Test constructor', () => {
    it('Check variable instantiation', () => {
      const variable = new TerraformVariable();

      expect(variable.name).toBeNull();
      expect(variable.type).toBeNull();
      expect(variable.value).toBeNull();
      expect(variable.category).toBeNull();
      expect(variable.defaultValue).toBeNull();
      expect(variable.nullable).toBe(false);
      expect(variable.sensitive).toBe(false);
      expect(variable.description).toBeNull();
    });

    it('Check variable instantiation with default value', () => {
      const variable = new TerraformVariable({
        defaultValue: 'default',
      });

      expect(variable.name).toBeNull();
      expect(variable.type).toBeNull();
      expect(variable.value).toBeNull();
      expect(variable.category).toBeNull();
      expect(variable.description).toBeNull();
      expect(variable.nullable).toBe(false);
      expect(variable.sensitive).toBe(false);
      expect(variable.defaultValue).toBe('default');
    });

    it('Check variable instantiation with description', () => {
      const variable = new TerraformVariable({
        description: 'This is a description',
      });

      expect(variable.name).toBeNull();
      expect(variable.type).toBeNull();
      expect(variable.value).toBeNull();
      expect(variable.category).toBeNull();
      expect(variable.defaultValue).toBeNull();
      expect(variable.nullable).toBe(false);
      expect(variable.sensitive).toBe(false);
      expect(variable.description).toBe('This is a description');
    });

    it('Check variable instantiation with sensitive', () => {
      const variable = new TerraformVariable({
        sensitive: true,
      });

      expect(variable.name).toBeNull();
      expect(variable.type).toBeNull();
      expect(variable.value).toBeNull();
      expect(variable.category).toBeNull();
      expect(variable.defaultValue).toBeNull();
      expect(variable.description).toBeNull();
      expect(variable.nullable).toBe(false);
      expect(variable.sensitive).toBe(true);
    });

    it('Check variable instantiation with nullable', () => {
      const variable = new TerraformVariable({
        nullable: true,
      });

      expect(variable.name).toBeNull();
      expect(variable.type).toBeNull();
      expect(variable.value).toBeNull();
      expect(variable.category).toBeNull();
      expect(variable.defaultValue).toBeNull();
      expect(variable.description).toBeNull();
      expect(variable.sensitive).toBe(false);
      expect(variable.nullable).toBe(true);
    });
  });

  describe('Test getters', () => {
    it('Check formattedName getter with an input variable', () => {
      const variable = new TerraformVariable({
        name: 'test',
        category: 'variable',
      });

      expect(variable.formattedName).toEqual('var.test');
    });

    it('Check formattedName getter with a local variable', () => {
      const variable = new TerraformVariable({
        name: 'test',
        category: 'local',
      });

      expect(variable.formattedName).toEqual('local.test');
    });

    it('Check formattedName getter with an output variable', () => {
      const variable = new TerraformVariable({
        name: 'test',
        category: 'output',
      });

      expect(variable.formattedName).toEqual(null);
    });
  });
});

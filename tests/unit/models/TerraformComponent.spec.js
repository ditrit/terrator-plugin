import TerraformComponent from 'src/models/TerraformComponent';
import TerraformComponentAttribute from 'src/models/TerraformComponentAttribute';

describe('Test class: TerraformComponent', () => {
  describe('Test method: createAttribute', () => {
    it('should create a new instance of TerraformComponentAttribute', () => {
      const terraformComponent = new TerraformComponent();
      const props = { name: 'attributeName', type: 'String', value: 'attributeValue' };
      const attribute = terraformComponent.createAttribute(props);

      expect(attribute).toBeInstanceOf(TerraformComponentAttribute);
      expect(attribute.name).toBe(props.name);
      expect(attribute.type).toBe(props.type);
      expect(attribute.value).toBe(props.value);
    });
  });
});

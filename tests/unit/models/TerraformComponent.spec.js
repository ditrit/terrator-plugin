import TerraformComponent from 'src/models/TerraformComponent';
import TerraformComponentAttribute from 'src/models/TerraformComponentAttribute';
import { ComponentDefinition, ParserLog } from 'leto-modelizer-plugin-core';
import TerraformComponentDefinition from 'src/models/TerraformComponentDefinition';

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

  describe('Test method: getConfigurationKey', () => {
    it('should return configuration key of the component', () => {
      const definition = new ComponentDefinition({ type: 'testType' });
      const terraformComponent = new TerraformComponent({ definition, externalId: 'externalId' });

      expect(terraformComponent.getConfigurationKey()).toBe('testType.externalId');
    });
  });

  describe('Test method: getErrors', () => {
    it('should call validateExternalId and getErrors', () => {
      const component = new TerraformComponent({
        definition: new TerraformComponentDefinition({
          isUnknown: true,
        }),
      });

      expect(component.getErrors()).toEqual([new ParserLog({
        severity: ParserLog.SEVERITY_ERROR,
        message: 'terrator-plugin.parser.error.noExternalId',
      }), new ParserLog({
        severity: ParserLog.SEVERITY_WARNING,
        message: 'parser.warning.noComponentDefinition',
      })]);
    });
  });

  describe('Test method: validateDefinition', () => {
    it('should not set error when definition is valid', () => {
      const component = new TerraformComponent({
        definition: new TerraformComponentDefinition(),
      });

      expect(component.validateDefinition()).toEqual([]);
    });

    it('should set error when definition is unknown', () => {
      const component = new TerraformComponent({
        id: 'id',
        definition: new TerraformComponentDefinition({
          isUnknown: true,
        }),
      });

      expect(component.validateDefinition()).toEqual([new ParserLog({
        componentId: 'id',
        severity: ParserLog.SEVERITY_WARNING,
        message: 'parser.warning.noComponentDefinition',
      })]);
    });
  });

  describe('Test method: validateExternalId', () => {
    it('should not set error when externalId is valid', () => {
      const component = new TerraformComponent({
        externalId: 'test',
      });

      expect(component.validateExternalId()).toEqual([]);
    });

    it('should set error when externalId is invalid', () => {
      const component = new TerraformComponent({
        externalId: null,
      });

      expect(component.validateExternalId()).toEqual([new ParserLog({
        message: 'terrator-plugin.parser.error.noExternalId',
        severity: ParserLog.SEVERITY_ERROR,
      })]);

      component.externalId = '';
      expect(component.validateExternalId()).toEqual([new ParserLog({
        message: 'terrator-plugin.parser.error.noExternalId',
        severity: ParserLog.SEVERITY_ERROR,
      })]);
    });
  });
});

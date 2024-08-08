import TerraformComponentAttribute from 'src/models/TerraformComponentAttribute';
import TerraformComponentAttributeDefinition
  from 'src/models/TerraformComponentAttributeDefinition';
import TerraformData from 'src/models/TerraformData';
import TerraformVariable from 'src/models/TerraformVariable';
import TerraformComponent from 'src/models/TerraformComponent';
import { ComponentDefinition } from '@ditrit/leto-modelizer-plugin-core';

describe('Test class: TerraformData', () => {
  const terraformData = new TerraformData();

  describe('Test method: getVariableValue', () => {
    it('Should return the value of a variable', () => {
      terraformData.variables.push(new TerraformVariable({
        name: 'test_variable1',
        value: 'test_value',
        category: 'variable',
      }));
      terraformData.variables.push(new TerraformVariable({
        name: 'test_variable2',
        value: null,
        category: 'variable',
      }));

      expect(terraformData.getVariableValue('var.test_variable1'))
        .toEqual('test_value');
      expect(terraformData.getVariableValue('var.test_variable2'))
        .toBeNull();
    });

    it('Should return the value of a local variable', () => {
      terraformData.variables.push(new TerraformVariable({
        name: 'test_variable1',
        value: 'test_value',
        category: 'local',
      }));
      terraformData.variables.push(new TerraformVariable({
        name: 'test_variable2',
        value: null,
        category: 'local',
      }));

      expect(terraformData.getVariableValue('local.test_variable1'))
        .toEqual('test_value');
      expect(terraformData.getVariableValue('local.test_variable2'))
        .toBeNull();
    });

    it('Should return null on bad variable reference', () => {
      const variable = new TerraformVariable({
        name: 'test_variable',
        value: 'test_value',
        category: 'variable',
      });

      terraformData.variables.push(variable);
      expect(terraformData.getVariableValue('var.test_variable.error'))
        .toBeNull();
    });
  });

  describe('Test method: getLinkedComponentsIds', () => {
    it('Should return an array containing the id of a variable', () => {
      const variable = new TerraformVariable({
        name: 'test_variable',
        value: 'test_value',
        category: 'variable',
      });
      const attribute = new TerraformComponentAttribute({
        value: 'var.test_variable',
      });

      terraformData.variables.push(variable);
      expect(terraformData.getLinkedComponentsIds(attribute))
        .toEqual(['test_value']);
    });

    it('Should return return an array containing the id of a component link', () => {
      const definition = new TerraformComponentAttributeDefinition({
        type: 'Link',
      });
      const attribute = new TerraformComponentAttribute({
        definition,
        value: ['test_value'],
      });

      expect(terraformData.getLinkedComponentsIds(attribute))
        .toEqual(['test_value']);
    });

    it('Should return return an array containing the id of a simple attribute', () => {
      const attribute = new TerraformComponentAttribute({
        value: 'test_value',
      });

      expect(terraformData.getLinkedComponentsIds(attribute))
        .toEqual(['test_value']);
    });
  });

  describe('Test method: addComponent', () => {
    it('Should create new terraform component and add it to the components list', () => {
      terraformData.components = [];
      terraformData.configuration = {
        defaultFileName: '',
      };

      const definition = new ComponentDefinition();
      const id = terraformData.addComponent(definition);

      expect(terraformData.components).toEqual([
        new TerraformComponent({
          id,
          name: id,
          definition,
          path: '',
        }),
      ]);
    });

    it('Should create new terraform component and set correct path without folder', () => {
      terraformData.components = [];
      terraformData.configuration = {
        defaultFileName: 'test.tf',
      };

      const definition = new ComponentDefinition();
      const id = terraformData.addComponent(definition);

      expect(terraformData.components).toEqual([
        new TerraformComponent({
          id,
          name: id,
          definition,
          path: 'test.tf',
        }),
      ]);
    });

    it('Should create new terraform component and set correct path with folder', () => {
      terraformData.components = [];
      terraformData.configuration = {
        defaultFileName: 'test.tf',
      };

      const definition = new ComponentDefinition();
      const id = terraformData.addComponent(definition, 'src');

      expect(terraformData.components).toEqual([
        new TerraformComponent({
          id,
          name: id,
          definition,
          path: 'src/test.tf',
        }),
      ]);
    });
  });

  describe('Test method: getComponentByConfigurationKey', () => {
    it('Should return the correct component using the correct configuration key', () => {
      terraformData.components = [];
      terraformData.configuration = {
        defaultFileName: '',
      };

      const definition1 = new ComponentDefinition({ type: 'testType' });
      terraformData.addComponent(definition1);

      const definition2 = new ComponentDefinition({ type: 'testType2' });
      terraformData.addComponent(definition2);

      expect(terraformData.getComponentByConfigurationKey('testType.id_1')).toEqual(terraformData.components[0]);
    });

    it('Should return the correct component (among components with same external ids) using the correct configuration key', () => {
      terraformData.components = [];
      terraformData.configuration = {
        defaultFileName: '',
      };

      const definition1 = new ComponentDefinition({ type: 'testType' });
      terraformData.addComponent(definition1);
      terraformData.components[0].externalId = 'externalId';

      const definition2 = new ComponentDefinition({ type: 'testType2' });
      terraformData.addComponent(definition2);
      terraformData.components[1].externalId = 'externalId';

      const definition3 = new ComponentDefinition({ type: 'testType3' });
      terraformData.addComponent(definition3);
      terraformData.components[2].externalId = 'externalId';

      expect(terraformData.getComponentByConfigurationKey('testType2.externalId')).toEqual(terraformData.components[1]);
    });

    it('Should not return any component due to a wrong configuration key', () => {
      terraformData.components = [];
      terraformData.configuration = {
        defaultFileName: '',
      };

      const definition1 = new ComponentDefinition({ type: 'testType' });
      terraformData.addComponent(definition1);

      const definition2 = new ComponentDefinition({ type: 'testType2' });
      terraformData.addComponent(definition2);

      expect(terraformData.getComponentByConfigurationKey('FakeType.random_id')).toBeUndefined();
    });
  });
});

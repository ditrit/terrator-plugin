import TerraformComponentAttribute from 'src/models/TerraformComponentAttribute';
import TerraformComponentAttributeDefinition
  from 'src/models/TerraformComponentAttributeDefinition';
import TerraformData from 'src/models/TerraformData';
import TerraformVariable from 'src/models/TerraformVariable';
import { Component } from 'leto-modelizer-plugin-core';

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

  describe('Test method: getAttributeValue', () => {
    it('Should return the value of a variable', () => {
      const variable = new TerraformVariable({
        name: 'test_variable',
        value: 'test_value',
        category: 'variable',
      });
      const attribute = new TerraformComponentAttribute({
        value: 'var.test_variable',
      });

      terraformData.variables.push(variable);
      expect(terraformData.getAttributeValue(attribute))
        .toEqual('test_value');
    });

    it('Should return an array containing the id of components links', () => {
      const definition = new TerraformComponentAttributeDefinition({
        type: 'Link',
      });
      const attribute = new TerraformComponentAttribute({
        definition,
        value: [
          'test_resource.test_id_1.test_value',
          'test_resource.test_id_2.test_value',
        ],
      });

      expect(terraformData.getAttributeValue(attribute))
        .toEqual(['test_id_1', 'test_id_2']);
    });

    it('Should return the id of a component reference', () => {
      const definition = new TerraformComponentAttributeDefinition({
        type: 'Reference',
      });
      const attribute = new TerraformComponentAttribute({
        definition,
        value: 'test_resource.test_id.test_value',
      });

      expect(terraformData.getAttributeValue(attribute))
        .toEqual('test_id');
    });

    it('Should return the attribute value', () => {
      const attribute = new TerraformComponentAttribute({
        value: 'test_value',
      });

      expect(terraformData.getAttributeValue(attribute))
        .toEqual('test_value');
    });
  });

  describe('Test method: getComponentIdFromValue', () => {
    it('Should return the id of a resource reference', () => {
      expect(terraformData.getComponentIdFromValue('test_resource.test_id.test_value'))
        .toEqual('test_id');
    });

    it('Should return the id of a data reference', () => {
      expect(terraformData.getComponentIdFromValue('data.test_resource.test_id.test_value'))
        .toEqual('test_id');
    });

    it('Should return the whole value', () => {
      expect(terraformData.getComponentIdFromValue('test_value'))
        .toEqual('test_value');
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

  describe('Test method: expandLinkAttribute', () => {
    it('Should expand the attribute name of a link from a reference', () => {
      expect(terraformData.expandLinkAttribute('test_resource.test_value.test_id', 'id'))
        .toEqual('test_value');
    });

    it('Should expand the attribute name of a link from a reference and an argument', () => {
      const attribute = new TerraformComponentAttribute({
        name: 'test_name',
        value: 'test_value',
      });
      const component = new Component({
        attribute,
        id: 'test_id',
      });

      terraformData.components.push(component);
      terraformData.components[0].attributes.push(attribute);
      expect(terraformData.expandLinkAttribute('test_resource.test_id.test_value', 'test_name'))
        .toEqual('test_value');
    });
  });
});

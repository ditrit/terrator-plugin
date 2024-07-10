import TerraformComponentRenderer from 'src/drawer/render/TerraformComponentRenderer';
import TerraformComponent from 'src/models/TerraformComponent';
import TerraformData from 'src/models/TerraformData';
import { ComponentDrawOption } from 'leto-modelizer-plugin-core';
import TerraformComponentDefinition from 'src/models/TerraformComponentDefinition';
import TerraformComponentAttribute from 'src/models/TerraformComponentAttribute';

describe('Test class: TerraformComponentRenderer', () => {
  const renderer = new TerraformComponentRenderer(new TerraformData(), null, false);

  describe('Test method: getTemplateData', () => {
    it('Should return has count to be false without count attribute', () => {
      const component = new TerraformComponent({
        drawOption: new ComponentDrawOption(),
        definition: new TerraformComponentDefinition(),
      });
      const result = renderer.getTemplateData(component);

      expect(result.hasCount).toBe(false);
    });

    it('Should return has count to be false with count value equals to 1', () => {
      const component = new TerraformComponent({
        drawOption: new ComponentDrawOption(),
        definition: new TerraformComponentDefinition(),
        attributes: [new TerraformComponentAttribute({
          name: 'count',
          type: 'Number',
          value: 1,
        })],
      });
      const result = renderer.getTemplateData(component);

      expect(result.hasCount).toBe(false);
    });

    it('Should return has count to be true with count value different to 1', () => {
      const component = new TerraformComponent({
        drawOption: new ComponentDrawOption(),
        definition: new TerraformComponentDefinition(),
        attributes: [new TerraformComponentAttribute({
          name: 'count',
          type: 'Number',
          value: 2,
        })],
      });
      const result = renderer.getTemplateData(component);

      expect(result.hasCount).toBe(true);
    });

    it('Should return count to be the same value as the count value attribute', () => {
      const component = new TerraformComponent({
        drawOption: new ComponentDrawOption(),
        definition: new TerraformComponentDefinition(),
        attributes: [new TerraformComponentAttribute({
          name: 'count',
          type: 'String',
          value: '2',
        })],
      });
      const result = renderer.getTemplateData(component);

      expect(result.hasCount).toEqual(true);
      expect(result.count).toBe(2);
    });

    it('Should return count to be the ? on not number count attribute', () => {
      const component = new TerraformComponent({
        drawOption: new ComponentDrawOption(),
        definition: new TerraformComponentDefinition(),
        attributes: [new TerraformComponentAttribute({
          name: 'count',
          type: 'string',
          value: 'other',
        })],
      });
      const result = renderer.getTemplateData(component);

      expect(result.count).toBe('?');
    });
  });
});

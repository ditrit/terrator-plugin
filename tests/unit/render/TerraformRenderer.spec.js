import TerraformRender from 'src/render/TerraformRenderer';
import fs from 'fs';
import TerraformMetadata from 'src/metadata/TerraformMetadata';
import TerraformParser from 'src/parser/TerraformParser';
import {
  Component,
  ComponentAttribute,
  ComponentAttributeDefinition,
  ComponentLink, ComponentLinkDefinition, FileInput
} from 'leto-modelizer-plugin-core';
import TerraformComponentDefinition from 'src/models/TerraformComponentDefinition';
import { getTerraformMetadata } from 'tests/resources/utils';

describe('Test TerraformRenderer', () => {
  it('Test constructor', () => {
    expect(new TerraformRender().template).not.toBeNull();
  });

  describe('Test methods', () => {
    describe('Test method: render', () => {
      it('Should render container', () => {
        const definitions = getTerraformMetadata(
          'aws',
          'tests/resources/metadata/container.json',
        ).getDefinitions();
        const parser = new TerraformParser(definitions);
        const input = new FileInput({
          path: './container.tf',
          content: fs.readFileSync('tests/resources/tf/container.tf', 'utf8'),
        });
        const { components, links } = parser.parse([input]);

        expect(new TerraformRender().render(components, links)).toEqual([input]);
      });

      it('Should render container', () => {
        const definitions = getTerraformMetadata(
          'aws',
          'tests/resources/metadata/container.json',
        ).getDefinitions();
        const parser = new TerraformParser(definitions);
        const input = new FileInput({
          path: './container.tf',
          content: fs.readFileSync('tests/resources/tf/container.tf', 'utf8'),
        });
        const { components, links } = parser.parse([input]);

        expect(new TerraformRender().render(components, links)).toEqual([input]);
      });

      describe('Should render multiple files', () => {
        const definitions = getTerraformMetadata(
          'aws',
          'tests/resources/tf/link.json',
        ).getDefinitions();
        const parser = new TerraformParser(definitions);
        const inputs = [
          new FileInput({
            path: './link_default_single.tf',
            content: fs.readFileSync('tests/resources/tf/link_default_single.tf', 'utf8'),
          }),
          new FileInput({
            path: null,
            content: fs.readFileSync('tests/resources/tf/link_reverse_single.tf', 'utf8'),
          }),
        ];
        const { components, links } = parser.parse(inputs);

        expect(new TerraformRender().render(components, links, './link_reverse_single.tf')).toEqual([
          new FileInput({
            path: './link_default_single.tf',
            content: fs.readFileSync('tests/resources/tf/link_default_single.tf', 'utf8'),
          }),
          new FileInput({
            path: './link_reverse_single.tf',
            content: fs.readFileSync('tests/resources/tf/link_reverse_single.tf', 'utf8'),
          }),
        ]);
      });

      it('Should render container with empty attributes', () => {
        const definitions = getTerraformMetadata(
          'aws',
          'tests/resources/metadata/container.json',
        ).getDefinitions();
        const parser = new TerraformParser(definitions);
        const input = new FileInput({
          path: './container.tf',
          content: fs.readFileSync('tests/resources/tf/container.tf', 'utf8'),
        });
        const { components, links } = parser.parse([input]);
        // keep only name attribute on the child.
        components[0].children[0].attributes = [components[0].children[0].attributes[0]];

        expect(new TerraformRender().render(components, links)).toEqual([input]);
      });

      it('Should render single default link', () => {
        const definitions = getTerraformMetadata(
          'aws',
          'tests/resources/tf/link.json',
        ).getDefinitions();
        const parser = new TerraformParser(definitions);
        const input = new FileInput({
          path: './link_default_single.tf',
          content: fs.readFileSync('tests/resources/tf/link_default_single.tf', 'utf8'),
        });
        const { components, links } = parser.parse([input]);

        expect(new TerraformRender().render(components, links)).toEqual([input]);
      });

      it('Should render multiple default links', () => {
        const definitions = getTerraformMetadata(
          'aws',
          'tests/resources/tf/link.json',
        ).getDefinitions();
        const parser = new TerraformParser(definitions);
        const input = new FileInput({
          path: './link_default_multiple.tf',
          content: fs.readFileSync('tests/resources/tf/link_default_multiple.tf', 'utf8')
        });
        const { components, links } = parser.parse([input]);

        expect(new TerraformRender().render(components, links)).toEqual([input]);
      });

      it('Should render single reverse link', () => {
        const definitions = getTerraformMetadata(
          'aws',
          'tests/resources/tf/link.json',
        ).getDefinitions();
        const parser = new TerraformParser(definitions);
        const input = new FileInput({
          path: './link_reverse_single.tf',
          content: fs.readFileSync('tests/resources/tf/link_reverse_single.tf', 'utf8'),
        });
        const { components, links } = parser.parse([input]);

        expect(new TerraformRender().render(components, links)).toEqual([input]);
      });

      it('Should render multiple reverse links', () => {
        const definitions = getTerraformMetadata(
          'aws',
          'tests/resources/tf/link.json',
        ).getDefinitions();
        const parser = new TerraformParser(definitions);
        const input = new FileInput({
          path: './link_reverse_multiple.tf',
          content: fs.readFileSync('tests/resources/tf/link_reverse_multiple.tf', 'utf8'),
        });
        const { components, links } = parser.parse([input]);

        expect(new TerraformRender().render(components, links)).toEqual([input]);
      });

      it('Should render app', () => {
        const definitions = getTerraformMetadata(
          'aws',
          'src/assets/metadata/aws.json',
        ).getDefinitions();
        const parser = new TerraformParser(definitions);
        const input = new FileInput({
          path: './app.tf',
          content: fs.readFileSync('tests/resources/tf/app.tf', 'utf8'),
        });
        const { components, links } = parser.parse([input]);

        expect(new TerraformRender().render(components, links)).toEqual([input]);
      });

      it('Should render with new links', () => {
        const input = new FileInput({
          path: './link_default_multiple.tf',
          content: fs.readFileSync('tests/resources/tf/link_default_multiple.tf', 'utf8'),
        });
        expect(new TerraformRender().render([
          new Component({
            name: 'parent_default_multiple_1',
            id: 'parent_default_multiple_1',
            path: './link_default_multiple.tf',
            definition: new TerraformComponentDefinition({
              blockType: 'resource',
              provider: 'awsLink',
              type: 'parent',
              icon: 'parent',
              model: 'DefaultModel',
              definedAttributes: [new ComponentAttributeDefinition({
                name: 'toChild',
                type: 'Link',
                linkType: 'Default',
                linkRef: 'child',
              })],
            }),
            attributes: [new ComponentAttribute({
              name: 'name',
              value: 'parent_default_multiple_1',
              type: 'String',
            })],
          }),
          new Component({
            name: 'child_default_multiple_1',
            id: 'child_default_multiple_1',
            path: './link_default_multiple.tf',
            definition: new TerraformComponentDefinition({
              blockType: 'resource',
              provider: 'awsLink',
              type: 'child',
              icon: 'child',
              model: 'DefaultModel',
            }),
            attributes: [new ComponentAttribute({
              name: 'name',
              value: 'child_default_multiple_1',
              type: 'String',
            })],
          }),
          new Component({
            name: 'child_default_multiple_2',
            id: 'child_default_multiple_2',
            path: './link_default_multiple.tf',
            definition: new TerraformComponentDefinition({
              blockType: 'resource',
              provider: 'awsLink',
              type: 'child',
              icon: 'child',
              model: 'DefaultModel',
            }),
            attributes: [new ComponentAttribute({
              name: 'name',
              value: 'child_default_multiple_2',
              type: 'String',
            })],
          }),
        ], [
          new ComponentLink({
            source: 'parent_default_multiple_1',
            target: 'child_default_multiple_1',
            definition: new ComponentLinkDefinition({
              attributeRef: 'toChild',
              sourceRef: 'parent',
              targetRef: 'child',
              type: 'Default',
            }),
          }),
          new ComponentLink({
            source: 'parent_default_multiple_1',
            target: 'child_default_multiple_2',
            definition: new ComponentLinkDefinition({
              attributeRef: 'toChild',
              sourceRef: 'parent',
              targetRef: 'child',
              type: 'Default',
            }),
          }),
          new ComponentLink({
            source: 'parent_default_multiple_2',
            target: 'child_default_multiple_1',
            definition: new ComponentLinkDefinition({
              attributeRef: 'toChild',
              sourceRef: 'parent',
              targetRef: 'child',
              type: 'Default',
            }),
          }),
        ])).toEqual([input]);
      });
    });

    describe('Fix related bugs', () => {
      it('Should fix prodiver rendering, https://github.com/ditrit/terrator-plugin/issues/22', () => {
        const input = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/bug22_providerRendering.tf', 'utf8'),
        });

        const definitions = getTerraformMetadata(
          'aws',
          'src/assets/metadata/aws.json',
        ).getDefinitions();

        const components = [
          new Component({
            path: 'new_file.tf',
            id: 'object_64f4f095',
            name: 'object_64f4f095',
            definition: definitions.components.find((definition) => definition.blockType === 'provider'),
          }),
        ];
        expect(new TerraformRender().render(components, [])).toEqual([input]);
      });
    });
  });
});

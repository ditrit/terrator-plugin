import TerraformRender from 'src/render/TerraformRenderer';
import fs from 'fs';
import TerraformMetadata from 'src/metadata/TerraformMetadata';
import TerraformParser from 'src/parser/TerraformParser';
import {
  Component,
  ComponentAttribute,
  ComponentAttributeDefinition,
  ComponentLink, ComponentLinkDefinition
} from 'leto-modelizer-plugin-core';
import TerraformComponentDefinition from 'src/models/TerraformComponentDefinition';

describe('Test TerraformRenderer', () => {
  it('Test constructor', () => {
    expect(new TerraformRender().template).not.toBeNull();
  });

  describe('Test methods', () => {
    describe('Test method: render', () => {
      it('Should render container', () => {
        const definitions = new TerraformMetadata({
          metadata: {
            aws: JSON.parse(fs.readFileSync('tests/resources/metadata/container.json', 'utf8')),
          },
        }).getDefinitions();
        const parser = new TerraformParser(definitions);
        const input = fs.readFileSync('tests/resources/tf/container.tf', 'utf8');
        const { components, links } = parser.parse([input]);

        expect(new TerraformRender().render(components, links)).toEqual(input);
      });

      it('Should render container with empty attributes', () => {
        const definitions = new TerraformMetadata({
          metadata: {
            aws: JSON.parse(fs.readFileSync('tests/resources/metadata/container.json', 'utf8')),
          },
        }).getDefinitions();
        const parser = new TerraformParser(definitions);
        const input = fs.readFileSync('tests/resources/tf/container.tf', 'utf8');
        const { components, links } = parser.parse([input]);
        // keep only name attribute on the child.
        components[0].children[0].attributes = [components[0].children[0].attributes[0]];

        expect(new TerraformRender().render(components, links)).toEqual(input);
      });

      it('Should render single default link', () => {
        const definitions = new TerraformMetadata({
          metadata: {
            aws: JSON.parse(fs.readFileSync('tests/resources/tf/link.json', 'utf8')),
          },
        }).getDefinitions();
        const parser = new TerraformParser(definitions);
        const input = fs.readFileSync('tests/resources/tf/link_default_single.tf', 'utf8');
        const { components, links } = parser.parse([input]);

        expect(new TerraformRender().render(components, links)).toEqual(input);
      });

      it('Should render multiple default links', () => {
        const definitions = new TerraformMetadata({
          metadata: {
            aws: JSON.parse(fs.readFileSync('tests/resources/tf/link.json', 'utf8')),
          },
        }).getDefinitions();
        const parser = new TerraformParser(definitions);
        const input = fs.readFileSync('tests/resources/tf/link_default_multiple.tf', 'utf8');
        const { components, links } = parser.parse([input]);

        expect(new TerraformRender().render(components, links)).toEqual(input);
      });

      it('Should render single reverse link', () => {
        const definitions = new TerraformMetadata({
          metadata: {
            aws: JSON.parse(fs.readFileSync('tests/resources/tf/link.json', 'utf8')),
          },
        }).getDefinitions();
        const parser = new TerraformParser(definitions);
        const input = fs.readFileSync('tests/resources/tf/link_reverse_single.tf', 'utf8');
        const { components, links } = parser.parse([input]);

        expect(new TerraformRender().render(components, links)).toEqual(input);
      });

      it('Should render multiple reverse links', () => {
        const definitions = new TerraformMetadata({
          metadata: {
            aws: JSON.parse(fs.readFileSync('tests/resources/tf/link.json', 'utf8')),
          },
        }).getDefinitions();
        const parser = new TerraformParser(definitions);
        const input = fs.readFileSync('tests/resources/tf/link_reverse_multiple.tf', 'utf8');
        const { components, links } = parser.parse([input]);

        expect(new TerraformRender().render(components, links)).toEqual(input);
      });

      it('Should render app', () => {
        const definitions = new TerraformMetadata({
          metadata: {
            aws: JSON.parse(fs.readFileSync('src/assets/metadata/aws.json', 'utf8')),
          },
        }).getDefinitions();
        const parser = new TerraformParser(definitions);
        const input = fs.readFileSync('tests/resources/tf/app.tf', 'utf8');
        const { components, links } = parser.parse([input]);

        expect(new TerraformRender().render(components, links)).toEqual(input);
      });

      it('Should render with new links', () => {
        const input = fs.readFileSync('tests/resources/tf/link_default_multiple.tf', 'utf8');
        expect(new TerraformRender().render([
          new Component({
            name: 'parent1',
            id: 'parent1',
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
              value: 'parent1',
              type: 'String',
            })],
          }),
          new Component({
            name: 'child1',
            id: 'child1',
            definition: new TerraformComponentDefinition({
              blockType: 'resource',
              provider: 'awsLink',
              type: 'child',
              icon: 'child',
              model: 'DefaultModel',
            }),
            attributes: [new ComponentAttribute({
              name: 'name',
              value: 'child1',
              type: 'String',
            })],
          }),
          new Component({
            name: 'child2',
            id: 'child2',
            definition: new TerraformComponentDefinition({
              blockType: 'resource',
              provider: 'awsLink',
              type: 'child',
              icon: 'child',
              model: 'DefaultModel',
            }),
            attributes: [new ComponentAttribute({
              name: 'name',
              value: 'child2',
              type: 'String',
            })],
          }),
        ], [
          new ComponentLink({
            source: 'parent1',
            target: 'child1',
            definition: new ComponentLinkDefinition({
              attributeRef: 'toChild',
              sourceRef: 'parent',
              targetRef: 'child',
              type: 'Default',
            }),
          }),
          new ComponentLink({
            source: 'parent1',
            target: 'child2',
            definition: new ComponentLinkDefinition({
              attributeRef: 'toChild',
              sourceRef: 'parent',
              targetRef: 'child',
              type: 'Default',
            }),
          }),
          new ComponentLink({
            source: 'parent2',
            target: 'child1',
            definition: new ComponentLinkDefinition({
              attributeRef: 'toChild',
              sourceRef: 'parent',
              targetRef: 'child',
              type: 'Default',
            }),
          }),
        ])).toEqual(input);
      });
    });
  });
});

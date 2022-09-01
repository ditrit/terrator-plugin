import fs from 'fs';
import TerraformParser from 'src/parser/TerraformParser';
import TerraformMetadata from 'src/metadata/TerraformMetadata';
import {
  Component,
  ComponentAttribute,
  ComponentAttributeDefinition,
  ComponentDefinition, ComponentLink, ComponentLinkDefinition,
} from 'leto-modelizer-plugin-core';
import TerraformComponentDefinition from 'src/models/TerraformComponentDefinition';

describe('Test TerraformParser', () => {
  describe('Test methods', () => {
    describe('Test method: isParsable', () => {
      const parser = new TerraformParser();

      it('Should return true on terraform file', () => {
        expect(parser.isParsable('file.tf')).toBeTruthy();
      });

      it('Should return false on file that is not a terraform file', () => {
        expect(parser.isParsable('file.txt')).toBeFalsy();
      });
    });
    describe('Test method: getParents', () => {
      const components = [
        new Component({
          id: 'parent1',
          name: 'parent1',
          definition: new ComponentDefinition({ isContainer: true, type: 'parent' }),
        }),
        new Component({
          id: 'child1',
          name: 'child1',
          definition: new ComponentDefinition({
            type: 'child',
            parentTypes: ['parent'],
          }),
          attributes: [
            new ComponentAttribute({
              name: 'container',
              type: 'String',
              value: 'parent1',
            }),
          ],
        }),
      ];
      components[1].attributes[0].definition = new ComponentAttributeDefinition({
        name: 'container',
        type: 'Reference',
        containerRef: 'parent',
      });

      it('Should have one parent', () => {
        const parent = new TerraformParser().getParents(components, components[1]);
        expect(parent.length).toEqual(1);
        expect(parent[0].id).toEqual('parent1');
      });
    });

    describe('Test method: parse', () => {
      describe('Test default parse', () => {
        const definitions = new TerraformMetadata({
          metadata: {
            aws: JSON.parse(fs.readFileSync('tests/resources/metadata/container.json', 'utf8')),
          },
        }).getDefinitions();
        const parser = new TerraformParser(definitions);
        expect(parser.parse()).toEqual({
          components: [],
          links: [],
          errors: [],
        });
      });

      describe('Test parse: app.tf', () => {
        const metadata = new TerraformMetadata({
          metadata: {
            aws: JSON.parse(fs.readFileSync('src/assets/metadata/aws.json', 'utf8')),
          },
        });
        const parser = new TerraformParser(metadata.getDefinitions());

        it('Should have all elements in tf', () => {
          const input = fs.readFileSync('tests/resources/tf/app.tf', 'utf8');
          const { components } = parser.parse([input]);
          expect(components).toEqual([
            new Component({
              id: 'aws',
              name: 'aws',
              definition: new TerraformComponentDefinition({
                type: 'aws',
                provider: 'aws',
                blockType: 'provider',
                definedAttributes: [new ComponentAttributeDefinition({
                  name: 'region',
                  type: 'String',
                  required: true,
                })],
              }),
              attributes: [
                new ComponentAttribute({
                  name: 'access_key',
                  type: 'String',
                  value: 'ABCD1234J54PXLDF4IC4WMVA',
                }),
                new ComponentAttribute({
                  name: 'secret_key',
                  type: 'String',
                  value: '28prpojfngldfgPcgiv79Q/J+8o7ksdfsTjmmE2QQBRa',
                }),
                new ComponentAttribute({
                  name: 'region',
                  type: 'String',
                  value: 'eu-west-3',
                  definition: new ComponentAttributeDefinition({
                    name: 'region',
                    type: 'String',
                    required: true,
                  }),
                }),
              ],
            }),
            new Component({
              name: 'server',
              id: 'server',
              definition: new TerraformComponentDefinition({
                blockType: 'module',
                provider: 'aws',
                icon: 'Aws_Servers',
                type: 'server',
                model: 'DefaultModel',
              }),
              attributes: [new ComponentAttribute({
                name: 'source',
                type: 'String',
                value: '../modules/server',
              })],
            }),
            new Component({
              name: 'web',
              id: 'web',
              definition: new TerraformComponentDefinition({
                blockType: 'data',
                provider: 'aws',
                type: 'aws_ami',
                icon: 'Aws_EC2_AMI',
                model: 'DefaultModel',
              }),
              attributes: [
                new ComponentAttribute({
                  name: 'filter',
                  type: 'Object',
                  value: [
                    new ComponentAttribute({
                      name: 'name',
                      type: 'String',
                      value: 'state',
                    }),
                    new ComponentAttribute({
                      name: 'values',
                      type: 'Array',
                      value: ['available'],
                    }),
                  ],
                }),
                new ComponentAttribute({
                  name: 'most_recent',
                  value: true,
                  type: 'Boolean',
                }),
              ],
            }),
            new Component({
              name: 'publicdns',
              id: 'publicdns',
              definition: new TerraformComponentDefinition({
                blockType: 'resource',
                provider: 'aws',
                type: 'aws_route53_zone',
                icon: 'Aws_Route-53-Hosted-Zone',
                model: 'DefaultModel',
                isContainer: true,
                definedAttributes: [new ComponentAttributeDefinition({
                  name: 'name',
                  type: 'String',
                  required: true,
                })],
              }),
              attributes: [
                new ComponentAttribute({
                  name: 'name',
                  value: 'aws.domaine.fr',
                  type: 'String',
                  definition: new ComponentAttributeDefinition({
                    name: 'name',
                    type: 'String',
                    required: true,
                  }),
                }),
              ],
            }),
            new Component({
              id: 'image_id',
              name: 'image_id',
              definition: new TerraformComponentDefinition({
                blockType: 'variable',
                provider: 'aws',
                type: 'image_id',
                icon: 'variable',
                model: 'DefaultModel',
              }),
              attributes: [new ComponentAttribute({
                name: 'type',
                type: 'String',
                value: 'string',
              })],
            }),
          ]);
        });
      });

      describe('Test parse: container', () => {
        const definitions = new TerraformMetadata({
          metadata: {
            aws: JSON.parse(fs.readFileSync('tests/resources/metadata/container.json', 'utf8')),
          },
        }).getDefinitions();
        const parser = new TerraformParser(definitions);

        it('Should have valid tree', () => {
          const input = fs.readFileSync('tests/resources/tf/container.tf', 'utf8');
          const { components } = parser.parse([input]);

          expect(components.length).toEqual(1);
          expect(components[0].id).toEqual('parent');

          expect(components[0].children.length).toEqual(1);
          expect(components[0].children[0].id).toEqual('child');
        });
      });

      describe('Test parse: links', () => {
        const definitions = new TerraformMetadata({
          metadata: {
            aws: JSON.parse(fs.readFileSync('tests/resources/tf/link.json', 'utf8')),
          },
        }).getDefinitions();
        const parser = new TerraformParser(definitions);

        it('Should parse single default link', () => {
          const input = fs.readFileSync('tests/resources/tf/link_default_single.tf', 'utf8');

          expect(parser.parse([input]).links)
            .toEqual([new ComponentLink({
              source: 'parent_default_single_1',
              target: 'child_default_single_1',
              definition: new ComponentLinkDefinition({
                attributeRef: 'toChild',
                sourceRef: 'parent',
                targetRef: 'child',
                type: 'Default',
              }),
            })]);
        });

        it('Should parse multiple default links', () => {
          const input = fs.readFileSync('tests/resources/tf/link_default_multiple.tf', 'utf8');
          expect(parser.parse([input]).links)
            .toEqual([
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
              })]);
        });

        it('Should parse single reverse link', () => {
          const input = fs.readFileSync('tests/resources/tf/link_reverse_single.tf', 'utf8');
          expect(parser.parse([input]).links)
            .toEqual([new ComponentLink({
              source: 'parent_reverse_single_1',
              target: 'child_reverse_single_1',
              definition: new ComponentLinkDefinition({
                attributeRef: 'fromChild',
                sourceRef: 'child',
                targetRef: 'parent',
                type: 'Reverse',
              }),
            })]);
        });

        it('Should parse multiple reverse links', () => {
          const input = fs.readFileSync('tests/resources/tf/link_reverse_multiple.tf', 'utf8');
          expect(parser.parse([input]).links)
            .toEqual([
              new ComponentLink({
                source: 'parent_reverse_multiple_1',
                target: 'child_reverse_multiple_1',
                definition: new ComponentLinkDefinition({
                  attributeRef: 'fromChild',
                  sourceRef: 'child',
                  targetRef: 'parent',
                  type: 'Reverse',
                }),
              }),
              new ComponentLink({
                source: 'parent_reverse_multiple_1',
                target: 'child_reverse_multiple_2',
                definition: new ComponentLinkDefinition({
                  attributeRef: 'fromChild',
                  sourceRef: 'child',
                  targetRef: 'parent',
                  type: 'Reverse',
                }),
              })]);
        });
      });
    });
  });
});

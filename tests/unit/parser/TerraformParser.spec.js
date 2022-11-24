import fs from 'fs';
import TerraformParser from 'src/parser/TerraformParser';
import {
  Component,
  ComponentAttribute,
  ComponentAttributeDefinition,
  ComponentDefinition,
  ComponentLink,
  ComponentLinkDefinition,
  FileInformation,
  FileInput,
} from 'leto-modelizer-plugin-core';
import TerraformComponentDefinition from 'src/models/TerraformComponentDefinition';
import { getTerraformMetadata } from 'tests/resources/utils';

describe('Test TerraformParser', () => {
  describe('Test methods', () => {
    describe('Test method: hasParent', () => {
      const parser = new TerraformParser();

      it('Should return false on no definition', () => {
        expect(parser.hasParent(new Component())).toBeFalsy();
      });

      it('Should return false on no parent', () => {
        expect(parser.hasParent(new Component({
          definition: new ComponentDefinition({
            parentTypes: [],
          }),
        }))).toBeFalsy();
      });

      it('Should return false on no attribute with reference of parent', () => {
        expect(parser.hasParent(new Component({
          definition: new ComponentDefinition({
            parentTypes: ['parent1'],
          }),
          attributes: [new ComponentAttribute({
            name: 'test',
            value: 'test',
            definition: new ComponentAttributeDefinition({
              name: 'test',
              type: 'String',
            }),
          })],
        }))).toBeFalsy();
      });

      it('Should return true on attribute with reference of parent', () => {
        expect(parser.hasParent(new Component({
          definition: new ComponentDefinition({
            parentTypes: ['parent1'],
          }),
          attributes: [new ComponentAttribute({
            name: 'parentId',
            value: 'parent1',
            definition: new ComponentAttributeDefinition({
              name: 'parentId',
              type: 'Reference',
              containerRef: 'parent1',
            }),
          })],
        }))).toBeTruthy();
      });
    });

    describe('Test method: isParsable', () => {
      const parser = new TerraformParser();

      it('Should return true on terraform file', () => {
        expect(parser.isParsable(new FileInformation({
          path: './file.tf',
        }))).toBeTruthy();
      });

      it('Should return false on file that is not a terraform file', () => {
        expect(parser.isParsable(new FileInformation({
          path: './file.txt',
        }))).toBeFalsy();
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
      it('Test default parse', () => {
        const { pluginData } = getTerraformMetadata(
          'aws',
          'tests/resources/metadata/container.json',
        );
        const parser = new TerraformParser(pluginData);
        parser.parse();
        expect(parser.pluginData.components).toEqual([]);
        expect(parser.pluginData.parseErrors).toEqual([]);
      });

      describe('Test parse: app.tf', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'src/assets/metadata/aws.json',
        );
        metadata.parse();
        const parser = new TerraformParser(metadata.pluginData);

        it('Should have all elements in tf', () => {
          const input = new FileInput({
            path: './app.tf',
            content: fs.readFileSync('tests/resources/tf/app.tf', 'utf8'),
          });
          parser.parse([input]);
          expect(parser.pluginData.components).toEqual([
            new Component({
              id: 'aws',
              name: 'aws',
              path: './app.tf',
              definition: new TerraformComponentDefinition({
                type: 'aws',
                provider: 'aws',
                blockType: 'provider',
                icon: 'aws',
                model: 'DefaultModel',
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
              path: './app.tf',
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
              path: './app.tf',
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
              path: './app.tf',
              definition: new TerraformComponentDefinition({
                blockType: 'resource',
                provider: 'aws',
                type: 'aws_route53_zone',
                icon: 'Aws_Route-53-Hosted-Zone',
                model: 'DefaultContainer',
                isContainer: true,
                childrenTypes: ['aws_route53_record'],
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
                new ComponentAttribute({
                  name: 'image_id',
                  value: null,
                  type: 'String',
                  definition: null,
                }),
                new ComponentAttribute({
                  name: 'position',
                  value: 1,
                  type: 'Number',
                  definition: null,
                }),
              ],
            }),
            new Component({
              id: 'image_id',
              name: 'image_id',
              path: './app.tf',
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
        const metadata = getTerraformMetadata(
          'aws',
          'tests/resources/metadata/container.json',
        );
        metadata.parse();
        const parser = new TerraformParser(metadata.pluginData);

        it('Should have valid tree', () => {
          const input = new FileInput({
            path: './container.tf',
            content: fs.readFileSync('tests/resources/tf/container.tf', 'utf8'),
          });
          parser.parse([input]);

          expect(parser.pluginData.components.length).toEqual(1);
          expect(parser.pluginData.components[0].id).toEqual('parent');

          expect(parser.pluginData.components[0].children.length).toEqual(1);
          expect(parser.pluginData.components[0].children[0].id).toEqual('child');
        });
      });

      describe('Test parse: links', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'tests/resources/tf/link.json',
        );
        metadata.parse();
        metadata.pluginData.initLinkDefinitions();
        const parser = new TerraformParser(metadata.pluginData);

        it('Should parse single default link', () => {
          const input = new FileInput({
            path: './link_default_single.tf',
            content: fs.readFileSync('tests/resources/tf/link_default_single.tf', 'utf8'),
          });
          parser.parse([input]);

          expect(parser.pluginData.getLinks())
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
          const input = new FileInput({
            path: './link_default_multiple.tf',
            content: fs.readFileSync('tests/resources/tf/link_default_multiple.tf', 'utf8'),
          });
          parser.parse([input]);

          expect(parser.pluginData.getLinks())
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
          const input = new FileInput({
            path: './link_reverse_single.tf',
            content: fs.readFileSync('tests/resources/tf/link_reverse_single.tf', 'utf8'),
          });
          parser.parse([input]);

          expect(parser.pluginData.getLinks())
            .toEqual([new ComponentLink({
              source: 'parent_reverse_single_1',
              target: 'child_reverse_single_1',
              definition: new ComponentLinkDefinition({
                attributeRef: 'fromChild',
                sourceRef: 'parent',
                targetRef: 'child',
                type: 'Reverse',
              }),
            })]);
        });

        it('Should parse multiple reverse links', () => {
          const input = new FileInput({
            path: './link_reverse_multiple.tf',
            content: fs.readFileSync('tests/resources/tf/link_reverse_multiple.tf', 'utf8'),
          });
          parser.parse([input]);

          expect(parser.pluginData.getLinks())
            .toEqual([
              new ComponentLink({
                source: 'parent_reverse_multiple_1',
                target: 'child_reverse_multiple_1',
                definition: new ComponentLinkDefinition({
                  attributeRef: 'fromChild',
                  sourceRef: 'parent',
                  targetRef: 'child',
                  type: 'Reverse',
                }),
              }),
              new ComponentLink({
                source: 'parent_reverse_multiple_1',
                target: 'child_reverse_multiple_2',
                definition: new ComponentLinkDefinition({
                  attributeRef: 'fromChild',
                  sourceRef: 'parent',
                  targetRef: 'child',
                  type: 'Reverse',
                }),
              })]);
        });
      });
    });
  });
});

import fs from 'fs';
import TerraformParser from 'src/parser/TerraformParser';
import {
  Component,
  ComponentAttributeDefinition,
  ComponentLink,
  ComponentLinkDefinition,
  FileInformation,
  FileInput,
} from 'leto-modelizer-plugin-core';
import TerraformComponentDefinition from 'src/models/TerraformComponentDefinition';
import { getTerraformMetadata } from 'tests/resources/utils';
import TerraformComponentAttribute from 'src/models/TerraformComponentAttribute';

describe('Test TerraformParser', () => {
  describe('Test methods', () => {
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
              id: 'aws_1',
              name: null,
              path: './app.tf',
              definition: new TerraformComponentDefinition({
                type: 'aws',
                provider: 'aws',
                blockType: 'provider',
                icon: 'aws',
                model: 'DefaultModel',
                displayName: 'AWS provider',
                description: 'Amazon Web Services (AWS) provider',
                url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs',
                definedAttributes: [new ComponentAttributeDefinition({
                  name: 'region',
                  type: 'String',
                  required: true,
                  displayName: 'Region',
                  description: 'AWS service endpoints',
                  url: 'https://docs.aws.amazon.com/general/latest/gr/rande.html',
                })],
              }),
              attributes: [
                new TerraformComponentAttribute({
                  name: 'access_key',
                  type: 'String',
                  value: 'ABCD1234J54PXLDF4IC4WMVA',
                }),
                new TerraformComponentAttribute({
                  name: 'secret_key',
                  type: 'String',
                  value: '28prpojfngldfgPcgiv79Q/J+8o7ksdfsTjmmE2QQBRa',
                }),
                new TerraformComponentAttribute({
                  name: 'region',
                  type: 'String',
                  value: 'eu-west-3',
                  definition: new ComponentAttributeDefinition({
                    name: 'region',
                    type: 'String',
                    required: true,
                    displayName: 'Region',
                    description: 'AWS service endpoints',
                    url: 'https://docs.aws.amazon.com/general/latest/gr/rande.html',
                  }),
                }),
              ],
            }),
            new Component({
              name: null,
              id: 'server_1',
              path: './app.tf',
              definition: new TerraformComponentDefinition({
                blockType: 'module',
                provider: 'aws',
                icon: 'Aws_Servers',
                type: 'server',
                model: 'DefaultModel',
              }),
              attributes: [new TerraformComponentAttribute({
                name: 'source',
                type: 'String',
                value: '../modules/server',
              })],
            }),
            new Component({
              name: null,
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
                new TerraformComponentAttribute({
                  name: 'filter',
                  type: 'Object',
                  isDynamic: true,
                  value: [
                    new TerraformComponentAttribute({
                      name: 'name',
                      type: 'String',
                      value: 'state',
                    }),
                    new TerraformComponentAttribute({
                      name: 'values',
                      type: 'Array',
                      value: ['available'],
                    }),
                  ],
                }),
                new TerraformComponentAttribute({
                  name: 'most_recent',
                  value: true,
                  type: 'Boolean',
                }),
              ],
            }),
            new Component({
              name: null,
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
                new TerraformComponentAttribute({
                  name: 'name',
                  value: 'aws.domaine.fr',
                  type: 'String',
                  definition: new ComponentAttributeDefinition({
                    name: 'name',
                    type: 'String',
                    required: true,
                  }),
                }),
                new TerraformComponentAttribute({
                  name: 'image_id',
                  value: null,
                  type: 'String',
                  definition: null,
                }),
                new TerraformComponentAttribute({
                  name: 'position',
                  value: 1,
                  type: 'Number',
                  definition: null,
                }),
              ],
            }),
            new Component({
              id: 'image_id',
              name: null,
              path: './app.tf',
              definition: new TerraformComponentDefinition({
                blockType: 'variable',
                provider: 'aws',
                type: 'image_id',
                icon: 'variable',
                model: 'DefaultModel',
              }),
              attributes: [new TerraformComponentAttribute({
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

          expect(parser.pluginData.components.length).toEqual(2);
          expect(parser.pluginData.components[0].id).toEqual('parent');
          expect(parser.pluginData.components[1].id).toEqual('child');
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

      it('Should parsing object inside object, https://github.com/ditrit/terrator-plugin/issues/41', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'src/assets/metadata/aws.json',
        );
        metadata.parse();
        metadata.pluginData.initLinkDefinitions();
        const parser = new TerraformParser(metadata.pluginData);
        const input = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/bug41_subObject.tf', 'utf8'),
        });

        parser.parse([input]);

        expect(metadata.pluginData.components).toEqual([
          new Component({
            id: 'web',
            name: null,
            path: 'new_file.tf',
            definition: metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_ami'),
            attributes: [
              new TerraformComponentAttribute({
                name: 'filter',
                type: 'Object',
                isDynamic: true,
                value: [
                  new TerraformComponentAttribute({
                    name: 'name',
                    type: 'String',
                    value: 'state',
                  }),
                  new TerraformComponentAttribute({
                    name: 'test',
                    type: 'Object',
                    isDynamic: true,
                    value: [
                      new TerraformComponentAttribute({
                        name: 'value',
                        type: 'Number',
                        value: 8,
                      }),
                      new TerraformComponentAttribute({
                        name: 'test2',
                        type: 'Object',
                        isDynamic: true,
                        value: [
                          new TerraformComponentAttribute({
                            name: 'value',
                            type: 'Number',
                            value: 9,
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ]);
      });

      it('Should fix file content null, https://github.com/ditrit/terrator-plugin/issues/43', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'src/assets/metadata/aws.json',
        );
        metadata.parse();
        metadata.pluginData.initLinkDefinitions();
        const parser = new TerraformParser(metadata.pluginData);
        const input = new FileInput({
          path: 'new_file.tf',
          content: null,
        });

        let exception = null;
        try {
          parser.parse([input]);
        } catch (e) {
          exception = e;
        }

        expect(exception).toBeNull();
      });

      it('Should fix missing attribute definition for an object, https://github.com/ditrit/terrator-plugin/issues/48', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'src/assets/metadata/aws.json',
        );
        metadata.parse();
        metadata.pluginData.initLinkDefinitions();
        const parser = new TerraformParser(metadata.pluginData);
        const input = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/bug48_objectAttributeDefinition.tf', 'utf8'),
        });

        parser.parse([input]);

        const awsElbDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_elb');
        const listenerAttributeDefinition = awsElbDefinition.definedAttributes.find(({ name }) => name === 'listener');
        const lbPortAttributeDefinition = listenerAttributeDefinition.definedAttributes.find(({ name }) => name === 'lb_port');

        expect(metadata.pluginData.components).toEqual([
          new Component({
            id: 'aws_elb_620fea2f',
            name: null,
            path: 'new_file.tf',
            definition: awsElbDefinition,
            attributes: [
              new TerraformComponentAttribute({
                name: 'listener',
                type: 'Object',
                definition: listenerAttributeDefinition,
                isDynamic: true,
                value: [
                  new TerraformComponentAttribute({
                    name: 'lb_port',
                    type: 'Number',
                    definition: lbPortAttributeDefinition,
                    value: 404,
                  }),
                  new TerraformComponentAttribute({
                    name: 'value',
                    type: 'String',
                    value: 'test',
                  }),
                ],
              }),
              new TerraformComponentAttribute({
                name: 'test',
                type: 'Object',
                isDynamic: true,
                value: [
                  new TerraformComponentAttribute({
                    name: 'value',
                    type: 'Number',
                    value: 1,
                  }),
                ],
              }),
            ],
          }),
        ]);
      });

      it('Should parse the tag attribute as a key/value list', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'src/assets/metadata/aws.json',
        );
        metadata.parse();
        metadata.pluginData.initLinkDefinitions();
        const parser = new TerraformParser(metadata.pluginData);
        const input = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/complex_field.tf', 'utf8'),
        });

        parser.parse([input]);

        const awsSecGroupDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_security_group');

        const tagsAttributeDefinition = awsSecGroupDefinition.definedAttributes.find(({ name }) => name === 'tags');

        const egressAttributeDefinition = awsSecGroupDefinition.definedAttributes.find(({ name }) => name === 'egress');
        
        expect(metadata.pluginData.components).toEqual([
          new Component({
            id: 'test_secgroup',
            name: null,
            path: 'new_file.tf',
            definition: awsSecGroupDefinition,
            attributes: [
              new TerraformComponentAttribute({
                name: 'egress',
                type: 'Object',
                definition: egressAttributeDefinition,
                isDynamic: true,
                value: [
                  new TerraformComponentAttribute({
                    name: 'from_port',
                    type: 'Number',
                    value: 0,
                  }),
                  new TerraformComponentAttribute({
                    name: 'to_port',
                    type: 'Number',
                    value: 0,
                  })
                ]
              }),
              new TerraformComponentAttribute({
                name: 'tags',
                type: 'Object',
                definition: tagsAttributeDefinition,
                value: [
                  new TerraformComponentAttribute({
                    name: 'Environment',
                    type: 'String',
                    value: 'Test',
                  }),
                  new TerraformComponentAttribute({
                    name: 'Name',
                    type: 'String',
                    value: 'test Secgroup',
                  }),
                ],
              }),
            ],
          }),
        ]);
      });
    });

    it('Should parse an empty resource', () => {
      const metadata = getTerraformMetadata(
        'aws',
        'src/assets/metadata/aws.json',
      );
      metadata.parse();
      metadata.pluginData.initLinkDefinitions();
      const parser = new TerraformParser(metadata.pluginData);
      const input = new FileInput({
        path: 'new_file.tf',
        content: fs.readFileSync('tests/resources/tf/empty_resource.tf', 'utf8'),
      });

      parser.parse([input]);

      const instanceDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_instance');
        
      expect(metadata.pluginData.components).toEqual([
        new Component({
          id: 'instance',
          name: null,
          path: 'new_file.tf',
          definition: instanceDefinition
        }),
      ]);
    });
    it('Should parse a resource containing attributes and blocks', () => {
      const metadata = getTerraformMetadata(
        'aws',
        'src/assets/metadata/aws.json',
      );
      metadata.parse();
      metadata.pluginData.initLinkDefinitions();
      const parser = new TerraformParser(metadata.pluginData);
      const input = new FileInput({
        path: 'new_file.tf',
        content: fs.readFileSync('tests/resources/tf/attributes_and_blocks.tf', 'utf8'),
      });

      parser.parse([input]);

      const awsSecGroupDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_security_group');
      const nameAttributeDefinition = awsSecGroupDefinition.definedAttributes.find(({ name }) => name === 'name');
      const descriptionAttributeDefinition = awsSecGroupDefinition.definedAttributes.find(({ name }) => name === 'description');
      const egressAttributeDefinition = awsSecGroupDefinition.definedAttributes.find(({ name }) => name === 'egress');
      const tagsAttributeDefinition = awsSecGroupDefinition.definedAttributes.find(({ name }) => name === 'tags');

      expect(metadata.pluginData.components).toEqual([
        new Component({
          id: 'allow_all',
          name: null,
          path: 'new_file.tf',
          definition: awsSecGroupDefinition,
          attributes: [
            new TerraformComponentAttribute({
              name: 'name',
              type: 'String',
              definition: nameAttributeDefinition,
              value: 'allow_all',
            }),
            new TerraformComponentAttribute({
              name: 'description',
              type: 'String',
              definition: descriptionAttributeDefinition,
              value: 'Allow all inbound traffic',
            }),
            new TerraformComponentAttribute({
              name: 'ingress',
              type: 'Object',
              isDynamic: true,
              value: [
                new TerraformComponentAttribute({
                  name: 'from_port',
                  type: 'Number',
                  value: 0,
                }),
                new TerraformComponentAttribute({
                  name: 'to_port',
                  type: 'Number',
                  value: 0,
                }),
                new TerraformComponentAttribute({
                  name: 'protocol',
                  type: 'String',
                  value: '-1',
                }),
              ]
            }),
            new TerraformComponentAttribute({
              name: 'egress',
              type: 'Object',
              definition: egressAttributeDefinition,
              isDynamic: true,
              value: [
                new TerraformComponentAttribute({
                  name: 'from_port',
                  type: 'Number',
                  value: 0,
                }),
                new TerraformComponentAttribute({
                  name: 'to_port',
                  type: 'Number',
                  value: 0,
                }),
                new TerraformComponentAttribute({
                  name: 'protocol',
                  type: 'String',
                  value: '-1',
                }),
              ]
            }),
            new TerraformComponentAttribute({
              name: 'tags',
              type: 'Object',
              definition: tagsAttributeDefinition,
              isDynamic: false,
              value: [
                new TerraformComponentAttribute({
                  name: 'Terraform',
                  type: 'Boolean',
                  value: true,
                }),
              ],
            }),
          ]
        }),
      ]);
    });

    it('Should parse a resource with 2 blocks with the same name but different types', () => {
      const metadata = getTerraformMetadata(
        'aws',
        'src/assets/metadata/aws.json',
      );
      metadata.parse();
      metadata.pluginData.initLinkDefinitions();
      const parser = new TerraformParser(metadata.pluginData);
      const input = new FileInput({
        path: 'new_file.tf',
        content: fs.readFileSync('tests/resources/tf/double_tags.tf', 'utf8'),
      });

      const instanceDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_instance')

      parser.parse([input]);
      expect(parser.pluginData.components).toEqual([
        new Component({
          id: 'test',
          name: null,
          path: 'new_file.tf',
          definition: instanceDefinition,
          attributes: [
            new TerraformComponentAttribute({
              name: 'tags',
              type: 'Object',
              isDynamic: true,
              value: [
                new TerraformComponentAttribute({
                  name: 'name',
                  type: 'String',
                  value: 'test',
                }),
                new TerraformComponentAttribute({
                  name: 'value',
                  type: 'Number',
                  value: 50,
                }),
              ]
            }),
            new TerraformComponentAttribute({
              name: 'tags',
              type: 'Object',
              isDynamic: false,
              value: [
                new TerraformComponentAttribute({
                  name: 'name',
                  type: 'String',
                  value: 'test2',
                }),
                new TerraformComponentAttribute({
                  name: 'value',
                  type: 'Number',
                  value: 60,
                }),
              ]
            }),
          ]
        }),
      ]);
    });

    it('Should throw an error when parsing a resource with an invalid body syntax', () => {
      const metadata = getTerraformMetadata(
        'aws',
        'src/assets/metadata/aws.json',
      );
      metadata.parse();
      metadata.pluginData.initLinkDefinitions();
      const parser = new TerraformParser(metadata.pluginData);
      const input = new FileInput({
        path: 'new_file.tf',
        content: fs.readFileSync('tests/resources/tf/wrong_body.tf', 'utf8'),
      });

      // Expect the parser to log an error to the console
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
      parser.parse([input]);
      expect(spy).toHaveBeenCalled();
      
    });
  });
});

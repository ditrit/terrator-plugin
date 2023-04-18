import { Component } from 'leto-modelizer-plugin-core';
import TerraformComponentAttribute from 'src/models/TerraformComponentAttribute';
import { getTerraformMetadata } from 'tests/resources/utils';

const metadata = getTerraformMetadata(
  'aws',
  'tests/resources/metadata/bug67_missingDefinitionOnAttribute.json',
);
metadata.parse();

const awsElbDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_elb');
const listenerAttributeDefinition = awsElbDefinition.definedAttributes.find(({ name }) => name === 'listener');
const instancePortAttributeDefinition = listenerAttributeDefinition.definedAttributes.find(({ name }) => name === 'instance_port');

const resourceaDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'resourcea');
const resourceaListenerAttributeDefinition = resourceaDefinition.definedAttributes.find(({ name }) => name === 'listener');

const resourceaListenerInstancePortAttributeDefinition = resourceaListenerAttributeDefinition.definedAttributes.find(({ name }) => name === 'instance_port');
const resourceaListenerOtherObjectAttributeDefinition = resourceaListenerAttributeDefinition.definedAttributes.find(({ name }) => name === 'otherObject');
const resourceaListenerOtherObjectOtherAttributeAttributeDefinition = resourceaListenerOtherObjectAttributeDefinition.definedAttributes.find(({ name }) => name === 'otherAttribute')

export default [
  new Component({
    id: 'aws_elb_1',
    name: null,
    path: 'new_file.tf',
    definition: awsElbDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'listener',
        type: 'Object',
        definition: listenerAttributeDefinition,
        value: [
          new TerraformComponentAttribute({
            name: 'instance_port',
            type: 'String',
            value: '1',
            definition: instancePortAttributeDefinition,
          }),
        ],
      }),
    ],
  }),
  new Component({
    id: 'b',
    name: null,
    path: 'new_file.tf',
    definition: resourceaDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'listener',
        type: 'Object',
        definition: resourceaListenerAttributeDefinition,
        value: [
          new TerraformComponentAttribute({
            name: 'instance_port',
            type: 'Number',
            value: 1,
            definition: resourceaListenerInstancePortAttributeDefinition,
          }),
          new TerraformComponentAttribute({
            name: 'otherObject',
            type: 'Object',
            definition: resourceaListenerOtherObjectAttributeDefinition,
            value: [
              new TerraformComponentAttribute({
                name: 'otherAttribute',
                type: 'Number',
                value: 2,
                definition: resourceaListenerOtherObjectOtherAttributeAttributeDefinition,
              }),
            ]
          }),
        ]
      }),
    ],
  }),
];

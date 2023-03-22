import { Component } from 'leto-modelizer-plugin-core';
import TerraformComponentAttribute from 'src/models/TerraformComponentAttribute';
import { getTerraformMetadata } from 'tests/resources/utils';

const metadata = getTerraformMetadata(
  'aws',
  'src/assets/metadata/aws.json',
);
metadata.parse();

const awsElbDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_elb');
const listenerAttributeDefinition = awsElbDefinition.definedAttributes.find(({ name }) => name === 'listener');
const lbPortAttributeDefinition = listenerAttributeDefinition.definedAttributes.find(({ name }) => name === 'lb_port');

export default [
  new Component({
    id: 'aws_elb_620fea2f',
    name: null,
    path: 'new_file.tf',
    definition: awsElbDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'listener',
        type: 'Object',
        isDynamic: true,
        definition: listenerAttributeDefinition,
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
];

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
const instancePortAttributeDefinition = awsElbDefinition.definedAttributes.find(({ name }) => name === 'instance_port');

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
];

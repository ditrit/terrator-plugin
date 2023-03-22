import { Component } from 'leto-modelizer-plugin-core';
import TerraformComponentAttribute from 'src/models/TerraformComponentAttribute';
import { getTerraformMetadata } from 'tests/resources/utils';

const metadata = getTerraformMetadata(
  'aws',
  'src/assets/metadata/aws.json',
);
metadata.parse();

const awsSecGroupDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_security_group');
const egressAttributeDefinition = awsSecGroupDefinition.definedAttributes.find(({ name }) => name === 'egress');
const tagsAttributeDefinition = awsSecGroupDefinition.definedAttributes.find(({ name }) => name === 'tags');

export default [
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
          }),
        ],
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
];

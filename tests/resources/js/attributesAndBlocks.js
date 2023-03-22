import { Component } from 'leto-modelizer-plugin-core';
import TerraformComponentAttribute from 'src/models/TerraformComponentAttribute';
import { getTerraformMetadata } from 'tests/resources/utils';

const metadata = getTerraformMetadata(
  'aws',
  'src/assets/metadata/aws.json',
);
metadata.parse();

const awsSecGroupDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_security_group');
const nameAttributeDefinition = awsSecGroupDefinition.definedAttributes.find(({ name }) => name === 'name');
const descriptionAttributeDefinition = awsSecGroupDefinition.definedAttributes.find(({ name }) => name === 'description');
const egressAttributeDefinition = awsSecGroupDefinition.definedAttributes.find(({ name }) => name === 'egress');
const tagsAttributeDefinition = awsSecGroupDefinition.definedAttributes.find(({ name }) => name === 'tags');

export default [
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
        ],
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
        ],
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
    ],
  }),
];

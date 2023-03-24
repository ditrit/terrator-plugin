import { Component } from 'leto-modelizer-plugin-core';
import TerraformComponentAttribute from 'src/models/TerraformComponentAttribute';
import { getTerraformMetadata } from 'tests/resources/utils';

const metadata = getTerraformMetadata(
  'aws',
  'src/assets/metadata/aws.json',
);
metadata.parse();

const instanceDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_instance');

export default [
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
        ],
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
        ],
      }),
    ],
  }),
];

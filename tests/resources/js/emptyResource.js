import { Component } from 'leto-modelizer-plugin-core';
import { getTerraformMetadata } from 'tests/resources/utils';

const metadata = getTerraformMetadata(
  'aws',
  'src/assets/metadata/aws.json',
);
metadata.parse();

const instanceDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_instance');

export default [
  new Component({
    id: 'instance',
    name: null,
    path: 'new_file.tf',
    definition: instanceDefinition,
  }),
];

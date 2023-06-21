import { Component } from 'leto-modelizer-plugin-core';
import TerraformComponentAttribute from 'src/models/TerraformComponentAttribute';
import { getTerraformMetadata } from 'tests/resources/utils';

const metadata = getTerraformMetadata(
  'aws',
  'src/assets/metadata/aws.json',
);
metadata.parse();

const awsSecurityGroupDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_security_group');
const awsVpcDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_vpc');
const vpcIdAttributeDefinition = awsSecurityGroupDefinition.definedAttributes.find(({ name }) => name === 'vpc_id');

export default [
  new Component({
    id: 'aws_security_group_1',
    name: null,
    path: 'bug78_emptyListAttribute.tf',
    definition: awsSecurityGroupDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'vpc_id',
        type: 'Array',
        definition: vpcIdAttributeDefinition,
        value: [],
      }),
    ],
  }),
  new Component({
    id: 'aws_vpc_1',
    name: null,
    path: 'bug78_emptyListAttribute.tf',
    definition: awsVpcDefinition,
  }),
];

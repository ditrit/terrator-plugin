import { Component, ComponentLink, ComponentLinkDefinition } from 'leto-modelizer-plugin-core';
import TerraformComponentAttribute from 'src/models/TerraformComponentAttribute';
import { getTerraformMetadata } from 'tests/resources/utils';

const metadata = getTerraformMetadata(
  'aws',
  'src/assets/metadata/aws.json',
);
metadata.parse();

const awsSecGroupDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_security_group');

const awsDbInstanceDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_db_instance');
const awsDbInstanceVpcSecurityGroupsAttributeDefinition = awsDbInstanceDefinition.definedAttributes.find(({ name }) => name === 'vpc_security_group_ids');

export const multipleLinks = [
  new Component({
    id: 'security_group_1',
    name: null,
    path: 'new_file.tf',
    definition: awsSecGroupDefinition,
  }),
  new Component({
    id: 'security_group_2',
    name: null,
    path: 'new_file.tf',
    definition: awsSecGroupDefinition,
  }),
  new Component({
    id: 'db_instance',
    name: null,
    path: 'new_file.tf',
    definition: awsDbInstanceDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'vpc_security_group_ids',
        type: 'Array',
        value: ['aws_security_group.security_group_1.id', 'aws_security_group.security_group_2.id'],
        definition: awsDbInstanceVpcSecurityGroupsAttributeDefinition,
      }),
    ],
  }),
];

export const multipleLinksLinks = [
  new ComponentLink({
    source: 'db_instance',
    target: 'security_group_1',
    definition: new ComponentLinkDefinition({
      attributeRef: 'vpc_security_group_ids',
      sourceRef: 'aws_db_instance',
      targetRef: 'aws_security_group',
      type: 'Default',
    }),
  }),
  new ComponentLink({
    source: 'db_instance',
    target: 'security_group_2',
    definition: new ComponentLinkDefinition({
      attributeRef: 'vpc_security_group_ids',
      sourceRef: 'aws_db_instance',
      targetRef: 'aws_security_group',
      type: 'Default',
    }),
  }),
];

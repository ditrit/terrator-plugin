import { ComponentLink, ComponentLinkDefinition } from 'leto-modelizer-plugin-core';
import TerraformComponent from 'src/models/TerraformComponent';
import TerraformComponentAttribute from 'src/models/TerraformComponentAttribute';
import { getTerraformMetadata } from 'tests/resources/utils';

const metadata = getTerraformMetadata(
  'aws',
  'src/assets/metadata/aws.json',
);
metadata.parse();

const dbSubnetGroupDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_db_subnet_group');
const nameAttributeDefinition = dbSubnetGroupDefinition.definedAttributes.find(({ name }) => name === 'name');
const awsDbDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_db_instance');
const awsDbSubnetGroupNameAttributeDefinition = awsDbDefinition.definedAttributes.find(({ name }) => name === 'db_subnet_group_name');

export const nameReference = [
  new TerraformComponent({
    id: 'db_subnet_group',
    name: null,
    path: 'new_file.tf',
    definition: dbSubnetGroupDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'name',
        type: 'String',
        value: 'Group',
        definition: nameAttributeDefinition,
      }),
    ],
  }),
  new TerraformComponent({
    id: 'db',
    name: null,
    path: 'new_file.tf',
    definition: awsDbDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'db_subnet_group_name',
        type: 'Array',
        value: ['db_subnet_group'],
        definition: awsDbSubnetGroupNameAttributeDefinition,
      }),
    ],
  }),
];

export const nameReferenceLink = [
  new ComponentLink({
    source: 'db',
    target: 'db_subnet_group',
    definition: new ComponentLinkDefinition({
      attributeRef: 'db_subnet_group_name',
      sourceRef: 'aws_db_instance',
      targetRef: 'aws_db_subnet_group',
      type: 'Default',
    }),
  }),
];

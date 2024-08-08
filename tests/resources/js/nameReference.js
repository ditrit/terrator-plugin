import { ComponentLink, ComponentLinkDefinition } from '@ditrit/leto-modelizer-plugin-core';
import TerraformComponent from 'src/models/TerraformComponent';
import TerraformComponentAttribute from 'src/models/TerraformComponentAttribute';
import TerraformMetadata from 'src/metadata/TerraformMetadata';
import TerraformData from 'src/models/TerraformData';

const metadata = new TerraformMetadata(new TerraformData());
metadata.parse();

const dbSubnetGroupDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_db_subnet_group');
const nameAttributeDefinition = dbSubnetGroupDefinition.definedAttributes.find(({ name }) => name === 'name');
const awsDbDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_db_instance');
const awsDbSubnetGroupNameAttributeDefinition = awsDbDefinition.definedAttributes.find(({ name }) => name === 'db_subnet_group_name');

export const nameReference = [
  new TerraformComponent({
    id: 'id_1',
    externalId: 'db_subnet_group',
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
    id: 'id_2',
    externalId: 'db',
    name: null,
    path: 'new_file.tf',
    definition: awsDbDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'db_subnet_group_name',
        type: 'Array',
        value: ['id_1'],
        definition: awsDbSubnetGroupNameAttributeDefinition,
      }),
    ],
  }),
];

export const nameReferenceLink = [
  new ComponentLink({
    source: 'id_2',
    target: 'id_1',
    definition: new ComponentLinkDefinition({
      attributeRef: 'db_subnet_group_name',
      sourceRef: 'aws_db_instance',
      targetRef: 'aws_db_subnet_group',
      type: 'Default',
      model: 'defaultLink',
    }),
  }),
];

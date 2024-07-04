import TerraformComponent from 'src/models/TerraformComponent';
import TerraformComponentAttribute from 'src/models/TerraformComponentAttribute';
import TerraformMetadata from 'src/metadata/TerraformMetadata';
import TerraformData from 'src/models/TerraformData';

const metadata = new TerraformMetadata(new TerraformData());
metadata.parse();

const awsVpcDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_vpc');

const awsSubnetDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_subnet');

const vpcIdDefinition = awsSubnetDefinition.definedAttributes.find(({ name }) => name === 'vpc_id');

const awsDbSubnetGroupDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_db_subnet_group');
const subnetIdsAttributeDefinition = awsDbSubnetGroupDefinition.definedAttributes.find(({ name }) => name === 'subnet_ids');

export default [
  new TerraformComponent({
    id: 'id_1',
    externalId: 'vpc_test',
    name: null,
    path: 'new_file.tf',
    definition: awsVpcDefinition,
  }),
  new TerraformComponent({
    id: 'id_2',
    externalId: 'subnet1',
    name: null,
    path: 'new_file.tf',
    definition: awsSubnetDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'vpc_id',
        type: 'String',
        value: 'id_1',
        definition: vpcIdDefinition,
      }),
    ],
  }),
  new TerraformComponent({
    id: 'id_3',
    externalId: 'subnet2',
    name: null,
    path: 'new_file.tf',
    definition: awsSubnetDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'vpc_id',
        type: 'String',
        value: 'id_1',
        definition: vpcIdDefinition,
      }),
    ],
  }),
  new TerraformComponent({
    id: 'id_4',
    externalId: 'db_subnet_group',
    name: null,
    path: 'new_file.tf',
    definition: awsDbSubnetGroupDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'subnet_ids',
        type: 'Array',
        value: ['id_2', 'id_3'],
        definition: subnetIdsAttributeDefinition,
      }),
    ],
  }),
];

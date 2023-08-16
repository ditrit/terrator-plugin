import TerraformComponent from 'src/models/TerraformComponent';
import TerraformComponentAttribute from 'src/models/TerraformComponentAttribute';
import { getTerraformMetadata } from 'tests/resources/utils';

const metadata = getTerraformMetadata(
  'aws',
  'src/assets/metadata/aws.json',
);
metadata.parse();

const awsVpcDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_vpc');

const awsSubnetDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_subnet');

const vpcIdDefinition = awsSubnetDefinition.definedAttributes.find(({ name }) => name === 'vpc_id');

const awsDbSubnetGroupDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_db_subnet_group');
const subnetIdsAttributeDefinition = awsDbSubnetGroupDefinition.definedAttributes.find(({ name }) => name === 'subnet_ids');

export default [
  new TerraformComponent({
    id: 'vpc_test',
    name: null,
    path: 'new_file.tf',
    definition: awsVpcDefinition,
  }),
  new TerraformComponent({
    id: 'subnet1',
    name: null,
    path: 'new_file.tf',
    definition: awsSubnetDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'vpc_id',
        type: 'String',
        value: 'aws_vpc.vpc_test.id',
        definition: vpcIdDefinition,
      }),
    ],
  }),
  new TerraformComponent({
    id: 'subnet2',
    name: null,
    path: 'new_file.tf',
    definition: awsSubnetDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'vpc_id',
        type: 'String',
        value: 'aws_vpc.vpc_test.id',
        definition: vpcIdDefinition,
      }),
    ],
  }),
  new TerraformComponent({
    id: 'db_subnet_group',
    name: null,
    path: 'new_file.tf',
    definition: awsDbSubnetGroupDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'subnet_ids',
        type: 'Array',
        value: ['aws_subnet.subnet1.id', 'aws_subnet.subnet2.id'],
        definition: subnetIdsAttributeDefinition,
      }),
    ],
  }),
];

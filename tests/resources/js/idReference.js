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

export default [
  new TerraformComponent({
    id: 'id_1',
    externalId: 'vpc',
    name: null,
    path: 'new_file.tf',
    definition: awsVpcDefinition,
  }),
  new TerraformComponent({
    id: 'id_2',
    externalId: 'subnet',
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
];

import TerraformComponent from 'src/models/TerraformComponent';
import TerraformComponentAttribute from 'src/models/TerraformComponentAttribute';
import { getTerraformMetadata } from 'tests/resources/utils';

const metadata = getTerraformMetadata(
  'aws',
  'src/assets/metadata/aws.json',
);
metadata.parse();

const awsSubnetDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_subnet');
const availabilityZoneDefinition = awsSubnetDefinition.definedAttributes.find(({ name }) => name === 'availability_zone');

export default [
  new TerraformComponent({
    id: 'id_1',
    externalId: 'subnet',
    name: null,
    path: 'new_file.tf',
    definition: awsSubnetDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'availability_zone',
        type: 'String',
        value: 'data.availability_zones.available.names[0]',
        definition: availabilityZoneDefinition,
      }),
    ],
  }),
];

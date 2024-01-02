import TerraformComponent from 'src/models/TerraformComponent';
import { getTerraformMetadata } from 'tests/resources/utils';

const metadata = getTerraformMetadata(
  'aws',
  'src/assets/metadata/aws.json',
);
metadata.parse();

const instanceDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_instance');

export default [
  new TerraformComponent({
    id: 'id_1',
    externalId: 'instance',
    name: null,
    path: 'new_file.tf',
    definition: instanceDefinition,
  }),
];

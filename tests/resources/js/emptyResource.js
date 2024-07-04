import TerraformComponent from 'src/models/TerraformComponent';
import TerraformMetadata from 'src/metadata/TerraformMetadata';
import TerraformData from 'src/models/TerraformData';

const metadata = new TerraformMetadata(new TerraformData());
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

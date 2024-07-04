import TerraformComponent from 'src/models/TerraformComponent';

import TerraformComponentAttribute from 'src/models/TerraformComponentAttribute';
import TerraformVariable from 'src/models/TerraformVariable';
import TerraformMetadata from 'src/metadata/TerraformMetadata';
import TerraformData from 'src/models/TerraformData';

const metadata = new TerraformMetadata(new TerraformData());
metadata.parse();

const awsDbInstanceDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_db_instance');
const dbInstanceClassArgumentDefinition = awsDbInstanceDefinition.definedAttributes.find(({ name }) => name === 'instance_class');

export const localReference = [
  new TerraformVariable({
    name: 'instance_class',
    value: 'db.t3.micro',
    category: 'local',
    path: 'new_file.tf',
    type: 'string',
  }),
];

export const localComponentReference = [
  new TerraformComponent({
    name: null,
    id: 'id_1',
    externalId: 'database',
    path: 'new_file.tf',
    definition: awsDbInstanceDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'instance_class',
        type: 'String',
        value: 'local.instance_class',
        definition: dbInstanceClassArgumentDefinition,
      }),
    ],
  }),
];

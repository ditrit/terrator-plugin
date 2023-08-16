import TerraformComponent from 'src/models/TerraformComponent';

import TerraformComponentAttribute from 'src/models/TerraformComponentAttribute';
import { getTerraformMetadata } from 'tests/resources/utils';
import TerraformVariable from 'src/models/TerraformVariable';

const metadata = getTerraformMetadata(
  'aws',
  'src/assets/metadata/aws.json',
);
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
    id: 'database',
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

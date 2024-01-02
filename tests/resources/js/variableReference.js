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

export const variableReference = [
  new TerraformVariable({
    name: 'instance_class',
    type: 'string',
    value: null,
    category: 'variable',
    path: 'new_file.tf',
    defaultValue: 'db.t3.micro',
    description: 'The instance class to use',
    sensitive: true,
    nullable: true,
  }),
];

export const variableComponentReference = [
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
        value: 'var.instance_class',
        definition: dbInstanceClassArgumentDefinition,
      }),
    ],
  }),
];

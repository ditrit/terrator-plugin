import TerraformComponent from 'src/models/TerraformComponent';
import TerraformComponentAttribute from 'src/models/TerraformComponentAttribute';
import { getTerraformMetadata } from 'tests/resources/utils';

const metadata = getTerraformMetadata(
  'aws',
  'src/assets/metadata/aws.json',
);
metadata.parse();

const awsAmiDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_ami');
const filterAttributeDefinition = awsAmiDefinition.definedAttributes.find(({ name }) => name === 'filter');

export default [
  new TerraformComponent({
    id: 'id_1',
    externalId: 'web',
    name: null,
    path: 'new_file.tf',
    definition: awsAmiDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'filter',
        type: 'Object',
        isDynamic: true,
        definition: filterAttributeDefinition,
        value: [
          new TerraformComponentAttribute({
            name: 'name',
            type: 'String',
            value: 'state',
          }),
          new TerraformComponentAttribute({
            name: 'test',
            type: 'Object',
            isDynamic: true,
            value: [
              new TerraformComponentAttribute({
                name: 'value',
                type: 'Number',
                value: 8,
              }),
              new TerraformComponentAttribute({
                name: 'test2',
                type: 'Object',
                isDynamic: true,
                value: [
                  new TerraformComponentAttribute({
                    name: 'value',
                    type: 'Number',
                    value: 9,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  }),
];

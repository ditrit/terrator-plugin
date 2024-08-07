import TerraformComponent from 'src/models/TerraformComponent';
import TerraformComponentAttribute from 'src/models/TerraformComponentAttribute';
import TerraformMetadata from 'src/metadata/TerraformMetadata';
import TerraformData from 'src/models/TerraformData';

const metadata = new TerraformMetadata(new TerraformData());
metadata.parse();

const instanceDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_instance');

export default [
  new TerraformComponent({
    id: 'id_1',
    externalId: 'test',
    name: null,
    path: 'new_file.tf',
    definition: instanceDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'tags',
        type: 'Object',
        isDynamic: true,
        value: [
          new TerraformComponentAttribute({
            name: 'name',
            type: 'String',
            value: 'test',
          }),
          new TerraformComponentAttribute({
            name: 'value',
            type: 'Number',
            value: 50,
          }),
        ],
      }),
      new TerraformComponentAttribute({
        name: 'tags',
        type: 'Object',
        isDynamic: false,
        value: [
          new TerraformComponentAttribute({
            name: 'name',
            type: 'String',
            value: 'test2',
          }),
          new TerraformComponentAttribute({
            name: 'value',
            type: 'Number',
            value: 60,
          }),
        ],
      }),
    ],
  }),
];

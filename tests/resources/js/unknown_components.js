import TerraformComponent from 'src/models/TerraformComponent';
import TerraformComponentAttribute from 'src/models/TerraformComponentAttribute';
import TerraformComponentDefinition from 'src/models/TerraformComponentDefinition';
import TerraformMetadata from 'src/metadata/TerraformMetadata';
import TerraformData from 'src/models/TerraformData';

const metadata = new TerraformMetadata(new TerraformData());
metadata.parse();

export default [
  new TerraformComponent({
    id: 'id_1',
    externalId: 'id_1',
    path: 'new_file.tf',
    definition: new TerraformComponentDefinition({
      isContainer: false,
      model: 'DefaultModel',
      icon: 'unknown',
      type: 'unknown_ressource',
      blockType: 'resource',
    }),
    attributes: [
      new TerraformComponentAttribute({
        name: 'value',
        type: 'String',
        definition: null,
        value: 'test',
      }),
    ],
  }),
  new TerraformComponent({
    id: 'id_2',
    externalId: 'unknown_module',
    path: 'new_file.tf',
    definition: new TerraformComponentDefinition({
      isContainer: false,
      model: 'DefaultModel',
      icon: 'unknown',
      type: 'unknown_module',
      blockType: 'module',
    }),
    attributes: [
      new TerraformComponentAttribute({
        name: 'source',
        type: 'String',
        definition: null,
        value: 'test',
      }),
    ],
  }),
];

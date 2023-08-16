import TerraformComponent from 'src/models/TerraformComponent';
import TerraformComponentAttribute from 'src/models/TerraformComponentAttribute';
import { getTerraformMetadata } from 'tests/resources/utils';

const metadata = getTerraformMetadata(
  'aws',
  'src/assets/metadata/aws.json',
);
metadata.parse();

const awsSecGroupDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_security_group');
const egressAttributeDefinition = awsSecGroupDefinition.definedAttributes.find(({ name }) => name === 'egress');
const egressFromPortAttributeDefinition = egressAttributeDefinition.definedAttributes.find(({ name }) => name === 'from_port');
const egressToPortAttributeDefinition = egressAttributeDefinition.definedAttributes.find(({ name }) => name === 'to_port');
const tagsAttributeDefinition = awsSecGroupDefinition.definedAttributes.find(({ name }) => name === 'tags');

export default [
  new TerraformComponent({
    id: 'test_secgroup',
    name: null,
    path: 'new_file.tf',
    definition: awsSecGroupDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'egress',
        type: 'Object',
        isDynamic: true,
        definition: egressAttributeDefinition,
        value: [
          new TerraformComponentAttribute({
            name: 'from_port',
            type: 'Number',
            value: 0,
            definition: egressFromPortAttributeDefinition,
          }),
          new TerraformComponentAttribute({
            name: 'to_port',
            type: 'Number',
            value: 0,
            definition: egressToPortAttributeDefinition,
          }),
        ],
      }),
      new TerraformComponentAttribute({
        name: 'tags',
        type: 'Object',
        definition: tagsAttributeDefinition,
        value: [
          new TerraformComponentAttribute({
            name: 'Environment',
            type: 'String',
            value: 'Test',
          }),
          new TerraformComponentAttribute({
            name: 'Name',
            type: 'String',
            value: 'test Secgroup',
          }),
        ],
      }),
    ],
  }),
];

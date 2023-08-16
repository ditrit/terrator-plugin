import TerraformComponent from 'src/models/TerraformComponent';
import TerraformComponentAttribute from 'src/models/TerraformComponentAttribute';
import { getTerraformMetadata } from 'tests/resources/utils';

const metadata = getTerraformMetadata(
  'aws',
  'src/assets/metadata/aws.json',
);
metadata.parse();

const awsSecGroupDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_security_group');
const nameAttributeDefinition = awsSecGroupDefinition.definedAttributes.find(({ name }) => name === 'name');
const descriptionAttributeDefinition = awsSecGroupDefinition.definedAttributes.find(({ name }) => name === 'description');
const ingressAttributeDefinition = awsSecGroupDefinition.definedAttributes.find(({ name }) => name === 'ingress');
const ingressFromPortAttributeDefinition = ingressAttributeDefinition.definedAttributes.find(({ name }) => name === 'from_port');
const ingressToPortAttributeDefinition = ingressAttributeDefinition.definedAttributes.find(({ name }) => name === 'to_port');
const ingressProtocolAttributeDefinition = ingressAttributeDefinition.definedAttributes.find(({ name }) => name === 'protocol');
const egressAttributeDefinition = awsSecGroupDefinition.definedAttributes.find(({ name }) => name === 'egress');
const egressFromPortAttributeDefinition = egressAttributeDefinition.definedAttributes.find(({ name }) => name === 'from_port');
const egressToPortAttributeDefinition = egressAttributeDefinition.definedAttributes.find(({ name }) => name === 'to_port');
const egressProtocolAttributeDefinition = egressAttributeDefinition.definedAttributes.find(({ name }) => name === 'protocol');
const tagsAttributeDefinition = awsSecGroupDefinition.definedAttributes.find(({ name }) => name === 'tags');

export default [
  new TerraformComponent({
    id: 'allow_all',
    name: null,
    path: 'new_file.tf',
    definition: awsSecGroupDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'name',
        type: 'String',
        value: 'allow_all',
        definition: nameAttributeDefinition,
      }),
      new TerraformComponentAttribute({
        name: 'description',
        type: 'String',
        value: 'Allow all inbound traffic',
        definition: descriptionAttributeDefinition,
      }),
      new TerraformComponentAttribute({
        name: 'ingress',
        type: 'Object',
        isDynamic: true,
        definition: ingressAttributeDefinition,
        value: [
          new TerraformComponentAttribute({
            name: 'from_port',
            type: 'Number',
            value: 0,
            definition: ingressFromPortAttributeDefinition,
          }),
          new TerraformComponentAttribute({
            name: 'to_port',
            type: 'Number',
            value: 0,
            definition: ingressToPortAttributeDefinition,
          }),
          new TerraformComponentAttribute({
            name: 'protocol',
            type: 'String',
            value: '-1',
            definition: ingressProtocolAttributeDefinition,
          }),
        ],
      }),
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
          new TerraformComponentAttribute({
            name: 'protocol',
            type: 'String',
            value: '-1',
            definition: egressProtocolAttributeDefinition,
          }),
        ],
      }),
      new TerraformComponentAttribute({
        name: 'tags',
        type: 'Object',
        isDynamic: false,
        definition: tagsAttributeDefinition,
        value: [
          new TerraformComponentAttribute({
            name: 'Terraform',
            type: 'Boolean',
            value: true,
          }),
        ],
      }),
    ],
  }),
];

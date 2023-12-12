import TerraformComponent from 'src/models/TerraformComponent';
import TerraformComponentAttribute from 'src/models/TerraformComponentAttribute';
import { getTerraformMetadata } from 'tests/resources/utils';

const metadata = getTerraformMetadata(
  'aws',
  'src/assets/metadata/aws.json',
);
metadata.parse();
const awsSecGroupDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_security_group');
const ingressAttributeDefinition = awsSecGroupDefinition.definedAttributes.find(({ name }) => name === 'ingress');
const ingressFromPortAttributeDefinition = ingressAttributeDefinition.itemDefinition[0].definedAttributes.find(({ name }) => name === 'from_port');
const ingressToPortAttributeDefinition = ingressAttributeDefinition.itemDefinition[0].definedAttributes.find(({ name }) => name === 'to_port');
const ingressProtocolAttributeDefinition = ingressAttributeDefinition.itemDefinition[0].definedAttributes.find(({ name }) => name === 'protocol');
const cirdBlocksAttributeDefinition = ingressAttributeDefinition.itemDefinition[0].definedAttributes.find(({ name }) => name === 'cidr_blocks');
const ipv6CidrBlocksAttributeDefinition = ingressAttributeDefinition.itemDefinition[0].definedAttributes.find(({ name }) => name === 'ipv6_cidr_blocks');
const arrayOfObjectComponents = [
  new TerraformComponent({
    id: 'aws_security_group_1',
    name: null,
    path: './array_of_object.tf',
    definition: awsSecGroupDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'name',
        type: 'String',
        value: 'allow_all',
        definition: awsSecGroupDefinition.definedAttributes.find(({ name }) => name === 'name'),
      }),
      new TerraformComponentAttribute({
        name: 'description',
        type: 'String',
        value: 'Allow all inbound traffic',
        definition: awsSecGroupDefinition.definedAttributes.find(({ name }) => name === 'description'),
      }),
      new TerraformComponentAttribute({
        name: 'ingress',
        type: 'Array',
        isDynamic: true,
        definition: ingressAttributeDefinition,
        value: [
          new TerraformComponentAttribute({
            type: 'Object',
            definition: ingressAttributeDefinition.itemDefinition[0],
            isDynamic: true,
            value: [
              new TerraformComponentAttribute({
                name: 'from_port',
                type: 'Number',
                value: 8080,
                definition: ingressFromPortAttributeDefinition,
              }),
              new TerraformComponentAttribute({
                name: 'to_port',
                type: 'Number',
                value: 80,
                definition: ingressToPortAttributeDefinition,
              }),
              new TerraformComponentAttribute({
                name: 'protocol',
                type: 'String',
                value: 'TCP',
                definition: ingressProtocolAttributeDefinition,
              }),
              new TerraformComponentAttribute({
                name: 'cidr_blocks',
                type: 'Array',
                value: ['192.2.0.0/24', '192.3.0.0/24'],
                definition: cirdBlocksAttributeDefinition,
              }),
              new TerraformComponentAttribute({
                name: 'ipv6_cidr_blocks',
                type: 'Array',
                value: ['2001:db8::/32', '2001:db7::/32'],
                definition: ipv6CidrBlocksAttributeDefinition,
              }),
            ],
          }),
          new TerraformComponentAttribute({
            type: 'Object',
            definition: ingressAttributeDefinition.itemDefinition[0],
            isDynamic: true,
            value: [
              new TerraformComponentAttribute({
                name: 'from_port',
                type: 'Number',
                value: 9090,
                definition: ingressFromPortAttributeDefinition,
              }),
              new TerraformComponentAttribute({
                name: 'to_port',
                type: 'Number',
                value: 90,
                definition: ingressToPortAttributeDefinition,
              }),
              new TerraformComponentAttribute({
                name: 'protocol',
                type: 'String',
                value: 'UDP',
                definition: ingressProtocolAttributeDefinition,
              }),
              new TerraformComponentAttribute({
                name: 'cidr_blocks',
                type: 'Array',
                value: ['192.15.0.0/24', '192.16.0.0/24'],
                definition: cirdBlocksAttributeDefinition,
              }),
              new TerraformComponentAttribute({
                name: 'ipv6_cidr_blocks',
                type: 'Array',
                value: ['2001:dc8::/32', '2001:dc7::/32'],
                definition: ipv6CidrBlocksAttributeDefinition,
              }),
            ],
          }),
        ],
      }),
    ],
  }),
];

export default arrayOfObjectComponents;
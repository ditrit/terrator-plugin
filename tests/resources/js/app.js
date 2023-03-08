import { Component } from 'leto-modelizer-plugin-core';
import TerraformComponentAttribute from 'src/models/TerraformComponentAttribute';
import { getTerraformMetadata } from 'tests/resources/utils';
import TerraformVariable from 'src/models/TerraformVariable';

const metadata = getTerraformMetadata(
  'aws',
  'src/assets/metadata/aws.json',
);
metadata.parse();

const awsDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws');
const regionAttributeDefinition = awsDefinition.definedAttributes.find(({ name }) => name === 'region');
const accessKeyAttributeDefinition = awsDefinition.definedAttributes.find(({ name }) => name === 'access_key');
const secretKeyAttributeDefinition = awsDefinition.definedAttributes.find(({ name }) => name === 'secret_key');
const serverDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'server');
const sourceAttributeDefinition = awsDefinition.definedAttributes.find(({ name }) => name === 'source');
const awsAmiDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_ami');
const filterAttributeDefinition = awsAmiDefinition.definedAttributes.find(({ name }) => name === 'filter');
const mostRecentAttributeDefinition = awsAmiDefinition.definedAttributes.find(({ name }) => name === 'most_recent');
const awsRoute53ZoneDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_route53_zone');
const nameAttributeDefinition = awsRoute53ZoneDefinition.definedAttributes.find(({ name }) => name === 'name');

export const appComponents = [
  new Component({
    definition: awsDefinition,
    id: 'aws_1',
    name: null,
    path: './app.tf',
    attributes: [
      new TerraformComponentAttribute({
        name: 'access_key',
        type: 'String',
        value: 'ABCD1234J54PXLDF4IC4WMVA',
        definition: accessKeyAttributeDefinition,
      }),
      new TerraformComponentAttribute({
        name: 'secret_key',
        type: 'String',
        value: '28prpojfngldfgPcgiv79Q/J+8o7ksdfsTjmmE2QQBRa',
        definition: secretKeyAttributeDefinition,
      }),
      new TerraformComponentAttribute({
        name: 'region',
        type: 'String',
        value: 'eu-west-3',
        definition: regionAttributeDefinition,
      }),
    ],
  }),
  new Component({
    name: null,
    id: 'server_1',
    path: './app.tf',
    definition: serverDefinition,
    attributes: [new TerraformComponentAttribute({
      name: 'source',
      type: 'String',
      value: '../modules/server',
      definition: sourceAttributeDefinition,
    })],
  }),
  new Component({
    name: null,
    id: 'web',
    path: './app.tf',
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
            name: 'values',
            type: 'Array',
            value: ['available'],
          }),
        ],
      }),
      new TerraformComponentAttribute({
        name: 'most_recent',
        value: true,
        type: 'Boolean',
        definition: mostRecentAttributeDefinition,
      }),
    ],
  }),
  new Component({
    name: null,
    id: 'publicdns',
    path: './app.tf',
    definition: awsRoute53ZoneDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'name',
        value: 'aws.domaine.fr',
        type: 'String',
        definition: nameAttributeDefinition,
      }),
      new TerraformComponentAttribute({
        name: 'image_id',
        value: null,
        type: 'String',
        definition: null,
      }),
      new TerraformComponentAttribute({
        name: 'position',
        value: 1,
        type: 'Number',
        definition: null,
      }),
    ],
  }),
];

export const appVariables = [
  new TerraformVariable({
    name: 'image_id',
    type: 'string',
    category: 'variable',
    path: './app.tf',
    defaultValue: null,
  }),
];

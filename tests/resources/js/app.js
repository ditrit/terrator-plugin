import { Component } from 'leto-modelizer-plugin-core';
import TerraformComponentAttribute from 'src/models/TerraformComponentAttribute';
import { getTerraformMetadata } from 'tests/resources/utils';

const metadata = getTerraformMetadata(
  'aws',
  'src/assets/metadata/aws.json',
);
metadata.parse();

const awsDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws');
const regionDefinition = awsDefinition.definedAttributes.find(({ name }) => name === 'region');
const serverDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'server');
const awsAmiDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_ami');
const awsRoute53ZoneDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_route53_zone');
const nameDefinition = awsRoute53ZoneDefinition.definedAttributes.find(({ name }) => name === 'name');
const imageIdDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'image_id');

export default [
  new Component({
    id: 'aws_1',
    name: null,
    path: './app.tf',
    definition: awsDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'access_key',
        type: 'String',
        value: 'ABCD1234J54PXLDF4IC4WMVA',
      }),
      new TerraformComponentAttribute({
        name: 'secret_key',
        type: 'String',
        value: '28prpojfngldfgPcgiv79Q/J+8o7ksdfsTjmmE2QQBRa',
      }),
      new TerraformComponentAttribute({
        name: 'region',
        type: 'String',
        value: 'eu-west-3',
        definition: regionDefinition,
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
        definition: nameDefinition,
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
  new Component({
    id: 'image_id',
    name: null,
    path: './app.tf',
    definition: imageIdDefinition,
    attributes: [new TerraformComponentAttribute({
      name: 'type',
      type: 'String',
      value: 'string',
    })],
  }),
];

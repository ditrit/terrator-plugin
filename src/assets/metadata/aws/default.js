export const vpcIdLink = {
  name: 'vpc_id',
  displayName: 'VPC ID',
  containerRef: 'aws_vpc',
  linkAttribute: 'id',
  linkRef: 'aws_vpc',
  linkType: 'Default',
  linkModel: 'defaultLink',
  type: 'Link',
};

export const vpcIdReference = {
  name: 'vpc_id',
  displayName: 'VPC ID',
  containerRef: 'aws_vpc',
  type: 'Reference',
};

export const tags = {
  name: 'tags',
  displayName: 'Tags',
  description: 'A map of tags to assign to the resource.',
  type: 'Object',
  url: 'https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html',
};

export const securityGroups = {
  name: 'security_groups',
  displayName: 'Security groups',
  description: 'List of security group names to associate with.',
  linkAttribute: 'name',
  linkRef: 'aws_security_group',
  linkType: 'Default',
  linkModel: 'defaultLink',
  type: 'Link',
};

export const subnetId = {
  name: 'subnet_id',
  displayName: 'Subnet ID',
  linkAttribute: 'id',
  linkRef: 'aws_subnet',
  linkType: 'Default',
  linkModel: 'defaultLink',
  type: 'Link',
};

export const port = {
  name: 'port',
  displayName: 'Port',
  type: 'Number',
  rules: {
    max: '65535',
    min: '1',
  },
};

export const ipv6Address = {
  name: 'ipv6_address',
  displayName: 'IPv6 address',
  description: 'The IPv6 address.',
  type: 'String',
};
